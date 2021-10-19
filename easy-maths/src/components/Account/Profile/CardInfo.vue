<template>
    <div class="card-info">
        <h3>{{name}}</h3>
        <img :src="img" alt="profile">
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
    
</style>