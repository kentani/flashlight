<template>
  <section class="clown-game" :class="{ 'is-crashing': result === 'caught' }" aria-labelledby="clown-title">
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
        <div class="character runner" :class="runnerClass" :style="runnerStyle" aria-hidden="true">
          <span>🧒</span><small>きみ</small>
        </div>
        <div v-if="stepEffect" class="step-effect" aria-hidden="true">💨</div>
        <div v-if="result === 'safe'" class="celebration" aria-hidden="true">🎉 ✨ 🎉</div>
        <div v-if="wrongMove" class="wrong-move" aria-hidden="true">ちがうよ！</div>
      </div>

      <button
        v-if="!isPlaying && !result"
        type="button"
        class="run-button"
        :class="{ 'is-ready': !isPlaying }"
        @click="startGame"
      >
        <span aria-hidden="true">🏃</span>
        はじめる
      </button>
      <div v-else-if="isPlaying" class="move-choices" aria-label="にげかたをえらぶ">
        <button
          v-for="move in moves"
          :key="move.id"
          type="button"
          class="move-button"
          :class="{ 'is-next': move.id === nextMove }"
          @click="chooseMove(move.id)"
        >
          <span aria-hidden="true">{{ move.icon }}</span>{{ move.label }}
        </button>
      </div>
      <button v-else-if="result === 'safe'" type="button" class="run-button is-ready" @click="startGame">
        <span aria-hidden="true">🔁</span>もういちど
      </button>
    </div>
    <div v-if="result === 'caught'" class="crash-shards" aria-hidden="true">
      <i class="impact-point"></i><i class="crack crack--one"></i><i class="crack crack--two"></i><i class="crack crack--three"></i><i class="crack crack--four"></i><i class="crack crack--five"></i><i class="crack crack--six"></i>
      <i class="shard shard--one"></i><i class="shard shard--two"></i><i class="shard shard--three"></i><i class="shard shard--four"></i><i class="shard shard--five"></i><i class="shard shard--six"></i>
    </div>
    <div v-if="result === 'caught'" class="caught-screen" role="alert">
      <div class="scary-clown" aria-hidden="true">🤡</div>
      <p>みーつけた！</p>
      <button type="button" class="run-button is-ready" @click="startGame"><span aria-hidden="true">🔁</span>もういちど</button>
    </div>
  </section>
</template>

<script>
const GOAL = 8

