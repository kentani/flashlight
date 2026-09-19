<template>
  <div class="word-game" :class="gameClass">
    <div class="main">
      <div class="game-rule" aria-live="polite">
        <span>のこり {{ timer }}びょう</span>
        <span>せいこう {{ successCount }} / {{ targetSuccesses }}</span>
        <span>まちがい {{ mistakeCount }} / {{ maxMistakes }}</span>
      </div>

      <div class="section1">
        <div class="theme">
          <div class="card" :class="{ result: answeredCorrectly }" id="theme-word-card">
            <div class="card-title"><span id="theme-word">{{ themeWord }}</span></div>
          </div>
        </div>
        <div class="c-stepper"><div class="c-stepper__item doing"><h3 class="c-stepper__title"><span class="timer-item" :style="timerStyle">{{ timer }}</span></h3></div></div>
      </div>

      <div class="section3"><p>{{ statusText }}</p></div>
      <div class="section2"><div class="card-list">
        <button v-for="word in words" :key="word.id" :class="[word.class, { selected: word.selected, result: word.result }]" class="selectable-card card" :disabled="gameOver || roundTransitioning" @click="selectWord(word.id)">
          {{ word.text }}
        </button>
      </div></div>
    </div>

    <div v-if="gameOver && !cleared" class="crash-shards" aria-hidden="true">
      <i class="shard shard--one"></i>
      <i class="shard shard--two"></i>
      <i class="shard shard--three"></i>
      <i class="shard shard--four"></i>
      <i class="shard shard--five"></i>
      <i class="shard shard--six"></i>
    </div>

    <div v-if="gameOver" class="result-screen" :class="{ 'result-screen--failed': !cleared }" role="alert">
      <p class="result-screen__title">{{ cleared ? '🎉 くりあ！' : '💥 しっかく！' }}</p>
      <p>{{ cleared ? 'すごい！ もういちどあそぶ？' : 'がめんが こわれちゃった…' }}</p>
      <button class="retry-button" @click="startGame">もういちど</button>
    </div>
  </div>
</template>

<script>
import okSound from '@/assets/sounds/ok.mp3'
import ngSound from '@/assets/sounds/ng.mp3'

const GAME_SECONDS = 30
const TARGET_SUCCESSES = 5
const MAX_MISTAKES = 3
const WORD_COUNT = 4

