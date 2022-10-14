import { MutationTree } from 'vuex';
import { Telegram } from './types';

export const mutations: MutationTree<Telegram> = {
  SET_PHONE_AND_HASHCODE (state, {phoneClient, phoneCodeHash}) {
    console.log('phoneCodeHash', phoneCodeHash)
    state.hash = phoneCodeHash;
    state.phone = phoneClient;
  
  },
  SET_LOAD(state) {
    state.load = !state.load
  },

  SET_SESSION_STRING(state, sessionString) {
    state.sessionStr = sessionString
    localStorage.setItem('sessionString', JSON.stringify(sessionString))
  },

  CLEAR_SESSION_STRING(state) {
    state.sessionStr = ''
    state.hash = ''
    state.phone = ''
    localStorage.removeItem('sessionString')
  }
};
