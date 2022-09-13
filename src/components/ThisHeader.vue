<template>
  <div class="header">
    <div class="header__body">
      <div class="header__nav-trigger material-symbols-outlined"
        @click="$emit('extendNavbar')"
      >menu</div>  
      <div v-if="auth" class="header__person person-header">
        <div class="person-header__info">
          <h2 id="fio" class="person-header__name" v-text="fio?fio:'no name'"></h2>
          <img v-if="urlAvatar" :src="urlAvatar" alt="?" class="person-header__icon" id="person-avatar">
          <img v-else id="person-avatar" class="person-header__icon" src="https://sun9-41.userapi.com/impg/Vn4RZ4tBLHAW-55NtLnM1bhDbV0zcITMmMJhng/uPOcU_TuzOA.jpg?size=604x604&quality=96&sign=09c00a9b62081863fcf09977924303d3&type=album" alt="?">
        </div>
        <span @click="logout" v-if="auth" class="person-header__logout material-symbols-outlined">logout</span>
      </div>
    </div>
    
  </div>
   
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
  components: {
  }
})

export default class ThisHeader extends Vue {
  logout() {
    this.$store.dispatch('logout')
  }

  get fio() {
    return this.$store.getters.fio
  }

  get auth() {
    return this.$store.getters.auth
  }

  get urlAvatar() {
    return this.$store.getters.urlAvatar
  }

  mounted() {
    this.$store.dispatch('updateAvatar')
    this.$store.dispatch('madeFio')
  }

}

  
</script>