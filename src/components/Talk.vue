<template>
<div class="columns is-mobile" id="car_app">
  <div class="column is-10 is-offset-1">
    <!--title-->
    <p class="title is-2 is-spaced">자유게시판</p>

    <div class="field has-addons">
      <input class="form-control" type="text" v-model="write_title" placeholder="      글 제목">
      <input class="form-control" type="text" v-model="write_message" placeholder="  글 내용">
      </p>

      <p class="control">
        <button class="button is-primary" @click="insertRecord">글 등록하기</button>
      </p>

    </div>
    <!--contents-->
    <table class="table">
      <thead>
        <tr class="text-center">
          <th class="text-left">#</th>
          <th class="text-left">아이디</th>
          <th class="text-left">제목</th>
          <th class="text-left">내용</th>
          <th class="text-left">작성시간</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{item.index}}</td>
          <!--위치-->
          <td>
            <span class="from-control">{{item.creator.username}}</span>
          </td>
          <td>
            <span class="from-control">{{item.title}}</span>
          </td>
          <!--세부내용-->
          <td>
            <span class="from-control">{{item.message}}</span>
            <div class="control" v-for="comment in comment" v-show="item.edit">
              <tr>
                <td class="from-control">▶</td>
                <td class="from-control">{{comment.writer.username}}</td>
                <td class="text-left">:</td>
                <td class="text-left">{{comment.comment}}</td>
                <td class="text-left">{{comment.created_at2}}</td>
              </tr>
            </div>
          </td>
          <td>
            <span class="from-control">{{item.created_at}}</span>
          </td>
          <div class="from-control">
            <button class="btn btn-primary" @click.prevent="writecomment(item)">댓글쓰기</button>
            <button class="btn btn-warning" v-show="!item.edit" @click.prevent="readcomment(item)">댓글보기</button>
            <button class="btn btn-warning" v-show="item.edit" @click.prevent="cancelcomment(item)">댓글닫기</button>
            <button class="btn btn-danger" @click.prevent="deleteItem(item)">Delete</button>
          </div>

        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import auth from '../auth'
import axios from 'axios'
import swal from 'sweetalert2'
import {
  router
} from '../index'
//Vue.prototype.$http = axios

export default {
  data() {
    return {
      write_title: '',
      write_message: '',
      list: [],
      item: {
        id: '',
        title: '',
        message: '',
        creator: '',
        _startTime: '',
        comment: '',
        created_at: '',
        edit: false,
      },
      comment: {},
      writer: '',
      created_at2: '',
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.list = []
      this.comment = []
      edit: false,
        this.$http.get('http://teamapros.ap-northeast-2.elasticbeanstalk.com/boards/', {
          headers: {
            //Authorization: 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTUzMzY5NDEzOSwiZW1haWwiOiJ0ZXN0ZXJAdGVzdGVyLmNvbSJ9.FdvoNFI41XYIIohHmBEgeHdL-_e1ZKlv74d4UN4D9vk'
            Authorization: auth.getAuthHeader()
          }
        }).then(result => {
          for (var iter = 0; iter < result.data.length; iter++) {
            var temp = {
              'edit': false,
              'index': iter + 1,
              'id': result.data[iter].id,
              'title': result.data[iter].title,
              'message': result.data[iter].message,
              'creator': result.data[iter].creator,
              'created_at': this.$moment(result.data[iter].created_at).format('YYYY년 M월 D일 h시 m분'),
            }
            this.list.push(temp);
          }
        }).catch(error => {
          console.log('서버에러')
          console.log(error)
        })
    },
    async writecomment(item) {
      const {
        value: text
      } = await swal({
        input: 'textarea',
        inputPlaceholder: 'Type your message here',
        showCancelButton: true
      })
      if (text) {
        this.$http.post('http://teamapros.ap-northeast-2.elasticbeanstalk.com/boards/comment/' + item.id, {
          comment: text,
          creator: this.username,
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
      }
    },
    readcomment(item) {
      this.comment = []
      this.$http.get('http://teamapros.ap-northeast-2.elasticbeanstalk.com/boards/comment/' + item.id, {
        headers: {
          //Authorization: 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTUzMzY5NDEzOSwiZW1haWwiOiJ0ZXN0ZXJAdGVzdGVyLmNvbSJ9.FdvoNFI41XYIIohHmBEgeHdL-_e1ZKlv74d4UN4D9vk'
          Authorization: auth.getAuthHeader()
        }
      }).then(result => {
        for (var iter1 = 0; iter1 < result.data.length; iter1++) {
          var temp1 = {
            'comment': result.data[iter1].comment,
            'writer': result.data[iter1].creator,
            'created_at2': this.$moment(result.data[iter1].created_at).format('YYYY년 M월 D일 h시 m분'),
          }
          this.comment.push(temp1);
        }
        console.log('댓글확인 :', this.comment[0].comment)
        //swal(this.comment[0].comment)
      }).catch(error => {
        console.log('서버에러')
        console.log(error)
      })
      item.edit = true;
      console.log(item.edit)
    },
    cancelcomment(item) {
      item.edit = false;
      console.log(item.edit)
    },
    insertRecord() {
      this.$http.post('http://teamapros.ap-northeast-2.elasticbeanstalk.com/boards/', {
        title: this.write_title,
        message: this.write_message,
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
      this.$http.delete('http://teamapros.ap-northeast-2.elasticbeanstalk.com/boards/' + item.id, {
          headers: {
            //Authorization: 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTUzMzY5NDEzOSwiZW1haWwiOiJ0ZXN0ZXJAdGVzdGVyLmNvbSJ9.FdvoNFI41XYIIohHmBEgeHdL-_e1ZKlv74d4UN4D9vk'
            Authorization: auth.getAuthHeader()
          }
        })
        .then((res) => {
          this.getData()
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
