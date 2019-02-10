import {
  router
} from '../index'
import axios from 'axios'
import Login from '../components/Login.vue'
import Noty from 'noty'
import swal from 'sweetalert2'
const API_URL = 'http://teamapros.ap-northeast-2.elasticbeanstalk.com/rest-auth/'
const LOGIN_URL = API_URL + 'login/'
const SIGNUP_URL = API_URL + 'registration/'
const ROAD_URL = 'http://teamapros.ap-northeast-2.elasticbeanstalk.com/roads/'

export default {
  user: {
    authenticated: false,
    admin: false,
    username:'',
  },

  created() {
    checkAuth()
    this.user.authenticated=false
    this.user.admin=false
  },

  login(context, creds, redirect,data_token) {
    console.log("index.js로 넘어옴")
    localStorage.setItem('id_token', data_token)
    let config = {
      headers: {
        Authorization: 'JWT ' + data_token,
      }
    };
    this.user.username=redirect;
    console.log("data_token : " + data_token);
    console.log("config : " + config);
    if (redirect == "admin") {
      new Noty({
       theme: 'semanticui',
       timeout: 4000,
       progressBar: true,
       type: 'alert',  // alert, success, warning, error, info/information
       text: '관리자입니다.'
     }).show();
      this.user.admin = true;
    }
    //alert("로그인되었습니다.")
    console.log("redirct 확인 : "+redirect);
    console.log("user.username 확인 : "+this.user.username);
    this.user.authenticated = true
    // if (redirect) {
    //   //alert(redirect)
    //   this.$router.push('/Home')
    // }
  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)
    }).error((err) => {
      context.error = err
    })
  },

  logout() {
    swal({
      title: '로그아웃\n 되었습니다.',
      type: 'success',
      confirmButtonText: '확인'
    })
    localStorage.removeItem('id_token')
    this.user.authenticated = false;
    this.user.admin = false;
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
    console.log("로그인 유무 확인 : ",this.user.authenticated);
  },


  getAuthHeader() {
   return 'JWT ' + localStorage.getItem('id_token')
  }
}
