<template>
    <router-link :to="{ path: `/learn/${title}`, params: {theme: title}}">
        <div class="card">
            <img :src="img" :alt="img">
            <p>{{title}}</p>
        </div>
    </router-link>
    
</template>

<script>
export default {
    name: "ThemeCard",
    props:{
        title: String,
        img: String
    }
    
}
</script>

<style scoped>
    a{
        font-style: none;
        text-decoration: none;
        color: black;
    }
    .card{
        width: 26.9rem;
        height: 31.9rem;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        transition: 0.1s all ease-out;
    }
    .card:hover{
        transform: scale(1.1);
    }
    img{
        width: 100%;
        height: 75%;
        margin-bottom: 2.4rem;
    }
    p{
        text-align: center;
        font-size: 2rem;
    }

    @media (max-width: 600px) {
        .card{
            display: block;

        }
    }
</style>