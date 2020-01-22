import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyD6LjVAnVHfSKgv_ONnnV4uVf1HLAhJwSU',
    authDomain: 'find-me-96b1f.firebaseapp.com',
    databaseURL: 'https://find-me-96b1f.firebaseio.com',
    projectId: 'find-me-96b1f',
    storageBucket: 'find-me-96b1f.appspot.com',
    messagingSenderId: '764887626177'
}

const firebaseApp = firebase.initializeApp(config)
Vue.use(firestorePlugin)


export const db = firebaseApp.firestore()
export const auth = firebase.auth()

Vue.prototype.$firebaseAuth = auth
