<template>
    <nav>
        <ul>
            <li>
                <router-link :to="{name:''}">Accueil</router-link>
            </li>
            <li>
                <router-link :to="{name:'connexion'}">Connexion</router-link>
            </li>
            <li>
                <router-link :to="{name:'inscription'}">Inscription</router-link>
            </li>
            <li>
                <router-link :to="{name:'profil'}"></router-link>
            </li>
            <li>
                <router-link :to="{name:'articles'}">Articles</router-link>
            </li>
            <li>
                <router-link :to="{name:'nouveau'}">Nouveau</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default{
        name:'NavigationComponent'
    }
</script>

<style scoped>

</style>