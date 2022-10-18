<template>
    <div class="article" v-if="article">

        <router-link :to="{name:'accueil'}">
            <i class="fa-solid fa-circle-arrow-left"></i>
        </router-link>

        <h2 v-on:dblclick="updateArticle($event)" v-if="!mod">{{article.title}}</h2>
        <div v-if="mod">
            <label for="title">Titre :</label>
            <input id="title" v-model="this.updateTitle"/>
        </div>

        <p>Publié par {{article.author}}</p>
        <div class="tags" v-if="article.tags.length > 0 && !mod" v-on:dblclick="updateArticle($event)">
            <p>Tags : </p>
            <small v-for="tag of article.tags" :key="tag">{{tag}}</small>
        </div>
        <div v-if="mod" id="tagsUpdate">
            <label for="tags">Tags :</label>
            <input id="tags" v-model="this.updateTags"/>
        </div>
        

        <div v-on:dblclick="updateArticle($event)" v-if="!mod">
            <img v-if="article.image" :src="article.image" :alt="`Image de l'article ${article.title}`"/>
            <img v-else src="./../assets/img/planLille.jpg" />
        </div>
        <label v-if="mod" for="image">Image :</label>
        <input type="text" id="image" v-if="mod" v-model="this.updateImg"/>


        <p v-if="!mod" v-on:dblclick="updateArticle($event)">{{article.content}}</p>
        <div v-if="mod" class="update">
            <label for="content">Contenu :</label>
            <textarea id="content" v-model="this.updateText"></textarea>
        </div>

        <div v-if="mod">
            <button type="submit" @click="confirmUpdate(article.id)">Confirmer</button>
            <button type="button" v-on:click="this.mod=false">Annuler</button>
        </div>

        <div v-if="user?.author">
            <button v-on:click="updateArticle()"><i class="fa-solid fa-pen-to-square"></i>Modifier l'article</button>
            <button v-on:click="this.del=true"><i class="fa-solid fa-trash-can"></i>Supprimer l'article</button>
        </div>

    </div>

    <div v-else-if="error">
        {{error}}
    </div>

    <template v-else>
        Chargement en cours...
    </template>

    <div v-if="del" class="delete">
        <p v-if="user?.author">Souhaitez-vous supprimer l'article "{{article.title}}" ?</p>
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
        updateTitle: '',
        updateTags: [],
        updateImg: '',
        updateText: ''
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
        checkTags(event){
            console.log(event.target.value);
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
            this.updateTitle = this.article.title;
            this.updateTags = this.article.tags.join(" ");
            this.updateImg = this.article.image;
            this.updateText = this.article.content;
            this.mod = true;
        },
        confirmUpdate(id) {
            this.error = '';
            axios.patch(`${this.api}/${id}`, { title: this.updateTitle, image: this.updateImg, content: this.updateText, tags: this.updateTags.split(" ")})
                .then(() => {
                    this.article.title = this.updateTitle;
                    this.article.tags = this.updateTags.split(" ");
                    this.article.image = this.updateImg;
                    this.article.content = this.updateText;
                    this.updateTitle = '';
                    this.updateTags = [];
                    this.updateImg = '';
                    this.updateText = '';
                    this.mod = false;
                })
                .catch(err => {
                    console.log(this.error);
                    console.log(err.response.status);
                })
        }
    },
    mounted() {
        this.getArticle();
    },
    emits:["connexion", "updatedUser", "deconnexion"]
}
</script>

<style scoped>
.article {
    width: 80%;
    min-width: 280px;
    backdrop-filter: blur(20px);
    box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
    border-radius: 10px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    max-width: 100vw;
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

button i {
    margin-right: 3px;
}

.fa-circle-arrow-left {
    position: absolute;
    font-size: 30px;
    top: 25px;
    left: -15px;
}
</style>