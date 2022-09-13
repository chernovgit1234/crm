<template>
  <div class="settings">
    <div class="settings__body">
      <div class="settings__section">
        <div class="settings__title">Персональные данные пользователя:</div>
        <hr class="settings__line"/>
        <div class="settings__content content-settings">
          <form id="formpersonsett" class="content-settings__form" action="" @submit.prevent="submitPersonSettings">
            <div class="content-settings__section">
              <Input  :type="'text'"
                      :inputLabel="'Имя'"
                      @setValue="changeName"
                      :Value="PersonData.Name"
              ></Input>
              <Input :type="'text'"
                      :inputLabel="'Фамилия'"
                      @setValue="changeSurname"
                      :Value="PersonData.Surname"
              ></Input>
              <Input :type="'text'"
                      :inputLabel="'Отчество'"
                      @setValue="changePatronymic"
                      :Value="PersonData.Patronymic"
              ></Input>
              <Input :type="'text'"
                      :inputLabel="'Должность'"
                      @setValue="changePosition"
                      :Value="PersonData.Position"
              ></Input>
              <Input :type="'text'"
                      :inputLabel="'Отдел'"
                      @setValue="changeDepartment"
                      :Value="PersonData.Department"
              ></Input>
            </div>
             <div class="content-settings__section">
              <Input  :type="'date'"
                      :inputLabel="'Дата рождения'"
                      @setValue="changeBirthdate"
                      :Value="PersonData.Birthdate"
              ></Input>
              <Input  :type="'number'"
                      :inputLabel="'Возраст'"
                      @setValue="changeAge"
                      :Value="PersonData.Age"
              ></Input>
              <Input  :type="'text'"
                      :inputLabel="'Адрес проживания'"
                      @setValue="changeAddress"
                      :Value="PersonData.Address"
              ></Input>
              <Input  :type="'text'"
                      :inputLabel="'Семейное положение'"
                      @setValue="changeStatus"
                      :Value="PersonData.Status"
              ></Input>
              <Input  :type="'file'"
                      :inputLabel="'Фото'"
                      :accept="'.jpg, .png, .svg'"
              ></Input>
             </div>
          </form>
          <button form="formpersonsett" type="submit" class="content-settings__submit btn">Обновить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'
import Input from '../../components/common/Input.vue'
import { Prop, Watch } from 'vue-property-decorator';
import PersonData from '../../models/person'
@Options({
    components: {
      'Input': Input
    }
})


export default class Settings extends Vue {

  formData = new FileReader();

  PersonData: PersonData = new PersonData()
  
  get personData() {
    return this.$store.getters.personData
  }

  mounted() {
    this.$store.dispatch('downloadPersonData')
  }

  submitPersonSettings() {

    this.$store.dispatch('updatePersonData', this.PersonData)
  }

  @Watch('personData', { immediate: true, deep: true })
  changepersonData(val: PersonData) {
    this.PersonData = {...val}
  }

  /* @Watch('PersonData', { immediate: true, deep: true })
  changedVsssalue(val: any) {
    console.log('PersonData', val)  
  } */ 
  
  changeName(val) {
    this.PersonData.Name = val ?? null
  }
  changeSurname(val) {
    this.PersonData.Surname = val ?? null
  }
  changePatronymic(val) {
    this.PersonData.Patronymic = val ?? null
  }
  changePosition(val) {
    this.PersonData.Position = val ?? null
  }
  changeDepartment(val) {
    this.PersonData.Department = val ?? null
  }

  changeAddress(val) {
    this.PersonData.Address = val ?? null
  }
  changeAge(val) {
    this.PersonData.Age = val ?? null
  }
  changeStatus(val) {
    this.PersonData.Status = val ?? null 
  }

  changeBirthdate(val) {
    this.PersonData.Birthdate = val ?? null
  }

}
</script>

<style scoped>

</style>