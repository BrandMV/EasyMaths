<template>
    <header>
        <figure class="logo">
           <router-link :to="{ name: 'Home' }"><img src="../../assets/logo.svg" alt="logo"></router-link> 
        </figure>
    </header>
</template>
<script>
export default {
    name: "lr-header",
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
        max-width: 100%;
        width: 24rem;
        height: 4rem;
    }



</style>