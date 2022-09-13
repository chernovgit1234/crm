
import { GetterTree } from 'vuex';
import { Auth } from './types';
import { RootState } from '../types';

export const getters: GetterTree<Auth, RootState> = {
  auth(state): boolean {
    return state.auth;
  }
};