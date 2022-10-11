<template>
    <div class="article" v-if="article">
        <h2>{{article.title}}</h2>
        <small>{{article.tags}}</small>
        <img v-if="article.image" :src="article.image" :alt="`Image de l'article ${article.title}`"/>
        <img v-else src="./../assets/img/planLille.jpg"/>
        <i>{{article.author}}</i>
        <p v-if="!mod" v-on:dblclick="updateArticle()">{{article.content}}</p>
        <div v-if="mod" class="update">
            <form @submit.prevent="confirmUpdate(article.id)">
                <textarea v-model="this.updateField"></textarea>
                <button type="submit">Confirmer les modifications</button>
                <button type="button" v-on:click="this.mod=false">Annuler les modifications</button>
            </form>
        </div>


        <p>
            <button v-on:click="updateArticle()">Modifier l'article</button>
            <button v-on:click="this.del=true">Supprimer l'article</button>
        </p>
    </div>
    <div v-else-if="error">
        {{error}}
    </div>
    <template v-else>
        Chargement en cours...
    </template>
    <div v-if="del" class="delete">
        <p>Souhaitez-vous supprimer l'article {{article.title}}?</p>
        <p>
            <button v-on:click="confirmDelete(article.id)">Confirmer la suppression</button>
            <button v-on:click="this.del=false">Annuler la suppression</button>
        </p>
    </div>
</template>

<script>
    import router from '@/router';
    import axios from 'axios';
    export default {
        name:'ArticlesComponent',
        data: ()=>({
            article: undefined,
            api: 'http://localhost:3000/articles',
            error: '',
            del: false,
            mod:false,
            updateField: ''
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
                    this.error = `${err.response.status} : ${err.message}`;
                })
            },
            confirmDelete(id){
                this.error='';
                console.log(`${this.api}/${id}`)
                axios.delete(`${this.api}/${id}`)
                .then(()=>router.push('/'))
                .catch(err=>{
                    this.error = `${err.response.status} : ${err.message}`;
                });
                this.del = false;
            },
            updateArticle(){
                this.updateField = this.article.content;
                this.mod = true;
            },
            confirmUpdate(id){
                this.error='';
                axios.patch(`${this.api}/${id}`, {content: this.updateField})
                .then(() => {
                    this.article.content = this.updateField;
                    this.updateField = '';
                    this.mod = false;
                })
                .catch(err=>{
                    this.error = `${err.response.status} : ${err.message}`;
                })
            }
        },
        mounted(){
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
    }

    .article small {
        background-color: rgba(51, 51, 51, 0.2);
        border-radius: 10px;
        padding: 5px;
    }

    .delete {
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        background-color:#000000cc;
        color:#eee;
        position:fixed;
        top:0;
        left:0;
        height:100vh;
        width:100vw;
        z-index:50;
    }

</style>