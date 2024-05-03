<template>
  <h1>Création d'un utilisateur</h1>
  <div class="row couleur-container mt-5">
    <div class="col-5 my-5 marge-col">
      <label class="form-label" for="lastName">Nom</label>
      <input type="text" v-model="user.lastName"
             id="lastName" class="form-control"/>
      <label class="form-label mt-5" for="username">Nom d'utilisateur</label>
      <input type="text" id="username"  v-model="user.username" class="form-control"/>
      <label class="form-label mt-5" for="password">Mot de passe</label>
      <input type="password" v-model="user.password"
             id="password" class="form-control"/>
    </div>
    <div class="col-1"></div>
    <div class="col-5 my-5 marge-col2">
      <label class="form-label" for="firstName">Prénom</label>
      <input type="text" v-model="user.firstName"
             id="firstName" class="form-control"/>
      <label class="form-label mt-5" for="email">Email</label>
      <input type="email" v-model="user.email"
             id="email" class="form-control mb-4"/>
      <div class="text-center mt-4">
        <input class="form-check-input" v-model="user.manager"
               id="manager" type="checkbox">
        <label class="form-check-label" for="flexCheckDefault">
          &nbsp;Manager
        </label>
      </div>
      <button type="submit" :disabled="!canSubmit" @click="onSubmit" class="btn-bouton2 rounded mt-4"
              style="padding-left: 2rem; padding-right: 2rem;">Valider</button>
    </div>
    <div class="col-1"></div>
  </div>
</template>

<script>
import UserApiService from "@/services/api/userApiService.js";
import BasicModalComponent from "@/components/modal/BasicModalComponent.vue";
import {Field, defineRule, ErrorMessage, Form, configure} from 'vee-validate';
import { required, email, min,alpha, alpha_num } from '@vee-validate/rules';
import UtilService from "@/services/utilService.js";
import LoadingComponent from "@/components/util/LoadingComponent.vue";
import LoginApiService from "@/services/api/loginApiService.js";
import ErrorService from "@/services/errorService.js";
import {mapActions} from "vuex";

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('alpha_num', alpha_num);
defineRule('alpha', alpha);


export default {
  name: 'CreateUserComponent',
  components: {LoadingComponent, Form, ErrorMessage, Field, BasicModalComponent},
  data() {
    return {
      user: {
        username: 'rezf',
        firstName: 'rfezff',
        lastName: 'eqvgf',
        email: 'qedfsv',
        password: 'qvfd',
        manager: true,
      },
      mailAvailabiltyStatus: null,
      usernameAvailabiltyStatus: null,
      secondsBeforeRedirect: 5,
    }
  },
  computed: {
    canSubmit() {
      return true
     /* this.user.username != null && this.user.username.length > 3
      && this.user.firstName != null && this.user.firstName.length > 1
      && this.user.lastName != null && this.user.lastName.length > 1
      //&& this.user.email != null && this.user.email.length > 3 && UtilService.isEmail(this.user.email)
      && this.user.password != null && this.user.password.length > 3;*/
    },

  },
  methods: {
    ...mapActions(['setLoading']),
    async onSubmit() {
      this.setLoading(true);
      await UserApiService.create(this.user).then((result) => {
        if(result.status===true) {
          window.location.reload();
        }
      }).catch((error) => {
        ErrorService.showErrorInAlert(error);
      });
      this.setLoading(false);
    }
  }
}
</script>

<style>
h1{
  text-align: center;
  color: #494949;
  font-size: 2.5em;
}

.btn-bouton2{
  background-color: #b6057a;
  color: white !important;
  font-size: 17px;
  border: #f3f3f3;
  margin-left: 40%;
}
.couleur-container{
  background-color: #f8f7f7;
  border-radius: 5px
}
.marge-col{
  margin-left: 4%;
}
.marge-col2{
  margin-left: 1%;
}
</style>