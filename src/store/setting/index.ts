

import { Module } from 'vuex';
import { Setting } from './types';
import { RootState } from '../types';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const state: Setting = {
  urlAvatar: null,
  personData: null,
  fio: null
};

export const setting: Module<Setting, RootState> = {
  state, 
  getters,
  mutations,
  actions
};