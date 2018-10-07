<template>
<div class id="app">

  <nav class="navbar navbar-default">
    <div class="container">
      <li>
        <router-link to='/home'>홈</router-link>
      </li>
      <li v-if="!user.authenticated">
        <router-link to="/login">로그인</router-link>
      </li>
      <li>
        <router-link to="/signup">회원가입</router-link>
      </li>
      <li v-if="user.admin">
        <router-link to="/secretquote">관리자메뉴</router-link>
      </li>
      <li v-if="user.authenticated">
        <router-link to="/road">교통정보</router-link>
      </li>
      <li v-if="user.authenticated">
        <router-link to="/cars">차량</router-link>
      </li>
      <li v-if="user.authenticated">
        <router-link to="/Crim">범죄차량조회</router-link>
      </li>
      <li v-if="user.authenticated">
        <router-link to="/Talk">자유게시판</router-link>
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

export default {
  data() {
    return {
      user: auth.user
    }
  },

  methods: {
    logout1() {
      auth.logout()
    }
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
  background-color: #FA6A6A;
  box-shadow: 0 1px 1px #ccc;
  border-radius: 2px;
}

@media (max-width: 1000px) {
  nav a {
    display: inline-block;
    padding: 0px 0px;
    color: #fff !important;
    font-weight: bold;
    font-size: 10px;
    text-decoration: none !important;
    line-height: 0.5;
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
    padding: 18px 30px;
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
