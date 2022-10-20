<template>
    <div class="article" v-if="article">

        <router-link :to="{name:'accueil'}">
            <i class="fa-solid fa-circle-arrow-left"></i>
        </router-link>

        <h2 v-on:dblclick="updateArticle($event)" v-if="!mod">{{article.title}}</h2>
        <div v-if="mod">
            <label for="title">Titre :</label>
            <input id="title" v-model="this.updateTitle"/>
        </div>
        <div class="info_container">
            <div>
                <p>Publié par {{article.author}}</p>
                <small class="date" v-if="article.date">Le {{formatDate(article.date)}}</small>
            </div>
            <div class="tags" v-if="article.tags.length > 0 && article.tags[0] && !mod" v-on:dblclick="updateArticle($event)">
                <p>Tags : </p>
                <small v-for="tag of article.tags" :key="tag">{{tag}}</small>
            </div>
            <div v-if="mod" id="tagsUpdate">
                <label for="tags">Tags :</label>
                <input id="tags" v-model="this.updateTags"/>
            </div>
        </div>
        
        

        <div v-on:dblclick="updateArticle($event)" v-if="!mod">
            <img v-if="article.image" :src="article.image" :alt="`Image de l'article ${article.title}`"/>
            <img v-else src="./../assets/img/planLille.jpg" />
        </div>
        <label v-if="mod" for="image">Image :</label>
        <input type="text" id="image" v-if="mod" v-model="this.updateImg"/>


        <p v-if="!mod" v-on:dblclick="updateArticle($event)">{{article.content}}</p>
        <div v-if="mod" class="update">
            <label for="content">Contenu :</label>
            <textarea id="content" v-model="this.updateText"></textarea>
        </div>

        <div v-if="mod">
            <button type="submit" @click="confirmUpdate(article.id)">Confirmer</button>
            <button type="button" v-on:click="this.mod=false">Annuler</button>
        </div>

        <div>
            <button v-if="user" @click="this.com = true"><i class="fa-regular fa-comment"></i>Commenter</button>
            <button v-if="user?.author" v-on:click="updateArticle()"><i class="fa-solid fa-pen-to-square"></i>Modifier l'article</button>
            <button v-if="user?.author" v-on:click="this.del=true"><i class="fa-solid fa-trash-can"></i>Supprimer l'article</button>
        </div>

        <form @submit.prevent="postComment()" v-if="com">
            <label for="comment">Votre commentaire</label>
            <textarea id="comment" v-model="this.newComment"></textarea>
            <button>Publier</button>
            <button @click="this.com = false, this.newComment = ''">Annuler</button>
        </form>

        <div v-if="(this.comments.length > 0) && !editCom" class="comment_container">
            <h3>Commentaires :</h3>
            <div v-for="c in this.comments" :key="c.id" class="comment_block">
                <h4 v-if="c.author">{{c.author}}</h4>
                <small v-if="c.date">{{formatDate(c.date)}}</small>
                <p>{{c.content}}</p>
                <i class="fa-solid fa-pen-to-square" v-if="(this.user?.id === c.userId) || this.user?.author" @click="editComment(c.content, c.id)"></i>
                <i class="fa-solid fa-trash-can" v-if="(this.user?.id === c.userId) || this.user?.author" @click="deleteComment(c.id)"></i>
            </div>
        </div>
        <form v-if="editCom" @submit.prevent="confirmEditComment(this.commentId)">
            <textarea v-model="this.updateComment"></textarea>
            <button>Confirmer les modifications</button>
            <button @click="this.editCom = false, this.commentId = null">Annuler</button>
        </form>
    </div>

    <div v-else-if="error">
        {{error}}
    </div>

    <template v-else>
        Chargement en cours...
    </template>

    <div v-if="del" class="delete">
        <p v-if="user?.author">Souhaitez-vous supprimer l'article "{{article.title}}"?</p>
        <div class="boutons" v-if="user?.author">
            <button v-on:click="confirmDelete(article.id)">Confirmer la suppression</button>
            <button v-on:click="this.del=false">Annuler la suppression</button>
        </div>
        <div class="boutons" v-else>
            <p>Vous n'avez pas les droits de suppression sur cet article.</p>
            <button v-on:click="this.del=false">Retour</button>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
