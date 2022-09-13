<template>
<div class="nav">
  <nav class="nav__menu">
    <ul class="nav__list">
      <li class="nav__item">
        <router-link  :to="'/tasks'" exact-active-class="exact-active" class="nav__logo material-symbols-outlined" data-title="Задачи">task_alt</router-link>
        <router-link  :to="'/tasks'" exact-active-class="exact-active" class="nav__link">Задачи</router-link>
      </li>
      <li class="nav__item">
        <router-link  :to="'/settings'" exact-active-class="exact-active" class="nav__logo material-symbols-outlined" data-title="Задачи">settings</router-link>
        <router-link  :to="'/settings'" exact-active-class="exact-active" class="nav__link">Настройки</router-link>
      </li>
       <li class="nav__item" @mouseover="mousedownTlg" @mouseout="mousedownTlg" >
        <router-link exact-active-class="exact-active"  :to="'/telegram'" class="nav__wrapper-logo-png"><img class="nav__logo-png" src="../assets/icons/telegram.svg"></router-link>
        <router-link  :to="'/telegram'" exact-active-class="exact-active" class="nav__link">Telegram</router-link>
      </li>
    </ul>
  </nav> 
</div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
  components: {
  }
})

export default class ThisNavbar extends Vue {
  mousedownTlg(e) {
    const elem = e.target
    elem.previousElementSibling.firstElementChild.classList.toggle('nav__logo-png-hover')
  }
}

  
</script>