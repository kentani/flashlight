<template>
  <section id="flashlight" aria-label="懐中電灯">
    <p class="guide" aria-live="polite">ひかりをタップしてみよう</p>
    <button
      class="inner"
      :class="pointClass"
      type="button"
      aria-label="ライトを動かす"
      @click="onClickPointer"
    >
      <span class="beam" aria-hidden="true"></span>
      <span class="point" aria-hidden="true"></span>
    </button>
  </section>
</template>

<script>
import sound from '@/assets/sounds/33.mp3'

export default {
  name: 'flashlight',
  data () {
    return {
      pointClass: 'position1',
      currentPosition: 1,
      currentZoom: 1
    }
  },
  mounted () {
  },
  methods: {
    onClickPointer () {
      const audio = new Audio(sound)
      audio.currentTime = 0
      audio.play()

      const positions = ['1', '2', '3', '4', '5']
      positions.splice(this.currentPosition - 1, 1)
      const newPosition = positions[Math.floor(Math.random() * positions.length)]

      const zooms = ['1', '2', '3', '4']
      zooms.splice(this.currentZoom - 1, 1)
      const newZoom = zooms[Math.floor(Math.random() * zooms.length)]

      this.pointClass = 'position' + newPosition + ' zoom' + newZoom
      this.currentPosition = newPosition
      this.currentZoom = newZoom
    }
  }
}
</script>

<style scoped>
#flashlight {
  background: radial-gradient(circle at 50% 120%, #172136 0, #070a12 48%, #020307 100%);
  box-sizing: border-box;
  min-height: 100vh;
  overflow: hidden;
  padding-top: 48px;
  position: relative;
  width: 100%;
}

#flashlight::before {
  background-image: radial-gradient(circle, rgba(255, 255, 255, .75) 0 1px, transparent 1.5px), radial-gradient(circle, rgba(182, 215, 255, .5) 0 1px, transparent 1.5px);
  background-position: 12% 17%, 78% 31%;
  background-size: 173px 131px, 239px 197px;
  content: '';
  inset: 48px 0 0;
  opacity: .42;
  pointer-events: none;
  position: absolute;
}

@keyframes pulseMotion {
  0% {
    opacity: .7;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2.7);
  }
}

.inner {
  appearance: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  height: 60px;
  margin: 0;
  padding: 0;
  position: absolute;
  transition: top 1.2s ease, left 1.2s ease, transform 1.2s ease;
  width: 60px;
  z-index: 1;
}

.point {
  display: inline-block;
  position: absolute;
  inset: 0;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, #fff 0 13%, #fff9ca 28%, #ffe884 48%, rgba(255, 224, 107, .32) 70%, transparent 72%);
  border-radius: 50%;
  box-shadow: 0 0 20px 8px rgba(255, 227, 122, .58), 0 0 58px 17px rgba(255, 216, 90, .22);
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
  content: '';
  animation: pulseMotion 1.4s linear infinite;
}

.beam {
  background: radial-gradient(ellipse at center, rgba(255, 239, 174, .19) 0, rgba(255, 226, 117, .08) 42%, transparent 71%);
  border-radius: 50%;
  height: 210px;
  left: 50%;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 210px;
}

.guide {
  color: rgba(255, 245, 205, .92);
  font-size: clamp(1rem, 3.6vw, 1.35rem);
  font-weight: bold;
  left: 50%;
  letter-spacing: .08em;
  margin: 0;
  pointer-events: none;
  position: absolute;
  text-align: center;
  text-shadow: 0 1px 8px #000;
  top: 78px;
  transform: translateX(-50%);
  width: 100%;
  z-index: 1;
}

.inner:focus-visible { border-radius: 50%; outline: 3px solid #fff; outline-offset: 8px; }
.inner:active .point { transform: scale(.9); }

.zoom1 {
  transform: scale(1);
}

.zoom2 {
  transform: scale(2);
}

.zoom3 {
  transform: scale(3);
}

.zoom4 {
  transform: scale(4);
}

.position1 {
  position: absolute;
  top: 20%;
  left: 10%;
}

.position2 {
  position: absolute;
  top: 55%;
  left: 45%;
}

.position3 {
  position: absolute;
  top: 35%;
  left: 70%;
}

.position4 {
  position: absolute;
  top: 35%;
  left: 30%;
}

.position5 {
  position: absolute;
  top: 70%;
  left: 80%;
}
</style>
