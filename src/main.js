import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store/store.js';
//import vuetify from 'vuetify';
import vuetify from "../plugins/vuetify.js";
import 'vuetify/styles';

import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';

/* import the fontawesome core */

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

import {faHouse, faRightFromBracket, faSignOutAlt, faHomeAlt, faSquarePlus, faTrashCan, faUserGear, faUser, faUsers, faCheck, faFileExcel} from '@fortawesome/free-solid-svg-icons'



/* add icons to the library */
library.add(faRightFromBracket)
library.add(faSignOutAlt)
library.add(faHouse)
library.add(faHomeAlt)
library.add(faSquarePlus)
library.add(faTrashCan)
library.add(faUserGear)
library.add(faUser)
library.add(faUsers)
library.add(faCheck)
library.add(faFileExcel)





const app = createApp(App);
app.use(router);
app.use(store);
app.use(vuetify)
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
