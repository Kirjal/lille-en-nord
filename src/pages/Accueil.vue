<template>
    <h1>Lille en Nord</h1>

    <div v-if="articles" class="articles">
        <article v-for="a of articles" :key="a.id + 'a'">
            <h2>{{a.title}}</h2>
            <img :src="a.image" :alt="`image de l'article ${a.title}`"/>
            <p>{{a.content}}</p>
            <p>Publié par {{a.author}}</p>
            <small>Tags : {{a.tags}}</small>
        </article>
    </div>
    <p v-else-if="error">{{error}}</p>
    <p v-else>???</p>
</template>

<script>
    import axios from 'axios';

    export default {
        name:'AccueilComponent',
        data: ()=>({
            articles: undefined,
            api: 'http://localhost:3000/articles',
            error: ''
        }),
        methods: {
            getArticles(){
                console.log('coucou');
                this.error='';
                axios.get(`${this.api}`)
                .then(({data}) => this.articles = data)
                .catch(err => {
                    this.articles = undefined;
                    this.error = `${err.response.status} : ${err.message}`
                })
                .finally(()=>{
                    console.log('fini')
                })
            }
        },
        mounted(){
            this.getArticles();
        }
    }
</script>

<style scoped>

</style>