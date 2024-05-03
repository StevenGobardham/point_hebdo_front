<template>

  <header>
    <div class="container-fluid header">
      <div class="row">
        <div class="col-2">
          <img @click="home()" class="d-flex justify-content-start logo" src="../../../public/adg.png" alt="ADG Software Engineering" >
        </div>
        <div class="col-8 text-center">

          <h1 class="title" @click="home()">Point hebdo</h1>
        </div>
        <div class="col-2 " v-if="isLoggedIn">
          <div class="fa-pull-right">
          <span class="btn" @click="dashboard()"><font-awesome-icon icon="fa-solid fa-user-gear" /></span>
          <span v-if="isLoggedIn" @click="home()" class="btn"><font-awesome-icon icon="fa-solid fa-house" /></span>
          <span class="btn" @click="logout"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></span>
          </div>
        </div>
      </div>
    </div>
  </header>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
export default {
  name: 'AppBarComponent',
  components: {FontAwesomeIcon},
  methods: {
    ...mapActions('auth', ['logout']),
    home() {
      this.$router.push({"name": 'PointHebdoList'});
    },
    dashboard(){
      this.$router.push({"name": 'Dashboard'});
    }
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn", "connectedUser" ]),
  },
}
</script>

<style scoped>
.logo{
  width: 300px;
  margin-top: 1%;
}

.header{
  background-color: #f8f7f7;
}

.title{
  font-size: 4em;
  color: #b6057a;
}

</style>