export default {
  name: 'ClownPage',
  data () {
    return {
      goal: GOAL,
      runnerDistance: 0,
      clownDistance: -3,
      isPlaying: false,
      result: '',
      clownTimer: null,
      effectTimer: null,
      moveTimer: null,
      stepEffect: false,
      wrongMove: false,
      lastMove: '',
      moves: [
        { id: 'left', icon: '⬅️', label: 'ひだり' },
        { id: 'jump', icon: '⬆️', label: 'ジャンプ' },
        { id: 'right', icon: '➡️', label: 'みぎ' }
      ],
      nextMove: 'left'
    }
  },
  computed: {
    guide () {
      if (this.result === 'safe') return 'にげきれた！ おうちに とうちゃく！'
      if (this.result === 'caught') return 'つかまっちゃった…'
      if (this.isPlaying) return `ひかっている「${this.currentMove.label}」を タップ！`
      return 'ピエロがくるよ。にげるボタンを タップ！'
    },
    runnerStyle () {
      return { left: `${10 + this.runnerDistance * 6.8}%` }
    },
    clownStyle () {
      return { left: `${-5 + this.clownDistance * 6.8}%` }
    },
    currentMove () {
      return this.moves.find(move => move.id === this.nextMove)
    },
    runnerClass () {
      return this.lastMove ? `is-moving-${this.lastMove}` : ''
    }
  },
  beforeDestroy () {
    this.clearTimers()
  },
  methods: {
    startGame () {
      this.clearTimers()
      this.runnerDistance = 0
      this.clownDistance = -3
      this.result = ''
      this.wrongMove = false
      this.lastMove = ''
      this.nextMove = 'left'
      this.isPlaying = true
      this.clownTimer = setInterval(this.advanceClown, 1600)
    },
    chooseMove (move) {
      if (move !== this.nextMove) {
        this.showWrongMove()
        return
      }
      this.runnerDistance = Math.min(this.goal, this.runnerDistance + 1)
      this.showMove(move)
      this.showStepEffect()
      if (this.runnerDistance >= this.goal) {
        this.finish('safe')
        return
      }
      this.pickNextMove()
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
    showWrongMove () {
      this.wrongMove = true
      clearTimeout(this.effectTimer)
      this.effectTimer = setTimeout(() => { this.wrongMove = false }, 450)
    },
    showMove (move) {
      this.lastMove = ''
      clearTimeout(this.moveTimer)
      this.$nextTick(() => {
        this.lastMove = move
        this.moveTimer = setTimeout(() => { this.lastMove = '' }, 400)
      })
    },
    pickNextMove () {
      const choices = this.moves.filter(move => move.id !== this.nextMove)
      this.nextMove = choices[Math.floor(Math.random() * choices.length)].id
    },
    clearTimers () {
      clearInterval(this.clownTimer)
      clearTimeout(this.effectTimer)
      clearTimeout(this.moveTimer)
      this.clownTimer = null
      this.effectTimer = null
      this.moveTimer = null
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
.celebration { animation: pop .35s ease-out; font-size: clamp(2.8rem, 12vw, 5rem); left: 50%; position: absolute; top: 18%; transform: translateX(-50%); white-space: nowrap; z-index: 7; }
.wrong-move { animation: pop .25s ease-out; background: #fff9e6; border: 3px solid #58435a; border-radius: 999px; color: #e84a6a; font-size: clamp(1.2rem, 5vw, 1.7rem); font-weight: bold; left: 50%; padding: 4px 14px; position: absolute; top: 15%; transform: translateX(-50%); white-space: nowrap; z-index: 7; }
.is-safe .runner { animation: runner-jump .45s ease-in-out infinite alternate; }
.run-button { animation: button-bounce 1s ease-in-out infinite; background: #e84a6a; border: 4px solid #58435a; border-radius: 999px; box-shadow: 0 6px 0 #58435a; color: #fff; cursor: pointer; display: block; font: bold clamp(1.45rem, 6vw, 2rem) "Yomogi", cursive; margin: 22px auto 0; min-height: 68px; padding: 10px 42px; touch-action: manipulation; width: min(100%, 400px); }.run-button span { margin-right: 8px; }.run-button:active { box-shadow: 0 2px 0 #58435a; transform: translateY(4px); }.run-button:focus-visible { outline: 4px solid #fff; outline-offset: 4px; }.run-button.is-ready { background: #ee8b3d; }
.move-choices { display: grid; gap: 10px; grid-template-columns: repeat(3, 1fr); margin: 22px auto 0; max-width: 560px; }.move-button { background: #fff9e6; border: 4px solid #58435a; border-radius: 20px; box-shadow: 0 5px 0 #58435a; color: #473b4f; cursor: pointer; font: bold clamp(1rem, 4vw, 1.45rem) "Yomogi", cursive; min-height: 74px; padding: 7px; touch-action: manipulation; }.move-button span { display: block; font-size: clamp(1.7rem, 7vw, 2.4rem); line-height: 1; }.move-button.is-next { animation: choice-pulse .65s ease-in-out infinite alternate; background: #ffe25c; border-color: #e84a6a; }.move-button:active { box-shadow: 0 2px 0 #58435a; transform: translateY(3px); }.move-button:focus-visible { outline: 4px solid #fff; outline-offset: 3px; }
.crash-shards { background: rgba(10, 3, 9, .54); inset: 0; overflow: hidden; pointer-events: none; position: fixed; z-index: 20; }.shard { animation: break-away .75s cubic-bezier(.15, .7, .2, 1) both; background: linear-gradient(135deg, rgba(255, 255, 255, .14), transparent 22%, rgba(0, 0, 0, .35) 75%), rgba(109, 21, 48, .42); box-shadow: inset 18px 20px 30px rgba(255, 255, 255, .05), inset -20px -24px 35px rgba(0, 0, 0, .45); display: block; inset: 0; position: absolute; }.shard--one { --x: -30px; --y: -18px; --rotate: -1.5deg; clip-path: polygon(0 0, 49% 0, 43% 35%, 0 51%); }.shard--two { --x: 36px; --y: -20px; --rotate: 2.5deg; clip-path: polygon(49% 0, 100% 0, 100% 30%, 60% 40%, 43% 35%); animation-delay: .05s; }.shard--three { --x: -34px; --y: 36px; --rotate: 2.5deg; clip-path: polygon(0 51%, 43% 35%, 55% 65%, 26% 100%, 0 100%); animation-delay: .1s; }.shard--four { --x: 31px; --y: 8px; --rotate: -2deg; clip-path: polygon(43% 35%, 60% 40%, 100% 30%, 100% 65%, 55% 65%); animation-delay: .14s; }.shard--five { --x: -8px; --y: 42px; --rotate: -1deg; clip-path: polygon(26% 100%, 55% 65%, 74% 100%); animation-delay: .18s; }.shard--six { --x: 36px; --y: 38px; --rotate: -2deg; clip-path: polygon(55% 65%, 100% 65%, 100% 100%, 74% 100%); animation-delay: .22s; }.impact-point { animation: impact .35s ease-out both; background: #0b1117; border: 2px solid rgba(255, 255, 255, .55); border-radius: 50%; box-shadow: 0 0 0 5px rgba(0, 0, 0, .5), 0 0 18px rgba(255, 255, 255, .25); height: 18px; left: 51%; position: absolute; top: 42%; width: 18px; z-index: 2; }.crack { --angle: 0deg; --length: 35vw; animation: crack-grow .35s ease-out both; background: linear-gradient(90deg, rgba(236, 247, 250, .9), rgba(0, 0, 0, .95) 7%, rgba(0, 0, 0, .9) 85%, transparent); box-shadow: 0 1px 1px rgba(255, 255, 255, .3); height: 2px; left: 52%; position: absolute; top: 43%; transform-origin: left center; width: var(--length); z-index: 3; }.crack--one { --angle: -142deg; --length: 43vw; }.crack--two { --angle: -84deg; --length: 40vw; animation-delay: .04s; }.crack--three { --angle: -29deg; --length: 52vw; animation-delay: .08s; }.crack--four { --angle: 24deg; --length: 47vw; animation-delay: .11s; }.crack--five { --angle: 79deg; --length: 46vw; animation-delay: .15s; }.crack--six { --angle: 142deg; --length: 38vw; animation-delay: .18s; }
.is-crashing .game-panel { filter: brightness(.22) saturate(.35); }
.caught-screen { align-items: center; background: radial-gradient(circle at center, rgba(99, 0, 20, .72), rgba(0, 0, 0, .96) 68%); color: #fff; display: flex; flex-direction: column; inset: 0; justify-content: center; position: fixed; text-align: center; text-shadow: 3px 3px 0 #160008, 0 0 18px #f31349; z-index: 21; }.scary-clown { animation: scary-pop .45s cubic-bezier(.18, .8, .2, 1) both, clown-wiggle .2s .45s ease-in-out infinite alternate; filter: contrast(1.85) saturate(2) brightness(.72) drop-shadow(0 0 28px #e60037); font-size: clamp(9rem, 42vw, 22rem); line-height: .8; }.caught-screen p { color: #ffecf0; font-size: clamp(2rem, 12vw, 4.7rem); margin: 12px 0 4px; }.caught-screen .run-button { margin-top: 16px; position: relative; z-index: 22; }
@keyframes puff { from { opacity: 0; transform: scale(.5); } to { opacity: 1; transform: translateX(18px) scale(1.2); } } @keyframes pop { from { opacity: 0; transform: translateX(-50%) scale(.4); } to { opacity: 1; transform: translateX(-50%) scale(1); } } @keyframes clown-wiggle { to { transform: rotate(6deg); } } @keyframes runner-jump { to { transform: translateY(-12px) scaleX(-1); } } @keyframes runner-left { 50% { transform: translateX(-32px) scaleX(-1); } } @keyframes runner-right { 50% { transform: translateX(32px) scaleX(-1); } } @keyframes button-bounce { 50% { transform: translateY(-3px); } } @keyframes choice-pulse { to { box-shadow: 0 5px 0 #58435a, 0 0 0 7px rgba(255, 226, 92, .58); transform: scale(1.04); } } @keyframes break-away { from { opacity: 0; transform: translate(0) rotate(0); } to { opacity: 1; transform: translate(var(--x), var(--y)) rotate(var(--rotate)); } } @keyframes crack-grow { from { opacity: 0; transform: rotate(var(--angle)) scaleX(0); } to { opacity: 1; transform: rotate( var(--angle)) scaleX(1); } } @keyframes impact { from { opacity: 0; transform: scale(3); } to { opacity: 1; transform: scale(1); } } @keyframes scary-pop { from { opacity: 0; transform: scale(.2) rotate(-12deg); } to { opacity: 1; transform: scale(1) rotate(0); } }
.runner.is-moving-left { animation: runner-left .4s ease-out; }.runner.is-moving-right { animation: runner-right .4s ease-out; }.runner.is-moving-jump { animation: runner-jump .4s ease-out; }
@media (max-width: 430px) { .clown-game { padding-left: 12px; padding-right: 12px; }.game-header { align-items: flex-start; flex-direction: column; gap: 8px; }.distance { align-self: flex-end; }.race-field { height: 66vw; min-height: 230px; }.character { bottom: 17%; } }
</style>
