<template>
  <div>
  <span @click="refresh" class="refresh material-symbols-outlined">refresh</span>
 <Table :scroll="{ x: 1300 }" :columns="headers" :data-source="data" @change="onChange" bordered>

  
 </Table>
    
      
    
 
  </div>
  
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator';
import { Table, Popconfirm, TypographyText } from 'ant-design-vue';
//import TypographyText from 'ant-design-vue/lib/typography/Typography';
//import { a } from 'ant-design-vue';
@Options({
    components: {
      'Table': Table,
      'TypographyText': TypographyText
      
    }
})

export default class TablePrime extends Vue {
  
  headers: Array<Object> = []
  data: any = null

  onChange() {
    console.log('onChangeonChange')
    this.$emit('onChange')
  }
  
  refresh() {
    this.$emit('refresh')
  }

  @Watch('dataGrid', { immediate: true, deep: true })
  dataGridUpdated(val: any) {
    this.data = val
  } 

  @Watch('headerGrid', { immediate: true, deep: true })
  headerGridUpdated(val:  Array<Object>) {
        
    //render: (text)=> <TypographyText></TypographyText>
    this.headers = val
  } 


  @Prop({ default: null })
  dataGrid: any
  
  @Prop({ default: null })
  headerGrid: any
}
</script>

<style scoped>
.w-table__cell {
  white-space: nowrap;
}
</style>