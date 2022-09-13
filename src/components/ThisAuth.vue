<template>
  <div class="auth">
    <div class="auth__body">
        <div class="auth__title" v-text="signin ? 'Вход в систему ':'Регистрация'"></div>
        <button  class="auth__action-title"  @click="changeAction()" v-text="!signin ? 'Вход ':'Регистрация'"></button>
        <form id="formauth" @submit.prevent="submitHandler()" class="form-content">
          <div class="form-content__item" v-if="!signin">
            <label for="authname" class="form-content__label" :class="{'label-error': loginError.length}" >Логин</label>
            <input id="authname" type="text" v-model.trim="login" placeholder="Введите логин..." class="form-content__input input" :class="{'input-error': loginError.length}">
            <small class="form-content__error">{{loginError.length ? loginError[loginError.length-1].$message : ''}}</small>
          </div>
          <div class="form-content__item">
            <label for="authemail" class="form-content__label" :class="{'label-error': emailError.length}">Почта</label>
            <input id="authemail" type="email" v-model.trim="email" placeholder="Введите почту..." class="form-content__input input" :class="{'input-error': emailError.length}">
            <small class="form-content__error">{{emailError.length ? emailError[emailError.length-1].$message : ''}}</small>
          </div>
          <div class="form-content__item">
            <label for="authpass" class="form-content__label" :class="{'label-error': passError.length}">Пароль</label>
            <input id="authpass" v-model.trim="password" placeholder="Введите пароль..." class="form-content__input input" :class="{'input-error': passError.length}">
            <small class="form-content__error">{{passError.length ? passError[passError.length-1].$message : ''}}</small>
          </div>
        </form>
        <button type="submit" form="formauth" class="auth__btn btn" v-text="signin ? 'Войти':'Зарегистрироваться'"></button>
    </div>
  </div>
</template>

<script lang="ts">
import TextInput from './common/Input.vue'
import { Vue, Options } from 'vue-class-component'
import useVuelidate from '@vuelidate/core'
import { required, minLength, email , helpers } from "@vuelidate/validators";
import { Prop, Watch } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
@Options({
    components: {
      "TextInput": TextInput
    },
    validations: {
        login: { 
            required: helpers.withMessage('Поле не может быть пустым', required),
            minLength: helpers.withMessage('Должно быть больше 1 символа', minLength(2)),
            $autoDirty: true
        },
        email: { 
            required: helpers.withMessage('Поле не может быть пустым', required),
            email: helpers.withMessage('Введите корректный email', email)
        },
        password: { 
            required: helpers.withMessage('Поле не может быть пустым', required),
            minLength: helpers.withMessage('Должно быть больше 6 символов', minLength(6))
        }
    }
})

export default class Auth extends Vue {

login: string = ''
email: string = ''
password: number = null

signin: boolean = false

v$: any = useVuelidate({ $lazy: true, $autoDirty: true})

get loginError() {
    let loginError = []
    if (this.v$.$errors) {
    this.v$.$errors.forEach(error=> {
        if (error.$property === 'login') {
       loginError.push(error)
        }
    })
      return loginError
    } else {
      return loginError
    }
}
get emailError() {
    let emailError = [] 
    if (this.v$.$errors) {
    this.v$.$errors.forEach(error=> {
        if (error.$property === 'email') {
        emailError.push(error)
        }
    })
    return emailError
    } else {
    return emailError
    }
}
get passError() {
    let phoneError = [] 
    if (this.v$.$errors) {
    this.v$.$errors.forEach(error=> {
        if (error.$property === 'password') {
        phoneError.push(error)
        }
    })
    return phoneError
    } else {
    return phoneError
    }
}

@Watch('signin', { immediate: true })
changeSignin(value: boolean) {
    if (value == true) {
      this.login = 'testtest'
    } else return
}

changeAction() {
    this.signin = !this.signin
    this.login = ''
    this.email = ''
    this.password = null
    this.v$.$reset()
}

autorizationUser(payload) {
  this.$store.dispatch('autorizationUser', payload)
}

registrationUser(payload: Object) {
  this.$store.dispatch('registrationUser', payload)
}

submitHandler() {
    

    this.v$.$validate()
    
    if (!this.v$.$error) {

        if (this.signin) {
            let payload = {email: this.email, password: this.password}
            this.autorizationUser(payload)
        } else {
            let payload = {email: this.email, password: this.password, login: this.login}
            this.registrationUser(payload)
        }

        this.v$.$reset()
        
    } else {
        return
    }
}
}

</script>