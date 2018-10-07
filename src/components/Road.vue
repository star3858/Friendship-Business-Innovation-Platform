<template>
<div class="columns is-mobile" id="app">
  <div class="column is-10 is-offset-1">
    <!--title-->
    <p class="title is-2 is-spaced">도로 현황</p>
    <!--input form-->
    <!--도로명-->
    <div class="field has-addons">
      <select class="w-25" v-model="selected_name">
          <option disabled value="">도로명</option>
          <option>inha-ro</option>
          <option>gi-ro	</option>
        </select>
      <!--위치-->
      <select class="from-control" v-model="selected_location">
          <option disabled value="">위치</option>
          <option>Incheon</option>
        </select>
      <p class="control">
        <input class="form-control" type="text" v-model="item.Road_message" placeholder="세부내용">
      </p>

      <select class="control" v-model="selected_possable">
          <option disabled value="">통행여부</option>
          <option>True</option>
          <option>False</option>
        </select>

      <div class="control">
        <datetime input-class="form-control" placeholder="시작시간" type="datetime" v-model="item.Road_startTime"></datetime>
      </div>

      <div class="control">
        <datetime type="datetime" placeholder="종료시간" input-class="form-control" v-model="item.Road_endTime"></datetime>
      </div>

      <p class="control">
        <button class="button is-primary" @click="insertRecord">Save</button>
      </p>


    </div>
    <!--contents-->
    <table class="table">
      <thead>
        <tr class="text-center">
          <th class="text-left">#</th>
          <th class="text-left">도로명</th>
          <th class="text-left">위치</th>
          <th class="text-left">세부내용</th>
          <th class="text-left">통행여부</th>
          <th class="text-left">시작시간</th>
          <th class="text-left">종료시간</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{item.index}}</td>
          <!--도로명-->
          <td>
            <span class="from-control" v-show="!item.edit">{{item.name}}</span>
            <select class="from-control" v-model="item.name" v-show="item.edit">
              <option disabled value="">도로명</option>
              <option>inha-ro</option>
              <option>gi-ro	</option>
            </select>
          </td>
          <!--위치-->
          <td>
            <span class="from-control" v-show="!item.edit">{{item.location}}</span>
            <select class="from-control" v-model="item.location" v-show="item.edit">
                <option disabled value="">위치</option>
                <option>Incheon</option>
              </select>
          </td>
          <!--세부내용-->
          <td>
            <span class="from-control" v-show="!item.edit">{{item.message}}</span>
            <input type="from-control" v-show="item.edit" v-model="item.message">
          </td>
          <!--통행여부-->
          <td>
            <span class="from-control" v-show="!item.edit">{{item.isimpassable}}</span>
            <select class="from-control" v-model="item.isimpassable" v-show="item.edit">
              <option disabled value="">통행여부</option>
              <option>true</option>
              <option>false</option>
            </select>
          </td>

          <td>
            <span class="from-control" v-show="!item.edit">{{item._startTime}}</span>
            <datetime input-class="form-control" v-show="item.edit" type="datetime" v-model="item.startTime"></datetime>
          </td>

          <td>
            <span class="from-control" v-show="!item.edit">{{item._endTime}}</span>
            <datetime input-class="form-control" v-show="item.edit" type="datetime" v-model="item.endTime"></datetime>
          </td>
            <div>
              <button class="btn btn-primary" v-show="!item.edit" @click.prevent="editItem(item)">Edit</button>
              <button class="btn btn-danger" v-show="!item.edit" @click.prevent="deleteItem(item)">Delete</button>
              <button class="btn btn-success btn-xs" v-show="item.edit" @click.prevent="editdone(item)">done</button>
              <button class="btn btn-warning btn-xs" v-show="item.edit" @click.prevent="canceledit(item)">Cancel</button>
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
import {
  router
} from '../index'
//Vue.prototype.$http = axios
export default {
  data() {
    return {
      test: '',
      selected_name: '',
      selected_possable: '',
      selected_location: '',
      list: [],
      item: {
        name: '',
        location: '',
        message: '',
        isimpassable: '',
        startTime: '',
        endTime: '',
        _startTime: '',
        _endTime: '',
        edit: false,
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.list = []
      this.$http.get('http://teamapros.ap-northeast-2.elasticbeanstalk.com/roads/situation/', {
        headers: {
          //Authorization: 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTUzMzY5NDEzOSwiZW1haWwiOiJ0ZXN0ZXJAdGVzdGVyLmNvbSJ9.FdvoNFI41XYIIohHmBEgeHdL-_e1ZKlv74d4UN4D9vk'
          Authorization: auth.getAuthHeader()
        }
      }).then(result => {
        for (var iter = 0; iter < result.data.length; iter++) {
          var temp = {
            'id': result.data[iter].id,
            'index': iter + 1,
            'edit': false,
            'name': result.data[iter].road.name,
            'location': result.data[iter].road.location,
            'isimpassable': result.data[iter].isimpassable,
            'startTime': result.data[iter].startTime,
            'endTime': result.data[iter].endTime,
            'message': result.data[iter].message,
            '_startTime': this.$moment(result.data[iter].startTime).format('YYYY년 M월 D일 h시 m분'),
            '_endTime': this.$moment(result.data[iter].endTime).format('YYYY년 M월 D일 h시 m분')
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
        name: this.selected_name,
        edit: false,
        location: this.selected_location,
        message: this.item.Road_message,
        isimpassable: this.selected_possable,
        startTime: this.item.Road_startTime,
        endTime: this.item.Road_endTime,
      }

      this.$http.post('http://teamapros.ap-northeast-2.elasticbeanstalk.com/roads/situation/', {
        name: this.selected_name,
        location: this.selected_location,
        message: this.item.Road_message,
        isimpassable: this.selected_possable,
        startTime: this.item.Road_startTime,
        endTime: this.item.Road_endTime,
      }, {
        headers: {
          Authorization: auth.getAuthHeader()
        }
      }).then((res) => {
        console.log('ok')
        this.getData()
      }).catch(error => {
        console.log(this.item.Road_name)
      })
    },
    deleteItem(item) {
      this.$http.delete('http://teamapros.ap-northeast-2.elasticbeanstalk.com/roads/situation/' + item.id, {
          headers: {
            //Authorization: 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTUzMzY5NDEzOSwiZW1haWwiOiJ0ZXN0ZXJAdGVzdGVyLmNvbSJ9.FdvoNFI41XYIIohHmBEgeHdL-_e1ZKlv74d4UN4D9vk'
            Authorization: auth.getAuthHeader()
          }
        })
        .then(r => {
          this.getData()
        })
    },
    editItem(item) {
      item.edit = true;
      console.log('수정중 ' + item.edit);
    },
    editdone(item) {
      item.edit = false;
      this.$http.post('http://teamapros.ap-northeast-2.elasticbeanstalk.com/roads/situation/', {
        name: item.name,
        location: item.location,
        message: item.message,
        isimpassable: item.isimpassable,
        startTime: item.startTime,
        endTime: item.endTime,
      }, {
        headers: {
          Authorization: auth.getAuthHeader()
        }
      }).then((res) => {
        console.log('ok')
        this.deleteItem(item)
      }).catch(error => {
        console.log(this.item.Road_name)
      })
    },
    canceledit(item) {
      item.edit = false;
      console.log('수정끝 ' + item.edit);
    }
  }
}
</script>

<style>
html,
body {
  width:auto;
  background-color: #E6E6E6;
}

.title {
  text-align: center;
}

.message:not(:last-child) {
  margin-bottom: 0;
}

.message-body {
  font-weight: auto;
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
