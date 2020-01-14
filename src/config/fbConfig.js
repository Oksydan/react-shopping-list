import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyCskZ2drunB0Goge4ZsFgB2vfVDZLIcrfg",
    authDomain: "reactshoppinglistapp.firebaseapp.com",
    databaseURL: "https://reactshoppinglistapp.firebaseio.com",
    projectId: "reactshoppinglistapp",
    storageBucket: "reactshoppinglistapp.appspot.com",
    messagingSenderId: "244901484491",
    appId: "1:244901484491:web:9eb6623d0df20f964b484e",
    measurementId: "G-LJEB096KM7"
};


firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const firebaseAuth = firebase.auth();