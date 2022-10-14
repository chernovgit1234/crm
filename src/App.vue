<template>
  <div class="app">
    <div class="app__wrapper">
      <div class="app__header">
       <this-header class="" @extendNavbar='extendNavbar'></this-header>
      </div>
      <div class="app__content">
        <this-navbar class="app__nav" id="nav"></this-navbar>
        <main class="app__main" id="main">
          <router-view></router-view>
        </main>
      </div>
    </div>
    <div class="app__auth">
      <ThisPopup v-if="!auth" @changePopup="changePopup">
        <template #auth>
          <this-auth></this-auth>
        </template>
      </ThisPopup>
      <ThisToast v-show="error || message"></ThisToast>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Watch } from 'vue-property-decorator';
import ThisHeader from "./components/ThisHeader.vue"
import ThisNavbar from "./components/ThisNavbar.vue"
import ThisPopup from "./components/common/ThisPopup.vue"
import ThisToast from "./components/common/ThisToast.vue"
import ThisAuth from "./components/ThisAuth.vue"
import { Vue, Options  } from 'vue-class-component'
import { namespace } from "vuex-class";
import messages from './utils/messages'

const counterModule = namespace("counter");
@Options({
    components: {
      "ThisHeader": ThisHeader,
      "ThisNavbar": ThisNavbar,
      "ThisPopup": ThisPopup,
      "ThisAuth": ThisAuth,
      "ThisToast": ThisToast
    }
})

export default class App extends Vue {

  extandNav: boolean = false
  error: string = null
  message: string = null
  auth: boolean = null

  

  get errorCode() {
    this.error = this.$store.getters.error
    return this.error
  }

  get messageCode() {
    this.message = this.$store.getters.message
    return this.message
  }
 
  get authT() {
    return this.$store.getters.auth
  }

  mounted() {
    this.$store.dispatch('getIdToken')
  }

  changePopup() {
    this.auth =  !this.auth 
  }


  extendNavbar() {
    this.extandNav = !this.extandNav
  }

  @Watch('authT')
  async changeAuth(val: boolean) {
    this.auth = val
  }

  @Watch('messageCode')
  async changeMessageCodeCode(val: string) {
    this.$message(messages.info[val] || 'Неизвестное сообщение')
  }

  @Watch('errorCode')
  async changeErrorCode(val: string) {
    this.$error(messages.errors[val] || 'Неизвестная ошибка')
  }

  @Watch('extandNav')
  async changeExtandNav(val: boolean) {
    const nav = document.getElementById('nav')
    const main = document.getElementById('main')
    const navlinks = document.getElementsByClassName("nav__link")

    if (val) {
      for (const element of navlinks){
        element.style.display="none";
      }
      nav.style.width = '80px';
      main.style.paddingLeft = '100px';
    } else {
      for (const element of navlinks){
        element.style.display="block";
      }
      nav.style.width = '250px';
      main.style.paddingLeft = '270px';
    }
  }
}

</script>

<style lang="scss">
.app {
  overflow: hidden;

  &__wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  &__header {
   height:8vh !important;
  }

  &__content {
    height: 92vh !important;
    display: flex;
    position: relative;
  }

  &__nav {
   position: absolute;
   left: 0;
   top: 0;
   width: 250px;
   height: 92vh !important;
  }

  &__main {
    overflow: auto;
    display: flex;
    padding: 20px 20px 20px 270px;
  }
}

</style>


