<template>
  <section class="fishing-game" aria-labelledby="fishing-title">
    <div class="fishing-game__panel" :class="{ 'is-ready': phase === 'ready' }">
      <header class="fishing-game__header"><div><h1 id="fishing-title">つり</h1><p>{{ guide }}</p></div><GameProgressPanel :items="progressItems" /></header>
      <div ref="pond" class="pond">
        <span class="sun" aria-hidden="true">☀️</span><span class="shore" aria-hidden="true">🌿</span>
        <div v-if="phase === 'ready'" class="pond-preview" aria-hidden="true"><span>🐟</span><span>🐡</span><span>🦀</span></div>
        <template v-if="isPlaying">
          <p class="message" aria-live="polite">{{ message }}</p>
          <div v-for="fish in fishInPond" :key="fish.id" class="fish" :class="{ target: fish.id === targetFish.id, caught: caughtFishId === fish.id }" :style="fishStyle(fish)" aria-hidden="true"><span>{{ fish.emoji }}</span><i v-if="fish.id === targetFish.id && phase === 'aiming'">ねらい</i></div>
          <div class="rod" :class="{ casting: phase === 'casting' || phase === 'reeling' }" aria-hidden="true"></div>
          <div v-if="phase === 'casting' || phase === 'reeling'" class="line" :style="lineStyle" aria-hidden="true"><span>🪝</span></div>
          <div v-if="phase === 'aiming'" class="controls"><p>おさかなまでの きょり</p><div class="meter" aria-hidden="true"><span class="target-mark" :style="{ left: `${targetFish.power}%` }"></span><span class="power" :style="{ width: `${power}%` }"></span></div><button type="button" class="button cast" @pointerdown.prevent="beginCharge" @pointerup.prevent="releaseCast" @pointercancel="stopCharge" @pointerleave="releaseCast"><span aria-hidden="true">🎣</span>{{ charging ? 'ためてるよ…' : 'おして ためる' }}</button></div>
          <button v-else-if="phase === 'reeling'" type="button" class="button reel" :class="{ 'is-nearly-caught': reelProgress >= reelTaps - 2 }" @click="reel"><span class="reel__label" aria-hidden="true">💪 れんだ！</span><span class="reel-meter" aria-hidden="true"><span :style="{ width: `${reelPower}%` }"></span></span><i>{{ reelProgress }} / {{ reelTaps }}</i><b :key="reelProgress" aria-hidden="true">✨</b></button>
          <div v-else-if="phase === 'catching'" class="celebration" aria-live="assertive"><span>{{ targetFish.emoji }}</span><strong>つれた！</strong><i>✨</i></div>
        </template>
      </div>
      <GameActionButtons v-if="phase === 'ready'" @primary="startGame">はじめる</GameActionButtons>
      <div v-if="isPlaying || hasPlayed" class="caught-fish" aria-label="つれたおさかな" aria-live="polite"><span v-for="(fish, index) in caughtFish" :key="`${fish}-${index}`" aria-hidden="true">{{ fish }}</span></div>
    </div>
    <GameResultOverlay v-if="hasPlayed && !isPlaying" :title="resultTitle" :celebration="catches ? '🎣🐟✨' : '🎣💭'" @retry="startGame">
      <strong class="result-score">{{ catches }}<small>ひき</small></strong>
      <p>{{ resultMessage }}</p>
    </GameResultOverlay>
  </section>
</template>

<script>
import GameActionButtons from '@/components/GameActionButtons.vue'
import GameResultOverlay from '@/components/GameResultOverlay.vue'
import GameProgressPanel from '@/components/GameProgressPanel.vue'

