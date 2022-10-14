
import { Module } from 'vuex';
import { Task } from './types';
import { RootState } from '../types';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const state: Task = {
  taskList: []
};

export const task: Module<Task, RootState> = {
  state, 
  getters,
  mutations,
  actions
};