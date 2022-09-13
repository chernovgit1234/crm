
import { GetterTree } from 'vuex';
import { Task } from './types';
import { RootState } from '../types';

export const getters: GetterTree<Task, RootState> = {
  taskList(state): Array<Object> {
    return state.taskList;
  }

};