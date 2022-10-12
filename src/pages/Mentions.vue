<template>
    <div>
     <br/>  
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center">
                <h2 class="animate-charcter"> NO WORRIES ! ON RESPECTE TON INTIMITÉ ET TES DONNÉES.</h2>
            </div>
        </div>
    </div>
     
     <br/>
     <hr/>
    <br/>
     <h4>PROTECTION DES DONNÉES À CARACTÈRE PERSONNEL</h4>
     <br/>
     <ol>
        <li>Pas de collecte de données à l'insu de l'internaute.</li>
        <li>Pas de cession à des tiers.</li>
        <li>Pas d’usage des informations collectées au-delà du traitement de la demande ou pour d’autres finalités si l’internaute a
        accepté d’être joint ultérieurement.</li>
     </ol>
     <br/>
     <hr/>
     <br/>
     <h4>DROITS D'AUTEUR | COPYRIGHTS</h4>
     <br/>
     <p>L'ensemble des contenus de ce site web relève de la législation française et internationale sur le droit d'auteur et la
    propriété intellectuelle. La reproduction en vue de réutiliser tout ou partie du site web est formellement interdite, y
    compris pour les documents téléchargeables, les visuels d’illustration, les textes et les représentations
    photographiques, sauf autorisation expresse et préalable. Les marques et logos, ainsi que les signes distinctifs et noms
    des sociétés tierces figurant sur le site web, sont protégés par leurs propriétaires respectifs et ne peuvent être
    utilisées à une fin quelconque, sans l’autorisation préalable de ces derniers.</p>
    <br/>
    <hr/>
    <br/>
    <section>
        <div class="content">
            <h4>    Des questions ?</h4>
            <h4>    Des questions ?</h4>
        </div>
    <br />
    
      <a href="mailto:lilleennord.contact@gmail.com">Dis nous ce que tu as sur le coeur ❤📧</a> 
    

    </section>
    
    
    </div>
</template>

<script>
    export default {
        name:'MentionsComponent'
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


                .animate-charcter {
                    text-transform: uppercase;
                    background-image: linear-gradient(-225deg,
                            #231557 0%,
                            #44107a 29%,
                            #ff1361 67%,
                            #fff800 100%);
                    background-size: auto auto;
                    background-clip: border-box;
                    background-size: 200% auto;
                    color: #fff;
                    background-clip: text;
                    text-fill-color: transparent;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: textclip 2s linear infinite;
                    display: inline-block;
                    font-size: 25px;
                }
        
                @keyframes textclip {
                    to {
                        background-position: 200% center;
                    }
                }

   
</style>