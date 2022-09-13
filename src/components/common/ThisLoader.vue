<template>
  <div class="loader loader-1">
    
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  props: {
  },
  data() {
    return {
    }
  },

  components: {
  }
})
</script>

<style lang="scss">
  
  .loader {
    position: relative;
    display: inline-block;

    width: 50px;
    height: 50px;
    border: 2px solid rgb(0, 204, 255);
    border-radius: 50%;
    
    animation: spin 0.75s infinite linear;
    z-index: 100;
    }
    .loader::before,
    .loader::after {
    left: -2px;
    top: -2px;
    display: none;
    position: absolute;
    content: '';
    width: inherit;
    height: inherit;
    border: inherit;
    border-radius: inherit;
  }
  .loader-1 {
    border-top-width: 0;
  }

  @keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
  }

  
  
</style>