
import { GetterTree } from 'vuex';
import { Setting } from './types';
import { RootState } from '../types';
import PersonData from '../../models/person'

export const getters: GetterTree<Setting, RootState> = {

  urlAvatar(state): string {
    return state.urlAvatar;
  },
  personData(state): PersonData {
    return state.personData;
  },
  fio(state): string {
    return state.fio;
  }

};