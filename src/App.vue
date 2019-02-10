<template>
<div class id="app">
  <nav class="navbar navbar-default">
    <component v-if="user.authenticated" :id="app1" :is="currentMenu" :left="side" v-on:click.native="getData()">
      <a href="#">
      <i class="fa fa-fw fa-user"></i>
      <span @click="login1()">{{username}}</span>
  </a>
      <a href="#">
      <i class="fa fa-fw fa-bitcoin"></i>
      <span>coin : {{coin}}</span>
  </a>

      <a href="#">
      <i class="fa fa-fw fa-bar-chart-o"></i>
      <span @click="movetocoin()">Analytics</span>
  </a>
      <a href="#">
      <i class="fa fa-fw fa-power-off"></i>
      <span @click="logout1()">Logout</span>
  </a>
    </component>
    <div class="container">
      <li>
        <router-link to='/home'>홈</router-link>
      </li>
      <li v-if="!user.authenticated">
        <router-link to="/login">로그인</router-link>
      </li>
      <li v-if="!user.authenticated">
        <router-link to="/signup">회원가입</router-link>
      </li>
      <li v-if="user.admin">
        <router-link to="/secretquote">관리자메뉴</router-link>
      </li>
      <li v-if="user.authenticated">
        <router-link to="/road">교통정보</router-link>
      </li>
      <!-- <li v-if="user.authenticated">
        <router-link to="/cars">차량</router-link>
      </li> -->
      <li v-if="user.authenticated">
        <router-link to="/Crim">범죄차량조회</router-link>
      </li>
      <!-- <li v-if="user.authenticated">
        <router-link to="/Talk">자유게시판</router-link>
      </li> -->
      <li v-if="user.authenticated">
        <router-link to="/Coin">코인획득내역</router-link>
      </li>
      <li v-if="user.authenticated">
        <router-link to="/Premium">프리미엄</router-link>
      </li>
      <li v-if="user.authenticated">
        <router-link to="/Maps">차량위치조회</router-link>
      </li>
      <li v-if="user.authenticated">
        <router-link v-on:click.native="logout1()" to="/login">로그아웃</router-link>>
      </li>
    </div>
  </nav>
  <div class="otherapps">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import auth from './auth/index.js'
import router from './router'
import axios from 'axios'
import swal from 'sweetalert2'
import {
  Slide
} from 'vue-burger-menu'
import slide from './components/Menu/slide';
import bubble from './components/Menu/bubble';
import elastic from './components/Menu/elastic';
import falldown from './components/Menu/fallDown';
import push from './components/Menu/push';

import stack from './components/Menu/stack';
import Menu from './components/Menu';

export default {
  data() {
    return {
      list: [],
      menu: {
        slide: {
          buttonText: 'Slide'
        },
      },
      side: 'left',
      currentMenu: 'slide',
      user: auth.user,
      username: '',
      coin: '',
      Slide
    }
  },
  components: {
    slide,
    Menu,
  },
  created(){
    console.log("확인1");
    auth.checkAuth()
    this.getData()
    //console.log(auth.user.authenticated)
  },
  methods: {
    movetocoin(){
      this.$router.push('/Coin')
    },
    login1() {
      console.log("로그인 시도");
      if(auth.user.username==0)
      this.$router.push('/login')
    },
    logout1() {
      console.log("로그아웃 시도");
      auth.logout()
    },
    getData() {
      this.user.username = auth.user.username;
      console.log('사용자 이름 : ' + auth.user.username)
      this.list = [],
        this.$http.get('http://teamapros.ap-northeast-2.elasticbeanstalk.com/users/profile/' + auth.user.username, {
          headers: {
            //Authorization: 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTUzMzY5NDEzOSwiZW1haWwiOiJ0ZXN0ZXJAdGVzdGVyLmNvbSJ9.FdvoNFI41XYIIohHmBEgeHdL-_e1ZKlv74d4UN4D9vk'
            Authorization: auth.getAuthHeader()
          }
        }).then(result => {
          this.username = result.data.username,
            this.coin = result.data.coin
          //this.list.push(temp);
        }).catch(error => {
          console.log('서버에러')
          console.log(error)
        })
        if(auth.user.username==0){
          this.username='로그인이 \n필요합니다.';
          auth.user.authenticated=false;
        }
      console.log(this.username);
    },
  }

}
</script>

<style>

@import './assets/noty.css';
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  width: auto;
  font: 15px/1.3 'Open Sans', sans-serif;

  text-align: center;
}

a,
a:visited {
  outline: none;

}

a:hover {
  text-decoration: none;
}

section,
footer,
header,
aside,
nav {
  display: block;
}

/*-------------------------
    The menu
--------------------------*/

nav {
  display: inline-block;
  margin: 0px auto 0px;
  /*background-color: #5597b4; 민트색
  */
  background-color: #0174DF;
  box-shadow: 0 1px 1px #ccc;
  border-radius: 2px;
}

@media (max-width: 1000px) {
  nav a {
    display: inline-block;
    padding: 10px 0px;
    color: #fff !important;
    font-weight: bold;
    font-size: 10px;
    text-decoration: none !important;
    line-height: 1.5;
    text-transform: uppercase;
    background-color: transparent;

    -webkit-transition: background-color 0.25s;
    -moz-transition: background-color 0.25s;
    transition: background-color 0.25s;
  }
}

@media (min-width: 999px) {
  nav a {
    display: inline-block;
    padding: 28px 30px;
    color: #fff !important;
    font-weight: bold;
    font-size: 18px;
    text-decoration: none !important;
    line-height: 1;
    text-transform: uppercase;
    background-color: transparent;

    -webkit-transition: background-color 0.25s;
    -moz-transition: background-color 0.25s;
    transition: background-color 0.25s;
  }
}

nav a:first-child {
  border-radius: 2px 0 0 2px;
}

nav a:last-child {
  border-radius: 0 2px 2px 0;
}

nav.home .home,
nav.projects .projects,
nav.services .services,
nav.contact .contact {
  background-color: #e35885;
}

p {
  font-size: 25px;
  font-weight: bold;
}

p b {
  color: #ffffff;
  display: inline-block;
  padding: 5px 10px;
  background-color: #c4d7e0;
  border-radius: 2px;
  text-transform: uppercase;
  font-size: 18px;
}

.resource {
  margin: 0px 0;
}
</style>
