<template>
    <div>
        <sidebar />
        <div :style="{ 'margin-left': sidebarWidth }">
            <section class="content-container">
                <Title
                    title="Fracciones"
                >  
                </Title>
                <div :class="[ !collapsed ? 'profile-content' : 'c-profile-content' ]">
                    <section class="info">
                        <p>Una fracción se expresa de la forma:</p>
                        <img src="../../assets/fractions/1.png" alt="fraccion">
                        <p>Tanto el numerador como el denominador pueden ser números.</p>
                        <p>Un número decimal se expresa de la forma: </p>
                        <img src="../../assets/fractions/2.png" alt="decimal">
                        <p>
                            Donde e es un número entero y todas las siguientes letras d significan decimal. 
                            Por tanto, en un número decimal siempre encontraremos una parte entera. 
                            La parte entera es el número anterior a la coma. La parte decimal es la parte posterior a la coma.
                        </p>
                        <img src="../../assets/fractions/3.png" alt="decimal">
                        <p>La parte decimal también recibe el nombre de parte fraccionaria.</p>
                        <h3>¿Qué tienen en común los números decimales y las fracciones?</h3>
                        <p>
                            Los números decimales y las fracciones tienen tantas cosas en común que llegan a ser el mismo concepto matemático, pero con distinta expresión. 
                            En otras palabras, los números decimales y las fracciones son lo mismo pero escrito de diferente manera:
                        </p>
                        <img src="../../assets/fractions/4.png" alt="comun">
                        <p>
                            Suponemos que queremos escribir el número 4,5 en fracción. 
                            Primero tenemos que pensar en dos números que divididos den como resultado 4,5. Esta combinación de números puede ser cualquiera. 
                            Por ejemplo, 9 y 2.
                        </p>
                        <p>
                            Para convertir una fracción en un decimal, dividimos el numerador entre el denominador. 
                            Si tenemos un número mixto, el número natural se mantiene a la izquierda del punto decimal.
                        </p>
                        <h3>Ejemplos</h3>
                        <img src="../../assets/fractions/5.png" alt="ejemplo">
                        <img src="../../assets/fractions/6.png" alt="ejemplo">
                    </section>

                </div>
            </section>
        </div>
    </div>
</template>

<script>
import Sidebar from '../Account/Sidebar/Sidebar.vue'
import { sidebarWidth } from '../Account/Sidebar/state'
import { collapsed } from '../Account/Sidebar/state'
import Title from '../Account/Title.vue'
import { useRoute } from 'vue-router'

export default {
    name: "Fractions",
    components: { Sidebar, Title },
    setup(){
        return{
            sidebarWidth, collapsed,
            route: useRoute(),

        }
    },
    data() {
        return {
            // title: this.route.params.theme
            
        }
    },
}
</script>

<style scoped>
    .info{
        width: 70%;
        max-width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .info::before{
        content: '';
        position: fixed;
        border-radius: 100%;
        width: 70rem;
        height: 70rem;
        background: #FF512F;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #F09819, #FF512F);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #F09819, #FF512F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        left: -30rem;
        bottom: -30rem;
        z-index: -100;
        background: #ED4264;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #FFEDBC, #ED4264);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #FFEDBC, #ED4264); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }
    .info::after{
        content: '';
        position: fixed;
        border-radius: 100%;
        width: 70rem;
        height: 70rem;
        background: #FF512F;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #F09819, #FF512F);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #F09819, #FF512F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        right: -30rem;
        top: -40rem;
        z-index: -100;

    }
    .info:first-child{
        margin-top: 3rem;
    }
    img{
        max-width: 100%;
        margin: 0 auto;
    }
    p{
        font-size: 2rem;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        text-align: justify;
        letter-spacing: .1rem;
    }
    h3{
        text-align: center;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 3rem;
        margin: 2.5rem 0;
    }
</style>