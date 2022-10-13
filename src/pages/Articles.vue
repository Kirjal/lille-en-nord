<template>
    <div class="article" v-if="article">
        <router-link :to="{name:'accueil'}">
            <i class="fa-solid fa-circle-arrow-left"></i>
        </router-link>
        <h2>{{article.title}}</h2><i>Publié par {{article.author}}</i>
        <small>{{article.tags}}</small>
        <img v-if="article.image" :src="article.image" :alt="`Image de l'article ${article.title}`" />
        <img v-else src="./../assets/img/planLille.jpg" />
        <p v-if="!mod" v-on:dblclick="updateArticle($event)">{{article.content}}</p>
        <div v-if="mod" class="update">
            <form @submit.prevent="confirmUpdate(article.id)">
                <textarea v-model="this.updateField"></textarea>
                <button type="submit">Confirmer les modifications</button>
                <button type="button" v-on:click="this.mod=false">Annuler les modifications</button>
            </form>
        </div>
        <div class="boutons" v-if="user?.author">
            <button v-on:click="updateArticle()">Modifier l'article</button>
            <button v-on:click="this.del=true">Supprimer l'article</button>
        </div>
    </div>
    <div v-else-if="error">
        {{error}}
    </div>
    <template v-else>
        Chargement en cours...
    </template>
    <div v-if="del" class="delete">
        <p v-if="user?.author">Souhaitez-vous supprimer l'article {{article.title}}?</p>
        <div class="boutons" v-if="user?.author">
            <button v-on:click="confirmDelete(article.id)">Confirmer la suppression</button>
            <button v-on:click="this.del=false">Annuler la suppression</button>
        </div>
        <div class="boutons" v-else>
            <p>Vous n'avez pas les droits de suppression sur cet article.</p>
            <button v-on:click="this.del=false">Retour</button>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
export default {
    name: 'ArticlesComponent',
    data: () => ({
        article: undefined,
        api: 'http://localhost:3000/articles',
        error: '',
        del: false,
        mod: false,
        updateField: ''
    }),
    props:{
        id: Number,
        user: {
            type: Object,
            default:()=>(undefined)
        }
    },
    methods: {
        getArticle() {
            this.error = '';
            axios.get(`${this.api}/${this.id}`)
                .then(({ data }) => this.article = data)
                .catch(err => {
                    this.article = undefined;
                    this.error = `${err.response.status} : ${err.message}`;
                })
        },
        confirmDelete(id) {
            this.error = '';
            console.log(`${this.api}/${id}`)
            axios.delete(`${this.api}/${id}`)
                .then(() => router.push('/'))
                .catch(err => {
                    this.error = `${err.response.status} : ${err.message}`;
                });
            this.del = false;
        },
        updateArticle(e) {
            if(!this.user?.author){
                return e.preventDefault()
            }
            this.updateField = this.article.content;
            this.mod = true;
        },
        confirmUpdate(id) {
            this.error = '';
            axios.patch(`${this.api}/${id}`, { content: this.updateField })
                .then(() => {
                    this.article.content = this.updateField;
                    this.updateField = '';
                    this.mod = false;
                })
                .catch(err => {
                    this.error = `${err.response.status} : ${err.message}`;
                })
        }
    },
    mounted() {
        this.getArticle();
    }
}
</script>

<style scoped>
.article {
    width: 80%;
    backdrop-filter: blur(20px);
    box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
    border-radius: 10px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.6);
}

.article img {
    display: block;
    margin: 20px auto;
    max-width: 100%;
}

.article small {
    background-color: rgba(51, 51, 51, 0.2);
    border-radius: 10px;
    padding: 5px;
    margin-left: 5px;
}

h2 {
    margin-left: 5px;
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
    font-family: -system-ui, sans-serif;
    white-space: nowrap;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem;
    cursor: pointer;
    transition: all .2s ease-in-out;
}

button:hover {
    background: var(--main-color-darkest);
}

textarea {
    width: 100%;
    height: 300px;
    resize: none;
}

.fa-circle-arrow-left {
    position: absolute;
    font-size: 30px;
    top: 25px;
    left: -15px;
}
</style>