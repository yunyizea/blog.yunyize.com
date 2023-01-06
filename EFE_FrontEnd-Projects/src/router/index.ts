import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const Home = () => import("../template/App.vue")

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        component: Home
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router