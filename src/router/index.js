import { createRouter, createWebHistory } from "vue-router";
import Articles from "@/pages/Articles";



const router = createRouter({
    routes:[
        {path: '/articles', name: 'articles', component: Articles}
    ],
    history : createWebHistory()
});

export default router