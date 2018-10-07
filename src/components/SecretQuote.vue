<template>
  <div class="col-sm-6 col-sm-offset-3">
    <h1>관리자 메뉴</h1>
    <button class="btn btn-warning" v-on:click="getQuote()">데이터 읽기</button>
    <div class="quote-area" v-if="quote">
      <h2><blockquote>{{ quote }}</blockquote></h2>
    </div>
  </div>
</template>

<script>
import auth from '../auth'

export default {

  data() {
    return {
      quote: ''
    }
  },

  methods: {
    getQuote() {
      console.log(auth.getAuthHeader)
      this.$http
        .get('http://teamapros.ap-northeast-2.elasticbeanstalk.com/roads/', (data) => {
          this.quote = data[0];
          console.log("연결중")
          console.log(data)
        }, {
          headers: auth.getAuthHeader()
        })
        .error((err) => console.log("에러"+err))
    }
  },

  route: {
    canActivate() {
      return auth.user.authenticated
    }
  }

}
</script>
