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
          <div class="row">
            <div class="col-2 mt-5">
              <span>Date</span>
              <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" />
            </div>
            <div class="col-8"></div>
            <div class="col-2"></div>
          </div>
          <div class="row mt-5">
            <div class="col-4">
              <div class="form-outline" data-mdb-input-init>
                <label class="form-label" for="typeText">Client</label>
                <input type="text" id="typeText" class="form-control" />
              </div>
            </div>
            <div class="col-4"></div>
            <div class="col-4">
              <div class="form-outline" data-mdb-input-init>
                <label class="form-label" for="typeText">Projet</label>
                <input type="text" id="typeText" class="form-control" />
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <CreatePhComponent/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import {defineComponent} from "vue";
import AppBarComponent from "@/components/util/AppBarComponent.vue";
import CreatePhComponent from "@/components/util/CreatePhComponent.vue"

export default defineComponent({
  components: {AppBarComponent}
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
</style>