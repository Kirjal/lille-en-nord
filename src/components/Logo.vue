<template>
    <div class="logo">
        <router-link :to="{name:'accueil'}">
            <img src="../assets/img/noir.png" alt="">
        </router-link>
    </div>
</template>

<script>
    export default {
        name:'LogoComponent',
    }
</script>

<style scoped>
.logo {
    width: 100%;
    padding-top: 15px;
}

.logo a {
    display: block;
    width: fit-content;
    margin: auto;
}

.logo img {
    width: 200px;
    display: block;
    margin: auto;
}
</style>