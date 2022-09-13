<template>
  <div class="list-toast" v-for="index in toastList" :key="index">
    
  </div>
   
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
  components: {
    
  }
})

export default class Test extends Vue {
   toastList: [] = []
   

}

  
</script>