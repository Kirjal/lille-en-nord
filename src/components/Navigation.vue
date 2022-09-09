<template>
    <nav>
        <ul>
            <li>
                <router-link :to="{name: 'articles'}">Articles</router-link>
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