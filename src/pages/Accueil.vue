<template>

    <div v-if="articles" class="articles">
        <article v-for="a of articles" :key="a.id + 'a'">
            <router-link :to="{name:`article`, params:{id: a.id}}">
                <img v-if="a.image" :src="a.image" :alt="`image de l'article ${a.title}`"/>
                <img v-else src="./../assets/img/planLille.jpg"/>
            </router-link>
            <div>
                <router-link :to="{name:`article`, params:{id: a.id}}">
                <h2>{{a.title}}</h2>
            </router-link>
            <p>Publié par {{a.author}}</p>
            <small>Tags : {{a.tags}}</small>
            </div>
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
                this.error='';
                axios.get(`${this.api}`)
                .then(({data}) => this.articles = data)
                .catch(err => {
                    this.articles = undefined;
                    this.error = `${err.response.status} : ${err.message}`
                })
            }
        },
        mounted(){
            this.getArticles();
        }
    }
</script>

<style scoped>
.articles {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

article {
    width: 350px;
    backdrop-filter: blur(20px);
    margin: 10px;
    box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
    border-radius: 10px;
    overflow: hidden;
}

article div {
    padding: 0 0 20px 20px;
}

article img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}


</style>