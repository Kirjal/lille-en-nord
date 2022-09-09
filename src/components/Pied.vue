<template>
    <nav>
        <ul>
            <li>
                <router-link :to="{name:'contact'}">Contact</router-link>
            </li>
            <li>
                <router-link :to="{name:'mentions'}">Mentions Légales</router-link>
            </li>
            <li>
                <router-link :to="{name:'plan'}">Plan du site</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name:'PiedComponent'
    }
</script>

<style scoped>

</style>