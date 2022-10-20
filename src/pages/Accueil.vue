<template>

    <div class="presentation">
        <div>
            <h2>Nos incontournables à faire et à voir</h2>
            <p> Aujourd'hui nous t'emmenons chez nous : à Lille ! Et oui, c'est là que nous vivons depuis quelques années, tout au Nord dans la magnifique capitale des Flandres. Et nous avons décidé de te faire découvrir les incontournables à faire et à voir si tu t'y installes ou le temps d'un week-end.</p>
            <p>Entre nature, monuments ou encore gastronomie tu trouveras à coup sûr ton bonheur dans ces articles pour un séjour en famille ou entre amis.</p>
            <p>Bienvenue dans les Hauts-de-France !</p>
        </div>
        <div>
            <img src="./../assets/img/selfie.jpg" alt="">
        </div>
    </div>

    <div class="search">
        <input v-model="search" @input="getFilter()" placeholder="Rechercher par tag" />
    </div>


    <div v-if="articles" class="articles">
        <article v-for="a of articles.slice(0, currentArticles)" :key="a.id + 'a'">
            <router-link :to="{name:`article`, params:{id: a.id}}">
                <img v-if="a.image" :src="a.image" :alt="`image de l'article ${a.title}`" />
                <img v-else src="./../assets/img/planLille.jpg" />
            </router-link>
            <div class="description">
                <router-link :to="{name:`article`, params:{id: a.id}}">
                    <h2>{{a.title}}</h2>
                </router-link>
                <p>Publié par {{a.author}}</p>
                <small class="date" v-if="a.date">Le {{formatDate(a.date)}}</small>
                <div class="tags" v-if="a.tags.length > 0 && a.tags[0]">
                    <p>Tags : </p>
                    <small v-for="tags of a.tags" :key="tags">{{tags}}</small>
                </div>
            </div>
        </article>
        <div class="show_more" v-if="this.currentArticles < this.articles.length" @click="showMore()">
            <i class="fa-solid fa-circle-plus"></i>
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
        search: '',
        currentArticles: 5
    }),

    methods: {
        getFilter() {
            if (this.search !== '') {
                this.error = '';
                axios.get(`${this.api}?tags_like=${this.param}`)
                    .then(({ data }) => (data.sort((a, b) => new Date(b.date) - new Date(a.date)), this.articles = data))
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
                .then(({ data }) => (data.sort((a, b) => new Date(b.date) - new Date(a.date)), this.articles = data))
                .catch(err => {
                    this.articles = undefined;
                    this.error = `${err.response.status} : ${err.message}`
                })
        },
        formatDate(date) {
            return new Date(date).toLocaleString('fr');
        },
        showMore() {
            this.currentArticles += 6
        }
    },
    mounted() {
        this.getArticles();
    },
    props: {
        user: {
            type: Object,
            default: () => (undefined)
        }
    },
    computed: {
        param() {
            return this.search.split(/[ ,]+/).join(',')
        }
    },
    emits: ['connexion', 'deconnexion', 'updatedUser']
}
</script>

<style scoped>
.articles {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1150px;
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

.date {
    font-style: italic;
    display: block;
    margin-top: -5px;
}

.tags small {
    background-color: rgba(51, 51, 51, 0.2);
    border-radius: 10px;
    padding: 5px 8px;
    margin-right: 5px;
}

.show_more {
    width: 350px;
    min-height: 140px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.show_more a {
    text-align: center;
    vertical-align: middle;
}

.show_more i {
    font-size: 60px;
    transition: all .2s ease-in-out;
    color: var(--main-color);
}

.show_more i:hover {
    transform: scale(1.1);
    cursor: pointer;
    color: var(--main-color-darker);
}

.search {
    width: 80%;
    max-width: 350px;
    margin-bottom: 15px;
    font-size: 16px;
}

.search input {
    border-radius: 10px;
    font-family: 'Helvetica Neue';
    padding: 10px;
    border: none;
    outline: none;
    box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
}

.search input:focus {
    outline: 1px var(--main-color) solid;
}

.presentation {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 80%;
    max-width: 1150px;
    height: fit-content;
    min-width: 300px;
    backdrop-filter: blur(20px);
    padding: 20px;
    box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
    border-radius: 10px;
    margin: 20px;
}

.presentation p {
    margin-bottom: 5px;
}

.presentation div {
    max-width: 50%;
    padding: 20px;
}

.presentation img {
    max-height: 300px;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@media screen and (max-width:768px) {
    .presentation {
        flex-direction: column;

    }

    .presentation div {
        max-width: unset;
        width: 100%;
    }

}
</style>