<template>
  <div id="popup-tools" class="popup">
    <div class="popup__body">
        <div class="popup__content">
            <i @click="changePopup" class="material-icons popup__close">close</i>
            <slot name="auth">
                
            </slot>
            <slot name="task">
                
            </slot>
            <div v-if="load" class="popup__loader">
              <ThisLoader></ThisLoader>
            </div>
            
        </div>
        
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import ThisLoader from './ThisLoader.vue'
import { Vue, Options } from 'vue-class-component'
import { Emit, Watch } from 'vue-property-decorator';

@Options({
  components: {
    'ThisLoader': ThisLoader
  }
})

export default class ThisPopup extends Vue {

get load() {
  return this.$store.getters.load
}

changePopup() {
  this.$emit('changePopup')
}

}

</script>

<style>
  
</style>