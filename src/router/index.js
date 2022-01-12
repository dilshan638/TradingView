import { createRouter, createWebHistory } from "vue-router";
import Trade from '../views/Trade.vue';
import Home from '../views/Home.vue';

localStorage.setItem('permissionSuccess','permissionSuccess' )

const routes=[
    {
        path:'/',
        component:Trade
    }, 
    
    {
        path:'/home',
        component:Home,
       // beforeEnter : guardmyrouter
    },    
        
];

const router = createRouter({
    mode:'history',
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    history: createWebHistory(),
    routes
});


export default router;