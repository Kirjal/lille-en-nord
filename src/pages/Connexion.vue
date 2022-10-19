<template>
    <div class="connexion">
        <form @submit.prevent="handleSubmit0()">
            <h2>Connexion</h2>
            <div>
                <label for="login0">Identifiant (adresse mail) : </label>
                <input id="login0" v-model.trim="login0" @input="login0_dirty= true" />
                <small v-if="login0Error" class="error">Veuillez entrer un identifiant valide</small>
            </div>
            <div>
                <label for="password0">Mot de passe : </label>
                <input type="password" id="password0" v-model.trim="password0" @input="password0_dirty= true" />
                <small class="error" v-if="password0Error">Veuillez entrer un mot de passe valide</small>
            </div>
            <button :disabled="form0Error">Connexion</button>
            <div class="error" v-if="login_error_text">Identifiant ou mot de passe invalide</div>
        </form>

        <form @submit.prevent="handleSubmit()">
            <h2>Inscription</h2>
            <div>
                <label for="first_name">Prénom : </label>
                <input id="first_name" v-model.trim="users.first_name" @input="first_name_dirty= true" />
                <small v-show="first_nameError" class="error">Veuillez entrer votre prénom</small>
            </div>
            <div>
                <label for="last_name">Nom : </label>
                <input id="last_name" v-model.trim="users.last_name" @input="last_name_dirty= true" />
                <small v-show="last_nameError" class="error">Veuillez entrer votre nom</small>
            </div>
            <div>
                <label for="login">Identifiant (adresse mail) : </label>
                <input id="login" v-model.trim="users.email" @input="login_dirty= true" />
                <small v-show="loginError" class="error">Veuillez entrer un identifiant valide</small>
            </div>
            <div>
                <label for="password">Mot de passe : </label>
                <input type="password" id="password" v-model.trim="users.password" @input="password_dirty= true" />
                <small class="error" v-show="passwordError">Veuillez entrer un mot de passe valide</small>
            </div>
            <div>
                <p>Auteur :</p>
                <div class="switch">
                    <input id="author" type="checkbox" class="switch-input" v-model="users.author" />
                    <label for="author" class="switch-label">Switch</label>
                </div>
            </div>
            <div v-if="signed_up">Inscription réussie, pensez à vous connecter !</div>
            <button :disabled="formError">Inscription</button>
        </form>

        
        
    </div>

</template>

<script>
import router from '@/router';
import axios from 'axios';
export default {
    name: 'ConnexionComponent',
    data: function () {
        return {
            user: { email: '', password: '' },
            users: { email: '', password: '', first_name: '', last_name: '', author: false },
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
            error: '',
            signed_up: false,
            login_error_text: false
        }
    },
    methods: {
        handleSubmit() {
            this.error = '';
            console.log(this.users);
            axios.post(this.api, this.users)
                .then(() => {
                    this.users = { email: '', password: '', first_name: '', last_name: '', author: false };
                    this.first_name_dirty = false;
                    this.last_name_dirty = false;
                    this.login_dirty = false;
                    this.password_dirty = false;
                    this.signed_up = true;
                })

                .catch(err => {
                    this.users = { email: '', password: '', first_name: '', last_name: '' };
                    this.error = `${err.response.status} : ${err.message}`;
                })
        },
        handleSubmit0() {
            this.error = '';
            this.user = { email: this.login0, password: this.password0 };
            fetch(this.login_api, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(this.user)
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('token', data.accessToken);
                    localStorage.setItem('user', JSON.stringify(data.user));//const chosemachin = JSON.parse(localStorage.getItem('user')) pour repasser en objet et le cibler fastoche
                    if(data.user){
                        data.user.password = '';
                        this.$emit('connexion', data.user);
                        router.push('/');
                    }
                    this.login_error_text = true;
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
    computed: {
        login0Error: function () {
            return !this.login0 && this.login0_dirty;
        },
        password0Error: function () {
            return !this.password0 && this.password0_dirty;
        },
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
        form0Error: function () {
            return this.login0Error || this.password0Error || !this.login0_dirty || !this.password0_dirty;
        }
    },
    emits: ["connexion", 'updatedUser']
}

</script>

<style scoped>
.connexion {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
}

form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    margin: 20px;
    backdrop-filter: blur(20px);
    box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
    padding: 20px 20px 70px;
    border-radius: 10px;
    overflow: hidden;
}

button {
    height: 30px;
    border: 0;
    border-radius: 0.25rem;
    background: var(--main-color);
    color: white;
    font-family: 'Helvetica Neue';
    white-space: nowrap;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    width: 80%;
    cursor: pointer;
    transition: all .2s ease-in-out;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    text-transform: uppercase;
}

button:hover {
    background: var(--main-color-darkest);
}

.switch {
    position: relative;
    display: inline-block;
    width: fit-content;
}

.switch-input {
    display: none;
}

.switch-label {
    display: block;
    width: 48px;
    height: 24px;
    text-indent: -150%;
    clip: rect(0 0 0 0);
    color: transparent;
    user-select: none;
}

.switch-label::before,
.switch-label::after {
    content: "";
    display: block;
    position: absolute;
    cursor: pointer;
}

.switch-label::before {
    width: 100%;
    height: 100%;
    background-color: #dedede;
    border-radius: 9999em;
    -webkit-transition: background-color 0.25s ease;
    transition: background-color 0.25s ease;
}

.switch-label::after {
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.45);
    -webkit-transition: left 0.25s ease;
    transition: left 0.25s ease;
}

.switch-input:checked+.switch-label::before {
    background-color: var(--main-color);
}

.switch-input:checked+.switch-label::after {
    left: 24px;
}

.error {
    color: red;
}
</style>