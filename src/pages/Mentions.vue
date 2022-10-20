<template>
    <div class="mentions">
        <h1>Mentions légales</h1>
        <p>No worries ! On respecte tes données et ton intimité !</p>
        <hr />
        <h2>Protection des données à caractère privées</h2>
        <ol>
            <li>Pas de collecte de données à l'insu de l'internaute.</li>
            <li>Pas de cession à des tiers.</li>
            <li>Pas d’usage des informations collectées au-delà du traitement de la demande ou pour d’autres finalités
                si l’internaute a accepté d’être joint ultérieurement.</li>
        </ol>
        <hr />
        <h2>Droits d'auteur | Copyrights</h2>
        <p>L'ensemble des contenus de ce site web relève de la législation française et internationale sur le droit
            d'auteur et la propriété intellectuelle. La reproduction en vue de réutiliser tout ou partie du site web est
            formellement interdite, y compris pour les documents téléchargeables, les visuels d’illustration, les textes
            et les représentations photographiques, sauf autorisation expresse et préalable. Les marques et logos, ainsi
            que les signes distinctifs et noms des sociétés tierces figurant sur le site web, sont protégés par leurs
            propriétaires respectifs et ne peuvent être utilisées à une fin quelconque, sans l’autorisation préalable de
            ces derniers.</p>
        <hr />
        <h3> Des questions ?</h3>
        <a href="mailto:lilleennord.contact@gmail.com">Dis nous ce que tu as sur le coeur ❤📧</a>
    </div>
</template>

<script>
export default {
    name: 'MentionsComponent'
}
</script>

<style scoped>
.mentions {
    width: 80%;
    backdrop-filter: blur(20px);
    padding: 20px;
    box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
    border-radius: 10px;
}

hr {
    margin: 10px;
}

ol {
    list-style-position: inside;
}
</style>