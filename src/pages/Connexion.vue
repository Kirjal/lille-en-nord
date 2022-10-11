<template>

    <h2>Connexion à votre compte</h2>
    

    <form @submit.prevent="handleSubmit0()">
      <h3>Déjà utilisateur</h3>
        <div>
            <label for="login">Identifiant (adresse mail) : </label>
            <input id="login" v-model.trim="login0" @input="login0_dirty= true" />
            <small v-if="login0Error" class="error">Veuillez entrer un identifient valide</small>
        </div>
        <div>
            <label for="password">Mot de passe : </label>
            <input id="password"  v-model.trim="password0" @input="password0_dirty= true" />
            <small class="error" v-if="password0Error">Veuillez entrer un mot de passe valide</small>
        </div>
        <button :disabled="form0Error">Connexion</button>
    </form>


    <form @submit.prevent="handleSubmit()">
        <h3>Nouveaux utilisateurs</h3>
        <div>
            <label for="first_name">Nom : </label>
            <input id="first_name" v-model.trim="users.first_name" @input="first_name_dirty= true" />
            <small v-show="first_nameError" class="error">Votre Nom</small>
        </div>
        <div>
            <label for="last_name">Prénom : </label>
            <input id="last_name" v-model.trim="users.last_name" @input="last_name_dirty= true" />
            <small v-show="last_nameError" class="error">Votre Prénom</small>
        </div>
        <div>
            <label for="login">Identifiant (adresse mail) : </label>
            <input id="login" v-model.trim="users.login" @input="login_dirty= true" />
            <small v-show="loginError" class="error">Veuillez entrer un identifient valide</small>
        </div>
        <div>
            <label for="password">Mot de passe : </label>
            <input id="password" v-model.trim="users.password" @input="password_dirty= true" />
            <small class="error" v-show="passwordError">Veuillez entrer un mot de passe valide</small>
        </div>
        <button :disabled="formError">Inscription</button>
    </form>



</template>

<script>
import axios from 'axios';
    export default {
        name: 'ConnexionComponent',
        data: function () {
            return {
                user: { email: '', password: ''},
                users: { email: '', password: '', first_name: '', last_name: '' },
                login0: '',
                password0: '',
                login_dirty: false,
                password_dirty: false,
                first_name_dirty: false,
                last_name_dirty: false,
                login0_dirty: false,
                password0_dirty: false,
                api: 'http://localhost:3000/users',
                login_api: 'http://localhost:3000/login',
                error: ''
            }
        },
        methods: {
            handleSubmit() {
                this.error = '';
                axios.post(this.api, this.users)
                    .then(() => {
                        this.users = { email: '', password: '', first_name: '', last_name: '' };
                        this.first_name_dirty = false;
                        this.last_name_dirty = false;
                        this.login_dirty = false;
                        this.password_dirty = false;
                        
                    })
                    
                    .catch(err => {
                        this.users = { email: '', password: '', first_name: '', last_name: '' };
                        this.error = `${err.response.status} : ${err.message}`;
                    })
            }, 
            handleSubmit0() {
                this.error='';
                this.user = { email : this.login0, password : this.password0 };
                console.log(this.user);
                axios.post(this.login_api, this.user)
                .then(()=>{
                    this.user = { email: '', password: '' }
                    this.login0_dirty = false;
                    this.password0_dirty = false;
                })
                .catch(err => {
                    this.user = { email : this.login0, password : this.password0 };
                    this.error = `${err.response.status} : ${err.message}`;
                })
            },
        },
        computed: {
            login0Error: function() {
                return !this.login0 && this.login0_dirty;
            },
            password0Error: function () {
                return !this.password0 && this.password0_dirty;
            },
            first_nameError: function() {
                return !this.users.first_name && this.first_name_dirty;
            },
            last_nameError: function() {
                return !this.users.last_name && this.last_name_dirty;
            },
            loginError: function() {
                return !this.users.login && this.login_dirty;
            },
            passwordError: function() {
                return !this.users.password && this.password_dirty;
            },
            formError: function() {
                return this.first_nameError || !this.first_name_dirty || this.last_nameError || !this.last_name_dirty || this.loginError || !this.login_dirty|| this.passwordError || !this.password_dirty;
            },
            form0Error: function () {
                return this.login0Error || this.password0Error || !this.login0_dirty || !this.password0_dirty;
            }
        },

    }
    
</script>

<style scoped>
.error {
    color: red;
}
</style>