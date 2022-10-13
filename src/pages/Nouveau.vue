<template>
    <div class="formulaire" v-if="user?.author">
        <h2> Créer votre article</h2>
        <router-link :to="{name:'accueil'}">
            <i class="fa-solid fa-circle-arrow-left"></i>
        </router-link>
        <form @submit.prevent="handleSubmit()">
            <div>
                <label for="title">Titre :</label>
                <input id="title" v-model.trim="article.title" @input="title_dirty= true" />
                <small v-show="titleError" class="error">Veuillez entrer un titre à votre article</small>
            </div>
            <div>
                <label for="author">Auteur(trice) :</label>
                <input id="author" v-model.trim="article.author" @input="author_dirty= true" />
                <small class="error" v-show="authorError">Veuillez entrer un auteur à votre article</small>
            </div>
            <div>
                <label for="image">Image :</label>
                <input id="image" v-model="article.image" />
            </div>
            <div>
                <label for="content">Contenu :</label>
                <textarea id="content" v-model="article.content" @input="content_dirty= true"></textarea>
                <small class="error" v-show="contentError">Veuillez entrer un commentaire pour votre article</small>
            </div>
            <button :disabled="formError">Enregistrer</button>
        </form>
    </div>
    <div v-else>
        <p>No author rights?</p>
    </div>

</template>

<script>
import router from '@/router';
import axios from 'axios';
export default {

    name: "NouveauComponent",
    data: function () {
        return {
            article: { title: '', author: '', image: '', content: '' },
            title_dirty: false,
            author_dirty: false,
            image_dirty: false,
            content_dirty: false,
            api: 'http://localhost:3000/articles',
            error: ''
        }
    },
    props:{
        user: {
            type: Object,
            default:()=>(undefined)
        }
    },

    methods: {
        handleSubmit() {

            console.log(`name article : "${this.article.title}" , auteur(trice) : "${this.article.author} ", 
            image : "${this.article.image}", content : "${this.article.content}"`);
            this.error = '';
            axios.post(`${this.api}`, this.article)
                .then(() => router.push('/'))
                .catch(err => {
                    this.article = { title: '', author: '', image: '', content: '' };
                    this.error = `${err.response.status} : ${err.message}`
                })
        }
    },

    computed: {
        titleError: function () {
            return !this.article.title && this.title_dirty;
        },
        authorError: function () {
            return !this.article.author && this.author_dirty;
        },
        contentError: function () {
            return !this.article.content && this.content_dirty;
        },
        formError: function () {
            return !this.title_dirty || !this.author_dirty || !this.content_dirty || this.titleError || this.authorError || this.contentError;
        },
    }

}
</script>

<style scoped>
.error {
    color: red;
}

.formulaire {
    width: 100%;
    backdrop-filter: blur(20px);
    box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
    padding: 20px;
    border-radius: 10px;
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
    margin: 20px 0 0 0;
    width: 100%;
    cursor: pointer;
    transition: all .2s ease-in-out;
}

button:hover {
    background: var(--main-color-darkest);
}

.fa-circle-arrow-left {
    position: absolute;
    font-size: 30px;
    top: 25px;
    left: -15px;
}

h2 {
    margin-left: 5px;
}
</style>