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
                    <CardInfo
                        :name="user.name"
                        :img="user.picture"
                    >
                    </CardInfo> 

                    <Achievements
                        :achievements="achievements"
                    >
                    </Achievements>

                </div>
            </section>
          
        </div>

        
    </div>
</template>

<script>
import Sidebar from '../Account/Sidebar/Sidebar.vue'
import { sidebarWidth } from '../Account/Sidebar/state'
import CardInfo from '../Account/Profile/CardInfo.vue'
import Title from '../Account/Title.vue'
import Achievements from '../Account/Profile/Achievements.vue'
import { collapsed } from '../Account/Sidebar/state'

export default {
    
  components: { Sidebar, CardInfo, Title, Achievements },
  setup() {
      return { 
        sidebarWidth, 
        title: "Mi perfil",
        user: {name: "David Meza", picture: "https://picsum.photos/200" ,email:"david@gmail.com", achievements: 5},
        achievements:[
            { id: 1, completed: true },
            { id: 2, completed: true },
            { id: 3, completed: true },
            { id: 4, completed: true },
            { id: 5, completed: false },
            { id: 6, completed: false },
        ],
        collapsed 
    }
  }
    
}
</script>

<style scoped>
    .profile-content{
        height: 90vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .c-profile-content{
        height: 90vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    @media (max-width:800px) {
        .profile-content{
            display: block;
            border: 1px solid red;
        }
    }
    @media (max-width:650px) {
        .c-profile-content{
            display: block;
            align-items: center;
        }
    }

    
</style>