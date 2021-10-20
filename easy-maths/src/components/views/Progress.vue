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
                    <QuizProgress
                        v-for="(quiz, index) in userQuizzes" 
                        :key="index"
                        :title="quiz.title"
                        :completed="quiz.completed"
                    >

                    </QuizProgress>

                </div>
            </section>
          
        </div>
    </div>
</template>

<script>
import QuizProgress from '../Account/Progress/QuizProgress.vue'
import Sidebar from '../Account/Sidebar/Sidebar.vue'
import { sidebarWidth } from '../Account/Sidebar/state'
import { collapsed } from '../Account/Sidebar/state'
import Title from '../Account/Title.vue'

export default {
    name: "Progress",
    components: { Sidebar, Title, QuizProgress },
    setup(){
        return{
            sidebarWidth, collapsed,
            title: "Mi progreso",
            userQuizzes: [
                {title: "Números naturales", completed: true},
                {title: "Técnicas de recuento", completed: false},
                {title: "Números racionales", completed: true},
                {title: "Suceiones", completed: false},
            ]
        }
    }
    
}
</script>

<style scoped>
    .profile-content, .c-profile-content{
        margin: 7rem 0;
    }
</style>