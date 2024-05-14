<template>
  <button class="btn-export rounded mb-3" @click="exportToExcel">
    Exporter &nbsp;&nbsp;<i><font-awesome-icon icon="fas fa-file-excel"/></i>
  </button>
</template>

<script>
import ExcelJS from 'exceljs';
import PointHebdoApiService from "@/services/api/pointHebdoApiService.js";

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      elements: []
    };
  },
  methods: {
    async exportToExcel() {
      if (!Array.isArray(this.data) || this.data.length === 0) {
        console.error('Aucune donnée à exporter.');
        return;
      }

      let pointHebdoIdList = [];
      this.data.forEach(data => pointHebdoIdList.push(data.id));

      let list = [];
      await PointHebdoApiService.getByIdIn(pointHebdoIdList).then(function (response) {
        list = response;
      })
      this.elements = list;

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Points Hebdomadaires');
      const headers = this.fields.map(field => field.charAt(0).toUpperCase() + field.slice(1));
      worksheet.addRow(headers);

      // Ajouter les données des détails à la feuille Excel
      this.elements.forEach(pointHebdo => {
        const firstDetail = pointHebdo.projetDetails[0];
        const fullName = `${pointHebdo.user.firstName} ${pointHebdo.user.lastName}`;
        const firstRowData = [
          pointHebdo.eventDate,
          fullName,
          firstDetail.client,
          firstDetail.projet,
          firstDetail.situation,
        ];
        worksheet.addRow(firstRowData);

        // Ajouter les données du deuxième projet détaillé s'il existe
        if (pointHebdo.projetDetails.length > 1) {
          const secondDetail = pointHebdo.projetDetails[1];
          const secondRowData = [
            '',
            '',
            secondDetail.client,
            secondDetail.projet,
            secondDetail.situation,
          ];
          worksheet.addRow(secondRowData);
        }
        const notePriorityRowData = [
          '',
          '',
          '',
          '',
          '',
          pointHebdo.note,
          pointHebdo.priority,

        ];
        worksheet.addRow(notePriorityRowData);
      });


      workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exported_points_hebdomadaires.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }
};
</script>