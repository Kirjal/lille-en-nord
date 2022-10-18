<template>
    <div>
        <input v-model="search" placeholder="Rechercher par Tag" />
        <button class="search" @click="getFilter()">OK</button>
    </div>

    <div v-if="articles" class="articles">
        <article v-for="a of articles" :key="a.id + 'a'">
            <router-link :to="{name:`article`, params:{id: a.id}}">
                <img v-if="a.image" :src="a.image" :alt="`image de l'article ${a.title}`" />
                <img v-else src="./../assets/img/planLille.jpg" />
            </router-link>
            <div class="description">
                <router-link :to="{name:`article`, params:{id: a.id}}">
                    <h2>{{a.title}}</h2>
                </router-link>
                <p>Publié par {{a.author}}</p>
                <div class="tags" v-if="a.tags.length > 0">
                    <p>Tags : </p>
                    <small v-for="tags of a.tags" :key="tags">{{tags}}</small>
                </div>
            </div>
        </article>
        <div class="creer" v-if="user?.author">
            <router-link :to="{name:'nouveau'}">
                <i class="fa-solid fa-circle-plus"></i>
            </router-link>
        </div>
    </div>
    <p v-else-if="error">{{error}}</p>
    <p v-else>???</p>
</template>

<script>
import axios from 'axios';


export default {
    name: 'AccueilComponent',
    data: () => ({
        articles: undefined,
        api: 'http://localhost:3000/articles',
        error: '',
        search: ''
    }),

    methods: {
        getFilter() {
            if (this.search !== '') {
                this.error = '';
                axios.get(`${this.api}?tags_like=${this.param}`)
                    .then(({ data }) => this.articles = data)
                    .catch(err => {
                        this.articles = undefined;
                        this.error = `${err.response.status} : ${err.message}`
                    })
            } else {
                this.getArticles();
            } 
        },

        getArticles() {
            this.error = '';
            axios.get(`${this.api}`)
                .then(({ data }) => this.articles = data)
                .catch(err => {
                    this.articles = undefined;
                    this.error = `${err.response.status} : ${err.message}`
                })
        }
    },
    mounted() {
        this.getArticles();
    },
    props:{
        user: {
            type: Object,
            default:()=>(undefined)
        }
    },
    computed: {
        param() {
            return this.search.split(/[ ,]+/).join(',')
        }
    },
    emits:['connexion', 'deconnexion', 'updatedUser']
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
    transition: all .2s ease-in-out;
    max-width: 100vw;
}

article:hover {
    transform: scale(1.02)
}

article .description {
    padding: 0 0 20px 20px;
}

article .tags p {
    display: inline;
}

article img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

small {
    background-color: rgba(51, 51, 51, 0.2);
    border-radius: 10px;
    padding: 5px;
    margin-right: 5px;
}

.creer {
    width: 350px;
    min-height: 140px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.creer a {
    text-align: center;
    vertical-align: middle;
}

.creer i {
    font-size: 60px;
    transition: all .2s ease-in-out;
}

.creer i:hover {
    transform: scale(1.1)
}

</style>