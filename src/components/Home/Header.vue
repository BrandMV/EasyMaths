<template>
    <header>
        <figure class="logo">
            <img src="../../assets/logo.svg" alt="logo">
        </figure>
        <nav class="navbar">
            <router-link :to="{name: 'Login'}" class="nav-item">Iniciar Sesión</router-link>
        </nav>
    </header>
</template>
<script>
export default {
    name: "Header",
    components: {}
    
}
</script>


<style scoped>
    header{
        /* position: fixed; */
        top: 0; left: 0;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.1);
        width: 100%;
        padding: 2rem 9%;
        display: flex;
        justify-content: space-between;
        z-index: 1000;
        align-items: center;
    }
    header figure img{
        width: 24rem;
        height: 4rem;
    }
    header .navbar .nav-item{
        text-decoration: none;
        background: linear-gradient(180deg, rgba(255, 199, 0, 0.86) 0%, #FE9A04 100%);
        color: white;
        font-weight: bold;
        border-radius: 1.6rem;
        font-size: 2.2rem;
        padding: 1.2rem;
    }
    button{
        background: linear-gradient(180deg, rgba(255, 199, 0, 0.86) 0%, #FE9A04 100%);
        color: white;
        font-weight: bold;
        width: 19.5rem;
        height: 5.2rem;
        border-radius: 1.6rem;
        font-size: 2.2rem;
    }


    @media (max-width: 800px){
        header .navbar .nav-item{
 
            width: 10rem;
            height: 5.2rem;
            font-size: 2rem;
        }    
    }

    @media (max-width: 600px){
        header .navbar .nav-item{
 
            width: 10rem;
            height: 5.2rem;
            font-size: 1.5rem;
        }
        
        header figure img{
            width: 20rem;
            height: 3.5rem;
        }
    }

    @media (max-width: 450px){
        header .navbar .nav-item{
 
            padding: 1rem;
            font-size: 1.3rem;
        }
        
        header figure img{
            width: 17rem;
            height: 3rem;
        }
    }

</style>