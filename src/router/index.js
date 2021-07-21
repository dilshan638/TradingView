import { createRouter, createWebHashHistory } from "vue-router";

import SignUp from '../views/SignUp.vue';
import SignIn from '../views/Signin.vue';
import Check from '../views/Check.vue';

const routes=[
    {
        path:'/signup',
        component:SignUp
    },
    {
        path:'/signin',
        component:SignIn
    },
    {
        path:'/check',
        component:Check
    }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;