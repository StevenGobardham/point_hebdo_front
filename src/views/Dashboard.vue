<template>
  <LoadingComponent/>
  <AppBarComponent/>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 barreDeTaches">
        <div class="row mt-5">
          <div class="row mt-5">
            <div class="row mt-5">
              <span class="btn text-center" @click="listUsers"><font-awesome-icon icon="fa-solid fa-users" />&nbsp;&nbsp;Liste des utilisateurs</span>
            </div>
            <div class="row mt-5">
              <span class="btn text-center" @click="createUser"><font-awesome-icon icon="fa-solid fa-user" />&nbsp;&nbsp;Création d'un utilisateur</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-10 mt-5">
        <div class="container mt-5 ">
          <ListUsersComponent v-if="showList"/>
          <CreateUserComponent v-else/>
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

export default defineComponent({
  components: { ListUsersComponent, AppBarComponent, LoadingComponent, CreateUserComponent },
  data() {
    return {
      showList: true,
    };
  },
  methods: {
    createUser() {
      this.showList = false;
    },
    listUsers() {
      this.showList = true;
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