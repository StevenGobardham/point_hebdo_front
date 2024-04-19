<template>
  <AppBarComponent/>
  <div class="container">
    <div class="row mt-5">
      <h1>Création du point hebdo</h1>
    </div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-2"></div>
        <div class="col-8 tableau rounded">
          <div class="row calendar">
            <div class="col-2 mt-4">
              <span>Date</span>
              <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" />
            </div>
            <div class="col-8"></div>
            <div class="col-2"></div>
          </div>
          <ProjectDetailsComponent v-if="pointHebdo!=null" v-for="(project, index) in pointHebdo.projectList" :key="index"/>
          <div class="row mt-2 mb-2">
            <div class="col-12 text-center">
              <div class="btn plus"><font-awesome-icon icon="fa-solid fa-square-plus" /></div>
            </div>
          </div>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
  </div>
</template>


<script>

import {defineComponent} from "vue";
import AppBarComponent from "@/components/util/AppBarComponent.vue";
import ProjectDetailsComponent from "@/components/util/ProjectDetailsComponent.vue";

export default defineComponent({
  components: {ProjectDetailsComponent, AppBarComponent},
  props: ['id'],
  data() {
    return {
      pointHebdo: null,

    }
  },

  computed: {
    isNew(){
      return this.id === undefined
    }

  },
  methods: {

  },
  mounted() {
    // si ma page a un id , j utilise un méthode pour aller chercher en base mon entité, sinon j utilise une méthode pour créer une entité vide ex : initNewPoint   => this.pointHebdo =
    if (this.id ===undefined){
      console.log('create')
    } else{
      console.log(this.id)
    }
    console.log(this.isNew)

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
</style>