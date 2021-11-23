<template>
    <div>
        <lr-header></lr-header>
        <main>
            <div class="login-image">
                <img src="../../assets/login.svg" alt="login-image">
            </div>
            <section class="login-form">
                <div class="content">
                    <h1>Bienvenido!</h1>
                    <p>¿No tienes una cuenta? <router-link :to="{ name: 'SignUp' }">Registrate</router-link></p>
                </div>
                <form>
                    <div class="form-element">
                        <input type="email" placeholder="Correo electrónico" v-model="email">
                    </div>
                    <div class="form-element">
                        <input @keyup.enter="login($event)" type="password" placeholder="Contraseña" v-model="password">
                    </div>
                    <input type="submit" class="signup-btn" value="Inicia Sesión" @click="login($event)">
                    <a style="display:block;color:#ba68c8;font-size:2rem;padding-top:1rem; cursor:pointer" @click="showModal = true">¿Olvidaste tu contraseña?</a>
                </form>
            </section>
        </main>

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
                                <div class="modal-content">
                                    <p>Si tienes problemas iniciando sesión u olvidaste tu contraseña ingresa tu correo
                                        y te enviaremos un link de recuperación de contraseña
                                    </p>
                                    <br><br>
                                    <div class="form-element">
                                        <input type="email" v-model="emailForResetPass" placeholder="Correo"/>
                                    </div>
                                    <button class="signup-btn" style="background-color:#bb2e3e" @click="onSentRecoveryEmail">Enviar correo de recuperación</button>    
                                </div>
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
import LrHeader from '../Header/LrHeader.vue'
import { fb } from '../../firebase'

export default {

    name: "login",
    components:{ LrHeader },
    data() {
        return {
            name: null,
            email: null,
            password: null,
            showModal: false,
            emailForResetPass: null

        }
    },
    methods: {
        login(event){
            event.preventDefault();
            
            fb.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                this.$router.replace('profile')
                this.$toast.success('Bienvenido de vuelta!',{
                    duration: 5000,
                    position: 'top'
                })
            })
            .catch((error) => {
                let errorCode = error.code
                if(errorCode == 'auth/invalid-email'){
                    this.$toast.error('Correo no válido',{
                    duration: 5000,
                    position: 'top'
                    })
                }
                if(errorCode == 'auth/user-not-found'){
                    this.$toast.error('Parece que no tienes una cuenta :/',{
                    duration: 5000,
                    position: 'top'
                    })
                }
                if(errorCode == 'auth/wrong-password'){
                    this.$toast.error('Verifica tu contraseña',{
                    duration: 5000,
                    position: 'top'
                    })
                }
                if(errorCode == 'auth/argument-error'){
                this.$toast.error('Verifica los datos',{
                    duration: 5000,
                    position: 'top'
                })
            }
            console.log(error);
            })
        },
        onSentRecoveryEmail(){
            fb.auth().sendPasswordResetEmail(this.emailForResetPass)
            .then(() => {
                // alert('Correo enviado, checa tus mensajes!')
                this.$toast.success('Correo enviado, checa tus mensajes!',{
                    duration: 5000,
                    position: 'bottom-right'
                })
                this.showModal = false
            })
            .catch((error) => {
                if(error.code == 'auth/invalid-email'){
                    this.$toast.error('Correo no válido',{
                    duration: 5000,
                    position: 'bottom-right'
                    })
                }
                if(error.code == 'auth/user-not-found'){
                    this.$toast.error('Parece que no tienes una cuenta :/',{
                    duration: 5000,
                    position: 'bottom-right'
                    })
                }
                this.showModal = false

            })
        }
    },

    
}
</script>

<style scoped>

    main{
        padding: 22rem 0;
        max-width: 100vw;
        max-height: 80vh;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .login-image{
        width: 50%;
    }
    .login-image img{
        display: block;
        max-width: 100vw;
        width: 40vw;
    }

    .login-form{
        max-width: 100%;
        max-height: 100vh;
        width: 50vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .content{
        width:  30vw;
    }

    h1{
        font-size: 5rem;

    }
    p{
        font-size: 2rem;
    }
    p a{
        color: #BA68C8;
        font-size: 2rem;
        text-decoration: none;
    }
     p a:hover{
        color: #d900ff;
    }
    .form-element:first-child{
        margin-top: 5.3rem;
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
        box-shadow: 0px 0px 6px 0 #BA68C8;
    }

    .signup-btn{
        max-width: 100vw;
        font-weight: 700;
        color: white;
        width: 30vw;
        height: 5.6rem;
        padding: 1rem;
        font-size: 2rem;
        background: #BA68C8;
        box-shadow: 0px 0px 6px 0 rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        transition: .3s all ease-out;
        border: none;
    }
    .signup-btn:hover{
        background: #d900ff;
    }

    @media (max-width:1024px) {
        h1{
            font-size: 3rem;
        }
        p{
            font-size: 1.5rem;
        }
        p a{
            font-size: 1.5rem;
        }
    }
    @media (max-width: 800px) {
        .login-image img{
            width: 0%;
        }
         .login-image{
            width: 0%;
        }

        .content{
            width: 70vw;
        }
        h1{
            font-size: 5rem;
        }
        p, p a{
            font-size: 2rem;
        }
        
        .login-form{
            width: 100vw;
        }
        .form-element input{
            width: 70vw;
        }
        .signup-btn{
            width: 70vw;

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
        .signup-btn{
            font-size: 1.5rem;
        }


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
    
</style>