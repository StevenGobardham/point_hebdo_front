import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store/store.js';

import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';
/* import the fontawesome core */

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

import {faHouse, faRightFromBracket, faSignOutAlt, faHomeAlt, faSquarePlus} from '@fortawesome/free-solid-svg-icons'


/* add icons to the library */
library.add(faRightFromBracket)
library.add(faSignOutAlt)
library.add(faHouse)
library.add(faHomeAlt)
library.add(faSquarePlus)




const app = createApp(App);
app.use(router);
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
