<template>
    <i class="fas fa-bars" v-on:click="ouvreMenu()"></i>
    <nav>
        <i class="fas fa-times" v-on:click="fermeMenu()"></i>
        <div v-if="user">
            <p>Hello {{user.first_name}}</p>
        </div>
        <ul>
            <li>
                <router-link v-on:click="fermeMenu()" :to="{name:'accueil'}">Accueil</router-link>
            </li>
            <li>
                <router-link v-on:click="fermeMenu()" :to="{name:'connexion'}" v-if="!user">Connexion</router-link>
            </li>
            <li>
                <router-link v-on:click="fermeMenu()" :to="{name:'profil'}" v-if="user">Profil</router-link>
            </li>
            <li>
                <router-link v-on:click="fermeMenu()" :to="{name:'nouveau'}" v-if="user?.author">Nouveau</router-link>
            </li>
            <li>
                <router-link v-on:click="fermeMenu()" :to="{name:'contact'}">Contact</router-link>
            </li>
            <li>
                <router-link v-on:click="fermeMenu()" :to="{name:'mentions'}">Mentions Légales</router-link>
            </li>
            <li>
                <router-link v-on:click="fermeMenu()" :to="{name:'plan'}">Plan du site</router-link>
            </li>
        </ul>
        <div v-if="user">
            <button @click="signOut()">Déconnexion</button>
        </div>
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
            signOut(){
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                console.log(this.user);
                this.$emit('deconnexion');
            }
        },
        props:{
            user: {
                type: Object,
                default:()=>(undefined)
            }
        },
        emits: ["deconnexion"]
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
  z-index: 1;
}

nav {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  right: -250px;
  transition: 250ms all;
  background-color: var(--main-color);
}

nav ul {
  flex-direction: column;
  margin-top: 50px;
  list-style: none;
}

nav ul li {
  width: 100%;
  text-align: left;
  padding-left: 30px;
  font-family: 'Helvetica Neue';
  font-weight: bold;
  font-size: 20px;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}

.menupresent {
  right: 0;
}

@media screen and (max-width:768px) {
  
  .fa-bars {
    top: unset;
    bottom: 20px;
  }

  .fa-times {
    top: unset;
    bottom: 20px;
  }

  nav {
    flex-direction: column-reverse;
  }

  nav ul {
    margin-top: unset;
    margin-bottom: 50px;
  }

  .fa-times {
    top: unset;
    bottom: 20px;
  }

}

</style>