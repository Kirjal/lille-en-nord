import { createRouter, createWebHistory } from "vue-router";
import Articles from "@/pages/Articles";
import Accueil from "@/pages/Accueil";
import Connexion from "@/pages/Connexion";
import Inscription from "@/pages/Inscription";
import Profil from "@/pages/Profil";
import Contact from "@/pages/Contact";
import Plan from "@/pages/Plan";
import Mentions from "@/pages/Mentions";
import Nouveau from "@/pages/Nouveau";


const router = createRouter({
    routes:[
        {path: '/articles', name: 'articles', component: Articles},
        {path: '/', name: 'accueil', component: Accueil},
        {path: '/connexion', name: 'connexion', component: Connexion},
        {path: '/inscription', name: 'inscription', component: Inscription},
        {path: '/profil', name: 'profil', component: Profil},
        {path: '/contact', name: 'contact', component: Contact},
        {path: '/plan', name: 'plan', component: Plan},
        {path: '/mentions', name: 'mentions', component: Mentions},
    ],
    history : createWebHistory()
});

export default router