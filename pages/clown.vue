<template>
  <section class="clown-game" aria-labelledby="clown-title">
    <div class="game-panel">
      <header class="game-header">
        <div>
          <h1 id="clown-title">ピエロから にげよう！</h1>
          <p aria-live="polite">{{ guide }}</p>
        </div>
        <div class="distance" aria-label="ゴールまでのきょり">
          <span>ゴール</span><strong>{{ runnerDistance }}</strong><small>/ {{ goal }}</small>
        </div>
      </header>

      <div class="race-field" :class="{ 'is-playing': isPlaying, 'is-caught': result === 'caught', 'is-safe': result === 'safe' }">
        <div class="cloud cloud-one" aria-hidden="true">☁️</div>
        <div class="cloud cloud-two" aria-hidden="true">☁️</div>
        <div class="goal" aria-hidden="true"><span>🏠</span><b>ゴール！</b></div>
        <div class="track" aria-hidden="true"></div>
        <div class="character clown" :style="clownStyle" aria-hidden="true">
          <span>🤡</span><small>ピエロ</small>
        </div>
        <div class="character runner" :style="runnerStyle" aria-hidden="true">
          <span>🧒</span><small>きみ</small>
        </div>
        <div v-if="stepEffect" class="step-effect" aria-hidden="true">💨</div>
        <div v-if="result === 'safe'" class="celebration" aria-hidden="true">🎉 ✨ 🎉</div>
        <div v-if="result === 'caught'" class="try-again-effect" aria-hidden="true">😮‍💨</div>
      </div>

      <button
        v-if="!result"
        type="button"
        class="run-button"
        :class="{ 'is-ready': !isPlaying }"
        @click="run"
      >
        <span aria-hidden="true">{{ isPlaying ? '💨' : '🏃' }}</span>
        {{ isPlaying ? 'にげる！' : 'はじめる' }}
      </button>
      <button v-else type="button" class="run-button is-ready" @click="startGame">
        <span aria-hidden="true">🔁</span>もういちど
      </button>
    </div>
  </section>
</template>

<script>
const GOAL = 12

export default {
  name: 'ClownPage',
  data () {
    return {
      goal: GOAL,
      runnerDistance: 0,
      clownDistance: 0,
      isPlaying: false,
      result: '',
      clownTimer: null,
      effectTimer: null,
      stepEffect: false
    }
  },
  computed: {
    guide () {
      if (this.result === 'safe') return 'にげきれた！ おうちに とうちゃく！'
      if (this.result === 'caught') return 'つかまっちゃった。もういちど にげよう！'
      if (this.isPlaying) return 'おおきなボタンを たくさんタップ！'
      return 'ピエロがくるよ。にげるボタンを タップ！'
    },
    runnerStyle () {
      return { left: `${10 + this.runnerDistance * 6.8}%` }
    },
    clownStyle () {
      return { left: `${-5 + this.clownDistance * 6.8}%` }
    }
  },
  beforeDestroy () {
    this.clearTimers()
  },
  methods: {
    startGame () {
      this.clearTimers()
      this.runnerDistance = 0
      this.clownDistance = 0
      this.result = ''
      this.isPlaying = true
      this.clownTimer = setInterval(this.advanceClown, 900)
    },
    run () {
      if (!this.isPlaying) {
        this.startGame()
        return
      }
      this.runnerDistance = Math.min(this.goal, this.runnerDistance + 1)
      this.showStepEffect()
      if (this.runnerDistance >= this.goal) this.finish('safe')
    },
    advanceClown () {
      if (!this.isPlaying) return
      this.clownDistance = Math.min(this.goal, this.clownDistance + 1)
      if (this.clownDistance >= this.runnerDistance) this.finish('caught')
    },
    finish (result) {
      this.result = result
      this.isPlaying = false
      this.clearTimers()
    },
    showStepEffect () {
      this.stepEffect = true
      clearTimeout(this.effectTimer)
      this.effectTimer = setTimeout(() => { this.stepEffect = false }, 250)
    },
    clearTimers () {
      clearInterval(this.clownTimer)
      clearTimeout(this.effectTimer)
      this.clownTimer = null
      this.effectTimer = null
    }
  }
}
</script>

