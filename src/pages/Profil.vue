<template>
    <div  v-if="user">
        <h2>Bonjour {{user.first_name}} </h2>
        <img :src="user.photo" alt="photo_profil_par_defaut"/>
    </div>
    
    <form @submit.prevent="handleSubmit()">
        <h2>Info Profil</h2>
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
            <input id="login" v-model.trim="users.email" @input="login_dirty= true" />
            <small v-show="loginError" class="error">Veuillez entrer un identifient valide</small>
        </div>
        <div>
            <label for="password">Mot de passe : </label>
            <input id="password" v-model.trim="users.password" @input="password_dirty= true" />
            <small class="error" v-show="passwordError">Veuillez entrer un mot de passe valide</small>
        </div>
        <div>
            <label for="photo">photo de profil : </label>
            <input id="photo" v-model.trim="users.photo" @input="photo_dirty= true" />
            <small class="error" v-show="photoError">Veuillez entrer une photo</small>
        </div>
        <button :disabled="formError">Modifier le profil</button>
        <button :disabled="formError">Supprimer le profil</button>
    </form>
    
</template>

<script>
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
    },
    computed: {
        
        
        first_nameError: function () {
            return !this.users.first_name && this.first_name_dirty;
        },
        last_nameError: function () {
            return !this.users.last_name && this.last_name_dirty;
        },
        loginError: function () {
            return !this.users.email && this.login_dirty;
        },
        passwordError: function () {
            return !this.users.password && this.password_dirty;
        },
        formError: function () {
            return this.first_nameError || !this.first_name_dirty || this.last_nameError || !this.last_name_dirty || this.loginError || !this.login_dirty || this.passwordError || !this.password_dirty;
        },
        
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