<template>
  <section class="mole-game" aria-labelledby="mole-title">
    <div class="game-panel">
      <header class="game-header">
        <div>
          <h1 id="mole-title">もぐらたたき</h1>
          <p v-if="!isPlaying && !hasPlayed">もぐらが出てきたら、すぐにタップ！</p>
          <p v-else-if="isPlaying">もぐらを見つけてタップしよう！</p>
          <p v-else>じょうずにたたけたね！</p>
        </div>
        <div class="scoreboard" aria-live="polite">
          <div><span>のこり</span><strong>{{ timeLeft }}</strong><small>びょう</small></div>
          <div><span>スコア</span><strong>{{ score }}</strong></div>
        </div>
      </header>

      <div class="mole-field" :class="{ 'is-playing': isPlaying, 'is-fever': isFever }">
        <div v-if="isFever" class="fever-status" aria-live="polite">
          <span class="fever-status__sparkle" aria-hidden="true">★</span>
          <strong>フィーバー！</strong>
          <span class="fever-status__hits">れんだ {{ bonusHits }} かい！</span>
          <span :key="feverPulse" class="fever-status__burst" aria-hidden="true">✨</span>
        </div>
        <button
          v-for="hole in holes"
          :key="hole"
          type="button"
          class="hole"
          :class="{ 'has-mole': activeHole === hole, 'bonus-mole': activeHole === hole && isBonusMole, whacked: whackedHole === hole }"
          :aria-label="activeHole === hole ? isBonusMole ? 'たくさんたたけるモグラをたたく' : 'もぐらをたたく' : 'もぐらの穴'"
          :disabled="!isPlaying || activeHole !== hole"
          @touchend.prevent="handleHoleTouch(hole)"
          @click="handleHoleClick(hole)"
        >
          <span class="dirt"></span>
          <span class="mole" aria-hidden="true">🐹</span>
          <span v-if="whackedHole === hole" class="hit-effect" aria-hidden="true">
            <span class="impact">💥</span>
            <span class="hammer">🔨</span>
            <span class="star star-one">★</span>
            <span class="star star-two">★</span>
          </span>
        </button>
      </div>

      <div v-if="hasPlayed && !isPlaying" class="game-result" role="alert">
        <div class="game-result__card">
          <p class="game-result__title">{{ resultTitle }}</p>
          <p>こんかいのスコア</p>
          <strong>{{ score }}<small>てん</small></strong>
          <p class="game-result__hint">{{ resultMessage }}</p>
          <button type="button" class="result-button" @click="startGame">もういちど あそぶ</button>
          <nuxt-link to="/" class="result-button">やめる</nuxt-link>
        </div>
      </div>

      <GameStartOverlay v-if="!isPlaying && !hasPlayed" title="もぐらたたき" message="もぐらを みつけて タップ！" @start="startGame" />

      <button v-if="isPlaying || hasPlayed" type="button" class="start-button" @click="startGame">
        {{ isPlaying ? 'さいしょから やりなおす' : hasPlayed ? 'もういちど あそぶ' : 'はじめる' }}
      </button>
    </div>
  </section>
</template>

<script>
import whackSound from '@/assets/sounds/ok.mp3'

const MIN_MOLE_DURATION = 1250
const MAX_MOLE_DURATION = 2200
const BONUS_MOLE_DURATION = 3800
const GAME_DURATION = 15

