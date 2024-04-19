import { createRouter, createWebHistory } from 'vue-router';
import Login from "@/views/Login.vue";
import store from '@/store/store.js';
import PointHebdo from "@/views/PointHebdo.vue";
import PointHebdoList from "@/views/PointHebdoList.vue";

const routes = [
    { path: '/', component: PointHebdoList, name: 'PointHebdoList',meta: { requiresAuth: true }},
    { path: '/login', component: Login, name: 'Login'},
    { path: '/detail', component: PointHebdo, name: 'CreatePointHebdo', meta: { requiresAuth: true }},
    { path: '/detail/:id', component: PointHebdo, name: 'PointHebdo',
        props:true, meta: { requiresAuth: true },key: (to) => String(to.params.id) },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters['auth/isLoggedIn'];
    if (to.meta.requiresAuth && !isLoggedIn) {
        // Redirige l'utilisateur vers la page de connexion si non connecté
        next({ name: 'Login' });
    } else {
        next();
    }
});
export default router;