import { Module } from 'vuex';
import { Telegram } from './types';
import { RootState } from '../types';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const state: Telegram = {
  phone: '',
  code: '',
  hash: '',
  load: false,
  sessionStr: JSON.parse(localStorage.getItem('sessionString') || '[]')
};

export const telegram: Module<Telegram, RootState> = {
  state, 
  getters,
  mutations,
  actions
};