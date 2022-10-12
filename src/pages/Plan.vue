<template>
    <div>
    <h1>PLAN DU SITE</h1>

    <img src="./../assets/img/planLille.jpg" alt="" />
    
    <br/>
    <h3>Accueil:</h3>
    <a href="Accueil">Accueil</a>
    <br/>
    <h3>Connexion:</h3>
    <a href="Connexion">Connection</a>
    <br/>
    <h3>Profil:</h3>
    <a href="Profil">Profil</a>
    <br/>
    <h3>Nouveau:</h3>
    <a href="Nouveau">Nouveau</a>
    <br/>
    <h3>Contact:</h3>
    <a href="Contact">Contact</a>
    <br/>
    </div>
</template>

<script>
    export default {
        name:'PlanComponent'
    }
</script>

<style scoped>
img {
    width: 700px;
    height: 500px;
  
}

a {
    text-decoration: underline;
}
</style>