<template>
    <div class="input__item">
        <label for="text-input" class="input__label" v-text="inputLabel"></label>
        <input 
          id="text-input"
          :multiple="multiple"
          :type="type" 
          v-model="value" 
          :placeholder="placeholder" 
          :accept="accept"
          :class="{'input-file': this.file}"
          class="input__field input"
          @change="changeFileInput"
          >
        <span @click="clearField" class="input__clear-btn material-symbols-outlined">close</span>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator';

@Options({
})

export default class TextInput extends Vue {

  value: any | null= null
  file: boolean = null
  
  changeFileInput(e) {

    var files = e.target.files
    var reader = new FileReader()
    reader.onload = function() {
      document.getElementById('person-avatar').src = reader.result;
    }
    reader.readAsDataURL(files[0])
    this.$store.dispatch('uploadAvatar', files)
  }

  clearField() {
    this.value = null
  }

  @Prop({ default: '' })
  inputLabel: string
  
  @Prop({ default: '' })
  inputPlaceholder: string

  @Prop({ default: '' })
  type: string

  @Prop()
  vmodel: string

  @Prop()
  multiple: string

  @Prop({ default: '' })
  accept: string

  @Prop({ default: '' })
  Value: string
  
  @Watch('Value')
  changedValue(val: any) {
   this.value = val 
  } 

  @Watch('value')
  changedvalue(val: string) {
    this.$emit('setValue', val)
  } 

  @Watch('vmodel')
  changedVmodel(val: any) {
    this.value = val
  } 

  @Watch('type' , { immediate: true })
  changedType(val: string) {
    if (val==='file') {
      this.file = true
    }
  } 

  @Watch('value')
  changedFoo(val: string) {
    this.$emit('changedVmodel', val)
  } 

  get placeholder() {
    return `Введите ${this.inputLabel.toLowerCase()}...`
  }
  

}

  
</script>