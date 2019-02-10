<template>
<div class="columns is-mobile" id="post_car_app">
  <div class="column is-10 is-offset-1">
    <!--title-->
    <p class="title is-2 is-spaced">프리미엄 사용자 메뉴
      <div class="from-control">
        <button id="reset" class="button is-warning" @click="reset()">갱신하기</button>
      </div>
    </p>
    <!--input form-->
    <!--도로명-->

    <!--contents-->
    <table class="table">
      <thead>
        <tr class="text-center">
          <th class="text-left">#</th>
          <th class="text-left">도로이름</th>
          <th class="text-left">혼잡도</th>
          <th class="text-left">금일 통행량</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{item.index}}</td>
          <!--차량번호-->
          <td>
            <span class="">{{item.name}}</span>
          </td>
          <td>
            <span class="from-control">{{item.number}}</span>
          </td>
          <!--위치-->
          <td>
            <span class="from-control">{{item.owner}}</span>
          </td>
        </tr>
      </tbody>
    </table>
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
//Vue.prototype.$http = axios

export default {
  data() {
    return {
      list: [],
      item: {
        name: '',
        number: '',
        owner: '',
        location: '',
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.list = []
      this.$http.get('http://teamapros.ap-northeast-2.elasticbeanstalk.com/roads/', {
        headers: {
          //Authorization: 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTUzMzY5NDEzOSwiZW1haWwiOiJ0ZXN0ZXJAdGVzdGVyLmNvbSJ9.FdvoNFI41XYIIohHmBEgeHdL-_e1ZKlv74d4UN4D9vk'
          Authorization: auth.getAuthHeader()
        }
      }).then(result => {
        for (var iter = 0; iter < result.data.length; iter++) {
          var temp = {
            'index': iter + 1,
            'name': result.data[iter].name,
            'number': result.data[iter].location,
            'owner': result.data[iter].speed,
          }
          this.list.push(temp);
        }
      }).catch(error => {
        console.log('서버에러')
        console.log(error)
      })
    },
    reset() {
      this.getData()
    },
  }
}
</script>

<style>
html,
body {
  background-color: #E6E6E6;
}
.table{
  font-size: 20px;
}
.title {
  margin-top: 5%;
  text-align: center;
}

.message:not(:last-child) {
  margin-bottom: 0;
}

.reset.button {
  font-size: 30px;
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
