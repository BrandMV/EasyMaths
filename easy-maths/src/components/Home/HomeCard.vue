<template>
    <div class="card">
        <div class="card-icon">
            <i :class="icon"></i>
        </div>
        <div class="info">
            <h4>{{title}}</h4>
            <p>{{desc}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "home-card",
    props: {
        icon: String,
        title: String,
        desc: String
    }
}
</script>
<style scoped>

    h4{
        font-size: 1.8rem;
    }
    p{
        font-size: 1.8rem;
    }

    .card{
        max-width: 100%;
        width: 40.6rem;
        height: 6.3rem;
        display: flex;
        padding: 1rem;
        justify-content: space-evenly;
        align-items: center;
        background: rgba(255, 255, 255, 0.33);
        box-shadow: 0px 0px 40px -2px rgba(0, 0, 0, 0.31);
        backdrop-filter: blur(22px);
        border-radius: 1.5rem;
        margin-top: 3rem;
        margin-bottom: 3rem;
    }
    i{
        font-size: 5rem;
        color: rgba(0, 0, 0, 0.80);
    }

    @media (max-width: 1024px){
        .card{
            width: 35rem;
        }
 
        i{
            font-size: 3rem;
            margin-right: 1rem;
        }
    }
    @media (max-width: 800px){
        .card{
            margin-top: 1rem;
        }
    }

    @media (max-width: 600px){
        .card{
            margin: 3rem auto;
        }
    }

    @media (max-width: 450px){
        .card{
            width: 30.6rem;
            justify-content: center;
        }
        h4{
            font-size: 1.5rem;
        }
        p{
            font-size: 1.5rem;
        }
        i{
            font-size: 3rem;
            margin-right: 1rem;
        }
    }
    
</style>