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

        <!-- <modal v-if="showModal" @close="showModal = false, watcher()"
            :userName="user.name"
            :userID="userID"
            :user="user"
        > -->

        <!-- </modal> -->



        <!-- Modal  -->
        <div  v-if="showModal">

            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">
                            <div class="modal-header">
                                <button class="modal-default-button" @click="showModal = false">
                                    X
                                </button>
                            </div>
                            <div class="modal-body">

                                <div class="tabs">
                                    <button @click="updateData = true, changePassword = false">Actualizar datos</button>
                                    <button @click="changePassword = true, updateData = false">Cambiar contraseña</button>
                                </div>

                                <div v-if="updateData" class="data">
                                    <!-- Changinguser image  -->
                                    <div class="modal-input">
                                        <input type="file" @change="previewImage" accept="image/*" />
                                    </div>
                    
                                    <div>
                                        <img class="preview" :src="this.previewPicture">
                                        <br>
                                        <!-- <button @click="onUploadPicture">Actualizar foto</button> -->
                                    </div>
                                    <div class="modal-input">
                                        <input type="text" v-model="user.name" placeholder="Nuevo nombre"/>
                                    </div>
                                    <button @click="onUpdateProfile">Actualizar datos</button>
                                
                                </div>


                                <div v-if="changePassword" class="password-update">
                                    <div class="modal-input">
                                            <input type="text" placeholder="Contraseña actual"/>
                                    </div>
                                    <div class="modal-input">
                                            <input type="text" placeholder="Contraseña nueva"/>
                                    </div>
                                    <button class="signup-btn" @click="onChangePassword">Cambiar contraseña</button>

                                </div>

                            </div>
                            <div class="modal-footer">
                    
                            </div>
                        </div>
                    </div>
                </div>
        </transition>
        </div>

        <!-- Modal  -->


        
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

export default {
    name: "Profile",
    components: { Sidebar, CardInfo, Title, Achievements },
    data() {
        return {
            user: {
                achievements:null,
                name: null,
                picture: null,
                email: null,
                quizzes: null
            },
            imageData: null,
            uploadValue: 0,
            changePassword: false,
            updateData: false,
            userID: null,
            previewPicture: null,
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
            collapsed,
            loadUserData(){
                
            } 
    }
    },
    created(){
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
    },
    methods:{
        previewImage(e){
        this.uploadValue = 0
        this.imageData = e.target.files[0]
        this.previewPicture = null
        const storageRef = fb.storage().ref('userPictures/' + this.userID + '/profile.jpg').put(this.imageData)
            storageRef.on(`state_changed`,snapshot => {
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            }, error => {console.log(error.message)},
            () => {
            this.uploadValue = 100
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
                this.previewPicture = url
                this.user.picture = url

            })
            }
            )


        },
        /*
        *Uploading user profile pciture and data to firebase
        */
        onUpdateProfile(){
        
                //*Updating name and image in data base
            db.collection('users').doc(this.userID).update({
                name: this.user.name,
                picture: this.previewPicture
                }).then(() => {
                    this.showModal = false

                })
                .catch(e => {
                    console.log(e);
                })
                console.log(this.picture);
            this.previewPicture = null

        },
        /*
            *Changing user current password
        */
        onChangePassword(){

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

    .modal-mask {
    display: flex;
    justify-content: center;
    /* align-items: center; */
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  background-color: rgba(0, 0, 0, .5);
  max-height: 100vh;
  height: 100%;
    overflow: auto;
  transition: opacity .3s ease;
    /* transform: translateX(50%); */
}
.modal-wrapper {
  /* display: table-cell; */
  /* vertical-align: middle; */
}
/* h3{
  marginbot
} */
.modal-container {
  width: 80rem;
  max-width: 100vw;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 20px 0;
}
.modal-default-button {
        background: none;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: .8rem;
        float: right;
        border: none;
        cursor: pointer;
        color: red;
    }
    /*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */
    .modal-enter {
    opacity: 0;
    }
    .modal-leave-active {
    opacity: 0;
    }
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    }

img.preview{
  max-width: 200px;
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