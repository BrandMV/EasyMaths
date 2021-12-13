<template>
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <button class="modal-default-button" @click="$emit('close')">
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
                                <div class="modal-input">
                                  <p>
                                    Progreso : {{uploadValue.toFixed()+"%"}}<progress id="progress" :value="uploadValue" max="100"></progress>
                                  </p>
                                  
                                </div>
                                <div v-if="imageData!=null">
                                  <img class="preview" :src="picture">
                                  <br>
                                  <!-- <button @click="onUploadPicture">Actualizar foto</button> -->
                                </div>
                                <div class="modal-input">
                                  <input type="text" :value="userName"/>
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
</template>
<script>

import { fb, db } from '../firebase'

export default {
    name: "modal",
    data() {
      return {
        imageData: null,
        picture: null,
        uploadValue: 0,
        changePassword: false,
        updateData: false
      }
    },
    props: {
        userID: String,
        userName:  String,
        user: Array
    },
    methods: {
      watcher(){
          let current = fb.auth().currentUser
            db.collection("users").doc(current.uid).onSnapshot((querySnapshot) => {
                this.user = []
                querySnapshot.forEach(doc => {
                    this.user.push(doc)
                });
            })
        },
      previewImage(e){
        this.uploadValue = 0
        this.picture = null
        this.imageData = e.target.files[0]
      },
      /*
        *Uploading user profile pciture and data to firebase
      */
      onUpdateProfile(){
        const storageRef = fb.storage().ref('userPictures/' + this.userID + '/profile.jpg').put(this.imageData)
        storageRef.on(`state_changed`,snapshot => {
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        }, error => {console.log(error.message)},
        () => {
          this.uploadValue = 100
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url
              //*Updating name and image in data base

            db.collection('users').doc(this.userID).update({
              name: this.userName,
              picture: this.picture
            })
            this.watcher()
          })
        }
        )
            console.log(this.picture);


  
      },
      /*
        *Changing user current password
      */
      onChangePassword(){

      }
    },
    
}
</script>
<style scoped>
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
h3 {
  margin-top: 0;
  color: #42b983;
  font-size: 2rem;
  margin-bottom: 1.5rem;
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
</style>