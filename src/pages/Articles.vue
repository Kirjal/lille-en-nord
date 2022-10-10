<template>
    <div v-if="article">
        <h2>{{article.title}}</h2>
        <small>{{article.tags}}</small>
        <p>
            <img :src="article.image" :alt="`Image de l'article ${article.title}`"/>
        </p>
        <i>{{article.author}}</i>
        <p>{{article.content}}</p>


        <p>
            <button v-on:click="deleteArticle(article.id)">Supprimer l'article</button>
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
            <button v-on:click="deleteArticle()">Annuler la suppression</button>
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
            del: false
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
            deleteArticle(){
                if(!this.del){
                    this.del = true;
                }else{
                    this.del = false;
                }
            },
            confirmDelete(id){
                this.error='';
                axios.delete(`${this.api}/${id}`)
                .then(()=>router.push('/'))
                .catch(err=>{
                    this.error = `${err.response.status} : ${err.message}`;
                });
                this.del = false;
            }
        },
        mounted(){
            this.getArticle();
        }
    }
</script>

<style scoped>
    .delete{
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