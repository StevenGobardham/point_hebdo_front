<template>
  <LoadingComponent/>
  <AppBarComponent/>
  <div class="container mt-5">
    <h1>Liste de contrôle</h1>
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8 tableau rounded mt-5">
        <div class="row mt-5 mb-5">
          <div class="col-4" v-if="isManager">
            <span>Collaborateur</span>
              <select  class="form-select form-select-sm mt-2" aria-label=".form-select-sm example" v-model="selectedUser" @change="filterPointsHebdo">
                <option value="">Afficher tous</option>
                <option v-for="user in users" :key="user.id" :value="user">{{ user.firstName }} {{ user.lastName }}</option>
              </select>
          </div>
          <div class="col-4"></div>
          <div class="col-2">
            <span>Début</span>
            <input class="input1 cursor-pointer" type="date" id="startDate" name="startDate" v-model="startDate" @change="filterPointsHebdo" min="2024-04-01" max="3000-12-31"/>
          </div>
          <div class="col-2">
            <span>Fin</span>
            <input class="input1 cursor-pointer" type="date" id="endDate" name="endDate" v-model="endDate" @change="filterPointsHebdo" min="2024-04-01" max="3000-12-31"/>
          </div>
        </div>
        <div class="row mt-5 tableau-container">
          <div class="container">
            <table class="table table-striped">
              <thead class="thead">
              <tr class="tableau-header">
                <th scope="col" class="col-4 text-center">Date</th>
                <th scope="col" class="col-4 text-center">Collaborateur</th>
                <th scope="col" class="col-4 text-center">Validé</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="pointHebdo in filteredPointsHebdo" :key="pointHebdo.id" @click="showProjectDetails(pointHebdo)">
                <td class="text-center cursor-pointer">{{ UtilService.formatDate(pointHebdo.eventDate) }}</td>
                <td class="text-center cursor-pointer">{{ pointHebdo.user.firstName }} {{ pointHebdo.user.lastName }}</td>
                <td class="text-center cursor-pointer">
                  <span v-if="pointHebdo.validate"><font-awesome-icon icon="fa-solid fa-check"/></span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-10"></div>
          <div class="col-2">
            <button type="submit" id="password" @click="create()" class="btn-bouton rounded mb-3" style="padding-left: 2rem; padding-right: 2rem;">Créer</button>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LoadingComponent from "@/components/util/LoadingComponent.vue";
import AppBarComponent from "@/components/util/AppBarComponent.vue";
import UserApiService from "@/services/api/userApiService.js";
import PointHebdoApiService from "@/services/api/pointHebdoApiService.js";
import UtilService from "../services/utilService.js";

export default {
  name: 'PointHebdoList',
  components: {
    AppBarComponent,
    LoadingComponent
  },
  data() {
    return {
      pointsHebdo: [],
      users: [],
      selectedUser: null,
      startDate: null,
      endDate: null,
      filteredPointsHebdo: [], // Points Hebdo filtrés par utilisateur sélectionné et dates sélectionnées
    }
  },
  async created() {
    try {
      // Récupérer la liste des utilisateurs
      this.users = await UserApiService.getAll();
      // Récupérer la liste des points hebdomadaires
      this.createList();
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  },
  computed: {
    ...mapGetters(["isTestMode", "connectedUser"]),
    UtilService() {
      return UtilService
    },
    ...mapGetters("auth", ["isLoggedIn", "connectedUser" ]),
    isManager(){
      return this.connectedUser.manager===true;
    }
  },
  methods: {
    ...mapActions(['setLoading']),
    async createList() {
      try {
        this.pointsHebdo = await PointHebdoApiService.getAll();
        // Initialisation des points Hebdo filtrés
        this.filteredPointsHebdo = this.pointsHebdo;
      } catch (error) {
        console.error("Erreur lors de la récupération des points hebdomadaires :", error);
      }
    },
    create() {
      this.$router.push({"name": 'CreatePointHebdo'});
    },


    filterPointsHebdo() {
      let filteredPoints = this.pointsHebdo;

      // Filtrer par utilisateur
      if (this.selectedUser) {
        filteredPoints = filteredPoints.filter(pointHebdo => pointHebdo.user.id === this.selectedUser.id);
      }

      // Filtrer par date de début
      if (this.startDate) {
        let startDate = new Date(this.startDate);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        filteredPoints = filteredPoints.filter(pointHebdo => new Date(pointHebdo.eventDate) >= startDate);
      }

      // Filtrer par date de fin
      if (this.endDate) {
        let endDate = new Date(this.endDate);
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);
        filteredPoints = filteredPoints.filter(pointHebdo => new Date(pointHebdo.eventDate).getTime() <= endDate.getTime());
      }

      // Mettre à jour les points Hebdo filtrés
      this.filteredPointsHebdo = filteredPoints;
    },

    showProjectDetails(pointHebdo) {
      // Passer l'ID du point hebdomadaire ou les détails complets à une autre page ou composant pour afficher les détails du projet
      this.$router.push({ name: 'PointHebdo', params: { id: pointHebdo.id } });

    },

  },
  mounted() {

  }
}
</script>

<style scoped>
.tableau {
  background-color: #f8f7f7;
}

h1 {
  text-align: center;
  color: #494949;
  font-size: 2.5em;
}

.thead {
  border: 1px;
}

.btn-bouton {
  background-color: #b6057a;
  color: white;
  font-size: 17px;
  border: #f3f3f3;
}

.input1 {
  margin: 0.4rem 0;
  padding: 0rem 0.2rem 0rem 0.2rem;
  border: 1px solid;
  border-radius: 3px;
  background-color: white;
}

.tableau-container {
  overflow-y: auto;
  max-height: 400px;
}

.tableau-header {
  position: sticky;
  top: 0;
  background-color: white;
}

</style>