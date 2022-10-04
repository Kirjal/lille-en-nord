<template>
    <h2> Créer votre article</h2>
    <form @submit.prevent="handleSubmit()">

        <div>
            <label for="titre">Titre</label>
            <input id="titre" v-model.trim="article.title" @input="title_dirty= true" />
            <small v-show="titleError" class="error">Veuillez entrer un titre à votre article</small>
        </div>
        <div>
            <label for="author">Auteur(trice)</label>
            <input id="author" v-model.trim="article.author" @input="author_dirty= true" />
            <small class="error" v-show="authorError">Veuillez entrer un auteur à votre article</small>
        </div>
        <div>
            <label for="image">Image</label>
            <input id="image" v-model.trim="article.image" @input="image_dirty= true" />
            <small class="error" v-show="imageError">Veuillez entrer au moins une image</small>
        </div>
        <div>
            <label for="comments">Commentaires</label>
            <input id="comments" v-model.trim="article.comments" @input="comments_dirty= true" />
            <small class="error" v-show="commentsError">Veuillez entrer un commentaire pour votre article</small>
        </div>
        <p>
            <button :disabled="formError">Enregistrer</button>
        </p>
    </form>


</template>

<script>

export default {

    name: "NouveauComponent",
    data: function () {
        return {
            article: { title: '', author: '', image:'', comments:''},
            title_dirty: false,
            author_dirty: false,
            image_dirty: false,
            comments_dirty:false,
        }
    },

    methods: {
        handleSubmit() {

            console.log(`name article : "${this.article.title}" , auteur(trice) : "${this.article.author} ", 
            image : "${this.article.image}", comments : "${this.article.comments}"`);
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
        commentsError: function () {
            return !this.article.comments && this.comments_dirty; 
         },
        formError: function () {
            return !this.title_dirty || !this.author_dirty || !this.image_dirty || !this.comments_dirty ||this.titleError || this.authorError || this.imageError || this.commentsError;
        },
    }

}


</script>

<style scoped>
.error {
    color: red;
}
</style>