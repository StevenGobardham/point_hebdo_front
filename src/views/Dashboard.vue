<template>
  <LoadingComponent/>
  <AppBarComponent/>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 barreDeTaches">
        <div class="row mt-5">
          <div class="row mt-5">
            <div class="row mt-5">
              <span class="btn text-center" @click="showActiveUsers"><font-awesome-icon icon="fa-solid fa-users" />&nbsp;&nbsp;Liste des utilisateurs</span>
            </div>
            <div class="row mt-5">
              <span class="btn text-center" @click="createUser"><font-awesome-icon icon="fa-solid fa-user" />&nbsp;&nbsp;Création d'un utilisateur</span>
            </div>
            <div class="row mt-5">
              <span class="btn text-center" @click="displayArchivedUsers"><font-awesome-icon icon="fa-solid fa-users" />&nbsp;&nbsp;Utilisateurs archivés</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-10 mt-5">
        <div class="container mt-5 ">
          <ListUsersComponent v-if="showList"/>
          <CreateUserComponent v-else-if="showCreateUser"/>
          <UtilisateursArchivesComponent v-else-if="displayingArchivedUsers"/>

        </div>
      </div>
    </div>
  </div>
</template>


<script>

import {defineComponent} from "vue";
import LoadingComponent from "@/components/util/LoadingComponent.vue";
import AppBarComponent from "@/components/util/AppBarComponent.vue";
import CreateUserComponent from "@/components/util/CreateUserComponent.vue";
import ListUsersComponent from "@/components/util/ListUsersComponent.vue";
import UtilisateursArchivesComponent from "@/components/util/UtilisateursArchivesComponent.vue";

export default defineComponent({
  components: {UtilisateursArchivesComponent, ListUsersComponent, AppBarComponent, LoadingComponent, CreateUserComponent },
  data() {
    return {
      showList: true,
      showCreateUser: false,
      displayingArchivedUsers: false
    };
  },
  methods: {
    createUser() {
      this.showList = false;
      this.showCreateUser = true;
      this.displayingArchivedUsers = false;
    },
    showActiveUsers() {
      this.showList = true;
      this.showCreateUser = false;
      this.displayingArchivedUsers = false;
    },
    displayArchivedUsers() {
      this.showList = false;
      this.showCreateUser = false;
      this.displayingArchivedUsers = true;
    }
  }
});
</script>

<style>
.barreDeTaches{
  background-color: #f8f7f7;
  height: 837px;
}


</style>