export default {
  name: 'MolePage',
  data () {
    return {
      holes: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      score: 0,
      timeLeft: GAME_DURATION,
      activeHole: null,
      whackedHole: null,
      isBonusMole: false,
      bonusHits: 0,
      feverPulse: 0,
      lastHoleTouchAt: 0,
      isPlaying: false,
      hasPlayed: false,
      bestScore: 0,
      isNewRecord: false,
      moleTimer: null,
      countdownTimer: null,
      whackTimer: null,
      whackAudio: null,
      bonusAudio: null
    }
  },
  computed: {
    isFever () {
      return this.isPlaying && this.activeHole !== null && this.isBonusMole
    },
    resultTitle () {
      if (this.isNewRecord) return 'しんきろく！'
      if (this.score >= 20) return 'マスターです！'
      if (this.score >= 10) return 'すごい！'
      return 'じかんだよ！'
    },
    resultMessage () {
      if (this.isNewRecord) return 'ベストスコアを こうしんしたよ！'
      if (this.score >= 20) return 'もぐらたたきの たつじんだね！'
      if (this.score >= 10) return 'とっても じょうず！'
      return 'もういちど あそぶ？'
    }
  },
  mounted () {
    this.loadBestScore()
  },
  beforeDestroy () {
    this.clearTimers()
  },
  methods: {
    startGame () {
      this.clearTimers()
      this.score = 0
      this.timeLeft = GAME_DURATION
      this.activeHole = null
      this.whackedHole = null
      this.isBonusMole = false
      this.bonusHits = 0
      this.feverPulse = 0
      this.lastHoleTouchAt = 0
      this.isNewRecord = false
      this.isPlaying = true
      this.hasPlayed = true
      this.prepareAudio()
      this.showMole()
      this.countdownTimer = setInterval(() => {
        this.timeLeft -= 1
        if (this.timeLeft <= 0) this.finishGame()
      }, 1000)
    },
    showMole () {
      if (!this.isPlaying) return
      let nextHole = Math.floor(Math.random() * this.holes.length)
      if (this.holes.length > 1 && nextHole === this.activeHole) {
        nextHole = (nextHole + 1) % this.holes.length
      }
      this.activeHole = nextHole
      this.isBonusMole = Math.random() > 0.75
      this.bonusHits = 0
      this.moleTimer = setTimeout(() => {
        this.activeHole = null
        this.showMole()
      }, this.isBonusMole ? BONUS_MOLE_DURATION : this.moleDuration())
    },
    whack (hole) {
      if (!this.isPlaying || hole !== this.activeHole) return
      if (!this.isBonusMole) {
        clearTimeout(this.moleTimer)
        this.activeHole = null
      }
      this.whackedHole = hole
      this.score += 1
      if (this.isBonusMole) {
        this.bonusHits += 1
        this.feverPulse += 1
      }
      this.playWhackSound(this.isBonusMole)
      this.whackTimer = setTimeout(() => {
        this.whackedHole = null
        if (!this.isBonusMole) this.showMole()
      }, 180)
    },
    handleHoleTouch (hole) {
      this.lastHoleTouchAt = Date.now()
      this.whack(hole)
    },
    handleHoleClick (hole) {
      // iOS は touchend の直後に click も発火することがあるため、同じ一打を二重加算しない。
      if (Date.now() - this.lastHoleTouchAt < 500) return
      this.whack(hole)
    },
    finishGame () {
      this.isPlaying = false
      this.activeHole = null
      this.isBonusMole = false
      this.bonusHits = 0
      this.isNewRecord = this.score > this.bestScore
      if (this.isNewRecord) {
        this.bestScore = this.score
        try {
          window.localStorage.setItem('mole-best-score', String(this.bestScore))
        } catch (_error) {
          // localStorage が使えない環境でもゲームを続ける。
        }
      }
      this.clearTimers()
    },
    clearTimers () {
      clearTimeout(this.moleTimer)
      clearTimeout(this.whackTimer)
      clearInterval(this.countdownTimer)
      this.moleTimer = null
      this.whackTimer = null
      this.countdownTimer = null
    },
    moleDuration () {
      return MIN_MOLE_DURATION + Math.floor(Math.random() * (MAX_MOLE_DURATION - MIN_MOLE_DURATION + 1))
    },
    loadBestScore () {
      try {
        this.bestScore = Number(window.localStorage.getItem('mole-best-score')) || 0
      } catch (_error) {
        // localStorage が使えない環境では記録を復元しない。
      }
    },
    prepareAudio () {
      if (!this.whackAudio) this.whackAudio = this.createAudio(whackSound)
      if (!this.bonusAudio) this.bonusAudio = this.createAudio(whackSound)
      this.unlockAudio(this.whackAudio)
      this.unlockAudio(this.bonusAudio)
    },
    createAudio (sound) {
      const audio = new Audio(sound)
      audio.preload = 'auto'
      audio.playsInline = true
      return audio
    },
    unlockAudio (audio) {
      audio.muted = true
      audio.currentTime = 0
      const playback = audio.play()
      if (playback && playback.then) {
        playback.then(() => {
          audio.pause()
          audio.currentTime = 0
          audio.muted = false
        }).catch(() => {
          audio.muted = false
        })
      } else {
        audio.muted = false
      }
    },
    playSound (audio, playbackRate = 1) {
      if (!audio) return
      audio.muted = false
      audio.currentTime = 0
      audio.playbackRate = playbackRate
      const playback = audio.play()
      if (playback && playback.catch) playback.catch(() => {})
    },
    playWhackSound (isBonus) {
      this.playSound(this.whackAudio)
      if (isBonus) this.playSound(this.bonusAudio, 1.28)
    }
  }
}
</script>