export default {
  name: 'WordPage',
  data: () => ({
    themeWord: '',
    words: [],
    timer: GAME_SECONDS,
    successCount: 0,
    mistakeCount: 0,
    targetSuccesses: TARGET_SUCCESSES,
    maxMistakes: MAX_MISTAKES,
    clearId: null,
    roundTransitioning: false,
    answeredCorrectly: false,
    gameOver: false,
    cleared: false,
    hiraganaList: ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'],
    cardClassList: ['a', 'b', 'c', 'd'],
    cardTitleClassList: ['sm', 'md', 'lg', 'xl']
  }),
  computed: {
    timerStyle () {
      const grayArea = (360 / GAME_SECONDS) * (GAME_SECONDS - this.timer)
      return `background-image: conic-gradient(#e0e0e0 0deg ${grayArea}deg, #26c6da ${grayArea}deg 360deg)`
    },
    statusText () {
      if (this.gameOver) return this.cleared ? 'くりあ できたね！' : 'しっかく…！'
      return 'おなじもじをえらんでね！'
    },
    gameClass () {
      return this.gameOver && !this.cleared ? `is-crashing crash-level-${this.mistakeCount}` : ''
    }
  },
  mounted () {
    this.startGame()
  },
  beforeDestroy () {
    this.stopTimer()
  },
  methods: {
    startGame () {
      this.stopTimer()
      this.timer = GAME_SECONDS
      this.successCount = 0
      this.mistakeCount = 0
      this.gameOver = false
      this.cleared = false
      this.roundTransitioning = false
      this.answeredCorrectly = false
      this.setWord()
      this.timerExec()
    },
    stopTimer () {
      clearInterval(this.clearId)
      this.clearId = null
    },
    timerExec () {
      this.clearId = setInterval(() => {
        if (this.timer <= 1) {
          this.timer = 0
          this.finishGame(false)
        } else {
          this.timer--
        }
      }, 1000)
    },
    setWord () {
      this.themeWord = this.randomItem(this.hiraganaList)
      const correctIndex = Math.floor(Math.random() * WORD_COUNT)
      const choices = this.hiraganaList.filter(letter => letter !== this.themeWord)
      this.words = Array.from({ length: WORD_COUNT }, (_value, index) => ({
        id: index,
        text: index === correctIndex ? this.themeWord : this.randomItem(choices),
        class: `${this.randomItem(this.cardClassList)} ${this.randomItem(this.cardTitleClassList)}`,
        selected: false,
        result: false
      }))
    },
    randomItem (items) {
      return items[Math.floor(Math.random() * items.length)]
    },
    selectWord (wordId) {
      if (this.gameOver || this.roundTransitioning) return
      const word = this.words.find(item => item.id === wordId)
      if (!word) return

      word.selected = true
      word.result = word.text === this.themeWord
      this.roundTransitioning = true
      if (word.result) {
        this.successCount++
        this.answeredCorrectly = true
        this.playSound(okSound)
        if (this.successCount >= this.targetSuccesses) {
          this.finishGame(true)
          return
        }
      } else {
        this.mistakeCount++
        this.playSound(ngSound)
        if (this.mistakeCount >= this.maxMistakes) {
          this.finishGame(false)
          return
        }
      }
      setTimeout(() => {
        if (this.gameOver) return
        this.answeredCorrectly = false
        this.roundTransitioning = false
        this.setWord()
      }, word.result ? 400 : 600)
    },
    finishGame (cleared) {
      this.stopTimer()
      this.gameOver = true
      this.cleared = cleared
      this.roundTransitioning = true
    },
    playSound (sound) {
      const audio = new Audio(sound)
      audio.currentTime = 0
      audio.play().catch(() => {})
    }
  }
}
</script>

