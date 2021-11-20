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
                </form>
            </section>
        </main>
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
            password: null
        }
    },
    methods: {
        login(event){
            event.preventDefault();
            
            fb.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                this.$router.replace('profile')
            })
            .catch((error) => {
                let errorCode = error.code
                if(errorCode == 'auth/invalid-email')
                    alert("Correo no válido")
                if(errorCode == 'auth/user-not-found')
                    alert("Parece que no tienes una cuenta :/")
                if(errorCode == 'auth/wrong-password')
                    alert("Verifica tu contraseña")
            console.log(error);
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
    
</style>