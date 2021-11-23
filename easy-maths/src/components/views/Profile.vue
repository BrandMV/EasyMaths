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
                                    <button :class="[updateData ? 'active-btn' : 'non-active-btn']" @click="updateData = true, changePassword = false">Actualizar datos</button>
                                    <button :class="[changePassword ? 'active-btn' : 'non-active-btn']" @click="changePassword = true, updateData = false">Cambiar contraseña</button>
                                </div>

                                <div v-if="updateData" class="data">
                                    <!-- Changinguser image  -->
                                    <div class="select-file">
                                        <input class="modal-file" type="file" @change="previewImage" accept="image/*" />
                                    </div>
                    
                                    <div>
                                        <img class="preview" :src="this.previewPicture">
                                        <br>
                                        <!-- <button @click="onUploadPicture">Actualizar foto</button> -->
                                    </div>
                                    <div class="form-element">
                                        <input type="text" v-model="user.name" placeholder="Nuevo nombre"/>
                                    </div>
                                    <button class="edit-btn" @click="onUpdateProfile">Actualizar datos</button>
                                
                                </div>


                                <div v-if="changePassword" class="data">
                                    <div class="form-element">
                                            <input type="password" placeholder="Contraseña actual" v-model="currentPass"/>
                                    </div>
                                    <div class="form-element">
                                            <input type="password" placeholder="Nueva contraseña" v-model="newPass"/>
                                    </div>
                                    <button class="edit-btn" @click="onChangePassword">Cambiar contraseña</button>
                                    {{ currentPass }}
                                    {{ newPass }}
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
            updateData: true,
            userID: null,
            previewPicture: null,
            newPass:null,
            currentPass: null,
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
                    this.$toast.success('Perfil actualizado correctamente',{
                    duration: 5000,
                    position: 'bottom-right'
                    })

                })
                .catch(e => {
                    console.log(e);
                    this.$toast.error('Algo salió mal',{
                    duration: 5000,
                    position: 'bottom-right'
                    })
                })
                console.log(this.picture);
            this.previewPicture = null

        },
        /*
            *Changing user current password
        */
        onChangePassword(){

            const userLogged = fb.auth().currentUser

            fb.auth().signInWithEmailAndPassword(userLogged.email, this.currentPass)
            .then(user => {
                userLogged.updatePassword(this.newPass)
                .then(() => {
                    this.$toast.success('Cambiaste tu contraseña exitosamente',{
                    duration: 5000,
                    position: 'bottom-right'
                    })
                })
                .catch(( error ) => {
                    if (error.code == 'auth/weak-password'){
                    this.$toast.error('La nueva contraseña debe tener al menos 6 carácteres',{
                        duration: 5000,
                        position: 'bottom'
                    })
    
                    }
                })
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
    
}
</script>

<style scoped>

.active-btn{
    width: 30rem;
    height: 2.5rem;
    color: white;
    background: #5823C7;
    border: none;
    cursor: pointer;
}
.non-active-btn{
    width: 30rem;
    height: 2.5rem;
    color: black;
    background: transparent;
    border: #5823C7 solid 1px;
    cursor: pointer;
}
/* .tabs button{
    width: 30rem;
    height: 2.5rem;
    color: white;
    background: #5823C7;
    border: none;
    cursor: pointer;
} */


.data{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}
.modal-file{
    background: #e95127;
    color: white;
    box-shadow: 0px 0px 6px 0 rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    outline: none;
    padding: 1rem;
}
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

     .edit-btn{
        max-width: 100vw;
        font-weight: 700;
        color: white;
        width: 30vw;
        height: 5.6rem;
        padding: 1rem;
        font-size: 2rem;
        background: #e95127;
        box-shadow: 0px 0px 6px 0 rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        transition: .3s all ease-out;
        border: none;
        cursor: pointer;
    }
    .edit-btn:hover{
        background: #a02300;
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
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
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

    .form-element{
        margin-bottom: 4.8rem;
    }
    .form-element input{
        max-width: 100vw;
        width: 30vw;
        height: 5.6rem;
        padding: 1rem;
        font-size: 2rem;
        outline: none;
        border: none;
        box-shadow: 0px 0px 6px 0 rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        transition: .3s all ease-out;
    }

    .form-element input:focus{
        box-shadow: 0px 0px 6px 0 #004ff8;
    }

img.preview{
    box-shadow: 0px -1px 10px 2px rgba(0, 0, 0, 0.55);
    border-radius: 90px;
    max-width: 20rem;
    /* width: 50%; */
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
     @media (max-width: 450px) {
 
        h1{
            font-size: 3rem;
        }
        p, p a{
            font-size: 1.5rem;
        }
        
    
        .form-element input{
            width: 70vw;
            font-size: 1.5rem;
        }
        .edit-btn{
            font-size: 1.5rem;
        }


    }

    
</style>