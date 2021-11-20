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
                        @modalShow="showModal = true"
                    >
                    </CardInfo> 

                    <Achievements
                        :achievements="user.quizzes"
                    >
                    </Achievements>

                </div>
            </section>
        </div>

        <modal v-if="showModal" @close="showModal = false">

        </modal>

        
    </div>
</template>

<script>
import Sidebar from '../Account/Sidebar/Sidebar.vue'
import { sidebarWidth } from '../Account/Sidebar/state'
import CardInfo from '../Account/Profile/CardInfo.vue'
import Title from '../Account/Title.vue'
import Achievements from '../Account/Profile/Achievements.vue'
import { collapsed } from '../Account/Sidebar/state'
import { fb, db } from '../../firebase'
import Modal from '../Modal.vue'

export default {
    name: "Profile",
    components: { Sidebar, CardInfo, Title, Achievements, Modal },
    data() {
        return {
            user: {
                achievements:null,
                name: null,
                picture: null,
                email: null,
                quizzes: null
            },
            // user: {name: "David Meza", picture: "https://picsum.photos/200" ,email:"david@gmail.com", achievements: 5},
            title: "Mi perfil",
            showModal: false,
            
        }
    },
    // firestore(){
    //     let current = fb.auth().currentUser
    //     return{
    //         user: db.collection('users').doc(current.uid)
    //     }
    // },
    setup() {
        return { 
            sidebarWidth, 
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
    },
    created(){
        let currentUser = fb.auth().currentUser
        this.user.email = currentUser.email
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
    },
    methods:{
        /* 
         *Para ver cambios en usuario
        */
        watcher(){
            let current = fb.auth().currentUser
            db.collection("users").doc(current.uid).onSnapshot((querySnapshot) => {
                this.user = []
                querySnapshot.forEach(doc => {
                    this.user.push(doc)
                });
            })
        },
        updateProfile(){

        },
        uploadImage(){

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
        }
    }
    @media (max-width:650px) {
        .c-profile-content{
            display: block;
            align-items: center;
        }
    }

    
</style>