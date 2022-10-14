
import { MutationTree } from 'vuex';
import { Setting } from './types';

export const mutations: MutationTree<Setting> = {
  setAvatar(state, urlAvatar) {
    state.urlAvatar = urlAvatar
  },
  setPersonData(state, personData) {
    state.personData = personData
  },
  setFio(state, {Name, Surname}) {
    let str = `${Name} ${Surname}`
    if (!str.includes('null') && !str.includes('undefined') && (str !=='') && (str !==' ')) {
      state.fio = `${Name} ${Surname}`
    }
  }
};