const REEL_TAPS = 7
const TARGET_CATCHES = 5
const FISH_EMOJIS = ['🐟', '🐡', '🐬', '🦀', '🐙']
export default {
  name: 'FishingPage',
  components: { GameActionButtons, GameResultOverlay, GameProgressPanel },
  data () { return { catches: 0, isPlaying: false, hasPlayed: false, phase: 'ready', fishInPond: [], caughtFish: [], targetFish: { id: 0, power: 50, x: 50, lane: 1, emoji: '🐟' }, caughtFishId: null, fishId: 0, power: 0, castPower: 0, charging: false, reelProgress: 0, reelTaps: REEL_TAPS, chargeTimer: null, actionTimer: null } },
  computed: {
    progressItems () { return [{ label: 'ゴール', value: this.catches, max: TARGET_CATCHES, unit: `/ ${TARGET_CATCHES}`, tone: 'yellow' }] },
    guide () { if (!this.isPlaying && !this.hasPlayed) return 'つりざおを ためて、おさかなを つろう！'; if (this.phase === 'reeling') return 'いっぱい タップして、ひきあげよう！'; if (this.phase === 'aiming') return 'きいろの しるしまで ためて、はなそう！'; return 'たくさん つれたね！' },
    message () { if (this.phase === 'reeling') return 'ひっぱれ！ ひっぱれ！'; if (this.phase === 'catching') return 'やったね！'; if (this.phase === 'casting') return this.castPower < this.targetFish.power - 12 ? 'みじかい！' : this.castPower > this.targetFish.power + 12 ? 'とおすぎ！' : 'ヒット！'; return 'きいろの しるしを ねらおう！' },
    resultTitle () { if (this.catches === 0) return 'つぎは つれるよ！'; return this.catches >= TARGET_CATCHES ? 'つりの たつじん！' : this.catches >= 3 ? 'すごい つりびと！' : 'じょうずに つれたね！' },
    resultMessage () { return this.catches === 0 ? 'おさかなは にげちゃった。また ちょうせん！' : 'おさかなを つかまえたよ！' },
    reelPower () { return Math.round((this.reelProgress / REEL_TAPS) * 100) },
    lineStyle () { const pond = this.$refs.pond; if (!pond) return {}; const x = pond.clientWidth * 0.83; const y = pond.clientHeight * 0.82; const fishX = pond.clientWidth * (this.targetFish.x / 100); const fishY = pond.clientHeight * ((28 + this.targetFish.lane * 23) / 100) + 28; const distanceRatio = Math.min(this.castPower / this.targetFish.power, 1.35); const endX = x + (fishX - x) * distanceRatio; const endY = y + (fishY - y) * distanceRatio; const dx = endX - x; const dy = endY - y; return { left: `${x}px`, top: `${y}px`, transform: `rotate(${Math.atan2(dy, dx)}rad)`, width: `${Math.hypot(dx, dy)}px` } }
  },
  beforeDestroy () { this.clearTimers() },
  methods: {
    startGame () { this.clearTimers(); this.catches = 0; this.caughtFish = []; this.fishId = 0; this.power = 0; this.castPower = 0; this.reelProgress = 0; this.isPlaying = true; this.hasPlayed = true; this.phase = 'aiming'; this.fishInPond = [0, 1, 2].map(lane => this.newFish(lane)); this.chooseTarget() },
    newFish (lane) { this.fishId += 1; const x = 14 + Math.floor(Math.random() * 68); return { id: this.fishId, lane, x, power: 22 + Math.round(x * 0.7), emoji: FISH_EMOJIS[Math.floor(Math.random() * FISH_EMOJIS.length)] } },
    chooseTarget () { this.targetFish = this.fishInPond[Math.floor(Math.random() * this.fishInPond.length)] },
    fishStyle (fish) { return { left: `${fish.x}%`, top: `${28 + fish.lane * 23}%` } },
    beginCharge () { if (this.charging || this.phase !== 'aiming') return; this.charging = true; this.chargeTimer = setInterval(() => { this.power = this.power >= 100 ? 0 : this.power + 2 }, 45) },
    stopCharge () { clearInterval(this.chargeTimer); this.chargeTimer = null; this.charging = false },
    releaseCast () { if (!this.charging || this.phase !== 'aiming') return; this.stopCharge(); this.castPower = this.power; const hit = Math.abs(this.castPower - this.targetFish.power) <= 12; this.phase = 'casting'; this.actionTimer = setTimeout(() => { if (!this.isPlaying) return; this.phase = hit ? 'reeling' : 'aiming'; this.power = 0; this.reelProgress = 0 }, 550) },
    reel () { if (this.phase !== 'reeling') return; this.reelProgress += 1; if (this.reelProgress < REEL_TAPS) return; this.caughtFishId = this.targetFish.id; this.phase = 'catching'; this.catches += 1; this.caughtFish.push(this.targetFish.emoji); if (this.catches >= TARGET_CATCHES) { this.actionTimer = setTimeout(() => this.finishGame(), 900); return } this.actionTimer = setTimeout(() => { if (!this.isPlaying) return; const index = this.fishInPond.findIndex(fish => fish.id === this.targetFish.id); this.$set(this.fishInPond, index, this.newFish(this.targetFish.lane)); this.chooseTarget(); this.caughtFishId = null; this.phase = 'aiming'; this.power = 0 }, 900) },
    finishGame () { this.stopCharge(); this.isPlaying = false; this.phase = 'finished'; this.clearTimers() },
    clearTimers () { clearInterval(this.chargeTimer); clearTimeout(this.actionTimer); this.chargeTimer = null; this.actionTimer = null; this.charging = false }
  }
}
</script>

