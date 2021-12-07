<template>
    <div>
        <sidebar />
        <div :style="{ 'margin-left': sidebarWidth }">
            <section class="content-container">
                <Title
                    title="Sucesiones"

                >  
                </Title>
                <div :class="[ !collapsed ? 'profile-content' : 'c-profile-content' ]">
                    <section class="info">
                        <h3>¿Qué es una sucesión? </h3>
                        <p>Las listas ordenadas de números se llaman sucesiones. Cada número en la sucesión se llama término.</p>
                        <img src="../../assets/successions/1.png" alt="sucesion">
                        <p>Las sucesiones usualmente tienen patrones, que nos permiten predecir cuál puede ser el siguiente término. 
                            Por ejemplo, en la sucesión 3,5,7 ..., siempre sumas dos para obtener el siguiente término:</p>
                        <img src="../../assets/successions/2.png" alt="sucesion">
                        <p>
                            Los puntos suspensivos que aparecen al final indican que la sucesión puede extenderse, aunque solamente veamos unos pocos términos. 
                            Y podemos extenderla mediante el patrón. Por ejemplo, el cuarto término de la sucesión debe ser nueve, el quinto término debe ser 11, etc.	
                        </p>
                        <img src="../../assets/successions/3.png" alt="sucesion">
                        <p>
                            Las sucesiones con ese tipo de patrones se llaman sucesiones aritméticas. En una sucesión aritmética, la diferencia entre términos consecutivos es siempre la misma. 
                            Por ejemplo, la sucesión 3, 5, 7, 9 ... es aritmética porque la diferencia entre términos consecutivos es siempre dos.
                        </p>
                        <img src="../../assets/successions/4.png" alt="sucesion">
                        <p>
                            La sucesión 21, 16, 11, 6 ... también es aritmética porque la diferencia entre términos consecutivos es siempre menos cinco.
                        </p>
                        <img src="../../assets/successions/5.png" alt="sucesion">
                        <p>La sucesión 1, 2, 4, 8 ... no es aritmética, porque la diferencia entre términos consecutivos no es la misma.</p>
                        <img src="../../assets/successions/6.png" alt="sucesion">
                        <p>Los números de cada sucesión pueden ser fraccionarios, por ejemplo:</p>
                        <img src="../../assets/successions/7.png" alt="sucesion">
                        <p>En el ejemplo, la diferencia entre 2/5 y 4/5 es 2/5 , por lo que se puede encontrar que el siguiente termino seria:</p>
                        <img src="../../assets/successions/8.png" alt="sucesion">
                        
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
    name: "Successions",
    components: { Sidebar, Title },
    setup(){
        return{
            sidebarWidth, collapsed,
            route: useRoute()

        }
    },
    data() {
        return {
            // title: this.route.params.theme,
            
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
    }
</style>