<style scoped>
.clown-game { align-items: center; background: linear-gradient(#9fe2ff 0 55%, #78c85b 55%); box-sizing: border-box; display: flex; min-height: 100vh; padding: 76px 16px 28px; touch-action: manipulation; user-select: none; width: 100%; }
.game-panel { max-width: 680px; width: 100%; }
.game-header { align-items: flex-end; color: #473b4f; display: flex; gap: 16px; justify-content: space-between; margin-bottom: 16px; }
h1 { font-size: clamp(2rem, 8vw, 3.15rem); line-height: 1.05; margin: 0 0 7px; }
p { font-size: clamp(1rem, 4vw, 1.2rem); font-weight: bold; margin: 0; }
.distance { background: #fff9e6; border: 3px solid #58435a; border-radius: 16px; min-width: 102px; padding: 5px 10px; text-align: center; }
.distance span, .distance small { display: block; font-size: .72rem; font-weight: bold; }
.distance strong { color: #e84a6a; font-size: 2rem; line-height: 1; }
.race-field { background: linear-gradient(#dff7ff 0 58%, #edcb85 58%); border: 6px solid #58435a; border-radius: 28px; box-shadow: 0 9px 0 rgba(55, 50, 65, .2); height: min(55vw, 320px); min-height: 240px; overflow: hidden; position: relative; }
.track { background: repeating-linear-gradient(90deg, #f5dfaf 0 24px, #fff1cf 24px 48px); border-bottom: 5px dashed #dd916c; bottom: 0; height: 42%; position: absolute; width: 100%; }
.goal { bottom: 34%; display: flex; flex-direction: column; font-size: clamp(2.8rem, 11vw, 5rem); line-height: .85; position: absolute; right: 2%; text-align: center; z-index: 2; }
.goal b { color: #e84a6a; font-size: clamp(.75rem, 3vw, 1.1rem); text-shadow: 0 1px #fff; }
.character { bottom: 16%; position: absolute; text-align: center; transition: left .25s ease-out; z-index: 4; }
.character span { display: block; filter: drop-shadow(0 4px 1px rgba(72, 51, 44, .22)); font-size: clamp(3.8rem, 15vw, 6.5rem); line-height: 1; }
.character small { background: #fff9e6; border: 2px solid #58435a; border-radius: 999px; color: #473b4f; display: inline-block; font-size: clamp(.7rem, 2.7vw, .95rem); font-weight: bold; padding: 1px 7px; }
.runner { transform: scaleX(-1); }.runner small { transform: scaleX(-1); }.clown { bottom: 15%; }
.cloud { font-size: clamp(2rem, 9vw, 4rem); opacity: .75; position: absolute; }.cloud-one { left: 10%; top: 10%; }.cloud-two { right: 27%; top: 25%; }
.step-effect { animation: puff .25s ease-out; bottom: 25%; color: #fff; font-size: 2rem; left: 57%; position: absolute; z-index: 5; }
.celebration, .try-again-effect { animation: pop .35s ease-out; font-size: clamp(2.8rem, 12vw, 5rem); left: 50%; position: absolute; top: 18%; transform: translateX(-50%); white-space: nowrap; z-index: 7; }
.try-again-effect { top: 26%; }
.is-caught .clown { animation: clown-wiggle .4s ease-in-out infinite alternate; }.is-safe .runner { animation: runner-jump .45s ease-in-out infinite alternate; }
.run-button { animation: button-bounce 1s ease-in-out infinite; background: #e84a6a; border: 4px solid #58435a; border-radius: 999px; box-shadow: 0 6px 0 #58435a; color: #fff; cursor: pointer; display: block; font: bold clamp(1.45rem, 6vw, 2rem) "Yomogi", cursive; margin: 22px auto 0; min-height: 68px; padding: 10px 42px; touch-action: manipulation; width: min(100%, 400px); }.run-button span { margin-right: 8px; }.run-button:active { box-shadow: 0 2px 0 #58435a; transform: translateY(4px); }.run-button:focus-visible { outline: 4px solid #fff; outline-offset: 4px; }.run-button.is-ready { background: #ee8b3d; }
@keyframes puff { from { opacity: 0; transform: scale(.5); } to { opacity: 1; transform: translateX(18px) scale(1.2); } } @keyframes pop { from { opacity: 0; transform: translateX(-50%) scale(.4); } to { opacity: 1; transform: translateX(-50%) scale(1); } } @keyframes clown-wiggle { to { transform: rotate(6deg); } } @keyframes runner-jump { to { transform: translateY(-12px) scaleX(-1); } } @keyframes button-bounce { 50% { transform: translateY(-3px); } }
@media (max-width: 430px) { .clown-game { padding-left: 12px; padding-right: 12px; }.game-header { align-items: flex-start; flex-direction: column; gap: 8px; }.distance { align-self: flex-end; }.race-field { height: 66vw; min-height: 230px; }.character { bottom: 17%; } }
</style>
