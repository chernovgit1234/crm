import { GetterTree } from 'vuex';
import { Telegram } from './types';
import { RootState } from '../types';

export const getters: GetterTree<Telegram, RootState> = {
  hash(state): string {
    return state.hash;
  },
  load(state): boolean {
    return state.load;
  },
  sessionString(state): string {
    return state.sessionStr;
  },
  sessionStringLength(state): string {
    return String(state.sessionStr.length);
  }
};