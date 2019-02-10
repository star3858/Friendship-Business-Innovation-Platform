<template>
<div class="columns is-mobile" id="car_app">
  <div class="column is-10 is-offset-1">
    <!--title-->
    <p class="title is-1 is-spaced">차량 위치 조회</p>
    <!--input form-->
    <!--도로명-->

    <div class="field has-addons has-addons-centered">
      <input class="from-control" type="text" v-model="maps.car_number" placeholder="      차량번호">
      </p>

      <p class="control">
        <button class="button is-primary" @click="getData()">검색하기</button>
      </p>

    </div>
    <div v-show="maps.state==1">
      <b-img src="https://user-images.githubusercontent.com/35095311/46922567-d2a2b700-d045-11e8-88de-939bb69bb746.png" center fluid-grow width="20" height="50"/>
  </div>
  <div v-show="maps.state==2">
    <b-img src="https://user-images.githubusercontent.com/35095311/46922571-ed752b80-d045-11e8-94a1-b4d7aa173724.png" center fluid-grow width="20" height="50"/>
</div>
<div v-show="maps.state==3">
  <b-img src="https://user-images.githubusercontent.com/35095311/46922573-f6fe9380-d045-11e8-8084-0b2248e00b59.png" center fluid-grow width="20" height="50"/>
</div>
<div v-show="maps.state==4">
  <b-img src="https://user-images.githubusercontent.com/35095311/46922574-02ea5580-d046-11e8-8fb4-dc47893068c6.png" center fluid-grow width="20" height="50"/>
</div>
<div v-show="maps.state==5">
<b-img src="https://user-images.githubusercontent.com/35095311/46922554-aab35380-d045-11e8-95ff-4249ffe73f60.png" center fluid-grow width="20" height="50"/>
</div>
<div v-show="maps.state==6">
<b-img src="https://user-images.githubusercontent.com/35095311/46922562-bdc62380-d045-11e8-84ab-0c5d31869c16.png" center fluid-grow width="20" height="50"/>
</div>
    <!--contents-->
  </div>
</div>
</template>

<script>
import auth from '../auth'
import axios from 'axios'
import Lightbox from 'vue-pure-lightbox'
import {
  router
} from '../index'
import bImg from 'bootstrap-vue/es/components/image/img';
//Vue.prototype.$http = axios

export default {
  data() {
    return {
      state:'',
      maps: {
      number: '',
      state: false,
      },
      list: [],
    }
  },
  methods: {
    getData() {
      var maps = {
        number: this.maps.car_number,
      }
      console.log("입력받은값: "+maps.number)
      this.$http.get('http://teamapros.ap-northeast-2.elasticbeanstalk.com/cars/postcars/'+maps.number+'/', {
        headers: {
          //Authorization: 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTUzMzY5NDEzOSwiZW1haWwiOiJ0ZXN0ZXJAdGVzdGVyLmNvbSJ9.FdvoNFI41XYIIohHmBEgeHdL-_e1ZKlv74d4UN4D9vk'
          Authorization: auth.getAuthHeader()
        }
      }).then(result => {
        console.log("data : "+result.data.location);
        this.maps.state= result.data.location;
      }).catch(error => {
        console.log('서버에러')
        console.log(error)
      })
    },
  }
}
</script>

<style>
html,
body {

  background-color: #E6E6E6;
}

.title {
  text-align: center;
}

.message:not(:last-child) {
  margin-bottom: 0;
}

.message-body {
  font-weight: 600;
}

.button {
  float: right;
}

.income {
  color: green;
}

.outcome {
  color: red;
}
</style>
