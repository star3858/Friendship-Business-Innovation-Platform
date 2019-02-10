<template>
<div id="app">
  <div class="slider">
    <ul class="slides" :style="style">
      <li v-for="(slide,i) in playslides" :key="i">
        <div class="img" :style="{ backgroundImage: `url(${slide.img})` }"></div>
      </li>
    </ul>
    <ul class="indicators">
      <li v-for="(slide,i) in slides" :key="i" @click="selectSlide(i)" :class="i==current ? 'active' : null">
        <div class="item">
          <span class="title">{{slide.title}}</span>
          <span class="progress">
              <div class="fill" :style="{ width: `${percent}%`}"></div>
              <div class="dot"></div>
            </span>
          <p class="mark">{{slide.mark}}</p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>


<script>
import auth from '../auth'
import axios from 'axios'
import {
  router
} from '../index'

export default {
  data() {
    return {
      user: auth.user,
      slides: [{
          img: "https://user-images.githubusercontent.com/35095311/46920569-1a681500-d02b-11e8-9298-357a5f24d02f.jpeg",
          title: "I-city-U",
          mark: "A-pros hanium project"
        },
        {
          img: "https://user-images.githubusercontent.com/35095311/46920545-c826f400-d02a-11e8-8eb4-ba85a6be1046.jpeg",
          title: "Platform",
          mark: "Amazon Web Services Cloud"
        },
        {
          img: "https://user-images.githubusercontent.com/35095311/46920542-af1e4300-d02a-11e8-9c4b-df35e7e00bbe.jpg",
          title: "Smarter driving",
          mark: "Autonomous & Safety"
        },
        {
          img: "https://user-images.githubusercontent.com/35095311/46920563-07554500-d02b-11e8-89b5-27cccf72efed.png",
          title: "Automate Data collection",
          mark: "Block-Chain Based"
        }
      ],
      current: 0,
      percent: 0,
      timer: 0,
      interval: 0,
      progress: 0,
      duration: 5000,
      playslides: []
    }
  },
  computed: {
    style() {
      switch (this.current % 2) {
        case 0:
          return {
            top: "0"
          };
        case 1:
          return {
            top: "-100%"
          };
      }
    }
  },
  methods: {
    selectSlide(i) {
      this.current = i;
      this.playslides[this.current % 2] = this.slides[this.current];
      this.resetPlay();
    },
    process() {
      this.current++;
      if (this.current >= this.slides.length) {
        this.current = 0;
      }
      this.playslides[this.current % 2] = this.slides[this.current];
      this.resetPlay();
    },
    going() {
      let time = new Date().getTime();
      this.percent = Math.floor(100 * (time - this.timer) / this.duration);
    },
    resetPlay() {
      clearInterval(this.interval);
      clearInterval(this.progress);
      this.play();
    },
    stop() {
      clearInterval(this.interval);
      clearInterval(this.progress);
    },
    play() {
      this.timer = new Date().getTime();
      this.progress = setInterval(this.going, this.duration / 100);
      this.interval = setInterval(this.process, this.duration);
    }
  },
  created() {
    this.playslides[0] = this.slides[0];
    this.playslides[1] = this.slides[1];
    this.play();
    console.log("상태확인 : ",auth.user.authenticated);
    //if(!auth.user.authenticated)auth.logout()
  }
};
</script>

<style>

@media (max-width: 1000px) {
  .slider {
    position: relative;
    z-index: 1;
    overflow: hidden;
    height: 100%;
  }
  .slider ul {
    list-style: none;
  }
  .slider ul.slides {

    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    transition: top 800ms;
  }
  .slider ul.slides li {
    height: 100%;
  }
  .slider ul.slides li .img {
    height: 100%;
    background-size: cover;
    background-position: 50%;
  }
  .slider ul.indicators {
    position: absolute;
    padding-right: 10px;
    right: 0;
    top: 40%;
    transform: translateY(-50%);
    z-index: 2;
    text-align: right;
  }
  .slider ul.indicators li {
    clear: both;
  }
  .slider ul.indicators li .item {
    position: relative;
    margin-bottom: 18px;
    float: right;
  }
  .slider ul.indicators li:last-child .item {
    margin-bottom: 0;
  }
  .slider ul.indicators li .title {
    color: #fff;
    cursor: pointer;
    font-size: 13px;
    font-family: 'SegoeUI-Bold';
    transition: font-size 0.6s ease-out;
  }
  .slider ul.indicators li .mark {

    font-family: 'SegoeUI-Semilight';
  }
  .slider ul.indicators li .dot {
    position: absolute;
    top: 50%;
    right: -20px;
    margin-top: -5.5px;
    margin-left: 10px;
    width: 11px;
    height: 11px;

    border-radius: 50%;
  }
  .slider ul.indicators li .progress {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 2px;
    margin: 8px 0;
    background: rgba(255,255,255,0.5);
  }
  .slider ul.indicators li.active .title {
    transition: font-size 0.6s ease-in;
    font-size: 20px;
    font-family: 'SegoeUI-Light';
  }
  .slider ul.indicators li.active .progress .fill {
    height: 100%;
    background: #fff;
  }
}

@media (min-width: 999px) {
  .slider {
    position: relative;
    z-index: 1;
    overflow: hidden;
    height: 100%;
  }
  .slider ul {
    list-style: none;
  }
  .slider ul.slides {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    transition: top 800ms;
  }
  .slider ul.slides li {
    height: 100%;
  }
  .slider ul.slides li .img {
    height: 100%;
    background-size: cover;
    background-position: 50%;
  }
  .slider ul.indicators {
    position: absolute;
    padding-right: 40px;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    text-align: right;
  }
  .slider ul.indicators li {
    clear: both;
  }
  .slider ul.indicators li .item {
    position: relative;
    margin-bottom: 16px;
    float: right;
  }
  .slider ul.indicators li:last-child .item {
    margin-bottom: 0;
  }
  .slider ul.indicators li .title {
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-family: 'SegoeUI-Bold';
    transition: font-size 0.6s ease-out;
  }
  .slider ul.indicators li .mark {

    font-family: 'SegoeUI-Semilight';
  }
  .slider ul.indicators li .dot {
    position: absolute;
    top: 50%;
    right: -20px;
    margin-top: -5.5px;
    margin-left: 10px;
    width: 11px;
    height: 11px;

    border-radius: 50%;
  }
  .slider ul.indicators li .progress {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 2px;
    margin: 8px 0;
    background: rgba(255,255,255,0.5);
  }
  .slider ul.indicators li.active .title {
    transition: font-size 0.6s ease-in;
    font-size: 36px;
    font-family: 'SegoeUI-Light';
  }
  .slider ul.indicators li.active .progress .fill {
    height: 100%;
    background: #fff;
  }
}
</style>
