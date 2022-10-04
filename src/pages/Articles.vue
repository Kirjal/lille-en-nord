<template>
    <div v-if="article">
        <h2>{{article.title}}</h2>
        <small>{{article.tags}}</small>
        <p>
            <img :src="article.image" :alt="`Image de l'article ${article.title}`"/>
        </p>
        <i>{{article.author}}</i>
        <p>{{article.content}}</p>

    </div>
    <div v-else-if="error">
        {{error}}
    </div>
    <template v-else>
        Chargement en cours...
    </template>
</template>

<script>
    import axios from 'axios';
    export default {
        name:'ArticlesComponent',
        data: ()=>({
            article: undefined,
            api: 'http://localhost:3000/articles',
            error: ''
        }),
        props:{
            id: Number
        },
        methods:{
            getArticle(){
                this.error='';
                axios.get(`${this.api}/${this.id}`)
                .then(({data}) => this.article = data)
                .catch(err => {
                    this.article = undefined;
                    this.error = `${err.response.status} : ${err.message}`
                })
            }
        },
        mounted(){
            this.getArticle();
        }
    }
</script>

<style scoped>

</style>