<template>
  <LoadingComponent/>
  <AppBarComponent/>
    <div class="container mt-5">
      <h1>Liste de contrôle</h1>
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8 tableau rounded mt-5">
          <div class="row mt-5 mb-5">
            <div class="col-4">
              <select class="form-select form-select-sm" aria-label=".form-select-sm example">
              </select>
              <span>Collaborateur</span>
            </div>
            <div class="col-4"></div>
            <div class="col-2">
              <span>Début</span>
              <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" /></div>
            <div class="col-2">
              <span>Fin</span>
              <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" />
            </div>
          </div>
          <div class="row mt-5">
            <div class="container">
              <table class="table table-striped">
                <thead class="thead">
                <tr>
                  <th scope="col"></th>
                  <th scope="col" >Date</th>
                  <th scope="col" class="text-center">Collaborateur</th>
                  <th scope="col" class="text-center">Statut</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row"></th>
                  <td>Mark</td>
                  <td class="text-center">Otto</td>
                  <td class="text-center">@mdo</td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td>Jacob</td>
                  <td class="text-center">Thornton</td>
                  <td class="text-center">@fat</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-10"></div>
            <div class="col-2">
              <button type="submit" id="password" @click="create()" class="btn-bouton rounded mb-3"
                      style="padding-left: 2rem; padding-right: 2rem;">Créer</button>
            </div>

          </div>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
</template>

<script>

import { v4 as uuidv4 } from 'uuid';
import {mapActions, mapGetters} from "vuex";
import LoadingComponent from "@/components/util/LoadingComponent.vue";
import TestApiService from "@/services/api/testApiService.js";
import ErrorService from "@/services/errorService.js";
import AppBarComponent from "@/components/util/AppBarComponent.vue";
export default {
  name: 'Home',
  components: {
    AppBarComponent,
    LoadingComponent
  },
  computed: {
    ...mapGetters(['isTestMode']),
  },
  methods: {
    ...mapActions(['setLoading']),
      async getTestList(){
        await this.setLoading(true);
        await TestApiService.getAll().then((response) => {
          this.testList = response;
        }).catch((error) => {
          ErrorService.showErrorInAlert(error);
        });
        await this.setLoading(false);
        console.log(this.testList)
        //TODO à supprimer une fois les test terminés
      },
    create(){
      this.$router.push({"name": 'Create'});
    },
    testMethod(){
      console.log(this.testList)
    }
  },
  mounted() {

  }
}

</script>


<style scoped>
.tableau{
  background-color: #f8f7f7;
}

h1{
  text-align: center;
  color: #494949;
  font-size: 2.5em;
}

.thead{
  border: 1px;
}

.btn-bouton{
  background-color: #b6057a;
  color: white;
  font-size: 17px;
  border: #f3f3f3;
}

</style>