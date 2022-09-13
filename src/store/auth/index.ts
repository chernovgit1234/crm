

import { Module } from 'vuex';
import { Auth } from './types';
import { RootState } from '../types';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const state: Auth = {
  auth: null
};

export const auth: Module<Auth, RootState> = {
  state, 
  getters,
  mutations,
  actions
};