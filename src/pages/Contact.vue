<template>
    <div class="contact">
        <h1>Contact</h1>
        <p>Pour toute demande de partenariat, proposition, invitation à un voyage de presse, oubli dans un article…</p>
        <p>N’hésitez pas à me contacter par e-mail suivante :</p>
        <a href="mailto:lilleennord.contact@gmail.com">lilleennord.contact@gmail.com</a>
        <small>J’essaie de répondre dans les plus brefs délais à toutes les demandes 😉</small> 
    </div>
</template>

<script>
export default {
    name: 'ContactComponent'
}
</script>

<style scoped>
.contact {
    width: 80%;
    backdrop-filter: blur(20px);
    padding: 20px;
    box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
    border-radius: 10px;
}
small {
    display: block;
}
</style>