export default {
    name: 'ArticlesComponent',
    data: () => ({
        article: undefined,
        comments: [],
        api: 'http://localhost:3000/articles',
        comment_api: 'http://localhost:3000/comments',
        error: '',
        del: false,
        mod: false,
        com: false,
        updateTitle: '',
        updateTags: [],
        updateImg: '',
        updateText: '',
        newComment: '',
        updateComment: '',
        editCom: false,
        commentId: null
    }),
    props:{
        id: Number,
        user: {
            type: Object,
            default:()=>(undefined)
        }
    },
    methods: {
        getArticle() {
            this.error = '';
            axios.get(`${this.api}/${this.id}`)
                .then(
                    ({ data }) => (
                        this.article = data,
                        this.getComments(data.id)
                    )
                )
                .catch(err => {
                    this.article = undefined;
                    this.error = `${err.response.status} : ${err.message}`;
                })
        },
        getComments(id){
            this.error= '';
            axios.get(`${this.comment_api}?articleId=${id}`)
            .then(response => (response.data.sort((a,b)=>new Date(b.date) - new Date(a.date)), this.comments = response.data))
            .catch(err=>{
                this.comments = undefined;
                this.error = `${err.response.status} : ${err.message}`
            })
        },
        confirmDelete(id) {
            this.error = '';
            axios.delete(`${this.api}/${id}`)
                .then(() => router.push('/'))
                .catch(err => {
                    this.error = `${err.response.status} : ${err.message}`
                })
            this.del = false;
        },
        updateArticle(e) {
            if(!this.user?.author){
                return e.preventDefault()
            }
            this.updateTitle = this.article.title;
            this.updateTags = this.article.tags.join(" ");
            this.updateImg = this.article.image;
            this.updateText = this.article.content;
            this.mod = true;
        },
        confirmUpdate(id) {
            this.error = '';
            axios.patch(`${this.api}/${id}`, { title: this.updateTitle, image: this.updateImg, content: this.updateText, tags: this.updateTags.split(" ")})
                .then(() => {
                    this.article.title = this.updateTitle;
                    this.article.tags = this.updateTags.split(" ");
                    this.article.image = this.updateImg;
                    this.article.content = this.updateText;
                    this.updateTitle = '';
                    this.updateTags = [];
                    this.updateImg = '';
                    this.updateText = '';
                    this.mod = false;
                })
                .catch(err => {
                    console.log(this.error);
                    console.log(err.response.status);
                })
        },
        postComment(){
            this.error='';
            axios.post(`${this.comment_api}`, {author: this.user?.last_name + ' ' +this.user?.first_name, date: new Date(), content: this.newComment, userId: this.user.id, articleId: this.article.id})
            .then(this.com = false, this.newComment = '', this.getArticle())
            .catch(err=>{
                this.error = `${err.response.status} : ${err.message}`
            })
        },
        deleteComment(id){
            axios.delete(`${this.comment_api}/${id}`)
            .then(this.getArticle())
            .catch(err=>{
                this.error = `${err.response.status} : ${err.message}`
            })
        },
        editComment(content, id){
            this.editCom = true;
            this.updateComment = content;
            this.commentId = id;
        },
        confirmEditComment(id){
            axios.patch(`${this.comment_api}/${id}`, {content: this.updateComment})
            .then(this.updateComment = '', this.editCom = false, this.commentId = null, this.getArticle())
            .catch(err=>{
                this.error = `${err.response.status} : ${err.message}`
            })
        },
        formatDate(date){
            return new Date(date).toLocaleString('fr');
        }
    },
    mounted() {
        this.getArticle();
    },
    emits:["connexion", "updatedUser", "deconnexion"]
}
</script>

<style scoped>
.article {
    width: 80%;
    min-width: 280px;
    backdrop-filter: blur(20px);
    box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
    border-radius: 10px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    max-width: 100vw;
}

h2{
    font-size: 2em;
}

.article img {
    display: block;
    margin: 20px auto;
    max-width: 700px;
}

.date{
    font-style: italic;
    display:block;
    margin-top:-5px;
    color:#666;
}


.info_container{
    display:flex;
    justify-content:space-between;
}
.tags{
    display:flex;
    justify-content:flex-end;
    gap:10px;
    align-items:center;
}

.article .tags small {
    background-color: rgba(51, 51, 51, 0.2);
    border-radius: 50px;
    padding: 5px 12px 6px;
    margin-left: 5px;
}

h2 {
    margin-left: 5px;
}

.delete {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000000cc;
    color: #eee;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 50;
}

.boutons {
    margin-top: 20px;
}

button {
    height: 30px;
    border: 0;
    border-radius: 0.25rem;
    background: var(--main-color);
    color: white;
    white-space: nowrap;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem;
    cursor: pointer;
    transition: all .2s ease-in-out;
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: bold;
    font-size: 15px;
}

button:hover {
    background: var(--main-color-darkest);
}

button i {
    margin-right: 3px;
}

.fa-circle-arrow-left {
    position: absolute;
    font-size: 30px;
    top: 33px;
    left: -15px;
}

.comment_container{
    margin-top:50px;
    padding:10px;
}

.comment_block{
    margin-top:30px;
    position:relative;
    padding-right:50px;
}
.comment_block small{
    display:block;
    margin-top:-5px;
    font-style:italic;
}

.comment_block i{
    cursor:pointer;
    position:absolute;
}

.comment_block i:nth-last-child(2){
    right:25px;
    bottom:5px;

}

.comment_block i:last-child{
    right:5px;
    bottom:5px;
}
</style>