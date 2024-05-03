<template>
  <AppBarComponent/>
  <div class="container">
    <div class="row mt-5">
      <h1>Création du point hebdo</h1>
    </div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-2"></div>
        <div class="col-8 tableau rounded mb-5">
          <div class="row calendar">
            <div class="col-2 mt-4">
              <span>Date</span>
              <input type="date" id="start" name="trip-start" v-model="pointHebdo.eventDateFormatted" />
            </div>
            <div class="col-5"></div>
            <div class="col-5 mt-4">
            </div>
          </div>
          <ProjectDetailsComponent v-if="pointHebdo.projetDetails!=null"
                                   v-for="(project, index) in pointHebdo.projetDetails" :key="index" @delete-project="deleteProject(index)"
                                   :project="project"/>
          <div class="row mt-2 mb-2">
            <div class="col-12 text-center">
              <div class="btn plus" @click="addProject()"><font-awesome-icon icon="fa-solid fa-square-plus" /></div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-outline" data-mdb-input-init>
                <label class="form-label" for="textAreaNote">Notes</label>
                <textarea class="form-control" id="textAreaNote" rows="4" v-model="pointHebdo.note"></textarea>
              </div>
            </div>
          </div>
          <div class="row mt-4 mb-4">
            <div class="col-12">
              <div class="form-outline" data-mdb-input-init>
                <label class="form-label" for="textAreaPriority">Priorité</label>
                <textarea class="form-control" id="textAreaPriority" rows="4" v-model="pointHebdo.priority"></textarea>
              </div>
            </div>
          </div>
          <div class="row fa-pull-right mt-3 bouton-enregistrer">
            <button type="submit" id="password" @click="createPointHebdo()" class="btn-bouton rounded mb-3"
                    style="padding-left: 2rem; padding-right: 2rem;">Enregistrer</button>
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


export default defineComponent({
  components: {ProjectDetailsComponent, AppBarComponent},
  props: ['id'],
  data() {
    return {
      pointHebdo: {
        projetDetails: [],
        note: null,
        priority: null,
        eventDateFormatted: UtilService.dateToString(new Date())
      },
    }
  },

  computed: {
    ...mapGetters("auth", ["isLoggedIn", "connectedUser"]), // Mapper les getters du store Vuex
    isNew() {
      return this.id === undefined;
    }


  },
  methods: {
    initNewPoint(){
      this.pointHebdo = {
        projetDetails: [],
        note: null,
        priority: null,
        eventDateFormatted: UtilService.dateToString(new Date())
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
        // Assigner l'utilisateur actuel à pointHebdo.user
        this.pointHebdo.user = this.connectedUser;
        this.pointHebdo.eventDate= new Date(this.pointHebdo.eventDateFormatted)

        // Enregistrer le pointHebdo avec l'utilisateur actuel
        await PointHebdoApiService.create(this.pointHebdo);
        console.log("Point hebdomadaire créé avec succès !");
        // Affichez un message de succès à l'utilisateur si nécessaire
        this.$router.push('/');
      } catch (error) {
        console.error("Erreur lors de la création du point hebdomadaire :", error);
        // Gérez les erreurs et informez l'utilisateur
      }
    },

    ...mapActions(['setLoading']),
    async getPointHebdoById(id) {
      this.setLoading(true);
      try {
        const result = await PointHebdoApiService.getById(id);
        if (result !== undefined && result !== null) {
          this.pointHebdo = result;
          this.pointHebdo.eventDateFormatted=UtilService.dateToString(this.pointHebdo.eventDate);

        } else {
          // Gérer le cas où la réponse est undefined ou null
          console.error("La réponse de getById est undefined ou null");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du point hebdomadaire :", error);
        // Gérer l'erreur et informer l'utilisateur si nécessaire
      }
      this.setLoading(false);
    },

  },


  mounted() {
    if (this.id === undefined) {
      this.initNewPoint();
      console.log('create');
      // Définissez l'utilisateur par défaut sur l'utilisateur connecté
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
</style>