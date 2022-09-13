
import { ActionTree } from 'vuex';
import {  Setting } from './types';
import { RootState } from '../types';
import firebase from 'firebase/compat'
import PersonData from '../../models/person'

export const actions: ActionTree<Setting, RootState> = {

  async madeFio({commit}) {
    try {
      const uid: string = await this.dispatch('getUid')
      const db = firebase.firestore();
      
      if (uid) {
        var docRef = db.collection("users").doc(`${uid}`);
        docRef.get().then((doc) => {
          if (doc.exists) {
            const  {Name, Surname}= doc.data()
            commit('setFio', {Name, Surname})
          }
        })
      }

    } catch (error) {
      commit('setError', error)
      setTimeout(() => {
        commit('clearError')
      }, 3000);
    }
  },

  async downloadPersonData({commit}) {
    try {
      const uid: string = await this.dispatch('getUid')
      const db = firebase.firestore();

      if (uid) {
        var docRef = db.collection("users").doc(`${uid}`);
        docRef.get().then((doc) => {
          if (doc.exists) {
            const {email, password, urlAvatar, login, ...personData} = doc.data()
            commit('setPersonData', personData)
          }
        })
      }
    } catch (error) {
      commit('setError', error)
      setTimeout(() => {
        commit('clearError')
      }, 3000);
    }
  },

  async updatePersonData({commit},data: PersonData) {
    try {
      
      const uid: string = await this.dispatch('getUid')
      const db = firebase.firestore();

      if (uid) {
        var docRef = db.collection("users").doc(`${uid}`).update({
          ...data
        })
      } 
      let message = 'data-updated'
      commit('setMessage', message)
      setTimeout(() => {
        commit('clearMessage')
      }, 3000);


       
    } catch (error) {
      commit('setError', error)
      setTimeout(() => {
        commit('clearError')
      }, 3000);
    }
  },

  async updateAvatar({commit}) {
    try {
      const uid: string = await this.dispatch('getUid')
      const db = firebase.firestore();
      
      if (uid) {
        var docRef = db.collection("users").doc(`${uid}`);
        docRef.get().then((doc) => {
          if (doc.exists) {
            const urlAvatar = doc.data().urlAvatar
            commit('setAvatar', urlAvatar)
          }
        })
      }

    } catch(error) {
      commit('setError', error)
      setTimeout(() => {
        commit('clearError')
      }, 3000);
    }
  },

  async uploadAvatar({commit},files) {
    try {
      const uid = await this.dispatch('getUid')
      const result = await firebase.storage().ref(`UsersImage/${uid}/avatar`).put(files[0])
      const urlAvatar: string = await result.task.snapshot.ref.getDownloadURL()
      const db = firebase.firestore();
      if (uid) {
        db.collection("users").doc(`${uid}`).update({
          urlAvatar: urlAvatar
        });
      }
      

      commit('setMessage', `avatar-${result.state}`)
      setTimeout(() => {
        commit('clearMessage')
      }, 3000);


    } catch(error) {
      commit('setError', error)
      setTimeout(() => {
        commit('clearError')
      }, 3000);
    }
  }
};