<template>
  <AppBarComponent/>
  <div class="container">
    <div class="row mt-5" v-if="isNew">
      <h1>Création du point hebdo</h1>
    </div>
    <div class="row mt-5" v-else>
      <h1>Modification du point hebdo</h1>
    </div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-2"></div>
        <div class="col-8 tableau rounded mb-5">
          <div class="row calendar">
            <div class="col-2 mt-4">
              <span>Date</span>
              <input class="input1 cursor-pointer" type="date" id="start" max="9999-12-31" name="trip-start" v-model="pointHebdo.eventDateFormatted" :disabled="pointHebdo.validate" />
            </div>
            <div class="col-5"></div>
            <div class="col-1"></div>
            <div class="col-4 mt-4" v-if="isManager">
                <span>Collaborateur</span>
                <select  class="form-select form-select-sm mt-2" aria-label=".form-select-sm example" v-model="selectedUser" :disabled="pointHebdo.validate">
                  <option value="">Afficher tous</option>
                  <option v-for="user in users" :key="user.id" :value="user">{{ user.firstName }} {{ user.lastName }}</option>
                </select>
            </div>
          </div>
            <ProjectDetailsComponent
                  v-if="pointHebdo.projetDetails != null"
                  v-for="(project, index) in pointHebdo.projetDetails"
                  :key="index"
                  @delete-project="deleteProject(index)"
                  :project="project"
                  :is-point-hebdo-validated="pointHebdo.validate"/>
          <div class="row mt-2 mb-2">
            <div class="col-12 text-center">
              <div class="btn plus" @click="addProject()" :hidden="pointHebdo.validate"><font-awesome-icon icon="fa-solid fa-square-plus"/></div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-outline" data-mdb-input-init>
                <label class="form-label" for="textAreaNote">Notes</label>
                <textarea class="form-control" id="textAreaNote" rows="4" v-model="pointHebdo.note" :disabled="pointHebdo.validate"></textarea>
              </div>
            </div>
          </div>
          <div class="row mt-4 mb-4">
            <div class="col-12">
              <div class="form-outline" data-mdb-input-init >
                <label class="form-label" for="textAreaPriority">Priorité</label>
                <textarea class="form-control" id="textAreaPriority" rows="4" v-model="pointHebdo.priority" :disabled="pointHebdo.validate"></textarea>
              </div>
            </div>
          </div>
          <div v-if="pointHebdo.validate">
            <div class="row fa-pull-right bouton-enregistrer">
              <button type="submit" id="password" @click="goToHome()" class="btn-bouton rounded mb-3" style="padding-left: 2rem; padding-right: 2rem;">Accueil</button>
            </div>
          </div>
          <div v-else>
            <div v-if="isManager">
              <div class="row fa-pull-right bouton-enregistrer">
                <button type="submit" id="password" @click="validatePointHebdo" class="btn-bouton rounded mb-3" style="padding-left: 2rem; padding-right: 2rem;">Valider</button>
              </div>
              <div class="mt-5">
                <button type="submit" id="password" @click="createOrModifyPointHebdo()" class="btn-bouton rounded mb-3" style="padding-left: 2rem; padding-right: 2rem;">{{ isNew ? 'Enregistrer' : 'Modifier' }}</button>
              </div>
            </div>
            <div v-else>
              <div class="row fa-pull-right  mt-3 bouton-enregistrer">
                <button type="submit" id="password" @click="createOrModifyPointHebdo()" class="btn-bouton rounded mb-3" style="padding-left: 2rem; padding-right: 2rem;">{{ isNew ? 'Enregistrer' : 'Modifier' }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import {defineComponent} from "vue";
import AppBarComponent from "@/components/util/AppBarComponent.vue";
import ProjectDetailsComponent from "@/components/util/ProjectDetailsComponent.vue";
import PointHebdoApiService from "@/services/api/pointHebdoApiService.js";
import {mapActions, mapGetters} from "vuex";
import UtilService from "@/services/utilService.js";
import UserApiService from "@/services/api/userApiService.js";


export default defineComponent({
  components: {ProjectDetailsComponent, AppBarComponent},
  props: ['id'],
  data() {
    return {
      users: [],
      selectedUser: null,
      pointHebdo: {
        user : null,
        projetDetails: [],
        note: null,
        priority: null,
        eventDateFormatted: UtilService.dateToString(new Date())
      },
    }
  },

  async created() {
    try {
      this.users = await UserApiService.getAll();
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  },

  computed: {
    ...mapGetters("auth", ["isLoggedIn", "connectedUser"]),
    isNew() {
      return this.id === undefined;
    },
    ...mapGetters("auth", ["isLoggedIn", "connectedUser" ]),
    isManager(){
      return this.connectedUser.manager===true;
    }
  },

  watch: {
    'pointHebdo.eventDateFormatted': function(newDate) {
      this.pointHebdo.eventDate = new Date(newDate);
    }
  },

  methods: {
    initNewPoint(){
      this.pointHebdo = {
        projetDetails: [],
        note: null,
        user : null,
        priority: null,
        eventDateFormatted: this.getCurrentDate()
      }
      this.addProject()
    },
    addProject() {
      this.pointHebdo.projetDetails.push(
          {
            client: null,
            projet: null,
            situation: null,
          }
      )
    },
    deleteProject(index) {
      this.pointHebdo.projetDetails.splice(index, 1);
    },

    async createPointHebdo() {
      try {
        if (!this.isManager) {
          this.pointHebdo.user = this.connectedUser;
        }else {
          this.pointHebdo.user = this.selectedUser;
        }
        this.pointHebdo.eventDate = new Date(this.pointHebdo.eventDateFormatted);
        await PointHebdoApiService.create(this.pointHebdo);
        console.log("Point hebdomadaire créé avec succès !");
        this.$router.push('/');
      } catch (error) {
        console.error("Erreur lors de la création du point hebdomadaire :", error);
      }
    },

    createOrModifyPointHebdo() {
      if (this.isNew) {
        this.createPointHebdo();
      } else {
        this.updatePointHebdo();
      }
    },

    async updatePointHebdo() {
      try {
        if (!this.isManager) {
          this.pointHebdo.user = this.connectedUser;
        }else {
          this.pointHebdo.user = this.selectedUser;
        }
        await PointHebdoApiService.update(this.pointHebdo);

        console.log("Point hebdomadaire validé avec succès !");
        this.$router.push('/');
      } catch (error) {
        console.error("Erreur lors de la validation du point hebdomadaire :", error);
      }
    },

    async validatePointHebdo() {
      try {
        if (!this.isManager) {
          this.pointHebdo.user = this.connectedUser;
        }else {
          this.pointHebdo.user = this.selectedUser;
        }
        await PointHebdoApiService.validate(this.pointHebdo);

        console.log("Point hebdomadaire validé avec succès !");
        this.$router.push('/');
      } catch (error) {
        console.error("Erreur lors de la validation du point hebdomadaire :", error);
      }
    },

    getCurrentDate() {
      const currentDate = new Date().toISOString().split('T')[0];
      return currentDate;
    },

    goToHome() {
      this.$router.push('/');
    },

    ...mapActions(['setLoading']),
    async getPointHebdoById(id) {
      this.setLoading(true);
      try {
        const result = await PointHebdoApiService.getById(id);
        if (result !== undefined && result !== null) {
          this.pointHebdo = result;
          this.selectedUser=this.pointHebdo.user
          this.pointHebdo.eventDateFormatted = UtilService.dateToString(this.pointHebdo.eventDate);
        } else {
          console.error("La réponse de getById est undefined ou null");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du point hebdomadaire :", error);
      }
      this.setLoading(false);
    },
  },
  mounted() {
    if (this.id === undefined) {
      this.initNewPoint();
      console.log('create');
      this.pointHebdo.user = this.connectedUser;
    } else {
      this.getPointHebdoById(this.id);
    }
    console.log(this.isNew);
  }
})

</script>

<style>
h1{
  text-align: center;
  color: #494949;
  font-size: 2.5em;
}
.tableau{
  background-color: #f8f7f7;
}


.calendar{
  padding-left: 1%;
}

.plus{
  font-size: 40px !important;
  color: #b6057a !important;
}

.btn-bouton{
  background-color: #b6057a;
  color: white !important;
  font-size: 17px;
  border: #f3f3f3;
}

.bouton-enregistrer{
  padding-right: 1%;
}

.input1 {
  background-color: white;
  margin: 0.4rem 0;
  padding: 0rem 0.2rem 0rem 0.2rem;
  border: 1px solid;
  border-color: #d8d8d8;
  border-radius: 3px;
}

</style>