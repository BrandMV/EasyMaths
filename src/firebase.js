import firebase from 'firebase'
require("firebase/firestore")
import 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvKNOln5oR0BqzzFlna_b3Fg39tU8fD1g",
    authDomain: "easy-maths-9602f.firebaseapp.com",
    projectId: "easy-maths-9602f",
    storageBucket: "easy-maths-9602f.appspot.com",
    messagingSenderId: "979812859558",
    appId: "1:979812859558:web:9577673c549c351d64be67"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export {fb, db}