<style scoped>
.fishing-game { align-items: center; background: linear-gradient(#92dbff 0 34%, #1b91c9 34% 100%); box-sizing: border-box; display: flex; min-height: 100vh; padding: 76px 16px 24px; touch-action: manipulation; user-select: none; width: 100%; }.fishing-game__panel { margin: auto; max-width: 650px; width: 100%; }.fishing-game__header { align-items: flex-end; color: #17445b; display: flex; gap: 16px; justify-content: space-between; margin-bottom: 16px; }h1 { font-size: clamp(2.2rem, 9vw, 3.4rem); line-height: 1; margin: 0 0 8px; }p { font-size: 1.05rem; font-weight: bold; margin: 0; }.score { display: flex; gap: 8px; text-align: center; }.score div { background: #fff9df; border: 3px solid #24729a; border-radius: 14px; font-size: .72rem; font-weight: bold; min-width: 62px; padding: 5px 7px; }.score strong { color: #e06931; display: block; font-size: 1.75rem; line-height: 1; }.pond { background: linear-gradient(150deg, rgba(153, 234, 255, .95), #1590c8 56%, #086ba9); border: 7px solid #176e98; border-radius: 30px; box-shadow: inset 0 0 0 5px rgba(220, 250, 255, .5), 0 10px 0 rgba(13, 73, 103, .22); min-height: min(60vh, 530px); overflow: hidden; position: relative; }.pond::before, .pond::after { border: 3px solid rgba(255,255,255,.22); border-radius: 50%; content: ''; height: 90px; position: absolute; width: 150px; }.pond::before { left: -24px; top: 33%; }.pond::after { bottom: 8%; right: -34px; }.sun { font-size: 2.5rem; left: 20px; position: absolute; top: 16px; }.shore { bottom: -10px; font-size: 2.2rem; left: 10px; position: absolute; }.message { background: #fff9df; border: 3px solid #24729a; border-radius: 99px; color: #21566f; font-size: .95rem; left: 50%; padding: 7px 14px; position: absolute; text-align: center; top: 16px; transform: translateX(-50%); white-space: nowrap; z-index: 6; }.fish { font-size: clamp(3rem, 11vw, 5rem); line-height: 1; position: absolute; transform: translateX(-50%); z-index: 3; }.fish.target { animation: swim 1.2s ease-in-out infinite alternate; }.fish.caught { animation: catch .8s ease-out forwards; }.fish i { color: #fff9df; display: block; font-size: .72rem; font-style: normal; text-align: center; text-shadow: 0 2px 2px #195b81; }.rod { bottom: -4px; height: 210px; position: absolute; right: 4%; transform: rotate(-19deg); transform-origin: bottom right; transition: transform .3s ease; width: 20px; z-index: 4; }.rod::before { background: linear-gradient(90deg,#8e502d,#df9a5c,#71391f); border-radius: 12px; bottom: 0; content: ''; height: 210px; position: absolute; width: 16px; }.rod.casting { transform: rotate(-33deg) translate(-34px,-80px); }.line { background: #fff9df; height: 3px; position: absolute; transform-origin: 0 50%; z-index: 5; }.line span { font-size: 1.65rem; position: absolute; right: -13px; top: -16px; }.controls { bottom: 22px; left: 50%; position: absolute; transform: translateX(-50%); width: min(86%,330px); z-index: 8; }.controls p { color: #fff; font-size: .85rem; margin-bottom: 5px; text-align: center; text-shadow: 0 2px 2px #195b81; }.meter { background: rgba(12,75,107,.75); border: 3px solid #fff9df; border-radius: 99px; height: 20px; overflow: hidden; position: relative; }.power { background: linear-gradient(90deg,#93e8ff,#f6ae42); display: block; height: 100%; }.target-mark { background: #ffe54d; border: 2px solid #9a6920; border-radius: 3px; height: 28px; position: absolute; top: -7px; transform: translateX(-50%); width: 12px; z-index: 2; }.button { background: #f29d3e; border: 0; border-bottom: 5px solid #b86424; border-radius: 99px; color: #fff; cursor: pointer; font-family: inherit; font-size: 1.15rem; font-weight: bold; min-height: 54px; padding: 10px 24px; touch-action: manipulation; }.button:active { border-bottom-width: 2px; transform: translateY(3px); }.start { left: 50%; min-width: 190px; position: absolute; top: 50%; transform: translate(-50%,-50%); z-index: 6; }.start:active { transform: translate(-50%,calc(-50% + 3px)); }.cast { display: block; margin: 10px auto 0; min-width: 210px; }.reel { bottom: 34px; left: 50%; min-width: 230px; padding: 8px 18px 10px; position: absolute; transform: translateX(-50%); z-index: 8; }.reel:active { transform: translate(-50%,3px); }.reel__label { display: block; font-size: 1.15rem; }.reel-meter { background: rgba(111, 62, 21, .5); border: 2px solid #fff9df; border-radius: 99px; display: block; height: 13px; margin: 4px 0; overflow: hidden; }.reel-meter span { background: linear-gradient(90deg, #fff071, #ff663d); display: block; height: 100%; transition: width .13s ease-out; }.reel.is-nearly-caught { animation: reel-shake .18s linear infinite; box-shadow: 0 0 0 5px rgba(255, 234, 73, .55); }.reel i { font-size: .72rem; font-style: normal; }.reel b { animation: reel-spark .26s ease-out; font-size: 1.1rem; position: absolute; right: 8px; top: -12px; }.celebration { align-items: center; color: #fff9df; display: flex; flex-direction: column; font-size: 1.6rem; inset: 0; justify-content: center; position: absolute; text-shadow: 0 3px 3px #195b81; z-index: 9; }.celebration span { font-size: 6rem; }.celebration i { font-size: 2rem; font-style: normal; }.result { align-items: center; background: rgba(8,63,94,.48); display: flex; inset: 0; justify-content: center; position: absolute; z-index: 10; }.result > div { background: #fff9df; border: 5px solid #f29d3e; border-radius: 26px; color: #315166; padding: 22px; text-align: center; }.result p { color: #dd6532; font-size: 1.45rem; margin-bottom: 8px; }.result strong { color: #e06931; display: block; font-size: 4.5rem; line-height: 1; margin-bottom: 16px; }.result small { font-size: 1.2rem; }.caught-fish { align-items: center; display: flex; flex-wrap: wrap; font-size: 2.1rem; gap: 4px 8px; justify-content: center; min-height: 76px; padding: 12px 8px 0; }.caught-fish span { animation: caught-fish-pop .3s ease-out; filter: drop-shadow(0 2px 1px rgba(0, 74, 115, .35)); }@keyframes swim { to { transform: translateX(-50%) translateY(-8px) rotate(4deg); } } @keyframes catch { to { opacity: 0; transform: translateX(-50%) translateY(-160px) rotate(30deg) scale(.4); } } @keyframes caught-fish-pop { from { transform: scale(.3) rotate(-20deg); } to { transform: scale(1) rotate(0); } } @keyframes reel-shake { 25% { transform: translateX(calc(-50% - 3px)) rotate(-1deg); } 75% { transform: translateX(calc(-50% + 3px)) rotate(1deg); } } @keyframes reel-spark { from { opacity: 0; transform: scale(.3) rotate(-20deg); } to { opacity: 1; transform: scale(1) rotate(0); } }@media (max-width:480px) { .fishing-game { padding: 68px 10px 18px; }.fishing-game__header { align-items:flex-start; gap:8px; }.fishing-game__header p { font-size:.88rem; max-width:170px; }.pond { min-height:510px; }.message { top:70px; }.rod { right:-5%; } }
.pond-preview { inset: 0; position: absolute; z-index: 3; }
.pond-preview span { animation: swim 1.8s ease-in-out infinite alternate; font-size: clamp(3rem, 11vw, 5rem); line-height: 1; position: absolute; transform: translateX(-50%); }
.pond-preview span:nth-child(1) { left: 24%; top: 30%; }
.pond-preview span:nth-child(2) { animation-delay: -.6s; left: 55%; top: 48%; }
.pond-preview span:nth-child(3) { animation-delay: -1.1s; left: 79%; top: 70%; }
.result-score { color: #fff1a6; display: block; font-size: clamp(3.6rem, 18vw, 5.5rem); line-height: 1; text-shadow: 0 3px 0 #bd5c25; }
.result-score small { color: #fff; font-size: 1.1rem; margin-left: 5px; }

/* 他のゲームと同じく、遊びの舞台と開始ボタンを画面の中央に置く。 */
.fishing-game { align-items: center; display: flex; }
.fishing-game__panel { transform: translateY(clamp(-72px, -8vh, -40px)); }
.pond { height: min(48vw, 330px); min-height: 260px; }

@media (max-width: 480px) {
  .pond { height: 90vw; min-height: 300px; }
}

/* どのゲームも、同じテレビ画面の大きさで遊ぶ。 */
.fishing-game__panel { max-width: 680px; }
.pond { aspect-ratio: 4 / 3; height: auto; min-height: 0; }

/* 見出し、案内、進行カードを全ゲームで同じ順に並べる。 */
.fishing-game__header { align-items: flex-start; flex-direction: column; gap: 8px; }
.game-progress-panel { align-self: flex-end; }

/* テレビ画面の上端を、ほかのゲームと同じ基準線にそろえる。 */
.fishing-game__panel { transform: translateY(-41px); }
@media (max-width: 520px) { .fishing-game__panel { transform: translateY(-49px); } }

/* 共通の見出し位置: ヘッダー直後からゲームを始める。 */
.fishing-game { padding-top: 28px; }
@media (max-width: 520px) { .fishing-game { padding-top: 24px; } }
.fishing-game { align-items: flex-start; }
.fishing-game__panel { margin: 0 auto; transform: none; }
.fishing-game__header p { white-space: nowrap; }
.fishing-game__panel { display: grid; grid-template-rows: auto minmax(0, 1fr) auto; height: calc(100dvh - 100px); }
.pond { min-height: 0; }
.fishing-game__header > .game-progress-panel { width: 100%; }
.fishing-game__panel, .fishing-game__header, .pond { min-width: 0; }
@media (max-width: 480px) { .fishing-game__header p { max-width: none; } }
</style>
