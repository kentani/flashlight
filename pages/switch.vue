<template>
  <div>
    <v-row justify="center" class="mt-24">
      <v-col cols="6" md="4">
        <div class="btn-bg">
          <input
            v-model="switch1"
            type="checkbox"
            checked
            @change="onChangeSwitch1"
          >
          <div class="btn-in">
            <span class="on">on</span>
            <span class="off">off</span>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import switchSound from '@/assets/sounds/switch1.mp3'

export default {
  name: 'switch',
  data: () => ({
    switch1: false,
    audio: {},
  }),
  mounted() {
  },
  methods: {
    onChangeSwitch1() {
      this.audio = new Audio(switchSound);
      this.audio.currentTime = 0;
      this.audio.play();
    }
  }
}
</script>

<style scoped>
.mt-24 {
  margin-top: 96px !important;
}

body {
  text-align: center;
  background-color: #dcdfe5;
}

p {
  text-shadow:
      0 1px 0 rgba(255,255,255,.7) ,
      0 -1px 0 rgba(0,0,0,.5);
  font-size: 28px;
  color: #777;
}

.btn-bg {
  position: relative;
  z-index: 1;
  width: 160px;
  height: 80px;
  margin: 0 auto;
  border-top: 1px solid #a5a7ac;
  border-bottom: 1px solid #fff;
  border-radius: 60px;
  background: #ccc;
  background: #bdbfc1;
  background: linear-gradient(
      to bottom,
      #bbbdbf 15%,
      #f8fafd 100%);
  overflow: hidden;
}

.btn-in {
  position: relative;
  top: 11px;
  left: 15px;
  width: 130px;
  height: 55px;
  border-left: 1px solid #B4B4B4;
  border-top: 1px solid #919191;
  border-bottom: 1px solid #919191;
  border-right: 1px solid #919191;
  border-radius: 60px;
  background: #c8c8c8;
  background: linear-gradient(
      to right,#fff 50%,
      #c8c8c8 100%);
  box-shadow:
    inset -2px 0px 8px rgba(126,126,126,0.6),
    inset 2px 1px 1px rgba(255,255,255,.5);
  transition: all .2s linear;
}

.btn-in:before,
.btn-in:after {
  content: '';
  z-index: -1;
  position: absolute;
  bottom: 25px;
  left: 10px;
  width: 75px;
  height: 35px;
  box-shadow: 0 15px 18px rgba(0,0,0,0.9);
  border-radius: 60px;
  transform: skew(-21deg)rotate(-12deg);
  transition: all .2s linear;
}

input:checked ~ .btn-in:before,
input:checked ~ .btn-in:after {
  content: '';
  z-index: -1;
  position: absolute;
  bottom: 27px;
  left: 48px;
  width: 75px;
  height: 35px;
  box-shadow: 0 15px 18px rgba(0,0,0,0.9);
  border-radius: 60px;
  transform: skew(21deg)rotate(12deg);
}

input:checked ~ .btn-in {
  background: #fff;
  background: linear-gradient(
      to right,
      #c8c8c8 0,
      #fff 68%);
  box-shadow:
    inset 2px 0px 8px rgba(0,0,0,0.2),
    inset -2px 1px 1px rgba(255,255,255,.5);
  border-left: 1px solid #919191;
  border-top: 1px solid #919191;
  border-bottom: 1px solid #919191;
  border-right: 1px solid #B4B4B4;
}

input {
  display: block;
  z-index: 10;
  position: absolute;
  top: 12px;
  left: 16px;
  width: 130px;
  height: 55px;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: pointer;
}

span {
  position: absolute;
  top: 17px;
  transition: all .2s linear;
}

.on {
  left: 25px;
  text-shadow:
      0 -1px 0 rgba(0,0,0,.3),
      0 1px 0 rgba(255,255,255,.5);
  color: #aaa;
}

.off {
  right: 25px;
  text-shadow:
      0 -1px 0 rgba(0,0,0,.3),
      0 1px 0 rgba(255,255,255,.5);
  color: #e27618;
}

input:checked ~ .btn-in .on {
  color: #e27618;
  transition: all .2s linear;
}

input:checked ~ .btn-in .off {
  color: #aaa;
  transition: all .2s linear;
}
</style>
