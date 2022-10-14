<template>
  <div class="task">
    <div class="task__body">
      <div class="task__action">
        <button @click.prevent="openPopupCreateTask" class="btn" :disabled="!fio">Создать новую задачу</button>
        <h3 v-if="!fio" style="color: red">Для создания задачи необходимо заполнить имя и/или фамилию в настройках  </h3>
      </div>
      <div class="task__table">
       <TablePrime 
              :headerGrid="[
                {title: 'Ответственный', key: 'Accountable', dataIndex: 'Accountable'},
                {title: 'Автор', key: 'Author', dataIndex: 'Author'},
                {title: 'Дата окончания', key: 'DataEnd', dataIndex: 'DataEnd'},
                {title: 'Дата начала', key: 'DataStart', dataIndex: 'DataStart'},
                {title: 'Исполнитель', key: 'Executor', dataIndex: 'Executor'}, 
                {title: 'Файлы', key: 'Files', dataIndex: 'Files'},
                {title: 'UID', key: 'Id', dataIndex: 'Id',ellipsis: true},
                {title: 'Наименование', key: 'Name', dataIndex: 'Name'},   
                {title: 'Описание', key: 'Remark', dataIndex: 'Remark'},
                {title: 'Статус', key: 'Status', dataIndex: 'Status'}
              ]"
              :dataGrid="dataGrid"
              @refresh='refresh'
              :key="key"
              @onChange='onChange'
       ></TablePrime>
      </div>
    </div>
  </div>
  
  <ThisPopup v-if="popupVisible" @changePopup="changePopup">
    <template #task>
      <CreateTask @closePopup='closePopup'></CreateTask>
    </template>
  </ThisPopup>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import CreateTask from './views/TaskCreate.vue'
import ThisPopup from '../../components/common/ThisPopup.vue'
import TablePrime from '../../components/common/TablePrime.vue';
import { Prop, Watch } from 'vue-property-decorator';
import Typography from 'ant-design-vue/lib/typography/Typography';
@Options({
  components: {
    'CreateTask': CreateTask,
    "ThisPopup": ThisPopup,
    'TablePrime': TablePrime,
    'Typography': Typography
  }
})

export default class Task extends Vue {
  
  dataGrid: Array<Object> =  []
  key: number = 0
  popupVisible: boolean = null
  
  get fio() {
    return this.$store.getters.fio
  }
  get taskList() {
    return this.$store.getters.taskList
  }
  
  onChange() {
    this.popupVisible = true
  }

  refresh() {
    this.$store.dispatch('getTaskList')
    this.key++
  }
  closePopup() {
    this.popupVisible  = null
  }

  @Watch('taskList', { immediate: true, deep: true })
  taskListUpdated(val: any) {
    console.log('taskList',val)
    setTimeout(() => {
      this.dataGrid = val
    }, 600)
  }

  changePopup() {
    this.popupVisible = false 
  }

  openPopupCreateTask() {
    if (this.fio) {
      this.popupVisible = true 
    } else {
      let str = 'task/noname'
      this.$store.commit('setError', str)
      setTimeout(() => {
        this.$store.commit('clearError')
      }, 3000);
    }
  }

  mounted() {
    this.$store.dispatch('getTaskList')
  }
}
</script>
