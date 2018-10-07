<template>
  <div class="signupapp">
    <h2>회원가입</h2>
    <p>서비스 이용을 위하여 </p>
    <p>개인정보를 등록해주십시오.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your username"
        v-model="credentials.username"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="credentials.password1"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password again"
        v-model="credentials.password2"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your E-mail address"
        v-model="credentials.email"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your Phone number"
        v-model="credentials.phone"
      >
    </div>
    <button class="btn btn-primary" @click="submit()">등록하기</button>
  </div>
</template>

<script>
import axios from 'axios'
import {router} from '../index'

export default {

  data() {
    return {
      credentials: {
        username: '',
        password1: '',
        password2: '',
        email: '',
        phone: ''
      },
      error: ''
    }
  },

  methods: {

    submit() {
      var credentials = {
        username: this.credentials.username,
        password1: this.credentials.password1,
        password2: this.credentials.password2,
        email: this.credentials.email,
        phone: this.credentials.phone
      }
      //auth.signup(this, credentials, 'secretquote')
      axios.post('http://teamapros.ap-northeast-2.elasticbeanstalk.com/rest-auth/registration/', {
        username: credentials.username,
        password1: credentials.password1,
        password2: credentials.password2,
        email: credentials.email,
        phone: credentials.phone
      })
      .then(response => {
        console.log("회원가입성공")
        console.log(response)
      }).catch(error=>{
        console.log("에러났다");
        alert("좀 더 체계적인 비밀번호를 설정해주십시오.(영문,숫자 포함 8자 이상)\n")
      })
        //router.go('../login')
    }
  }
}

</script>
<style>
.signupapp {display: table; margin-left: auto; font-size:25px; margin-top: 100px; margin-right: auto;  width: auto;}
</style>
