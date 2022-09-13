

import { MutationTree } from 'vuex';
import { Auth } from './types';

export const mutations: MutationTree<Auth> = {
  setAuth (state, token) {
    if (token != null) {
      state.auth = !!token
    }
  },
  clearAuth (state) {
    state.auth = null
  }
};


