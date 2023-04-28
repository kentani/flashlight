<template>
  <div>
    <div
      class="inner"
      :class="pointClass"
      @click="onClickPointer"
    >
      <span class="point"></span>
    </div>
  </div>
</template>

<script>
import sound from '@/assets/sounds/33.mp3'

export default {
  name: 'IndexPage',
  data () {
    return {
      pointClass: "position1",
      currentPosition: 1,
      currentZoom: 1
    }
  },
  methods: {
    onClickPointer() {
      const audio = new Audio(sound)
      audio.currentTime = 0 // 連続で鳴らせるように
      audio.play() // 鳴らす

      const positions = ["1", "2", "3", "4", "5"]
      positions.splice(this.currentPosition - 1, 1)
      const newPosition = positions[Math.floor(Math.random()*positions.length)]

      const zooms = ["1", "2", "3", "4"]
      zooms.splice(this.currentZoom - 1, 1)
      const newZoom = zooms[Math.floor(Math.random()*zooms.length)]

      this.pointClass = "position" + newPosition + " " + "zoom" + newZoom
      this.currentPosition = newPosition
      this.currentZoom = newZoom
    }
  }
}
</script>

<style scoped>
@keyframes pulseMotion {
  0% {
    transform: translate(-50%, -50%) scale(1, 1);
    background-color: rgba(170, 143, 123, 0.4)
  }
  100% {
    transform: translate(-50%, -50%) scale(6.5, 6.5);
    background-color: rgba(170, 143, 123, 0)
  }
}

.inner {
  position: relative;
}

.point {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 60px;
  background-color: #ccc;
  border-radius: 50%;
  transition: background-color cubic-bezier(0.215, 0.61, 0.355, 1) .4s;
  cursor: pointer;
}

.point:after {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: opacity linear 0.4s;
  content: '';
  animation: pulseMotion 1.4s linear infinite;
}

.zoom1 {
  transition: 1.2s;
  transform: scale(1);
}

.zoom2 {
  transition: 1.2s;
  transform: scale(2);
}

.zoom3 {
  transition: 1.2s;
  transform: scale(3);
}

.zoom4 {
  transition: 1.2s;
  transform: scale(4);
}

.position1 {
  position: absolute;
  top: 25%;
  left: 10%;
}

.position2 {
  position: absolute;
  top: 60%;
  left: 45%;
}

.position3 {
  position: absolute;
  top: 40%;
  left: 70%;
}

.position4 {
  position: absolute;
  top: 40%;
  left: 30%;
}

.position5 {
  position: absolute;
  top: 80%;
  left: 80%;
}
</style>
