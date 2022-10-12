import { createRouter, createWebHistory } from "vue-router";
import Articles from "@/pages/Articles";
import Accueil from "@/pages/Accueil";
import Connexion from "@/pages/Connexion";
import Profil from "@/pages/Profil";
import Contact from "@/pages/Contact";
import Plan from "@/pages/Plan";
import Mentions from "@/pages/Mentions";
import Nouveau from "@/pages/Nouveau";
import NotFound from "@/pages/NotFound";

const router = createRouter({
  routes: [
    {
      path: "/article/:id",
      name: "article",
      component: Articles,
      props: (route) => ({ id: +route.params.id }),
    },
    { path: "/", name: "accueil", component: Accueil },
    { path: "/accueil", name: "home", component: Accueil },
    { path: "/connexion", name: "connexion", component: Connexion },
    { path: "/profil", name: "profil", component: Profil },
    { path: "/contact", name: "contact", component: Contact },
    { path: "/plan", name: "plan", component: Plan },
    { path: "/mentions", name: "mentions", component: Mentions },
    { path: "/nouveau", name: "nouveau", component: Nouveau },
    { path: "/:catchAll(.*)", name: "404", component: NotFound },
        
  ],
  strict:true,
  history: createWebHistory(),
});

export default router