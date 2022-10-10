<template>
    <i class="fas fa-bars" v-on:click="ouvreMenu()"></i>
    <nav>
        <i class="fas fa-times" v-on:click="fermeMenu()"></i>
        <ul>
            <li>
                <router-link v-on:click="fermeMenu()" :to="{name:'accueil'}">Accueil</router-link>
            </li>
            <li>
                <router-link v-on:click="fermeMenu()" :to="{name:'connexion'}">Connexion</router-link>
            </li>
            <li>
                <router-link v-on:click="fermeMenu()" :to="{name:'inscription'}">Inscription</router-link>
            </li>
            <li>
                <router-link v-on:click="fermeMenu()" :to="{name:'profil'}">Profil</router-link>
            </li>
            <li>
                <router-link v-on:click="fermeMenu()" :to="{name:'nouveau'}">Nouveau</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default{
        name:'NavigationComponent',
        methods: {
            ouvreMenu(){
                document.querySelector('nav').classList.add("menupresent");
            },
            fermeMenu(){
                document.querySelector('nav').classList.remove("menupresent");
            },
            connexion() {
                
            }
        }
    }

</script>

<style scoped>

.fa-times {
  display: block;
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 3rem;
  z-index: 1;
  color: white;
  cursor: pointer;
}

.fa-bars {
  display: block;
  position: fixed;
  top: 30px;
  right: 30px;
  font-size: 3rem;
  cursor: pointer;
}

nav {
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: -250px;
  transition: 250ms all;
  background-color: var(--main-color);
}

nav ul {
  flex-direction: column;
  margin-top: 50px;
}

nav ul li {
  width: 100%;
  text-align: left;
  padding-left: 30px;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

.menupresent {
  left: 0;
}

</style>