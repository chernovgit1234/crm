
import { createStore, StoreOptions   } from "vuex";
import { auth } from '../store/auth/index';
import { setting } from '../store/setting/index';
import { task } from '../store/task/index';
import { telegram } from '../store/telegram/index';
import { RootState } from '@/store/types';



const namespaced: boolean = true;
const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0',
    error: null,
    load: null,
    message: null
  },
  mutations: {
    changeLoad(state) {
      state.load = !state.load
    },
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    },
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error,
    load: s => s.load,
    message: s => s.message
  }, 
  modules: {
   auth, setting, task, telegram
  }
};

export default createStore<RootState>(store);
