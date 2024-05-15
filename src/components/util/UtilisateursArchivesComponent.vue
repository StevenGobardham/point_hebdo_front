<template>
  <div class="row mt-5">
    <h1>Liste des utilisateurs archivés</h1>

    <v-card class="mt-5">
      <v-card-title class="d-flex justify-center pe-2 mb-3">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-text-field
            v-model="search"
            density="compact"
            label="Recherche"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            hide-details
            single-line
        ></v-text-field>
      </v-card-title>

      <v-data-table-virtual
          height="525"
          fixed-header
          :headers="headers"
          :items="users"
          :search="search"
      >

        <template v-slot:item.manager="{ item }">
          <v-checkbox
              v-model="item.manager"
              readonly
          ></v-checkbox>
        </template>
      </v-data-table-virtual>
    </v-card>
  </div>
</template>

<script>
import UserApiService from "@/services/api/userApiService.js";

export default {
  name: 'UtilisateursArchivésComponent',

  data() {
    return {
      dialog: false,
      dialogDelete: false,
      search: '',
      headers: [
        { align: 'start', key: 'lastName', sortable: false, title: 'Nom' },
        { key: 'firstName', title: 'Prénom' },
        { key: 'username', title: "Nom d'utilisateur" },
        { key: 'email', title: 'Email' },
        { key: 'manager', title: 'Manager' },
      ],
      users: [],
    };
  },

  async created() {
    try {
      this.users = await UserApiService.getAllArchived();
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs archivés :", error);
    }
  },
}

</script>

<style scoped>

</style>