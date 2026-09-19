<template>
  <section class="switch-playground" aria-label="スイッチばん">
    <div class="stars" aria-hidden="true"></div>
    <div class="switch-panel">
      <p class="guide">スイッチを いれてみよう！</p>
      <p class="status" aria-live="polite">{{ statusText }}</p>

      <div class="switches">
        <button
          v-for="(item, index) in switches"
          :key="item.name"
          class="switch-card"
          :class="{ 'is-on': item.on }"
          type="button"
          :aria-pressed="String(item.on)"
          :aria-label="item.name + 'のスイッチを' + (item.on ? 'きる' : 'いれる')"
          @click="toggleSwitch(index)"
        >
          <span class="lamp" :class="item.color" aria-hidden="true"></span>
          <span class="switch-track" aria-hidden="true"><span class="switch-knob"></span></span>
          <span class="switch-name">{{ item.name }}</span>
        </button>
      </div>

      <div class="floor-lights" aria-hidden="true">
        <span v-for="item in switches" :key="item.color" :class="[item.color, { 'is-on': item.on }]"></span>
      </div>
    </div>
  </section>
</template>

<script>
import switchSound from '@/assets/sounds/switch1.mp3'

export default {
  name: 'SwitchPage',
  data () {
    return {
      switches: [
        { name: 'あか', color: 'lamp-red', on: false },
        { name: 'きいろ', color: 'lamp-yellow', on: false },
        { name: 'あお', color: 'lamp-blue', on: false }
      ]
    }
  },
  computed: {
    statusText () {
      const litCount = this.switches.filter(item => item.on).length
      if (litCount === this.switches.length) return 'ぜんぶ ひかった！'
      if (litCount === 0) return 'どれを いれる？'
      return litCount + 'こ ひかった！'
    }
  },
  methods: {
    toggleSwitch (index) {
      this.switches[index].on = !this.switches[index].on
      const audio = new Audio(switchSound)
      audio.currentTime = 0
      audio.play().catch(() => {})
    }
  }
}
</script>

