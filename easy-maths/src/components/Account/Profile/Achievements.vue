<template>
    <div :class="[ !collapsed ? 'achievements-info' : 'c-achievements-info']">
        <div class="header">
            <h2>mis logros</h2>
            <hr />
        </div>
        <div :class="[ !collapsed ? 'trophies' : 'collapsed-trophies']">
            <div v-for="(trophie, index) in achievements" 
                :key="index"
                :class="[ trophie.completed ? 'completed' : 'incompleted' ]"
            >
                <p>{{trophie.quiz}}</p>

            </div>
        </div>
    </div>
</template>

<script>
import { collapsed } from "../Sidebar/state"

export default {
    name: "Achivements",
    props: { achievements: Array },

    setup(){
        return{
            collapsed
        }
    }
}
</script>

<style scoped>
    .achievements-info{
        background: #FFFFFF;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.51);
        border-radius: 30px;
        max-width: 100%;
        width: 45%;
        height: 43.6rem;
        display: grid;
        grid-template-columns: repeat(3,1fr);
        grid-gap: 4.8rem;
        padding: 2rem 0;
        grid-template-rows: 2rem;
        grid-template-areas: " title   title   title "
                             " trophie trophie trophie ";
        justify-items: center;
    }
    .c-achievements-info{
        background: #FFFFFF;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.51);
        border-radius: 30px;
        max-width: 100%;
        width: 45%;
        height: 43.6rem;
        display: grid;
        grid-template-columns: repeat(3,1fr);
        grid-gap: 4.8rem;
        padding: 2rem 0;
        grid-template-rows: 2rem;
        grid-template-areas: " title   title   title "
                             " trophie trophie trophie ";
        justify-items: center;
    }
    h2{
        text-align: center;
        font-size: 3.5rem;
        text-transform: uppercase;
    }
    h2::before, h2::after{
        content: ' 🏆 ';
    }
    .header{
        grid-area: title;
    }
    hr{
        margin-top: .5rem;
    }

    .trophies{
        grid-area: trophie;
        display: flex;
        column-gap: 10rem;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        row-gap: 4.5rem;
        max-width: 100%;
        width: 80%;
    }
    .collapsed-trophies{
        grid-area: trophie;
        display: flex;
        column-gap: 10rem;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        row-gap: 4.5rem;
        max-width: 100%;
        width: 80%;
    }
  
    .incompleted{
        border-radius: .5rem;
        max-width: 8rem;
        width:100%;
        height: 8rem;
        background: #323232 ;
        transition: .2s all ease-in;
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .incompleted:hover, .completed:hover{
        transform: scale(1.3);

    }
    .completed{
        transition: .2s all ease-in;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: .5rem;
        max-width: 8rem;
        width:100%;
        height: 8rem;
        background: #00659e ;
    }
    p{
        font-size: 4rem;
        text-align: center;
        color: white;
        font-weight: bold;
    }
    

    @media (max-width:940px) {
        .trophies{
            column-gap: 3rem;
        }
        .collapsed-trophies{
            column-gap: 3rem;
            
        }
        h2{
            font-size: 2.5rem;
        }
    }

    @media (max-width:800px) {
        .achievements-info{
            margin: 0 auto;
            width: 70%;
        }
        .c-achievements-info{
            margin: 0 auto;
            width: 70%;
        }
    }

    @media (max-width:550px) {
         
        h2{
            font-size: 1.8rem;
        }
        .achievements-info{
            height: 90rem;
        }
        .c-achievements-info{
            height: 90rem;
        }

    }
 
</style>