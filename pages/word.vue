<template>
  <div class="word-game" :class="gameClass">
    <div class="main">
      <div class="game-rule" aria-live="polite">
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
      <i class="impact-point"></i>
      <i class="crack crack--one"></i>
      <i class="crack crack--two"></i>
      <i class="crack crack--three"></i>
      <i class="crack crack--four"></i>
      <i class="crack crack--five"></i>
      <i class="crack crack--six"></i>
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
.main { min-height: 100dvh; box-sizing: border-box; padding: 72px 16px 16px; transition: transform .4s ease, filter .4s ease; }
.game-rule { display: flex; justify-content: center; gap: 12px; max-width: 680px; margin: 0 auto 12px; color: #126c78; font-weight: bold; font-size: clamp(15px, 4vw, 20px); }
.game-rule span { background: #e7f9fb; border-radius: 999px; padding: 7px 10px; white-space: nowrap; }
.section1 { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(104px, .85fr); gap: 16px; max-width: 760px; margin: auto; align-items: center; }
.section1 .theme { height: clamp(150px, 36vw, 270px); }.card { height: 100%; border: 0; border-radius: 25px; padding: 10px; background: #fff; font-family: inherit; }
.section1 .card { display: flex; align-items: center; justify-content: center; border: 2px solid #26c6da; }.section1 .card-title { color: #26c6da; line-height: 1; }.section1 .card-title span { display: block; font-size: clamp(112px, 25vw, 180px); font-weight: bold; line-height: .9; }
.c-stepper { display: flex; align-items: center; justify-content: center; }.c-stepper__item { text-align: center; }.c-stepper__title { margin: 0; }.c-stepper__title > span { display: grid; place-items: center; background: #e0e0e0; color: #fff; font-weight: normal; font-size: clamp(48px, 13vw, 80px); width: clamp(104px, 28vw, 230px); height: clamp(104px, 28vw, 220px); border-radius: 50%; }
.section2 { max-width: 760px; margin: auto; }.card-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }.section2 .card { display: grid; min-height: clamp(74px, 18vw, 112px); place-items: center; box-shadow: none; text-align: center; font-size: clamp(42px, 12vw, 82px); line-height: 1; font-weight: bold; cursor: pointer; transition: transform .15s, box-shadow .15s; }.section2 .card:not(:disabled):active { transform: scale(.92) rotate(-2deg); }.section2 .card:disabled { cursor: default; }.section2 .card.selected { box-shadow: 2px 2px 20px rgba(0, 0, 0, .23); }
.section2 .card.sm, .section2 .card.md, .section2 .card.lg, .section2 .card.xl { font-size: clamp(42px, 12vw, 82px); }.section2 .card.a, .section2 .card.b, .section2 .card.c, .section2 .card.d { width: auto; }
.section3 { max-width: 760px; margin: 8px auto; }.section3 p { margin: 0; font-weight: bold; font-size: clamp(20px, 5.5vw, 28px); padding: 0; letter-spacing: 2px; }.card.result { border: 5px solid #ef5350; }
.result-screen { position: fixed; z-index: 5; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; background: rgba(5, 10, 19, .78); font-family: "Yomogi", cursive; text-align: center; animation: appear .35s ease-out; }.result-screen--failed { background: rgba(5, 10, 19, .1); text-shadow: 2px 3px 0 #16212c; }.result-screen__title { font-size: clamp(50px, 15vw, 110px); font-weight: bold; margin: 0; }.result-screen p:not(.result-screen__title) { font-size: 24px; }.retry-button { margin-top: 16px; padding: 14px 32px; border: 4px solid #fff; border-radius: 999px; background: #26c6da; color: #fff; font: bold 24px "Yomogi", cursive; cursor: pointer; }
.is-crashing .main { animation: crash .45s steps(2) 2; filter: contrast(1.15) saturate(.35) brightness(.9); }.crash-shards { position: fixed; z-index: 4; inset: 0; pointer-events: none; overflow: hidden; background: rgba(0, 0, 0, .45); }.shard { position: absolute; display: block; inset: 0; background: linear-gradient(135deg, rgba(255, 255, 255, .12), transparent 22%, rgba(0, 0, 0, .22) 75%), rgba(37, 53, 66, .38); box-shadow: inset 18px 20px 30px rgba(255, 255, 255, .05), inset -20px -24px 35px rgba(0, 0, 0, .35); backdrop-filter: blur(1px); animation: break-away .75s cubic-bezier(.15, .7, .2, 1) both; }.shard--one { --x: -30px; --y: -18px; --rotate: -1.5deg; clip-path: polygon(0 0, 49% 0, 43% 35%, 0 51%); transform-origin: top left; }.shard--two { --x: 36px; --y: -20px; --rotate: 2.5deg; clip-path: polygon(49% 0, 100% 0, 100% 30%, 60% 40%, 43% 35%); transform-origin: top right; animation-delay: .05s; }.shard--three { --x: -34px; --y: 36px; --rotate: 2.5deg; clip-path: polygon(0 51%, 43% 35%, 55% 65%, 26% 100%, 0 100%); transform-origin: bottom left; animation-delay: .1s; }.shard--four { --x: 31px; --y: 8px; --rotate: -2deg; clip-path: polygon(43% 35%, 60% 40%, 100% 30%, 100% 65%, 55% 65%); transform-origin: center right; animation-delay: .14s; }.shard--five { --x: -8px; --y: 42px; --rotate: -1deg; clip-path: polygon(26% 100%, 55% 65%, 74% 100%); transform-origin: bottom center; animation-delay: .18s; }.shard--six { --x: 36px; --y: 38px; --rotate: 2deg; clip-path: polygon(55% 65%, 100% 65%, 100% 100%, 74% 100%); transform-origin: bottom right; animation-delay: .22s; }.impact-point { position: absolute; z-index: 2; top: 42%; left: 51%; width: 18px; height: 18px; border: 2px solid rgba(255, 255, 255, .55); border-radius: 50%; background: #0b1117; box-shadow: 0 0 0 5px rgba(0, 0, 0, .5), 0 0 18px rgba(255, 255, 255, .25); animation: impact .35s ease-out both; }.crack { --angle: 0deg; --length: 35vw; position: absolute; z-index: 3; top: 43%; left: 52%; width: var(--length); height: 2px; transform-origin: left center; transform: rotate(var(--angle)); background: linear-gradient(90deg, rgba(236, 247, 250, .9), rgba(0, 0, 0, .95) 7%, rgba(0, 0, 0, .9) 85%, transparent); box-shadow: 0 1px 1px rgba(255, 255, 255, .3); animation: crack-grow .35s ease-out both; }.crack--one { --angle: -142deg; --length: 43vw; }.crack--two { --angle: -84deg; --length: 40vw; animation-delay: .04s; }.crack--three { --angle: -29deg; --length: 52vw; animation-delay: .08s; }.crack--four { --angle: 24deg; --length: 47vw; animation-delay: .11s; }.crack--five { --angle: 79deg; --length: 46vw; animation-delay: .15s; }.crack--six { --angle: 142deg; --length: 38vw; animation-delay: .18s; }
@keyframes crash { 0% { transform: translate(0); } 33% { transform: translate(-16px, 9px) skew(5deg); } 66% { transform: translate(14px, -7px) skew(-6deg); } } @keyframes break-away { from { opacity: 0; transform: translate(0) rotate(0); } to { opacity: 1; transform: translate(var(--x), var(--y)) rotate(var(--rotate)); } } @keyframes crack-grow { from { opacity: 0; transform: rotate(var(--angle)) scaleX(0); } to { opacity: 1; transform: rotate(var(--angle)) scaleX(1); } } @keyframes impact { from { opacity: 0; transform: scale(3); } to { opacity: 1; transform: scale(1); } } @keyframes appear { from { opacity: 0; transform: scale(1.15); } to { opacity: 1; transform: scale(1); } }
@media (min-width: 700px) { .main { padding-top: 80px; }.game-rule { justify-content: space-between; }.card-list { grid-template-columns: repeat(4, minmax(0, 1fr)); }.section2 .card { min-height: 120px; } }
</style>
