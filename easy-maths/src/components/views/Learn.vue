<template>
    <div>
        <sidebar />
        <div :style="{ 'margin-left': sidebarWidth }">
            <section class="content-container">
                <Title
                    :title="title"
                >  
                </Title>
                <div :class="[ !collapsed ? 'profile-content' : 'c-profile-content' ]">
                    <ThemeCard 
                        v-for="(card, index) in themes"
                        :key="index"
                        :title="card.title"
                        :img="card.img"
                    >
                    </ThemeCard>

                </div>
            </section>
          
        </div>
    </div>
</template>

<script>
import ThemeCard from '../Account/Learn/ThemeCard.vue'
import Sidebar from '../Account/Sidebar/Sidebar.vue'
import { sidebarWidth } from '../Account/Sidebar/state'
import { collapsed } from '../Account/Sidebar/state'
import Title from '../Account/Title.vue'

export default {
    name: "Learn",
    components: { Sidebar, Title, ThemeCard },
    setup(){
        return{
            sidebarWidth, collapsed,
            title: "Aprende!",
            themes: [
                { title: "Números naturales", img: "https://picsum.photos/200" },
                { title: "Técnicas de conteo", img: "https://picsum.photos/200" },
                { title: "Números racionales", img: "https://picsum.photos/200" },
                { title: "Sucesiones", img: "https://picsum.photos/200" },
                { title: "Sucesiones", img: "https://picsum.photos/200" },
                { title: "Sucesiones", img: "https://picsum.photos/200" },
            ]
        }
    }
    
}
</script>

<style scoped>
    .profile-content, .c-profile-content{
        height: 90vh;
        display: flex;
        justify-content: center;
        margin: 5rem 0;
        column-gap: 12.2rem;
        row-gap: 9rem;
        flex-wrap: wrap;
    }
</style>