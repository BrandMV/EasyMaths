<template>
    <div class="card-info">
        <h3>{{name}}</h3>
        <img :src="img" alt="profile">
        <i class="fas fa-edit"></i>
    </div>
</template>

<script>
export default {
    name: "CardInfo",
    props: {
        name: String,
        img: String
    }
    
}
</script>

<style scoped>
    .card-info{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        max-width: 100%;
        width: 32.5%;
        height:55.6rem;
        background: linear-gradient(152.19deg, rgba(82, 0, 255, 0.19) 1.15%, rgba(49, 7, 136, 0.53) 53.01%, #5823C7 103.8%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(250px);
        /* Note: backdrop-filter has minimal browser support */
        border-radius: 30px;
        gap: 3.2rem;
    }

    .card-info h3{
        color: white;
        font-size: 3rem;
    }
    .card-info img{
        box-shadow: 0px -1px 10px 2px rgba(0, 0, 0, 0.55);
        border-radius: 90px;
        width: 50%;
     
    }
    .card-info i{
        font-size: 6rem;
        color: white;
        cursor: pointer;
    }
</style>