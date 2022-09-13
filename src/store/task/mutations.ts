
import { MutationTree } from 'vuex';
import { Task } from './types';

export const mutations: MutationTree<Task> = {
  setTaskList(state, taskList) {
    console.log('taskList', taskList)
    state.taskList = taskList
  }
};


