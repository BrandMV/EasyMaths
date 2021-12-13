<template>
    <div class="home-container"> 
     <Header></Header>
     <main class="home">
         <div class="content">
            <h1>Aprende Matemáticas!</h1>
            <home-card
                    v-for="(card, index) in homeCards"
                    :key="index"
                    :icon="card.icon"
                    :title="card.title"
                    :desc="card.desc"
            >
            </home-card>
            <router-link :to="{ name: 'SignUp' }" class="orange-btn">únete!</router-link>
         </div>
         <div class="image">
            <img src="../../assets/home.png" alt="home-image">
         </div>
     </main>

     <div class="wave">
         <img src="../../assets/wave.svg" alt="wave">
     </div>
    </div>
</template>

<script>
import Header from "../Home/Header.vue"
import HomeCard from '../Home/HomeCard.vue'
// import HomeCard from "../Home/HomeCard.vue"

export default {
    name: "home",
    components:{ Header, HomeCard },
    data (){
        return{
            homeCards:[
                { icon: "fas fa-book-open", title: "Cuestionarios", desc: "Resulve interesantes cuestionarios" },
                { icon: "fas fa-info-circle", title: "Información", desc: "Encuentra información sobre temas" },
            ]
        }
    }
    
}
</script>
<style scoped>
 
    main{
        max-height: 100vh;
        padding: 30rem 9%;
        height: 80vh;
        
    }
    .home{
        display: flex;
        align-items: center;
        justify-content: center;
    }


    h1{
        font-style: bold;
        font-size: 8rem;
        color: #333;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }


    .home .image img{
        width: 40vw;
    }
 
    .wave img{
        position: fixed;
        max-width: 100%;
        bottom: 0;
        z-index: -100;
    }

    @media (max-width: 1024px){
        h1{
            font-style: bold;
            font-size: 3.5rem;
            color: #333;
            letter-spacing: 0.1em;
            text-transform: uppercase;
        }
    }

    @media (max-width: 800px){
       .home{
           flex-direction: column-reverse;
            /* padding-top: 45rem; */
       }

        .content{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
     
       h1{
           text-align: center;
           font-size: 5rem;
           padding: 1rem 0;
       }
       .image img{
           width: 100%;
       }

    }
    @media (max-width: 450px){
        h1{
            font-size: 3rem;
        }
    }
</style>