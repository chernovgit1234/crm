<template>
  <div  class="table">
    <div class="table__body">
        <div class="table__header" id="table-header">
          
        </div>
        <div class="table__content" id="table-content">
          
        </div>
        <div class="table__footer">

        </div>
        
    </div>
  </div>
  
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator';

@Options({
    components: {
    }
})

export default class Table extends Vue {
   arrWidthColHeader: any = new Map()
   @Watch('arrWidthColHeader', { immediate: true, deep: true }) 
   arrWidthColHeaderChange(val: any) {
    console.log('valvalvalval', val)
   }

  @Watch('headerGrid', { immediate: true, deep: true })
  headerGridUpdated(val: any) {
    
    val.forEach(element => {
      
      
        setTimeout(() => {
        let tableHeader = document.getElementById('table-header')

        tableHeader.style.gridTemplateColumns  = `repeat(${val.length}, auto)`
        const headerColumn = document.createElement("span")
        headerColumn.innerText = Object.values(element)[0]
        headerColumn.classList.add('table__column-name')
        const value = tableHeader.offsetWidth 
        tableHeader.append(headerColumn)
      }, 0);

      
      
    });
  }
  
  @Watch('dataGrid', { immediate: true, deep: true })
  dataGridUpdated(val: any) {
    for (let index = 0; index < val.length-1; index++) {
        
        const tableContent =  document.getElementById('table-content')
        const tableRow = document.createElement("div");
        tableRow.classList.add('table__row')
        tableRow.style.gridTemplateColumns  = `repeat(${this.headerGrid.length}, auto)`

        tableContent.append(tableRow)

        for (const key in val[index]) {
           const widths = document.querySelectorAll('.table__column-name')

          if (Object.prototype.hasOwnProperty.call(val[index], key)) {
            const tableRowData = document.createElement("span");
            tableRowData.classList.add('table__row-data')
           
            //tableRowData.style.width = ''
            tableRowData.innerText = Object.values(val[index])[0]
            tableRow.append(tableRowData)
          
          }
        } 
    }
  } 

  @Prop({ default: [] })
  dataGrid: Array<Object>
  
  @Prop({ default: [] })
  headerGrid: Array<string>
}
</script>

<style scoped>

</style>