<style scoped>
.word-game { min-height: 100vh; font-family: "Yomogi", cursive; overflow: hidden; }
.main { padding: 80px 14px 40px; transition: transform .4s ease, filter .4s ease; }
.game-rule { display: flex; justify-content: space-around; gap: 6px; max-width: 680px; margin: 0 auto 18px; color: #126c78; font-weight: bold; font-size: clamp(13px, 3.4vw, 20px); }
.game-rule span { background: #e7f9fb; border-radius: 999px; padding: 7px 10px; white-space: nowrap; }
.section1 { display: flex; justify-content: space-between; padding-left: 18px; }
.section1 .theme { width: 50vw; height: 40vw; }.card { height: 100%; border: 0; border-radius: 25px; padding: 10px; background: #fff; font-family: inherit; }
.section1 .card { position: relative; border: 2px solid #26c6da; }.section1 .card-title { padding-bottom: 0; color: #26c6da; }.section1 .card-title span { position: absolute; top: -40%; left: 8%; font-size: 180px; font-weight: bold; }
.c-stepper { display: flex; flex-wrap: wrap; background: #f5f8fa; width: 40vw; height: 45vw; align-content: center; }.c-stepper__item { flex: 1; display: flex; flex-direction: column; text-align: center; }.c-stepper__title > span { display: inline-block; background: #e0e0e0; color: #fff; font-weight: normal; font-size: 80px; width: 33vw; height: 32vw; border-radius: 50%; align-content: center; padding-bottom: 10px; }
.section2 { padding-left: 18px; }.card-list { display: flex; flex-wrap: wrap; gap: 30px; }.section2 .card { min-height: 80px; box-shadow: none; text-align: center; font-weight: bold; cursor: pointer; transition: transform .15s, box-shadow .15s; }.section2 .card:not(:disabled):active { transform: scale(.92) rotate(-2deg); }.section2 .card:disabled { cursor: default; }.section2 .card.selected { box-shadow: 2px 2px 20px rgba(0, 0, 0, .23); }
.section2 .card.sm { font-size: 30px; }.section2 .card.md { font-size: 60px; }.section2 .card.lg { font-size: 100px; }.section2 .card.xl { font-size: 150px; }.section2 .card.a { flex: 1 1 50px; }.section2 .card.b { flex: 1 1 100px; }.section2 .card.c { flex: 1 1 120px; }.section2 .card.d { width: 200px; }
.section3 { padding-left: 18px; }.section3 p { font-weight: bold; font-size: 25px; padding: 0; letter-spacing: 2px; }.card.result { border: 5px solid #ef5350; }
.result-screen { position: fixed; z-index: 5; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; background: rgba(5, 10, 19, .78); font-family: "Yomogi", cursive; text-align: center; animation: appear .35s ease-out; }.result-screen--failed { background: rgba(5, 10, 19, .2); text-shadow: 2px 3px 0 #16212c; }.result-screen__title { font-size: clamp(50px, 15vw, 110px); font-weight: bold; margin: 0; }.result-screen p:not(.result-screen__title) { font-size: 24px; }.retry-button { margin-top: 16px; padding: 14px 32px; border: 4px solid #fff; border-radius: 999px; background: #26c6da; color: #fff; font: bold 24px "Yomogi", cursive; cursor: pointer; }
.is-crashing .main { animation: crash .45s steps(2) 2; filter: contrast(1.35) saturate(.35); }.crash-shards { position: fixed; z-index: 4; inset: 0; pointer-events: none; overflow: hidden; }.shard { position: absolute; display: block; inset: -3%; border: 2px solid rgba(231, 249, 251, .85); background: rgba(20, 30, 40, .58); box-shadow: inset 0 0 18px rgba(255, 255, 255, .25), 0 0 10px rgba(0, 0, 0, .8); animation: break-away .7s cubic-bezier(.15, .7, .2, 1) both; }.shard--one { --x: -38px; --y: -24px; --rotate: -3deg; clip-path: polygon(0 0, 51% 0, 43% 37%, 0 53%); transform-origin: top left; }.shard--two { --x: 45px; --y: -26px; --rotate: 4deg; clip-path: polygon(51% 0, 100% 0, 100% 32%, 60% 42%, 43% 37%); transform-origin: top right; animation-delay: .05s; }.shard--three { --x: -42px; --y: 42px; --rotate: 5deg; clip-path: polygon(0 53%, 43% 37%, 55% 67%, 26% 100%, 0 100%); transform-origin: bottom left; animation-delay: .1s; }.shard--four { --x: 38px; --y: 12px; --rotate: -4deg; clip-path: polygon(43% 37%, 60% 42%, 100% 32%, 100% 67%, 55% 67%); transform-origin: center right; animation-delay: .14s; }.shard--five { --x: -10px; --y: 52px; --rotate: -2deg; clip-path: polygon(26% 100%, 55% 67%, 74% 100%); transform-origin: bottom center; animation-delay: .18s; }.shard--six { --x: 48px; --y: 48px; --rotate: 4deg; clip-path: polygon(55% 67%, 100% 67%, 100% 100%, 74% 100%); transform-origin: bottom right; animation-delay: .22s; }
@keyframes crash { 0% { transform: translate(0); } 33% { transform: translate(-16px, 9px) skew(5deg); } 66% { transform: translate(14px, -7px) skew(-6deg); } } @keyframes break-away { from { opacity: 0; transform: translate(0) rotate(0); } to { opacity: 1; transform: translate(var(--x), var(--y)) rotate(var(--rotate)); } } @keyframes appear { from { opacity: 0; transform: scale(1.15); } to { opacity: 1; transform: scale(1); } }
@media (min-width: 700px) { .section1, .section2, .section3 { max-width: 800px; margin: auto; }.section1 .theme { width: 360px; height: 270px; }.c-stepper { width: 290px; height: 290px; }.c-stepper__title > span { width: 230px; height: 220px; }.game-rule { justify-content: space-between; } }
</style>
