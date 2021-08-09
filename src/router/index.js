import { createRouter, createWebHashHistory } from "vue-router";

import SignUp from '../views/SignUp.vue';
import SignIn from '../views/Signin.vue';
import Check from '../views/Check.vue';
import Dashboard from '../views/Dashboard';
import Security from '../components/Security/Security.vue';

//Import store
//import store from "../store";

const routes=[
    {
        path:'/',
        component:SignIn
    },
    {
        path:'/signup',
        component:SignUp
    },
    {
        path:'/signin',
        component:SignIn,
        props: (route) => ({ name: route.query.name })
    },
    {
        path:'/check',
        component:Check
    },
    {
        path:'/dashboard',
        component:Dashboard
    },
    {
        path:'/security',
        component:Security
    }
   
];

const router = createRouter({
 // mode:'history',
  history: createWebHashHistory(),
  routes
});

export default router;