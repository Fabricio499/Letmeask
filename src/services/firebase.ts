
import firebase from 'firebase/compat/app'


import 'firebase/compat/auth'
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyDKp4RxuupmywTAsVhu-RpqQKdBykFqJ7s",
  authDomain: "letmeask-4bd01.firebaseapp.com",
  databaseURL: "https://letmeask-4bd01-default-rtdb.firebaseio.com",
  projectId: "letmeask-4bd01",
  storageBucket: "letmeask-4bd01.appspot.com",
  messagingSenderId: "760672315838",
  appId: "1:760672315838:web:dc1515db706df6c0af71ef"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const database = firebase.database()

export { firebase, auth, database }