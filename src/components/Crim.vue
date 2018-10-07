<template>
<div class="columns is-mobile" id="car_app">
  <div class="column is-10 is-offset-1">
    <!--title-->
    <p class="title is-2 is-spaced">차량 신고 현황</p>
    <!--input form-->
    <!--도로명-->
    <div class="field has-addons">
      <input class="control" type="text" v-model="car_number" placeholder="      차량번호">

      <input class="form-control" type="text" v-model="car_message" placeholder="  신고사유">
      </p>

      <p class="control">
        <button class="button is-primary" @click="insertRecord">신고하기</button>
      </p>

    </div>
    <!--contents-->
    <table class="table">
      <thead>
        <tr class="text-center">
          <th class="text-left">#</th>
          <th class="text-left">차량번호</th>
          <th class="text-left">위치</th>
          <th class="text-left">신고내용</th>
          <th class="text-left">발견여부</th>
          <th class="text-left">발견시간</th>
          <th class="text-left">섬네일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{item.index}}</td>
          <!--차량번호-->
          <td>
            <span class="from-control">{{item.number}}</span>
          </td>
          <!--위치-->
          <td>
            <span class="from-control">{{item.location}}</span>
          </td>
          <!--세부내용-->
          <td>
            <span class="from-control">{{item.message}}</span>

          </td>
          <!--통행여부-->
          <td>
            <span class="from-control">{{item.isFind}}</span>
          </td>

          <td>
            <span class="from-control">{{item._startTime}}</span>
          </td>
          <td>
              <img width="45" height="55" v-img="{ title: '신고 이미지 원본보기' }" :src="item.image">
          </td>
          <div>
            <button class="btn btn-danger" @click.prevent="deleteItem(item)">Delete</button>
          </div>
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
      car_number: '',
      car_message: '',
      list: [],
      item: {
        number: '',
        isFind: '',
        message: '',
        image: '',
        location: '',
        creator: '',
        _startTime: '',
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.list = []
      this.$http.get('http://teamapros.ap-northeast-2.elasticbeanstalk.com/cars/criminalcars/', {
        headers: {
          //Authorization: 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTUzMzY5NDEzOSwiZW1haWwiOiJ0ZXN0ZXJAdGVzdGVyLmNvbSJ9.FdvoNFI41XYIIohHmBEgeHdL-_e1ZKlv74d4UN4D9vk'
          Authorization: auth.getAuthHeader()
        }
      }).then(result => {
        for (var iter = 0; iter < result.data.length; iter++) {
          var temp = {
            'index': iter + 1,
            'number': result.data[iter].car.number,
            'message': result.data[iter].car.message,
            'isFind': result.data[iter].car.isFind,
            'image': result.data[iter].image,
            'location': result.data[iter].location,
            'creator': result.data[iter].creator,
            '_startTime': this.$moment(result.data[iter].created_at).format('YYYY년 M월 D일 h시 m분'),
          }
          this.list.push(temp);
        }
      }).catch(error => {
        console.log('서버에러')
        console.log(error)
      })
    },
    insertRecord() {
      var item = {
        number: this.car_number,
        //  edit: false,
        //  message: this.car_message,
      }

      this.$http.post('http://teamapros.ap-northeast-2.elasticbeanstalk.com/cars/', {
        number: this.car_number,
        message:this.car_message,
        //  edit: false,
        //message: this.car_message,
      }, {
        headers: {
          Authorization: auth.getAuthHeader()
        }
      }).then((res) => {
        console.log('ok')
        this.getData()
      }).catch(error => {
        console.log(error)
      })
    },
    deleteItem(item) {
      this.$http.delete('http://teamapros.ap-northeast-2.elasticbeanstalk.com/cars/criminalcars/' + item.id, {
          headers: {
            //Authorization: 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTUzMzY5NDEzOSwiZW1haWwiOiJ0ZXN0ZXJAdGVzdGVyLmNvbSJ9.FdvoNFI41XYIIohHmBEgeHdL-_e1ZKlv74d4UN4D9vk'
            Authorization: auth.getAuthHeader()
          }
        })
        .then(r => {
          this.getData()
        })
    },
    clickpicture(item) {
      new Vue({
        el: '#demo',
        data() {
          return {
            images: [this.item.image],
          }
        },
        components: {
          vueImages: vueImages
        }
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
