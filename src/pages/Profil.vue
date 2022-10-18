<template>

    <div class="profil">
        <div v-if="user">
            <h2>Bonjour {{user.first_name}} </h2>
            <div class="rights" v-if="user.author">
                <i class="fa-solid fa-user-pen"></i>
                <p>Vous êtes auteur ! 😁</p>
            </div>
            <div class="rights" v-else>
                <i class="fa-solid fa-user"></i>
                <p>Vous n'êtes pas auteur ! 😔</p>
            </div>
        </div>

        <div v-if="!mod" class="user">
            <p v-on:dblclick="updateUser()"><b>Nom :</b> {{user?.first_name}}</p>
            <p v-on:dblclick="updateUser()"><b>Prénom :</b> {{user?.last_name}}</p>
            <p v-on:dblclick="updateUser()"><b>Identifiant (adresse e-mail)  :</b> {{user?.email}}</p>
        </div>

        <div v-if="mod" class="update">
            <form @submit.prevent="confirmUpdate(user?.id)">
                <label for="first_name">Prénom :</label>
                <input id="first_name" v-model="this.update_first_name" />
                <label for="last_name">Nom :</label>
                <input id="last_name" v-model="this.update_last_name" />
                <label for="email">Identifiant (adresse e-mail) :</label>
                <input id="email" v-model="this.update_email" />
                <button type="submit">Confirmer les modifications</button>
                <button type="button" v-on:click="cancelUpdate()">Annuler les modifications</button>
            </form>
        </div>

        <form class="update" @submit.prevent v-if="pwd">
            <div>
                <label for="password">Changer de mot de passe : </label>
                <input type="password" id="password" v-model.trim="update_password" />
                <button @click="this.pwd_confirm = true">Confirmer</button>
                <button @click="this.pwd = false, this.update_password = ''">Annuler</button>
            </div>
        </form>

        <div class="boutons" v-if="user?.id">
            <button v-if="!mod" @click="updateUser()"><i class="fa-solid fa-pen-to-square"></i>Modifier les données</button>
            <button v-if="!pwd" @click="this.pwd=true"><i class="fa-solid fa-key"></i>Changer de mot de passe</button>
            <button v-on:click="this.del=true"><i class="fa-solid fa-trash-can"></i>Supprimer Utilisateur</button>
            <button @click="signOut()"><i class="fa-solid fa-right-from-bracket"></i>Déconnexion</button>
        </div>
        <p class ="success" v-if="pwd_successful">Le mot de passe a bien été modifié !</p>
    </div>

    <div class="delete" v-if="pwd_confirm || del">
        <div v-if="user && pwd_confirm">
            <p>Confirmer votre changement de mot de passe?</p>
            <button @click="updatePassword(user.id)">Confirmer</button>
            <button @click="this.pwd = false, this.pwd_confirm = false, this.update_password = ''">Annuler</button>
        </div>
        <div v-if="user && del">
            <p>Souhaitez-vous supprimer cet utilisateur?</p>
            <button @click="deleteUser(user.id)">Supprimer l'utilisateur</button>
            <button @click="this.del = false">Annuler</button>
        </div>
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
            pwd: false,
            pwd_successful: false,
            pwd_confirm: false,
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
        signOut() {
      this.$emit('deconnexion');
      router.push('/');
    },
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
            axios.patch(`${this.api}/${id}`, { first_name: this.update_first_name, last_name: this.update_last_name, email: this.update_email })
                .then((res) => {
                    res.data.password = '';
                    localStorage.setItem('user', JSON.stringify(res.data));
                    this.update_first_name = '';
                    this.update_last_name = '';
                    this.update_email = '';
                    this.mod = false;
                    this.$emit('updatedUser', res.data);
                })
                .catch(err => {
                    this.error = `${err.response.status} : ${err.message}`;
                })
        },
        updatePassword(id) {
            this.error = '';
            axios.patch(`${this.api}/${id}`, { password: this.update_password })
                .then((res) => {
                    res.data.password = '';
                    localStorage.setItem('user', JSON.stringify(res.data));
                    this.pwd_successful = true;
                    this.update_password = '';
                    this.pwd = false;
                    this.pwd_confirm = false;
                })
                .catch(err => {
                    this.error = `${err.response.status} : ${err.message}`;
                })
        },
        deleteUser(id) {
            this.error = '';
            axios.delete(`${this.api}/${id}`)
                .then(() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    this.$emit('deconnexion')
                    router.push('/');
                })
        }
    },
    computed: {


        passwordError: function () {
            return !this.users.password && this.password_dirty;
        },
        formError: function () {
            return this.passwordError || !this.password_dirty;
        },

    },
    emits: ["connexion", "updatedUser", "deconnexion"],
    mounted() {
        if (!this.user) {
            router.push('/');
        }
    }
}

</script>

<style scoped>
.profil {
    width: 80%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(20px);
    box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
    padding: 20px;
    border-radius: 10px;
}

.error {
    color: red;
}

.success {
    color: green;
}

.rights {
    margin: 30px 0 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.rights p {
    margin-top: 10px;
    font-size: 20px;
    font-style: italic;
}

.rights i {
    font-size: 30px;
    color: var(--main-color);
}

label {
    font-weight: bold;
}

.user {
    margin: 15px;
}

.update {
    margin: 15px;
}

.delete {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000000cc;
    color: #eee;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 50;
}

.boutons {
    width: 100%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 15px 0 15px;
}

.boutons i {
    color: white;
    margin-right: 3px;
}

button {
    height: 30px;
    border: 0;
    border-radius: 0.25rem;
    background: var(--main-color);
    color: white;
    white-space: nowrap;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem;
    cursor: pointer;
    transition: all .2s ease-in-out;
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: bold;
    font-size: 15px;
    min-width: max-content;
}

button:hover {
    background: var(--main-color-darkest);
}
</style>