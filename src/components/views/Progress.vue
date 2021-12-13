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
                        v-for="(quiz, index) in user.quizzes" 
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
import { fb, db } from '../../firebase'
import { useRoute } from 'vue-router'

export default {
    name: "Progress",
    components: { Sidebar, Title, QuizProgress },
    setup(){
        return{
            sidebarWidth, collapsed,
            title: "Mi progreso"
        }
    },
    data() {
        return {
            userQuizzes : null,
            user: {
                achievements:null,
                name: null,
                picture: null,
                email: null,
                quizzes: null
            },
            quizzes: null
        }
    },
    mounted(){
        let currentUser = fb.auth().currentUser
        this.user.email = currentUser.email
        this.userID = currentUser.uid
        let userDoc = db.collection("users").doc(currentUser.uid)
        userDoc.get().then((doc) => {
            if(doc.exists){
                this.user = doc.data()
            }else{
                console.log("Error");
            }
        })
        .catch((error) => {
            console.log("Error obteniendo datos: ",error);
        })
    }
    
}
</script>

<style scoped>
    .profile-content, .c-profile-content{
        margin: 7rem 0;
    }
</style>