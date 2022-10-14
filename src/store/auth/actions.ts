
import { ActionTree } from 'vuex';
import {  Auth } from './types';
import { RootState } from '../types';
import firebase from 'firebase/compat'
import message from '../../utils/message.plugin'

export const actions: ActionTree<Auth, RootState> = {
  
  async logout({commit}) {

    try {
      const auth = await firebase.auth().signOut()
      commit('clearAuth')
      let message  =  'logout'
      commit('setMessage', message)
      setTimeout(() => {
        commit('clearMessage')
      }, 3000);
    } catch (error) {
      console.log('errorerror', error)
    }

  },


  async autorizationUser({commit}, {email, password}) {
    try {
      commit('changeLoad')

      const auth = await firebase.auth().signInWithEmailAndPassword(email, password)
      let type: string | null = auth.operationType
      if (type === 'signIn') {

        const token = await this.dispatch('getIdToken')
        commit('setAuth', token)
        commit('setMessage', type)
        setTimeout(() => {
          commit('clearMessage')
        }, 3000);
      }

      commit('changeLoad')
    } catch (error) {
      
      commit('changeLoad')
      commit('setError', error.code)
      setTimeout(() => {
        commit('clearError')
      }, 3000);

    }
  },
  async registrationUser({commit}, {email, password, login}) {
    try {
      commit('changeLoad')
      
      const auth = await firebase.auth().createUserWithEmailAndPassword(email, password)
      let type: string | null = auth.operationType
      if (type) {
        
        const token = await this.dispatch('getIdToken')
        commit('setAuth', token)

        commit('setMessage', type)
        setTimeout(() => {
          commit('clearMessage')
        }, 3000);
      }

      const uid = await this.dispatch('getUid')

      const db = firebase.firestore();
      db.collection("users").doc(`${uid}`).set({
        login, email, password
      });
      
      commit('changeLoad')
    } catch (error) {

      commit('changeLoad')
      commit('setError', error.code)
      setTimeout(() => {
        commit('clearError')
      }, 3000);
    }
  },

  async getUid() {
    const user = firebase.auth().currentUser
    return user ? user.uid : null
  },

  async getIdToken({commit}) {
    const token = await firebase.auth().currentUser.getIdToken() 
    if (token) {
      commit('setAuth', token)
    }
    return token ? token : null
  }
};