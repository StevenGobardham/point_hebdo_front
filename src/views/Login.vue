<template>
<AppBarComponent/>
<div class="container mt-5">

      <div class="row">
        <div class="col-4"></div>
        <div class="col-4 rounded connexion">
          <div class="alert alert-danger" v-if="errorMessage!=null">{{ errorMessage }}</div>
          <h2 class=" mt-3 text-center">Connexion</h2>
          <div class="mb-4 mt-5">
            <label for="username" class="form-label ">Nom d'utilisateur</label>
            <input name="username" class="form-control form-control mb-3 mt-1" v-model="user.identifier" >
          </div>
          <div class="mb-5">
            <label for="password" class="form-label mt-2">Mot de passe</label>
            <input v-on:keyup.enter="onSubmit" name="password" type="password" id="username" class="form-control form-control mb-3 mt-1" v-model="user.password" label="Mot de passe">

          </div>
          <div class="d-flex justify-content-center mb-3 mt-5">
            <button type="submit" id="password" @click="onSubmit" class="btn-bouton rounded mb-3"
                    style="padding-left: 2rem; padding-right: 2rem;">Connexion</button>
          </div>
        </div>
        <div class="col-4"></div>
      </div>
    </div>
</template>

<script >
import {Field, defineRule, ErrorMessage, Form, configure} from 'vee-validate';
import { required, min } from '@vee-validate/rules';
import LoadingComponent from "@/components/util/LoadingComponent.vue";
import LoginApiService from "@/services/api/loginApiService.js";
import ErrorService from "@/services/errorService.js";
import {mapActions, mapGetters} from "vuex";
import AppBarComponent from "@/components/util/AppBarComponent.vue";


defineRule('required', required);
defineRule('min', min);

configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `Le champ ${ctx.label} est requis.`,
      min: `Le champ ${ctx.label} doit comporter au moins ${ctx.rule.params[0]} caractères.`,
    };
    return messages[ctx.rule.name] ? messages[ctx.rule.name] : `Le champ ${ctx.label} est invalide.`;
  },
  validateOnInput: true,
});
export default {
  name: 'Login',
  components: {AppBarComponent, LoadingComponent, Form, ErrorMessage, Field},
  props: {
  },
  data() {
    return {
      user:{
        identifier: '',
        password: '',
      },
      errorMessage: null,
    }
  },
  computed: {
    ...mapGetters(['isTestMode']),
    ...mapGetters("auth", ["isLoggedIn", "connectedUser" ]),
    canSubmit() {
      return this.user.identifier != null && this.user.identifier.length > 0
          && this.user.password != null && this.user.password.length > 5;
    },
  },
  methods: {
    ...mapActions('auth', ['login']),
    ...mapActions(['setLoading']),
    async onSubmit() {
      this.setLoading(true);
      let loginResponse = await this.login(this.user);
      this.setLoading(false);
      if(loginResponse.success===true){
          this.$router.push('/');
      }
      else{
        this.errorMessage = loginResponse.message;
      }

    },
  },
  mounted() {
  }

}
</script>

<style scoped>
.connexion{
  margin-top: 5%;
  background-color: #f8f7f7;
  padding-left: 5%;
  padding-right: 5%;
}

.btn-bouton{
  background-color: #b6057a;
  color: white;
  font-size: 20px;
  border: #f3f3f3;
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>