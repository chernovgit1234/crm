<template>
  <div class="task-popup">
        <div class="task-popup__title title">Создание задачи</div>
        <hr class="line"/>
        <div class="task-popup__content task-popup-content"> 
          <form id="form-task" class="task-popup-content__form" action="" @submit.prevent="submitTask">
            <div class="task-popup-content__section1">
                <div class="task-popup-content__section2">
                     <div class="header-task-popup-content__item">
                        <label class="input__label">Автор:</label>
                        <label class="value-label" v-text="fio?fio:'(Заполните имя и фамилию в настройках)'"></label>
                    </div>
                    <Input :type="'text'"
                        :inputLabel="'Название'"
                        @setValue="changeName"
                        :Value="TaskData.Name"
                        >
                    </Input>
                    <Input :type="'text'"
                        :inputLabel="'Исполнитель'"
                        @setValue="changeExecutor"
                        :Value="TaskData.Executor"
                        >
                    </Input>
                    <Input :type="'text'"
                        :inputLabel="'Ответстенный'"
                        @setValue="changeAccountable"
                        :Value="TaskData.Accountable"
                        >
                    </Input>
                </div>
                <div class="task-popup-content__section2">
                    <div class="header-task-popup-content__item">
                        <label class="input__label">Статус:</label>
                        <label class="value-label">Не отправлен</label>
                    </div>
                    <Input :type="'date'"
                        :inputLabel="'Дата создания'"
                        @setValue="changeDataStart"
                        :Value="TaskData.DataStart"
                        >
                        
                    </Input>
                    <Input :type="'date'"
                        :inputLabel="'Дата окончания'"
                        @setValue="changeDataEnd"
                        :Value="TaskData.DataEnd"
                        >
                    </Input>

                </div>
            </div>
            
            <div class="task-popup-content__section1">
                <textarea class="textarea"
                          rows="5"
                          v-model="TaskData.Remark"
                >
                </textarea>
            </div>

          </form>
          <button form="form-task" type="submit" class="task-popup-content__submit btn">Создать</button>
        </div>
      </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'
import Input from '../../../components/common/Input.vue'
import TaskData from '../../../models/task'
//import TaskStatus from '../../../enums/taskStatus'
@Options({
    components: {
        'Input': Input
    }
})

export default class Settings extends Vue {
  
  TaskData: TaskData = new TaskData()
  mounted() {
    console.log('Settings')
    this.initialTaskData()
  }

  get fio() { 
    let str = this.$store.getters.fio
    if (!str.includes('undefined') && !str.includes('null')) {
      return str
    }
    
  }

  submitTask() {
    this.$store.dispatch('updateTaskData', this.TaskData)
    this.$emit('closePopup')
  }
  
  initialTaskData() {
    this.TaskData.Author = this.fio
    //добавить статусы enum
    this.TaskData.Status = 'Не отправлен'
  }

  changeName(val) {
    this.TaskData.Name = val ?? null
  }
  changeExecutor(val) {
    this.TaskData.Executor = val ?? null
  }
  changeAccountable(val) {
    this.TaskData.Accountable = val ?? null
  }
  changeDataStart(val) {
    this.TaskData.DataStart = val ?? null
  }
  changeDataEnd(val) {
    this.TaskData.DataEnd = val ?? null
  }
  changeFiles(val) {
    this.TaskData.Files = val ?? null
  }
  
}
</script>

<style scoped>

</style>