<template>
  <section class="traffic-playground" aria-label="しんごうき">
    <div class="sky" aria-hidden="true"><span class="cloud cloud-one"></span><span class="cloud cloud-two"></span></div>
    <div class="traffic-board">
      <p class="guide">しんごうを えらぼう！</p>
      <p class="status" aria-live="polite">{{ signal.message }}</p>
      <div class="signal-area">
        <div class="traffic-light" :class="signal.key" aria-hidden="true"><span class="lamp lamp-red"></span><span class="lamp lamp-yellow"></span><span class="lamp lamp-green"></span></div>
        <span class="pole" aria-hidden="true"></span>
      </div>
      <div class="signal-buttons" aria-label="しんごうをえらぶ">
        <button v-for="item in signals" :key="item.key" class="signal-button" :class="[item.key, { 'is-selected': signal.key === item.key }]" type="button" :aria-pressed="String(signal.key === item.key)" @click="selectSignal(item)">
          <span class="signal-button__mark" aria-hidden="true">{{ item.mark }}</span><span>{{ item.label }}</span>
        </button>
      </div>
    </div>
    <div class="road" aria-hidden="true"><span></span><span></span><span></span></div>
  </section>
</template>

<script>
import switchSound from '@/assets/sounds/switch1.mp3'

const SIGNALS = [
  { key: 'red', label: 'とまれ', mark: '✋', message: 'あか！ とまって まとう' },
  { key: 'yellow', label: 'きをつけて', mark: '！', message: 'きいろ！ ゆっくり きをつけて' },
  { key: 'green', label: 'すすめ', mark: '▶', message: 'あお！ すすめ すすめ！' }
]

export default {
  name: 'TrafficLightPage',
  data () { return { signals: SIGNALS, signal: SIGNALS[0] } },
  methods: {
    selectSignal (signal) {
      this.signal = signal
      const audio = new Audio(switchSound)
      audio.currentTime = 0
      audio.play().catch(() => {})
    }
  }
}
</script>

<style scoped>
.traffic-playground { align-items: center; background: linear-gradient(#83d5f1 0 53%, #85bf65 53% 61%, #50565d 61%); box-sizing: border-box; display: flex; flex: 1 0 100%; justify-content: center; min-height: 100vh; overflow: hidden; padding: 82px 16px 90px; position: relative; width: 100%; }
.sky, .sky::before { inset: 0; pointer-events: none; position: absolute; }.sky::before { background: radial-gradient(circle at 13% 18%, rgba(255,255,255,.9) 0 4px, transparent 5px), radial-gradient(circle at 84% 12%, rgba(255,255,255,.9) 0 3px, transparent 4px); content: ''; }.cloud { background: rgba(255,255,255,.86); border-radius: 999px; height: 22px; position: absolute; width: 88px; }.cloud::before, .cloud::after { background: inherit; border-radius: 50%; content: ''; position: absolute; }.cloud::before { height: 38px; left: 17px; top: -16px; width: 38px; }.cloud::after { height: 28px; right: 12px; top: -10px; width: 28px; }.cloud-one { left: 8%; top: 17%; }.cloud-two { right: 8%; top: 27%; transform: scale(.72); }
.traffic-board { max-width: 580px; padding: 12px 0; position: relative; text-align: center; width: 100%; z-index: 1; }.guide, .status { color: #294845; font-size: clamp(1.2rem, 4.5vw, 1.65rem); font-weight: bold; letter-spacing: .08em; margin: 0; text-shadow: 0 2px 0 rgba(255,255,255,.7); }.status { color: #405f59; font-size: clamp(1rem, 3.5vw, 1.2rem); margin-top: 6px; min-height: 1.7em; }
.signal-area { align-items: center; display: flex; flex-direction: column; height: 282px; justify-content: flex-start; margin: 16px auto 2px; }.traffic-light { background: linear-gradient(135deg, #4c5861, #1d282e); border: 5px solid #65747a; border-radius: 32px; box-shadow: inset 0 3px 4px rgba(255,255,255,.18), 0 7px 0 #182328; display: flex; gap: 13px; padding: 17px; position: relative; z-index: 1; }.traffic-light::after { border-color: #1d282e transparent transparent; border-style: solid; border-width: 12px 8px 0; content: ''; left: calc(50% - 8px); position: absolute; top: 100%; }.lamp { background: #263138; border: 4px solid #142027; border-radius: 50%; box-shadow: inset 0 3px 5px rgba(0,0,0,.55); height: 72px; transition: background .16s ease, box-shadow .16s ease, transform .16s ease; width: 72px; }.traffic-light.red .lamp-red { background: #ff514e; box-shadow: 0 0 16px 8px rgba(255,65,62,.7), inset 0 3px 3px rgba(255,255,255,.72); transform: scale(1.07); }.traffic-light.yellow .lamp-yellow { background: #ffd23f; box-shadow: 0 0 16px 8px rgba(255,196,28,.7), inset 0 3px 3px rgba(255,255,255,.72); transform: scale(1.07); }.traffic-light.green .lamp-green { background: #3ecb73; box-shadow: 0 0 16px 8px rgba(36,191,100,.7), inset 0 3px 3px rgba(255,255,255,.72); transform: scale(1.07); }.pole { background: linear-gradient(90deg, #29383d, #607077 48%, #26343a); height: 153px; width: 22px; }.pole::after { background: #29383d; border-radius: 50%; content: ''; display: block; height: 13px; margin: 145px -19px; width: 60px; }
.signal-buttons { display: grid; gap: 10px; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 8px; }.signal-button { align-items: center; appearance: none; background: #f4f0e5; border: 3px solid #b8b4a7; border-radius: 17px; box-shadow: 0 4px 0 #a39f94; color: #34413f; cursor: pointer; display: flex; flex-direction: column; font-size: clamp(.88rem, 3.5vw, 1.05rem); font-weight: bold; gap: 3px; min-height: 88px; padding: 8px 4px; touch-action: manipulation; transition: transform .12s ease, box-shadow .12s ease; }.signal-button__mark { align-items: center; border-radius: 50%; color: #fff; display: flex; font-family: sans-serif; font-size: 1.2rem; height: 32px; justify-content: center; width: 32px; }.signal-button.red .signal-button__mark { background: #e94e49; }.signal-button.yellow .signal-button__mark { background: #d79e00; }.signal-button.green .signal-button__mark { background: #28a95c; }.signal-button.is-selected { border-color: #415a56; box-shadow: 0 2px 0 #82928d, 0 0 0 3px #d5ebe0; transform: translateY(2px); }.signal-button:focus-visible { outline: 4px solid #224fdb; outline-offset: 3px; }.signal-button:active { transform: translateY(4px) scale(.98); }
.road { bottom: 0; display: flex; gap: clamp(44px, 13vw, 145px); height: 20%; justify-content: center; left: 0; padding-top: 36px; position: absolute; transform: perspective(260px) rotateX(42deg); transform-origin: bottom; width: 100%; }.road span { background: #ffe66a; height: 140%; width: clamp(22px, 6vw, 52px); }
@media (max-width: 390px) { .traffic-playground { padding-left: 10px; padding-right: 10px; }.traffic-board { padding-right: 4px; padding-left: 4px; }.signal-area { height: 257px; }.traffic-light { gap: 8px; padding: 12px; }.lamp { height: 64px; width: 64px; }.pole { height: 126px; width: 19px; }.pole::after { margin-top: 119px; }.signal-button { border: 3px solid rgba(255,255,255,.68); border-radius: 14px; min-height: 82px; } }
@media (prefers-reduced-motion: reduce) { .lamp, .signal-button { transition: none; } }
</style>
