<template>
  <i class="fas fa-bars" v-on:click="ouvreMenu()"></i>
  <nav>
    <i class="fas fa-times" v-on:click="fermeMenu()"></i>
    <div class="user" v-if="user">
      <p>Bonjour, {{user.first_name}}.</p>
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
    </ul>
    <div v-if="user">
      <button @click="signOut()"><i class="fa-solid fa-right-from-bracket"></i>Déconnexion</button>
    </div>
  </nav>
  <div id="nav_overlay" @click="fermeMenu()"></div>
</template>

<script>
import router from '@/router';

export default {
  name: 'NavigationComponent',
  methods: {
    ouvreMenu() {
      document.querySelector('nav').classList.add("menupresent");
      document.querySelector('#nav_overlay').classList.add("menupresent");
    },
    fermeMenu() {
      document.querySelector('nav').classList.remove("menupresent");
      document.querySelector('#nav_overlay').classList.remove("menupresent");
    },
    signOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log(this.user);
      this.$emit('deconnexion');
      this.fermeMenu();
      router.push('/');
    }
  },
  props: {
    user: {
      type: Object,
      default: () => (undefined)
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
  z-index: 3;
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
  z-index: 3;
}

nav {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  position: fixed;
  z-index: 3;
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

#nav_overlay{
  z-index:2;
  height:100vh;
  width:100vw;
  position:fixed;
  top:0;
  right:-100vw;
}

.menupresent, #nav_overlay.menupresent {
  right: 0;
}

button {
  margin-left: 30px;
  margin-top: 10px;
  height: 30px;
  border: 0;
  border-radius: 0.25rem;
  background: white;
  color: var(--main-color);
  white-space: nowrap;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: all .2s ease-in-out;
  font-family: 'Helvetica Neue';
  font-weight: bold;
  font-size: 20px;
}

button:hover {
  background: var(--main-color-darkest);
  color: white;
}

button i {
  margin-right: 3px;
}

.user {
  font-family: 'Helvetica Neue';
  font-style: italic;
  position: absolute;
  top: 20px;
  left: 30px;
  color: white;
}

@media screen and (max-width:768px) {

  .fa-bars {
    top: unset;
    bottom: 20px;
    background-color: white;
    padding: 10px;
    border-radius: 25px;
    box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
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
    transform: rotate(180deg);
  }

  nav ul>li {
    transform: rotate(-180deg);
  }

  .fa-times {
    top: unset;
    bottom: 20px;
  }

  button {
    margin-top: unset;
    margin-bottom: 10px;
  }

  .user {
    top: unset;
    bottom: 20px;
  }

}
</style>