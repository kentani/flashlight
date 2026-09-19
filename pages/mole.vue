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

      <div class="mole-field" :class="{ 'is-playing': isPlaying }">
        <button
          v-for="hole in holes"
          :key="hole"
          type="button"
          class="hole"
          :class="{ 'has-mole': activeHole === hole, whacked: whackedHole === hole }"
          :aria-label="activeHole === hole ? 'もぐらをたたく' : 'もぐらの穴'"
          :disabled="!isPlaying || activeHole !== hole"
          @click="whack(hole)"
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

      <button type="button" class="start-button" @click="startGame">
        {{ isPlaying ? 'もういちど はじめる' : hasPlayed ? 'もういちど あそぶ' : 'はじめる' }}
      </button>
    </div>
  </section>
</template>

<script>
import moleSound from '@/assets/sounds/switch1.mp3'
import whackSound from '@/assets/sounds/ok.mp3'

export default {
  name: 'MolePage',
  data () {
    return {
      holes: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      score: 0,
      timeLeft: 30,
      activeHole: null,
      whackedHole: null,
      isPlaying: false,
      hasPlayed: false,
      moleTimer: null,
      countdownTimer: null,
      whackTimer: null,
      moleAudio: null,
      whackAudio: null
    }
  },
  beforeDestroy () {
    this.clearTimers()
  },
  methods: {
    startGame () {
      this.clearTimers()
      this.score = 0
      this.timeLeft = 30
      this.activeHole = null
      this.whackedHole = null
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
      this.playMoleSound()
      this.moleTimer = setTimeout(() => {
        this.activeHole = null
        this.showMole()
      }, 750)
    },
    whack (hole) {
      if (!this.isPlaying || hole !== this.activeHole) return
      clearTimeout(this.moleTimer)
      this.activeHole = null
      this.whackedHole = hole
      this.score += 1
      this.playWhackSound()
      this.whackTimer = setTimeout(() => {
        this.whackedHole = null
        this.showMole()
      }, 180)
    },
    finishGame () {
      this.isPlaying = false
      this.activeHole = null
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
    prepareAudio () {
      if (!this.moleAudio) this.moleAudio = this.createAudio(moleSound)
      if (!this.whackAudio) this.whackAudio = this.createAudio(whackSound)
      this.unlockAudio(this.moleAudio)
      this.unlockAudio(this.whackAudio)
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
    playSound (audio) {
      if (!audio) return
      audio.muted = false
      audio.currentTime = 0
      const playback = audio.play()
      if (playback && playback.catch) playback.catch(() => {})
    },
    playMoleSound () {
      this.playSound(this.moleAudio)
    },
    playWhackSound () {
      this.playSound(this.whackAudio)
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
}

.hole {
  aspect-ratio: 1;
  background: transparent;
  border: 0;
  cursor: default;
  overflow: hidden;
  padding: 0;
  position: relative;
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

@keyframes mole-pop { from { transform: translate(-50%, 40%) scale(.7); } to { transform: translate(-50%, 0) scale(1); } }
@keyframes impact { from { opacity: 0; transform: translateX(-50%) scale(.3); } 55% { opacity: 1; } to { opacity: 0; transform: translateX(-50%) scale(1.25); } }
@keyframes hammer { from { transform: rotate(-45deg) scale(1.15); } to { transform: rotate(25deg) scale(.85); } }
@keyframes star { from { opacity: 1; transform: scale(.4) rotate(0); } to { opacity: 0; transform: translateY(-28px) scale(1.15) rotate(100deg); } }

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
}

.start-button:active { box-shadow: 0 1px 0 #765334; transform: translateY(4px); }
.start-button:focus-visible { outline: 4px solid #fff; outline-offset: 3px; }

@media (max-width: 520px) {
  .mole-game { align-items: flex-start; padding-top: 72px; }
  .game-header { align-items: flex-start; flex-direction: column; }
  .scoreboard { width: 100%; }
  .scoreboard div { flex: 1; }
}
</style>
