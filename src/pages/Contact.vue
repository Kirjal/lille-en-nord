<template>
    
    <section><div class="content">
            <h4> Contact</h4>
            <h4> Contact</h4>
        </div>
        <br />
        <img  src="./../assets/img/images00.jpg" alt=""/>
    <br />
    <strong>Pour toute demande de partenariat, proposition, invitation à un voyage de presse, oubli dans un article… </strong>
    <br/>
<strong>
    N’hésitez pas à me contacter par email:
    <a href="mailto:lilleennord.contact@gmail.com">lilleennord.contact@gmail.com</a>
    .
</strong>
<br/>
<strong>J’essaie de répondre dans les plus brefs délais à toutes les demandes 😉</strong>
</section>
        
    
</template>

<script>
    export default {
        name:'ContactComponent'
    }
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

body {
    display: flex;
    background: rgb(255, 255, 255);
    min-height: 100vh;
    align-items: center;
    justify-content: center;
}

.content {
    position: relative;
    height: 50px;
}

.content h4 {
    color: #fff;
    font-size: 2em;
    position: absolute;

}

.content h4:nth-child(1) {
    color: transparent;
    -webkit-text-stroke: 2px #050404;
}

.content h4:nth-child(2) {
    color: #E30613;
    animation: animate 4s ease-in-out infinite;
}
@keyframes animate {

    0%,
    100% {
        clip-path: polygon(0% 45%,
                16% 44%,
                33% 50%,
                54% 60%,
                70% 61%,
                84% 59%,
                100% 52%,
                100% 100%,
                0% 100%);
    }

    50% {
        clip-path: polygon(0% 60%,
                15% 65%,
                34% 66%,
                51% 62%,
                67% 50%,
                84% 45%,
                100% 46%,
                100% 100%,
                0% 100%);
    }
}
</style>