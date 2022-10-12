<template>
    <div class="citadelle">
        <img src="../assets/img/citadelle.png" alt="" class="rotating">
    </div>
</template>

<script>
    export default {
        name:'CitadelleComponent',
    }
</script>

<style scoped>
    .citadelle {
        width: 100%;
        height: 100%;
        z-index: -1;
        position: fixed;
    }

    .citadelle img {
        opacity: 0.3;
        position: absolute;
        bottom: -170px;
        left: -400px;
    }

    @keyframes rotating {
        from {
            -ms-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        to {
            -ms-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    .rotating {
        -webkit-animation: rotating 60s linear infinite;
        -moz-animation: rotating 60s linear infinite;
        -ms-animation: rotating 60s linear infinite;
        -o-animation: rotating 60s linear infinite;
        animation: rotating 60s linear infinite;
    }
</style>