<style scoped>
.mole-game {
  align-items: center;
  background: linear-gradient(#a9e6ff 0 42%, #80cf5b 42%);
  box-sizing: border-box;
  display: flex;
  flex: 0 0 100%;
  justify-content: center;
  min-height: 100vh;
  padding: 76px 16px 24px;
  touch-action: manipulation;
  user-select: none;
  width: 100%;
}

.game-panel {
  max-width: 620px;
  width: 100%;
}

.game-header {
  align-items: flex-end;
  color: #55402a;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 18px;
}

h1 { font-size: clamp(2rem, 8vw, 3.2rem); line-height: 1; margin: 0 0 8px; }
p { font-size: 1.1rem; font-weight: bold; margin: 0; }

.scoreboard { display: flex; gap: 10px; text-align: center; }
.scoreboard div { background: #fff9e7; border: 3px solid #765334; border-radius: 14px; min-width: 82px; padding: 6px 8px; }
.scoreboard span, .scoreboard small { display: block; font-size: .75rem; font-weight: bold; }
.scoreboard strong { color: #e05b3f; font-size: 1.8rem; line-height: 1; }

.mole-field {
  background: repeating-linear-gradient(135deg, #a96e39 0 9px, #b97940 9px 18px);
  border: 7px solid #765334;
  border-radius: 28px;
  box-shadow: inset 0 0 0 5px #d79a55, 0 10px 0 rgba(85, 64, 42, .2);
  display: grid;
  gap: clamp(10px, 3vw, 22px);
  grid-template-columns: repeat(3, 1fr);
  padding: clamp(18px, 6vw, 42px);
  position: relative;
}
.mole-field.is-fever { box-shadow: inset 0 0 0 5px #ffe46b, inset 0 0 30px rgba(255, 218, 72, .8), 0 10px 0 rgba(85, 64, 42, .2); padding-top: clamp(68px, 14vw, 86px); }

.hole {
  aspect-ratio: 1;
  background: transparent;
  border: 0;
  cursor: default;
  overflow: hidden;
  padding: 0;
  position: relative;
  touch-action: manipulation;
}

.hole:disabled { opacity: 1; }
.hole.has-mole { cursor: pointer; }
.hole:focus-visible { outline: 4px solid #fff; outline-offset: 3px; }
.dirt { background: radial-gradient(ellipse, #3e2619 0 48%, #754425 50% 68%, transparent 70%); bottom: 1%; height: 57%; left: 0; position: absolute; width: 100%; z-index: 2; }
.mole { bottom: 5%; filter: drop-shadow(0 4px 1px rgba(67, 37, 20, .35)); font-size: clamp(3rem, 13vw, 6.2rem); left: 50%; line-height: 1; position: absolute; transform: translate(-50%, 110%); transition: transform .16s ease-out; z-index: 3; }
.has-mole .mole { animation: mole-pop .18s ease-out; transform: translate(-50%, 0); }
.whacked .mole { transform: translate(-50%, 12%) rotate(12deg) scale(.85); }

.hit-effect { inset: 0; pointer-events: none; position: absolute; z-index: 5; }
.impact { animation: impact .28s ease-out forwards; font-size: clamp(2.7rem, 10vw, 4.8rem); left: 50%; position: absolute; top: -10%; transform: translateX(-50%); }
.hammer { animation: hammer .22s ease-in forwards; font-size: clamp(2.5rem, 9vw, 4.3rem); position: absolute; right: -4%; top: -20%; transform-origin: 80% 80%; }
.star { animation: star .3s ease-out forwards; color: #fff4a7; font-size: clamp(1.3rem, 5vw, 2.2rem); position: absolute; text-shadow: 0 2px #d9792e; }
.star-one { left: 2%; top: 8%; }
.star-two { right: 4%; top: 28%; }
.bonus-mole .mole { animation: bonus-wiggle .45s ease-in-out infinite alternate; filter: drop-shadow(0 0 7px #fff6a6); }
.fever-status { align-items: center; animation: fever-status .45s ease-out; background: #e85d42; border: 3px solid #fff8dc; border-radius: 999px; box-shadow: 0 4px 0 #a93b2a, 0 0 0 4px #ffcf4d; color: #fff; display: flex; gap: 7px; left: 50%; min-height: 42px; padding: 5px 13px; position: absolute; top: clamp(7px, 2vw, 14px); transform: translateX(-50%); white-space: nowrap; z-index: 7; }
.fever-status strong { font-size: clamp(1rem, 4vw, 1.35rem); line-height: 1; }
.fever-status__hits { background: #fff8dc; border-radius: 999px; color: #d94f36; font-size: clamp(.75rem, 3vw, 1rem); font-weight: bold; padding: 4px 7px; }
.fever-status__sparkle { animation: sparkle .4s ease-in-out infinite alternate; color: #fff3a3; font-size: 1.2rem; }
.fever-status__burst { animation: fever-burst .38s ease-out forwards; font-size: 1.5rem; position: absolute; right: -12px; top: -13px; }

.game-result { align-items: center; background: rgba(52, 34, 20, .55); display: flex; inset: 0; justify-content: center; padding: 20px; position: fixed; z-index: 10; }
.game-result__card { animation: result-pop .3s ease-out; background: #fff8dc; border: 6px solid #765334; border-radius: 28px; box-shadow: 0 9px 0 #4f301d; color: #55402a; max-width: 360px; padding: 28px 20px 24px; text-align: center; width: 100%; }
.game-result__card p { font-size: 1.25rem; }
.game-result__card .game-result__title { color: #e05b3f; font-size: clamp(2rem, 10vw, 3.2rem); margin-bottom: 12px; }
.game-result__card strong { color: #e05b3f; display: block; font-size: clamp(3.5rem, 18vw, 5.5rem); line-height: 1; margin: 8px 0; }
.game-result__card strong small { color: #55402a; font-size: 1.2rem; margin-left: 5px; }
.game-result__hint { margin-bottom: 14px; }
.result-button { animation: button-bounce 1s ease-in-out infinite; background: #f3a344; border: 4px solid #765334; border-radius: 999px; box-shadow: 0 5px 0 #765334; color: #fff; cursor: pointer; display: block; font: bold 1.35rem "Yomogi", cursive; margin: 12px auto 0; padding: 12px 26px; touch-action: manipulation; }
.result-button:active { box-shadow: 0 1px 0 #765334; transform: translateY(4px); }

@keyframes mole-pop { from { transform: translate(-50%, 40%) scale(.7); } to { transform: translate(-50%, 0) scale(1); } }
@keyframes impact { from { opacity: 0; transform: translateX(-50%) scale(.3); } 55% { opacity: 1; } to { opacity: 0; transform: translateX(-50%) scale(1.25); } }
@keyframes hammer { from { transform: rotate(-45deg) scale(1.15); } to { transform: rotate(25deg) scale(.85); } }
@keyframes star { from { opacity: 1; transform: scale(.4) rotate(0); } to { opacity: 0; transform: translateY(-28px) scale(1.15) rotate(100deg); } }
@keyframes result-pop { from { opacity: 0; transform: scale(.7); } to { opacity: 1; transform: scale(1); } }
@keyframes button-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
@keyframes bonus-wiggle { from { transform: translate(-50%, 0) rotate(-5deg) scale(1.04); } to { transform: translate(-50%, 0) rotate(5deg) scale(1.1); } }
@keyframes fever-status { from { opacity: 0; transform: translateX(-50%) translateY(-10px) scale(.8); } to { opacity: 1; transform: translateX(-50%) scale(1); } }
@keyframes sparkle { from { transform: rotate(-12deg) scale(.85); } to { transform: rotate(12deg) scale(1.2); } }
@keyframes fever-burst { from { opacity: 1; transform: scale(.5) rotate(0); } to { opacity: 0; transform: translate(12px, -17px) scale(1.3) rotate(35deg); } }

.start-button {
  background: #f3a344;
  border: 4px solid #765334;
  border-radius: 999px;
  box-shadow: 0 5px 0 #765334;
  color: #fff;
  cursor: pointer;
  display: block;
  font-family: inherit;
  font-size: 1.45rem;
  font-weight: bold;
  margin: 24px auto 5px;
  padding: 12px 42px;
  touch-action: manipulation;
}

.start-button:active { box-shadow: 0 1px 0 #765334; transform: translateY(4px); }
.start-button:focus-visible { outline: 4px solid #fff; outline-offset: 3px; }

@media (max-width: 520px) {
  .mole-game { align-items: flex-start; padding-top: 72px; }
  .game-header { align-items: flex-start; flex-direction: column; }
  .scoreboard { width: 100%; }
  .scoreboard div { flex: 1; }
  .fever-status { gap: 4px; padding: 4px 9px; }
  .start-button { font-size: 1.25rem; padding-left: 24px; padding-right: 24px; white-space: nowrap; }
}
</style>
