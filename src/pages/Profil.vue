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
            <label for="password">Changer de mot de passe : </label>
            <input type="password" id="password" v-model.trim="update_password"/>
            <button @click="this.pwd_confirm = true">Confirmer</button>
            <button @click="this.pwd = false, this.update_password = ''">Annuler</button>
            <p v-if="pwd_successful">Le mot de passe a bien été modifié !</p>

        </div>
    </form>
    <div class="boutons" v-if="user?.id">
        <button @click="updateUser()">Modifier les données</button>
        <button v-on:click="this.del=true">Supprimer Utilisateur</button>
    </div>

    <div class="delete" v-if="pwd_confirm || del">
        <div v-if="user && pwd_confirm" class="boutons">
            <p>Confirmer votre changement de mot de passe?</p>
            <button @click="updatePassword(user.id)">Confirmer</button>
            <button @click="this.pwd = false, this.pwd_confirm = false, this.update_password = ''">Annuler</button>
        </div>
        <div v-if="user && del" class="boutons">
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
        updatePassword(id){
            this.error = '';
            axios.patch(`${this.api}/${id}`, {password: this.update_password})
            .then((res)=>{
                res.data.password = '';
                localStorage.setItem('user', JSON.stringify(res.data));
                this.pwd_successful = true;
                this.update_password = '';
                this.pwd = false;
            })
            .catch(err => {
                this.error = `${err.response.status} : ${err.message}`;
            })
        },
        deleteUser(id){
            this.error = '';
            axios.delete(`${this.api}/${id}`)
            .then(()=>{
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

.delete {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000000cc;
    color: #eee;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 50;
}
.boutons {
    margin-top: 20px;
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
}

button:hover {
    background: var(--main-color-darkest);
}
</style>