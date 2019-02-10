<template>
<div class="loginapp">

  <h2>로그인하기</h2>
  <p>아이디 및 패스워드를 입력해주십시오.</p>
  <div class="alert alert-danger" v-if="error">
    <p>{{ error }}</p>
  </div>
  <div class="form-group">
    <input type="text" class="form-control" placeholder="Enter your username" v-model="credentials.username">
  </div>
  <div class="form-group">
    <input type="password" class="form-control" placeholder="Enter your password" v-model="credentials.password">
  </div>
  <button class="btn btn-primary" id="login-button" @click="submit()">로그인하기</button>
  <button class="btn btn-primary" id="sign-up-button" @click="movetosignup()">회원가입</button>
</div>
</template>


<script>
import auth from '../auth'
import axios from 'axios'
import swal from 'sweetalert2'
import {
  router
} from '../index'

export default {
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    movetosignup() {
      console.log('signup called')
      this.$router.push('/signup')
    },
    submit() {
      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }
      //시작
      axios.post('http://teamapros.ap-northeast-2.elasticbeanstalk.com/rest-auth/login/', {
          username: credentials.username,
          password: credentials.password
        }).then(response => {
          //  localStorage.setItem('id_token', data.id_token);
          console.log("로그인성공")
          swal({
            title: credentials.username+' 님 \n안녕하세요!',
            text: '로그인 되었습니다.',
            type: 'success',
            confirmButtonText: '확인'
          })
          let config = {
            headers: {
              Authorization: 'JWT ' + response.data.token,
            }
          };
          console.log("토큰 : ", response.data.token)
          console.log("config : ", config)
          //get하는법
          axios.get('http://teamapros.ap-northeast-2.elasticbeanstalk.com/roads/', config)
            .then(response => {
            });
          console.log("테스트 2");
          console.log("토큰 2 : ", response.data.token);
          //console.log("header : ",headers)
          auth.login(this, credentials, credentials.username, response.data.token)
          this.$router.push('/road')
        })
        .catch(error => {
          console.log(error);
          console.log("에러")
          swal({
            title: 'Error!',
            text: '아이디 및 비밀번호가 잘못되었습니다',
            type: 'error',
            confirmButtonText: '확인'
          })

        });
    }
    //끝
  }
}
</script>
<style>
.loginapp {
  display: table;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  width: auto;
}

#loginapp {
  height: 100%;
  margin: 20;
  padding: 0;
  background-color: #E6E6E6;
}

#loginapp .column {
  margin-top: 15%;
}

#loginapp .column>p {
  text-align: center;
}

#sign-up-button {
  float: right;
}

#login-button {
  float: left;
}
</style>
