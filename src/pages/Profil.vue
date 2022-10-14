<template>
    <div v-if="user">
        <div>
            <h2>Bonjour {{user.first_name}} </h2>
            <img :src="user.photo" alt="photo_profil_par_defaut"/>
        </div>

        <div>
        <p v-if="!mod">Nom: {{user.first_name}}</p>
        <p v-if="!mod">Prénom: {{user.last_name}}</p>
        <p v-if="!mod">Mail: {{user.email}}</p>
        </div>

        
        <p>Changert de Mot de Pass 👇</p>

        <form @submit.prevent="handleSubmit()">
            <div>
                <label for="password">Nouveau mot de passe : </label>
                <input type="password" id="password" v-model.trim="users.password"  />    
                <button>Modifier Mot de Pass</button>
            </div>

            <div class="boutons" v-if="user?.id">
                <button v-on:click="this.del=true">Supprimer Utilisateur</button>
            </div>

        </form>
    </div>
    
</template>

<script>
import router from '@/router';
import axios from 'axios';
export default {
    name: 'ProfilComponent',

    data: function () {
        return {
            
            users: { },
            login: '',
            password: '',
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
        handleSubmit() {
            this.error = '';
            console.log(this.users);
            this.users= { first_name: this.users.first_name, last_name: this.users.last_name, email: this.users.email, password: this.users.password, photo: this.users.photo}
            axios.post(this.api, this.users)
                .then(() => {
                    this.users = { email: '', password: '', first_name: '', last_name: '' };
                    
                })

                .catch(err => {
                    this.users = { email: '', password: '', first_name: '', last_name: '' };
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