<style scoped>
.switch-playground { align-items: center; background: radial-gradient(circle at 50% 15%, #4b698d 0, transparent 33%), linear-gradient(180deg, #19283f 0%, #101827 68%, #0a101c 100%); box-sizing: border-box; display: flex; justify-content: center; min-height: 100vh; overflow: hidden; padding: 72px 16px 32px; position: relative; width: 100vw; }
.stars, .stars::after { background-image: radial-gradient(circle, rgba(255, 255, 255, .8) 0 1px, transparent 1.5px); background-size: 83px 79px; content: ''; inset: 0; opacity: .42; pointer-events: none; position: absolute; }
.stars::after { background-position: 33px 19px; opacity: .5; }
.switch-panel { background: linear-gradient(145deg, #dbe6ef, #94a7b6 48%, #657889); border: 5px solid #eaf4fa; border-radius: 30px; box-shadow: 0 14px 0 #344555, 0 24px 45px rgba(0, 0, 0, .45), inset 0 2px 2px #fff; box-sizing: border-box; max-width: 660px; padding: clamp(22px, 5vw, 38px); position: relative; text-align: center; width: 100%; z-index: 1; }
.guide, .status { color: #253748; font-size: clamp(1.15rem, 4vw, 1.55rem); font-weight: bold; letter-spacing: .08em; margin: 0; text-shadow: 0 1px 0 rgba(255, 255, 255, .8); }
.status { color: #415466; font-size: clamp(.95rem, 3.4vw, 1.15rem); margin-top: 7px; min-height: 1.6em; }
.switches { display: grid; gap: clamp(14px, 3vw, 25px); grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 26px; }
.switch-card { align-items: center; appearance: none; background: linear-gradient(145deg, #eff5f7, #9cabb4); border: 3px solid #708390; border-radius: 22px; box-shadow: 0 5px 0 #536875, inset 0 2px 2px #fff; cursor: pointer; display: flex; flex-direction: column; min-height: 170px; padding: 15px 8px 12px; touch-action: manipulation; transition: transform .12s ease, box-shadow .12s ease; }
.switch-card:active { box-shadow: 0 1px 0 #536875, inset 0 2px 4px rgba(20, 42, 55, .35); transform: translateY(4px) scale(.98); }
.switch-card:focus-visible { outline: 4px solid #fff; outline-offset: 4px; }
.lamp { background: #51616d; border: 4px solid #42515e; border-radius: 50%; box-shadow: inset 0 3px 5px rgba(0, 0, 0, .45); height: clamp(31px, 8vw, 43px); transition: background .18s ease, box-shadow .18s ease, transform .18s ease; width: clamp(31px, 8vw, 43px); }
.switch-card.is-on .lamp.lamp-red, .floor-lights .lamp-red.is-on { background: #ff5b58; }
.switch-card.is-on .lamp.lamp-yellow, .floor-lights .lamp-yellow.is-on { background: #ffd94e; }
.switch-card.is-on .lamp.lamp-blue, .floor-lights .lamp-blue.is-on { background: #5bbcff; }
.switch-card.is-on .lamp { box-shadow: 0 0 12px 5px currentColor, 0 0 28px 8px currentColor, inset 0 2px 2px rgba(255, 255, 255, .65); transform: scale(1.08); }
.switch-card.is-on .lamp.lamp-red { color: #ff5b58; }.switch-card.is-on .lamp.lamp-yellow { color: #ffd94e; }.switch-card.is-on .lamp.lamp-blue { color: #5bbcff; }
.switch-track { background: linear-gradient(180deg, #647580, #354754); border: 2px solid #30414d; border-radius: 30px; box-shadow: inset 0 2px 4px rgba(0, 0, 0, .5); height: 57px; margin-top: 13px; position: relative; width: min(100%, 92px); }
.switch-knob { background: linear-gradient(145deg, #fff, #aab9c2 60%, #70808a); border: 2px solid #61717a; border-radius: 50%; box-shadow: 0 3px 4px rgba(0, 0, 0, .38), inset 1px 2px 2px #fff; height: 47px; left: 3px; position: absolute; top: 3px; transition: left .18s cubic-bezier(.2, .85, .35, 1.3), transform .18s ease; width: 47px; }
.switch-card.is-on .switch-knob { left: calc(100% - 50px); transform: rotate(10deg); }
.switch-name { color: #344856; font-size: clamp(.95rem, 3.6vw, 1.15rem); font-weight: bold; margin-top: 10px; }
.floor-lights { display: flex; gap: 18px; justify-content: center; margin-top: 25px; }
.floor-lights span { background: #4c5c66; border: 3px solid #596b76; border-radius: 50%; box-shadow: inset 0 2px 3px rgba(0, 0, 0, .45); height: 17px; transition: background .18s ease, box-shadow .18s ease; width: 17px; }
.floor-lights span.is-on { box-shadow: 0 0 11px 4px currentColor, inset 0 1px 1px rgba(255, 255, 255, .6); }.floor-lights .lamp-red.is-on { color: #ff5b58; }.floor-lights .lamp-yellow.is-on { color: #ffd94e; }.floor-lights .lamp-blue.is-on { color: #5bbcff; }
@media (max-width: 390px) { .switch-playground { padding-left: 10px; padding-right: 10px; }.switch-panel { border-radius: 24px; padding-left: 14px; padding-right: 14px; }.switches { gap: 9px; }.switch-card { border-radius: 17px; min-height: 155px; padding-left: 4px; padding-right: 4px; }.switch-track { width: 76px; }.switch-knob { height: 43px; width: 43px; }.switch-card.is-on .switch-knob { left: calc(100% - 46px); } }
@media (prefers-reduced-motion: reduce) { .switch-card, .lamp, .switch-knob, .floor-lights span { transition: none; } }
</style>
