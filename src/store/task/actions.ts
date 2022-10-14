
import { ActionTree } from 'vuex';
import {  Task } from './types';
import { RootState } from '../types';
import firebase from 'firebase/compat'
import TaskData from '../../models/task'

export const actions: ActionTree<Task, RootState> = {
  
  async getTaskList({commit}) {
    try {
      const uid: string = await this.dispatch('getUid')
      const db = firebase.firestore();

      const data: Array<Object> = []
      db.collection("tasks").where("Id", "==", uid).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push({...doc.data()})  
        });
      })
      commit('setTaskList', data)
    } catch (error) {
      commit('setError', error.code)
      setTimeout(() => {
        commit('clearError')
      }, 3000);
    }
  },

  async updateTaskData({commit}, data: TaskData) {
    try {
      const uid: string = await this.dispatch('getUid')
      const db = firebase.firestore();
      
      if(uid) {
        console.log('uid', uid)
        console.log('data', data)
        let id = Date.now();
        data.Id = uid
        db.collection("tasks").doc(`task-${id}`).set({
          ...data
        })
      }

      commit('setMessage', 'task-create-success')
      setTimeout(() => {
        commit('clearMessage')
      }, 3000);


    } catch (error) {
      commit('setError', error.code)
      setTimeout(() => {
        commit('clearError')
      }, 3000);
    }
  }
};