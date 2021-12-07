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
                    <div class="container-quiz" v-if="!currentQuiz.completed">
                        <div class="quiz-header">
                            <h2 class="quiz-title">{{quiz.category}}</h2>
                        </div>
                        <div class="step-progress" :style="{ 'width': progress + '%' }">

                        </div>
                        <div class="quiz-main" v-for="(element, index) in quiz.questions.slice(a,b)"
                            :key="index"  v-show="quizShow"
                        >
                            <div class="box-question">
                                <h2>Pregunta {{b}}/{{quiz.questions.length}}</h2>
                                <p>{{element.question}}</p>
                            </div>
                            <div class="box-suggestions">
                                <ul>
                                    <li v-for="(item, index) in element.choices" :key="index"
                                        :class="select ? check(index, element.correctAnswer): '' " @click="selectResponse(index, element.correctAnswer)">
                                        {{item.text}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="box-score" v-if="scoreShow">
                            <h2>Tu puntuación fue</h2>
                            <h2>{{ score }}/{{ quiz.questions.length }}</h2>
                            <div class="btn-restart">
                                <button @click="restartQuiz">Reiniciar <i class="fas fa-sync-alt"></i></button>
                                <button @click="finishQuiz">Terminar <i class="fas fa-check"></i></button>
                            </div>
                        </div>
                        <div class="quiz-footer">
                            <div class="box-button" v-if="progress < 100">
                                <button @click="skipQuestion" :style="!next ? 'background-color: #FFAFAF' : '' ">Saltar</button>
                                <button @click="nextQuestion" :style="next ? 'background-color: #4adb4a' : '' ">Siguiente</button>
                            </div>
                        </div>
                    </div>
                    <div class="container-quiz" v-else>
                        <div class="quiz-header">
                            <h2 class="quiz-title">{{quiz.category}}</h2>
                        </div>
                        <div class="step-progress" :style="{ 'width': 100 + '%' }">

                        </div>
                        <div class="box-score">
                            <h2>Has completado este Quiz!</h2>
                            <h2>{{ user.quizzes[this.currentQuiz.quiz-1].correct }}/{{ quiz.questions.length }}</h2>
                            <div class="btn-restart">
                                <button @click="restartQuizDb">Volver a intentar <i class="fas fa-sync-alt"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import Sidebar from '../Account/Sidebar/Sidebar.vue'
import { sidebarWidth } from '../Account/Sidebar/state'
import Title from '../Account/Title.vue'
import { collapsed } from '../Account/Sidebar/state'
import { fb, db } from '../../firebase'
import { useRoute } from 'vue-router'

export default {
    name: "Quiz",
    components: { Sidebar, Title },
    setup() {
        return { 
            sidebarWidth, 
            collapsed,
            route: useRoute(),


    }
    },
    data() {
        return {
            user: {
                achievements:null,
                name: null,
                picture: null,
                email: null,
                quizzes: null
            },
            title: this.route.params.category,
            quiz: null,
            a: 0,
            b: 1,
            select: false,
            score: 0,
            quizShow: true,
            scoreShow: false,
            next: false,
            progress: 0,
            currentQuiz: null,
            userID: null,

        }
    },
    created() {
        let quizDoc = db.collection("quizzes").where("category", "==", this.title)
            quizDoc.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    this.quiz = doc.data()
                })
            })
            .catch((error) => {
                console.log(error);
            })
        //*Getting current user
        let currentUser = fb.auth().currentUser
        this.user.email = currentUser.email
        this.userID = currentUser.uid
        let userDoc = db.collection("users").doc(currentUser.uid)
        userDoc.get().then((doc) => {
            if(doc.exists){
                this.user = doc.data()
                this.currentQuiz = this.user.quizzes.find(q => q.title === this.title)
                console.log("currentQuiz", this.currentQuiz);
                console.log("user", this.user);
            }else{
                console.log("Error");
            }
        })
        .catch((error) => {
            console.log("Error obteniendo datos: ",error);
        })

        // this.currentQuiz = this.user.quizzes.find(q => q.category === this.title)
    },
    methods: {
        getQuiz(){
            let quizDoc = db.collection("quizzes").where("category", "==", this.title)
            quizDoc.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    this.quiz = doc.data()
                })
            })
            .catch((error) => {
                console.log(error);
            })
        },
        selectResponse(index, answer){
            this.select = true
            this.next = true
            if(index === answer-1){
                this.score++  
                this.currentQuiz.correct++
                // console.log("currentQuiz", this.currentQuiz);

            } 
        },
        check(index, answer){
            console.log(index, answer);
            if(index === answer-1){
                return 'correct'
            }else return 'incorrect'
        },
        nextQuestion(){
            if(!this.next){
                this.$toast.warning('Selecciona una pregunta primero',{
                        duration: 5000,
                        position: 'top'
                    })
                return
            }
            this.progress += (100/this.quiz.questions.length)

            if(this.quiz.questions.length -1 == this.a){
                this.scoreShow = true
                this.quizShow = false
            }else{
                this.a++;
                this.b++
                this.select = false
                this.next = false 
            }

        },
        skipQuestion(){
            if(this.next){
                this.$toast.warning('No puedes saltar a otra pregunta mientras esta seleccionada una respuesta',{
                        duration: 5000,
                        position: 'top'
                    })
                return
            }
            this.progress += (100/this.quiz.questions.length)
            if(this.quiz.questions.length - 1 == this.a){
                this.scoreShow = true
                this.quizShow = false
            }else{
                this.a++
                this.b++
            }
        },
        restartQuiz(){
            this.a = 0
            this.b = 1
            this.select = false
            this.score = 0
            this.quizShow = true
            this.scoreShow = false
            this.next = false
            this.progress = 0
            this.currentQuiz.correct = 0
            this.currentQuiz.completed = false

            
        },
        finishQuiz(){
            // if(this.currentQuiz.correct == 10){
                this.currentQuiz.completed = true
                this.user.quizzes[this.currentQuiz.quiz-1] = this.currentQuiz
                db.collection('users').doc(this.userID).update({
                    quizzes: this.user.quizzes,
                    achievements: this.user.achievements++
                    }).then(() => {
                        this.$toast.success('Has completado un quiz!',{
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
                this.$router.push({path: '/progress'})

            // }
            // this.$router.push({path: '/progress'})
        },
        restartQuizDb(){
            this.a = 0
            this.b = 1
            this.select = false
            this.score = 0
            this.quizShow = true
            this.scoreShow = false
            this.next = false
            this.progress = 0
            this.currentQuiz.correct = 0
            this.currentQuiz.completed = false
            this.user.quizzes[this.currentQuiz.quiz-1] = this.currentQuiz
                db.collection('users').doc(this.userID).update({
                    quizzes: this.user.quizzes,
                    achievements: this.user.achievements--
                    }).then(() => {
                        this.$toast.success('Quiz reiniciado',{
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
        }
    }
}
</script>

<style scoped>
    h2{
        font-size: 4rem;
    }
    .quiz-title{
        text-transform: uppercase;
        font-size: 4.5rem;
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
    .container-quiz{
        display: flex;
        width: 40%;
        height: 85%;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        flex-flow: column;
        text-align: center;
        border: 1px solid #e7eae0;
        border-radius: 1rem;
        background-color: white;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }
    .quiz-header{
        display: flex;
        width: 100%;
        height: 20%;
        border-bottom: 1px solid #e7eae0;
        justify-content: center;
        align-items: center;
        border-radius: 10px 10px 0px 0px;
        background-color: #FFEBCC;
        /* background: #2980B9;  fallback for old browsers */
        /* background: -webkit-linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9);  Chrome 10-25, Safari 5.1-6 */
        /* background: linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


    }

    .quiz-main{
        display: flex;
        width: 100%;
        height: 70%;
        flex-flow: column;
        margin: auto;
        align-items: center;

    }
    .quiz-footer{
        display: flex;
        width: 100%;
        height: 10%;
        justify-content: center;
        border-top: 1px solid #e7eae0;
        background-color: #FFEBCC;
        border-radius: 0px 0px 10px 10px;
    }

    .box-question{
        margin-top: 2.5rem;
    }

    .box-suggestions{
        display: flex;
        width: 100%;
        justify-content: center;
        margin: auto;
    }
    ul{
        display: flex;
        width: 80%;
        margin: 0;
        padding: 0;
        flex-flow: column;
    }
    ul li{
        list-style: none;
        line-height: 2;
        border: 1px solid #cdd2d2;
        margin-bottom: 2rem;
        border-radius: 1.5rem;
        cursor: pointer;
        font-size: 2rem;
        transition: all 0.3s;
    }
    .box-question p{
        padding-top: 2.5rem;
        font-size: 2rem;
    }

    li:hover{
        background: #e7eae0;
        transform: translateY(-0.3rem);
    }
    li.correct{
        border: 1px solid rgb(74,219,74);
        background: rgb(74,219,74);
        color: white;
        font-weight: bold;
    }
    li.incorrect{
        border: 1px solid rgb(240,117,100);
        background: rgb(240,117,100);
        color: white;
        font-weight: bold;
    }

    .box-button{
        display: flex;
        width: 100%;
    }
    .box-button button{
        width: 15rem;
        height: 3.5rem;
        outline: none;
        border: 0;
        color: white;
        font-size: 1.8rem;
        cursor: pointer;
        border-radius: 1.5rem;
        margin: auto;
        background: #a09f9ff5;
        font-weight: bold;
        transition: all 0.1s;
    }
    .box-button button:hover{
        transform: translateX(0.5rem);
    }
    .box-button button:nth-child(2):hover{
        transform: translateX(-0.5rem);
    }

    .box-score{
        display: flex;
        width: 100%;
        height: 70%;
        flex-flow: column;
    }
    .box-score h2{
        margin-top: 4rem;
    }
    .btn-restart{
        display: flex;
        width: 100%;
        height: auto;
        justify-content: center;
        margin-top: 5rem;

    }
    .btn-restart button{
        width: 20rem;
        height: 3.5rem;
        outline: none;
        border: 0;
        color: white;
        font-size: 1.8rem;
        cursor: pointer;
        border-radius: 1.5rem;
        margin: auto;
        background: #FFAFAF;
        font-weight: bold;
        transition: all 0.3s;

    }
    .btn-restart button:hover{
        transform: translateY(-1rem);
    }
    .btn-restart button:nth-child(2){
        background: #4adb4a;
    }
    .step-progress{
        display: flex;
        width: 100%;
        height: 1rem;
        background: #4adb4a;
        transition: 0.5s all;
    }

    @media screen and (max-width: 900px){
        .container-quiz{
            width: 60%;
        }
    }

    @media screen and (max-width: 720){
        .container-quiz{
            width: 80%;
        }
        .box-button button{
            width: 10rem;
        }
    }
    @media (max-width:650px) {
        .quiz-title{
            font-size: 3rem;
        }
        .box-question h2{
            font-size: 3rem;
        }
        .c-profile-content{
            align-items: center;
        }
        .box-button{
            flex-direction: column;
        }
        .box-button button{
            width: 80%;
        }
        .quiz-footer{
            height: 20%;
        }
        .btn-restart{
            flex-direction: column;
            gap: 2rem;
        }
        .btn-restart button{
            width: 80%;
        }
    }
</style>