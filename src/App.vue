<template>
  <Navigation/>
  <Pied/>
</template>

<script>
import Navigation from './components/Navigation.vue';
import Pied from './components/Pied.vue';

export default {
    name: "App",
    components: { Navigation, Pied }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
