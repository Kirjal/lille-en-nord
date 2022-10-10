<template>
    <nav class="footer">
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
    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    .footer ul {
        list-style: none;
        display: flex;
        justify-content: center;
    }

    .footer ul li {
        margin: 5px;
    }
</style>