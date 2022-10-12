<template>
  <Logo />
  <Navigation/>
  <Citadelle />
  <main v-on:click="fermeMenu()">
    <router-view></router-view>
  </main>
</template>

<script>
import Navigation from './components/Navigation.vue';
import Logo from './components/Logo.vue';
import Citadelle from './components/Citadelle.vue'

export default {
    name: "App",
    components: { Navigation, Logo, Citadelle },
    methods:{
        fermeMenu(){
            document.querySelector('nav').classList.remove("menupresent");
        }
    }
}
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
  --main-color: #E30613;
  --main-color-lighter: #E84C57;
  --main-color-darker: #630309;
  --main-color-darkest: #632125;
  --main-color-link: #B00511;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.6;
    color: #222;
    min-height: calc(100vh - 100px);
    padding: 20px 0;
    max-width: 80%;
    margin: auto;
}

a {
    text-decoration: none;
    color: var(--main-color-link);
    transition: all .2s ease-in-out;
}

a:hover {
    color: var(--main-color-darkest)
}

html {
  /* Définition 1rem = 10px */
  font-size: 62.5%;
}

body {
  /* 16px */
  font-size: 1.6rem;
  font-family: sans-serif;
  line-height: 1.6;
  color: #222;
  min-height: 100vh;
}

h1 {
  /* 32px */
  font-size: 3.2rem;
}

h2 {
  /* 24px */  
  font-size: 2.4rem;
}

h3 {
  /* 19px */
  font-size: 1.9rem;
}

h4 {
  /* 16px */  
  font-size: 1.6rem;
}

h5 {
  /* 13px */  
  font-size: 1.3rem;
}

h6 {
  /* 11px */  
  font-size: 1.1rem;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Helvetica Neue';
    font-weight: bold;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: local('Helvetica Neue Bold Italic'), local('HelveticaNeue-BoldItalic'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-BoldItalic.woff2') format('woff2'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-BoldItalic.woff') format('woff'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-BoldItalic.ttf') format('truetype');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: local('Helvetica Neue Condensed Black'), local('HelveticaNeue-CondensedBlack'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-CondensedBlack.woff2') format('woff2'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-CondensedBlack.woff') format('woff'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-CondensedBlack.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: local('Helvetica Neue Bold'), local('HelveticaNeue-Bold'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Bold.woff2') format('woff2'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Bold.woff') format('woff'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: local('Helvetica Neue Condensed Bold'), local('HelveticaNeue-CondensedBold'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-CondensedBold.woff2') format('woff2'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-CondensedBold.woff') format('woff'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-CondensedBold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: local('Helvetica Neue Light'), local('HelveticaNeue-Light'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Light.woff2') format('woff2'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Light.woff') format('woff'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: local('Helvetica Neue Light Italic'), local('HelveticaNeue-LightItalic'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-LightItalic.woff2') format('woff2'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-LightItalic.woff') format('woff'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-LightItalic.ttf') format('truetype');
    font-weight: 300;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: local('Helvetica Neue Italic'), local('HelveticaNeue-Italic'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Italic.woff2') format('woff2'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Italic.woff') format('woff'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Italic.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: local('Helvetica Neue Thin'), local('HelveticaNeue-Thin'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Thin.woff2') format('woff2'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Thin.woff') format('woff'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Thin.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: local('Helvetica Neue Medium Italic'), local('HelveticaNeue-MediumItalic'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-MediumItalic.woff2') format('woff2'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-MediumItalic.woff') format('woff'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-MediumItalic.ttf') format('truetype');
    font-weight: 500;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: local('Helvetica Neue Medium'), local('HelveticaNeue-Medium'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Medium.woff2') format('woff2'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Medium.woff') format('woff'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: local('Helvetica Neue Thin Italic'), local('HelveticaNeue-ThinItalic'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-ThinItalic.woff2') format('woff2'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-ThinItalic.woff') format('woff'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-ThinItalic.ttf') format('truetype');
    font-weight: 100;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: local('Helvetica Neue UltraLight'), local('HelveticaNeue-UltraLight'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-UltraLight.woff2') format('woff2'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-UltraLight.woff') format('woff'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-UltraLight.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: local('Helvetica Neue UltraLight Italic'), local('HelveticaNeue-UltraLightItalic'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-UltraLightItalic.woff2') format('woff2'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-UltraLightItalic.woff') format('woff'),
        url('assets/fonts/helveticaNeue/HelveticaNeue-UltraLightItalic.ttf') format('truetype');
    font-weight: 100;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: local('Helvetica Neue'), local('HelveticaNeue'),
        url('assets/fonts/helveticaNeue/HelveticaNeue.woff2') format('woff2'),
        url('assets/fonts/helveticaNeue/HelveticaNeue.woff') format('woff'),
        url('assets/fonts/helveticaNeue/HelveticaNeue.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

</style>
