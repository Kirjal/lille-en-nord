<template>
    <h2> Créer votre article</h2>
    <form @submit.prevent="handleSubmit()">

        <div>
            <label for="title">Titre</label>
            <input id="title" v-model.trim="article.title" @input="title_dirty= true" />
            <small v-show="titleError" class="error">Veuillez entrer un titre à votre article</small>
        </div>
        <div>
            <label for="author">Auteur(trice)</label>
            <input id="author" v-model.trim="article.author" @input="author_dirty= true" />
            <small class="error" v-show="authorError">Veuillez entrer un auteur à votre article</small>
        </div>
        <div>
            <label for="image">Image</label>
            <input id="image" v-model="article.image" @input="image_dirty= true" />
            <small class="error" v-show="imageError">Veuillez entrer au moins une image</small>
        </div>
        <div>
            <label for="content">Contenu</label>
            <textarea id="content" v-model="article.content" @input="content_dirty= true"></textarea>
            <small class="error" v-show="contentError">Veuillez entrer un commentaire pour votre article</small>
        </div>
        <p>
            <button :disabled="formError">Enregistrer</button>
        </p>
    </form>


</template>

<script>
import axios from 'axios';
export default {

    name: "NouveauComponent",
    data: function () {
        return {
            article: { title: '', author: '', image:'', content:''},
            title_dirty: false,
            author_dirty: false,
            image_dirty: false,
            content_dirty:false,
            api: 'http://localhost:3000/articles',
            error:''
        }
    },

    methods: {
        handleSubmit() {

            console.log(`name article : "${this.article.title}" , auteur(trice) : "${this.article.author} ", 
            image : "${this.article.image}", content : "${this.article.content}"`);
            this.error = '';
            axios.post(`${this.api}`, this.article)
            .then(console.log(this.article))
            .catch(err => {
                this.article = { title: '', author: '', image:'', content:''};
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
        imageError: function () {
            return !this.article.image && this.image_dirty;  
        },
        contentError: function () {
            return !this.article.content && this.content_dirty; 
         },
        formError: function () {
            return !this.title_dirty || !this.author_dirty || !this.image_dirty || !this.content_dirty ||this.titleError || this.authorError || this.imageError || this.contentError;
        },
    }

}


</script>

<style scoped>
.error {
    color: red;
}
</style>