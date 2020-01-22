import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db, auth } from './firebaseConfig'

Vue.use(Vuex)

const usersRef = db.collection('users')

const store = new Vuex.Store({
  state: {
    auth,
    db,
    authUser: undefined,
    dbUser: null
  },
  mutations: {
    setCurrentUser (state, user) {
      state.authUser = user
    },
    clearDBUser (state) {
      state.dbUser = null
    },
    ...vuexfireMutations
  },
  actions: {
    setUserDBRef: firestoreAction(
      ({ bindFirestoreRef, unbindFirestoreRef }, ref) => {
        if (ref) {
          bindFirestoreRef('dbUser', ref)
          return
        }
        unbindFirestoreRef('dbUser', ref)
      }
    ),
    loadUser (ctx, user) {
      ctx.commit('setCurrentUser', user)
      if (user) {
        ctx.dispatch('setUserDBRef', usersRef.doc(user.uid))
        return
      }
      ctx.dispatch('setUserDBRef', null)
      
    },
    signUserUp (context, userBundle) {
      return auth.createUserWithEmailAndPassword(userBundle.email, userBundle.password)
        .then(({ user }) => {
          const userDoc = userBundle
          delete userDoc.password
          usersRef
            .doc(user.uid)
            .set(userDoc)
        })
    },
    login(context, usuario){
        return auth.signInWithEmailAndPassword(usuario.email, usuario.password)
         .then(() => {

        })
    },
    logout(ctx){
      ctx.commit('clearDBUser')
      return auth.signOut()
    },
  }
})

auth.onAuthStateChanged((user) => {
  store.dispatch('loadUser', user)
})

export default store
