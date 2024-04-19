<template>
  <div class="details rounded">
    <div class="row mt-4">
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
    <div class="row mt-2 mb-2">
      <div class="form-outline" data-mdb-input-init>
        <label class="form-label" for="textAreaExample">Situation</label>
        <textarea class="form-control" id="textAreaExample" rows="4"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
export default {
  name: 'ProjectDetailsComponent',
  }
</script>

<style>

.details{
  background-color: rgba(248, 236, 207, 0.68);
  padding-left: 1%;
  padding-bottom: 1px;
  padding-right: 1%;

}
</style>