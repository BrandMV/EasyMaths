<template>
    <div>
        <sidebar />
        <div :style="{ 'margin-left': sidebarWidth }">
            <section class="content-container">
                <Title
                    :title="title"
                >  
                </Title>
                <CardInfo
                    :name="user.name"
                    :img="user.picture"
                >
                </CardInfo>
            </section>
          
        </div>

        
    </div>
</template>

<script>
import Sidebar from '../Account/Sidebar/Sidebar.vue'
import { sidebarWidth } from '../Account/Sidebar/state'
import CardInfo from '../Account/Profile/CardInfo.vue'
import Title from '../Account/Title.vue'

export default {
  components: { Sidebar, CardInfo, Title },
  setup() {
      return { 
        sidebarWidth, 
        title: "Mi perfil",
        user: {name: "David Meza", picture: "https://picsum.photos/200" ,email:"david@gmail.com"}      
    }
  }
    
}
</script>

<style scoped>
    
</style>