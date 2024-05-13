<template>
  <div class="details rounded">
    <div class="row mt-4">
      <div class="col-4">
        <div class="form-outline" data-mdb-input-init>
          <label class="form-label" for="typeText">Client</label>
          <input type="text" id="typeText" class="form-control" v-model="project.client" :disabled="isPointHebdoValidated" maxlength=255 />
        </div>
      </div>
      <div class="col-4"></div>
      <div class="col-4">
        <div class="form-outline" data-mdb-input-init>
          <label class="form-label" for="typeText" >Projet</label>
          <span v-if="! isPointHebdoValidated " class="btn d-flex fa-pull-right poubelle" @click="onDeleteProject" ><font-awesome-icon icon="fa-solid fa-trash-can" /></span>
          <input type="text" id="typeText" class="form-control" v-model="project.projet" :disabled="isPointHebdoValidated" maxlength=255 />
        </div>
      </div>
    </div>
    <div class="row mt-2 mb-2">
      <div class="form-outline" data-mdb-input-init>
        <label class="form-label" for="textAreaExample">Situation</label>
        <textarea class="form-control" id="textAreaExample" rows="4" v-model="project.situation" :disabled="isPointHebdoValidated"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
export default {
  name: 'ProjectDetailsComponent',
  props: {
    project: {
      type: Object,
      required: true
    },
    onDeleteProject: {
      type: Function,
      required: true
    },
    isPointHebdoValidated: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    deleteProject() {
      this.$emit('delete-project');
    }

  }
}
</script>

<style>

.details{
  background-color: rgba(248, 236, 207, 0.68);
  padding-left: 1%;
  padding-bottom: 1px;
  padding-right: 1%;
}

.poubelle{
  width: 2px;
}
</style>