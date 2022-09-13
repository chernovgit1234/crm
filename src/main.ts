
import './styles/styles.scss'
import { createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/compat";
import messagePlugin from './utils/message.plugin'

//import Antd from 'ant-design-vue';
import ant from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


import { createI18n } from 'vue-i18n'
import messages from '../src/i18n/translate'
const i18n = createI18n({
  locale: 'ru',
  messages
})



firebase.initializeApp({
  apiKey: "AIzaSyAQ-nl_c4broLr-7sV3dfF48djf2bSnf1w",
  authDomain: "crm-system-dc1bd.firebaseapp.com",
  databaseURL: "https://crm-system-dc1bd-default-rtdb.firebaseio.com",
  projectId: "crm-system-dc1bd",
  storageBucket: "crm-system-dc1bd.appspot.com",
  messagingSenderId: "169324844629",
  appId: "1:169324844629:web:ff2863b125da73270726dc",
  measurementId: "G-XLGVFMYGP3"
  });

  //.component('Table', Table)
  firebase.auth().onAuthStateChanged(()=> {
    
    createApp(App).use(store).use(router).use(messagePlugin).use(i18n).use(ant).mount("#app")
  })



