<template>
  <div class="telegram">
    <div class="telegram__content">
        <input class="telegram__input input" v-model="phone" type="number" maxlength="18" placeholder="7хххххххххх" :disabled="hash.length">
        
        <button @click="getCode()" class="telegram__btn btn">Получить код</button>
        
        <input  v-model="code" class="telegram__input input" type="number" maxlength="5" :placeholder="placeholderText">

        <button  @click="singIn()" class="telegram__btn btn">Войти</button>
    </div>
  </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'



@Options({
    components: {
    }
})

export default class Settings extends Vue {
  phone: '' 
  code: ''  

  mounted() {
    console.log('telegram')
  }

    get hash() {
        return this.$store.getters.hash;
    }
    get placeholderText() {
        return this.$store.getters.hash.length ? 'Введите код...' : ''
    }
    get phoneClient() {
        return  (this.phone.match(/\d+/g)).join('')
    }
    get sessionStringLength() {
        return this.$store.getters.sessionStringLength
    }

  

   async getCode() {
      this.$store.dispatch("getCode", this.phoneClient)
    }
    singIn() {
      this.$store.dispatch("signIn", this.code)
    }
}
</script>

<style scoped>

</style>