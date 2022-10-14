/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint-disable @typescript-eslint/no-var-requires */
/* tslint:disable no-var-requires */

import { ActionTree } from 'vuex';
import {  Telegram } from './types';
import { RootState } from '../types';

const { StringSession } = require("telegram/sessions");
const {Api, TelegramClient } = require('telegram');

const apiId = 9541772;
const apiHash = "becfca2a5fa9b89c9a4ba7f2c50a73f0";

let sessionTelegramString = ''
if (localStorage.getItem('sessionString')) {
  sessionTelegramString = JSON.parse(localStorage.getItem('sessionString') || '[]')
} else {
  sessionTelegramString = ''
}

const stringSession = new StringSession(sessionTelegramString); 


const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});

let codeHashThisClient = '';
let phoneThisClient = '';

export const actions: ActionTree<Telegram, RootState> = {
  async connectTelegramLoad({commit},sessionString) {
    await client.connect(); 
    sessionTelegramString = sessionString
  },
  async getCode({commit}, phoneClient: string) {
    commit('SET_LOAD')
    
    await client.connect()
    const { phoneCodeHash } = await client.sendCode( 
      {
        apiId,
        apiHash
      },
      String(phoneClient),
      false
    ).catch((error)=>{
      commit('SET_LOAD')
        console.log('errorerrorerror', error)
    })

    phoneThisClient = phoneClient;
    codeHashThisClient = phoneCodeHash;
    commit('SET_LOAD')
    commit('SET_PHONE_AND_HASHCODE', {phoneClient, phoneCodeHash})
  },

  async signIn({commit, dispatch}, codeClient: number) {
    //вход с кодом и хэшом
    commit('SET_LOAD')

    await client.connect(); 

    const objSignIn = {
      phoneNumber: String(phoneThisClient),
      phoneCodeHash: codeHashThisClient,
      phoneCode: String(codeClient)
    }

    await client.invoke(
      new Api.auth.SignIn(objSignIn)
    )

    commit('SET_LOAD')
    const sessionString =  client.session.save()
    commit('SET_SESSION_STRING', sessionString)
  },
  //выход
  async logOut({commit}) {
    await client.invoke(new Api.auth.LogOut({}));
    commit('CLEAR_SESSION_STRING')
  },
  //Проверка , аутентификации  
  async checkAuthorization() {
    await client.connect(); 
    if (await client.checkAuthorization()) 
    {
      console.log("Я залогинен ");
    } else{
      console.log("Система готова. Но я не залогинен");
    }
  },
};