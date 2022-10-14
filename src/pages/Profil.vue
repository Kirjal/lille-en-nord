<template>

    <div  v-if="user">
        <h2>Bonjour {{user.first_name}} </h2>
        <img :src="user.photo" alt="photo_profil_par_defaut"/>
    </div>

    <div>
      <p v-if="!mod" v-on:dblclick="updateUser()">Nom: {{user.first_name}}</p>
      <p v-if="!mod" v-on:dblclick="updateUser()">Prénom: {{user.last_name}}</p>
      <p v-if="!mod" v-on:dblclick="updateUser()">Mail: {{user.email}}</p>
   </div>

   <div v-if="mod" class="update">
        <form @submit.prevent="confirmUpdate(user.id)">
            <label for="first_name">Prénom :</label>
            <input id="first_name" v-model="this.update_first_name"/>
            <label for="last_name">Nom :</label>
            <input id="last_name" v-model="this.update_last_name" />
            <label for="email">Identifiant (adresse mail) :</label>
            <input id="email" v-model="this.update_email" />


            <button type="submit">Confirmer les modifications</button>
            <button type="button" v-on:click="cancelUpdate()">Annuler les modifications</button>
        </form>
    </div>
    

    
    

        
    <p>Changer de Mot de Passe 👇</p>
    <form @submit.prevent="handleSubmit()">
        <div>
            <label for="password">Nouveau mot de passe : </label>
            <input type="password" id="password" v-model.trim="users.password"  />    
            <button>Modifier Mot de Pass</button>
        </div>
    </form>
    <div class="boutons" v-if="user?.id">
        <button v-on:click="this.del=true">Supprimer Utilisateur</button>
    </div>
    
</template>

<script>
import router from '@/router';
import axios from 'axios';
export default {
    name: 'ProfilComponent',

    data: function () {
        return {

            update_first_name: '',
            update_last_name: '',
            update_email: '',
            update_password: '',
            login_dirty: false,
            password_dirty: false,
            first_name_dirty: false,
            last_name_dirty: false,
            mod: false,
            del: false,
            api: 'http://localhost:3000/users',
            error: ''
        }
    },

    props: {
        user: {
            type: Object,
            default: () => (undefined)
        }
    },

    methods: {
        cancelUpdate() {
            this.user_copy = JSON.parse(localStorage.getItem('user'));
            this.mod = false;
        },

        updateUser() {
            this.update_first_name = this.user.first_name;
            this.update_last_name = this.user.last_name;
            this.update_email = this.user.email;
            this.mod = true;
        },

        confirmUpdate(id) {
            this.error = '';
            axios.patch(`${this.api}/${id}`, {first_name: this.update_first_name, last_name: this.update_last_name, email: this.update_email})
                .then((res) => {
                    res.data.password = ''
                    localStorage.setItem('user', res.data);
                    console.log(res.data)
                    console.log(this.user);
                    this.update_first_name = '';
                    this.update_last_name = '';
                    this.update_email = '';
                    this.mod = false;
                })
                .catch(err => {
                    this.error = `${err.response.status} : ${err.message}`;
                })
        },
    },
    computed: {
        
        
        passwordError: function () {
            return !this.users.password && this.password_dirty;
        },
        formError: function () {
            return this.passwordError || !this.password_dirty;
        },
        
    },
    emits: ['connexion'],
    mounted(){
        if(!this.user){
            router.push('/');
        }
    }
}

</script>

<style scoped>
.error {
    color: red;
}

img {
    width: 100px;
    height: 100px;

}
</style>