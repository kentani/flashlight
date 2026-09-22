<template>
  <div class="game-page" :class="gameClass">
    <GameScreenLayout class="word-game">
      <template #heading>
        <div class="bubble bubble--one" aria-hidden="true"></div>
        <div class="bubble bubble--two" aria-hidden="true"></div>
        <div class="bubble bubble--three" aria-hidden="true"></div>
        <div>
          <h1>もじえらび</h1>
          <p>おなじ もじを えらぼう！</p>
        </div>
      </template>
      <template #progress><div class="word-status" aria-live="polite"><GameProgressPanel compact :items="progressItems" /></div></template>
      <template #board><section class="word-board" aria-label="もじえらびのゲームばん">
        <div class="word-board__play">
          <div class="section1">
            <div class="theme">
              <div class="card" :class="{ result: answeredCorrectly }" id="theme-word-card">
                <div :style="wordMotionStyle" class="word-runner" aria-label="うごいているもじ"><span>{{ themeWord }}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section></template>
      <template #actions>
        <div class="word-controls">
          <div v-if="isReady" class="section2"><div class="card-list">
            <button v-for="word in words" :key="word.id" :class="[word.class, { selected: word.selected, result: word.result }]" class="selectable-card card" :disabled="gameOver || roundTransitioning" @click="selectWord(word.id)">
              {{ word.text }}
            </button>
          </div></div>
          <GameActionButtons v-else @primary="startGame">はじめる</GameActionButtons>
        </div>
      </template>
    </GameScreenLayout>

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

    <GameResultOverlay v-if="gameOver" :title="cleared ? 'クリア！' : 'もういちど！'" :celebration="cleared ? '🎉✨' : '💪'" :tone="cleared ? 'clear' : 'retry'" @retry="startGame">
      {{ cleared ? 'すごい！ もじを みつけられたね！' : 'つぎは もっと みつけられるよ！' }}
    </GameResultOverlay>
  </div>
</template>

<script>
import okSound from '@/assets/sounds/ok.mp3'
import ngSound from '@/assets/sounds/ng.mp3'
import GameActionButtons from '@/components/GameActionButtons.vue'
import GameResultOverlay from '@/components/GameResultOverlay.vue'
import GameProgressPanel from '@/components/GameProgressPanel.vue'
import GameScreenLayout from '@/components/GameScreenLayout.vue'

const TARGET_SUCCESSES = 5
const MAX_MISTAKES = 3
const WORD_COUNT = 4

export default {
  name: 'WordPage',
  components: { GameActionButtons, GameResultOverlay, GameProgressPanel, GameScreenLayout },
  data: () => ({
    themeWord: '',
    words: [],
    successCount: 0,
    mistakeCount: 0,
    targetSuccesses: TARGET_SUCCESSES,
    maxMistakes: MAX_MISTAKES,
    roundTransitioning: false,
    answeredCorrectly: false,
    gameOver: false,
    cleared: false,
    isReady: false,
    motionTimer: null,
    wordMotion: { x: -24, y: -12, scale: 3.7 },
    wordScale: 3.7,
    lastMotionPoint: -1,
    hiraganaList: ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'],
    cardClassList: ['a', 'b', 'c', 'd'],
    cardTitleClassList: ['sm', 'md', 'lg', 'xl']
  }),
  computed: {
    progressItems () {
      return [
        { label: 'できた', value: this.successCount, max: this.targetSuccesses, unit: `/ ${this.targetSuccesses}`, tone: 'green' },
        { label: 'ちがう', value: this.mistakeCount, max: this.maxMistakes, unit: `/ ${this.maxMistakes}`, tone: 'red' }
      ]
    },
    gameClass () {
      return {
        'is-ready': this.isReady,
        'is-crashing': this.gameOver && !this.cleared,
        [`crash-level-${this.mistakeCount}`]: this.gameOver && !this.cleared
      }
    },
    wordMotionStyle () {
      return {
        '--word-x': `${this.wordMotion.x}%`,
        '--word-y': `${this.wordMotion.y}%`,
        '--word-scale': this.wordMotion.scale
      }
    }
  },
  beforeDestroy () {
    this.stopWordMotion()
  },
  mounted () {
    this.prepareGame()
  },
  methods: {
    prepareGame () {
      this.successCount = 0
      this.mistakeCount = 0
      this.gameOver = false
      this.cleared = false
      this.roundTransitioning = false
      this.answeredCorrectly = false
      this.setWord()
    },
    startGame () {
      this.prepareGame()
      this.isReady = true
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
      this.wordScale = this.getWordScale(this.themeWord)
      this.startWordMotion()
    },
    startWordMotion () {
      this.stopWordMotion()
      this.lastMotionPoint = -1
      this.moveWord()
      this.motionTimer = setInterval(this.moveWord, 7000)
    },
    stopWordMotion () {
      clearInterval(this.motionTimer)
      this.motionTimer = null
    },
    moveWord () {
      const points = [
        { x: -29, y: -14 },
        { x: 29, y: 14 },
        { x: 29, y: -14 },
        { x: -29, y: 14 },
        { x: -10, y: -24 },
        { x: 10, y: 24 },
        { x: 10, y: -24 },
        { x: -10, y: 24 }
      ]
      const oppositePoints = [1, 0, 3, 2, 5, 4, 7, 6]
      const nextPoint = this.lastMotionPoint === -1
        ? Math.floor(Math.random() * points.length)
        : oppositePoints[this.lastMotionPoint]
      this.lastMotionPoint = nextPoint
      this.wordMotion = {
        ...points[nextPoint],
        scale: this.wordScale
      }
    },
    getWordScale (word) {
      const airyWords = ['い', 'つ', 'し', 'り', 'て', 'と', 'の', 'へ', 'ん']
      if (airyWords.includes(word)) {
        return 3.25
      }
      return 3.7
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
      this.stopWordMotion()
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
.word-game { flex: 1 1 auto; width: 100%; min-height: 100vh; font-family: "Yomogi", cursive; overflow: hidden; background: linear-gradient(#c7e6f5 0%, #f3f9fc 68%, #b9ddea 100%); }
.main { position: relative; min-height: 100dvh; box-sizing: border-box; padding: 28px 16px 20px; transition: transform .4s ease, filter .4s ease; }
.bubble { position: absolute; z-index: 0; border: 3px solid rgba(255, 255, 255, .66); border-radius: 50%; background: rgba(84, 172, 219, .18); pointer-events: none; animation: float 3.2s ease-in-out infinite alternate; }.bubble--one { width: 54px; height: 54px; top: 18%; left: -17px; }.bubble--two { width: 27px; height: 27px; top: 54%; right: 4%; animation-delay: .8s; }.bubble--three { width: 38px; height: 38px; top: 76%; left: 6%; animation-delay: 1.4s; }
.game-rule, .section1, .section2, .section3 { position: relative; z-index: 1; }
.game-rule { display: flex; justify-content: center; gap: 9px; max-width: 1120px; margin: 0 auto 12px; color: #315f76; font-weight: bold; font-size: clamp(14px, 3.8vw, 19px); }
.game-rule span { background: rgba(255, 255, 255, .82); border: 2px solid #9ccfe7; border-radius: 999px; box-shadow: 0 3px 0 rgba(57, 137, 178, .16); padding: 7px 10px; white-space: nowrap; }
.section1 { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(104px, .85fr); gap: 12px; max-width: 1120px; margin: auto; align-items: center; }
.section1 .theme { height: clamp(158px, 37vw, 276px); }.card { height: 100%; border: 0; border-radius: 25px; padding: 10px; background: #fff; font-family: inherit; }
.section1 .card { position: relative; display: flex; align-items: center; justify-content: center; border: 4px solid #54acdb; box-shadow: 0 8px 0 rgba(57, 137, 178, .2); background: linear-gradient(135deg, #fff 0%, #e8f4f9 100%); }.theme-hint { position: absolute; top: 11px; left: 50%; width: max-content; max-width: calc(100% - 16px); padding: 3px 11px; border-radius: 999px; background: #54acdb; color: #fff; font-size: clamp(13px, 3vw, 18px); font-weight: bold; transform: translateX(-50%) rotate(-2deg); }.section1 .card-title { color: #3989b2; line-height: 1; text-shadow: 0 4px 0 #c7e6f5; }.section1 .card-title span { display: block; font-size: clamp(112px, 25vw, 180px); font-weight: bold; line-height: .9; }
.c-stepper { display: flex; align-items: center; justify-content: center; }.c-stepper__item { text-align: center; }.c-stepper__title { margin: 0; }.c-stepper__title > span { display: grid; place-items: center; color: #315f76; font-weight: bold; font-size: clamp(48px, 13vw, 80px); width: clamp(104px, 28vw, 230px); height: clamp(104px, 28vw, 220px); border: 6px solid #fff; border-radius: 50%; box-shadow: 0 7px 0 rgba(57, 137, 178, .2); }
.section2 { max-width: 1120px; margin: auto; }.card-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }.section2 .card { display: grid; min-height: clamp(78px, 18vw, 116px); place-items: center; border: 4px solid rgba(255, 255, 255, .92); box-shadow: 0 6px 0 rgba(57, 113, 141, .22); color: #315f76; text-align: center; font-size: clamp(42px, 12vw, 82px); line-height: 1; font-weight: bold; cursor: pointer; transition: transform .15s, box-shadow .15s, filter .15s; }.section2 .card:not(:disabled):hover { filter: brightness(1.06); transform: translateY(-2px) rotate(-1deg); }.section2 .card:not(:disabled):active { box-shadow: 0 2px 0 rgba(57, 113, 141, .22); transform: translateY(4px) scale(.96); }.section2 .card:disabled { cursor: default; }.section2 .card.selected { box-shadow: 0 2px 18px rgba(49, 95, 118, .48); }.section2 .card.a { background: #a8d4e9; }.section2 .card.b { background: #b9ddea; }.section2 .card.c { background: #c9e4ee; }.section2 .card.d { background: #b5d3e5; }.section2 .card.sm, .section2 .card.md, .section2 .card.lg, .section2 .card.xl { font-size: clamp(42px, 12vw, 82px); }.section2 .card.a, .section2 .card.b, .section2 .card.c, .section2 .card.d { width: auto; }
.section3 { max-width: 1120px; margin: 9px auto; text-align: center; }.section3 p { display: inline-block; margin: 0; padding: 4px 12px; border-radius: 999px; background: rgba(255, 255, 255, .56); color: #315f76; font-weight: bold; font-size: clamp(19px, 5.2vw, 27px); letter-spacing: 1px; }.card.result { border: 5px solid #c4a45e; animation: correct-pop .35s ease-out; }
.result-screen { position: fixed; z-index: 5; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; background: rgba(26, 66, 85, .78); font-family: "Yomogi", cursive; text-align: center; animation: appear .35s ease-out; }.result-screen--failed { background: rgba(26, 66, 85, .1); text-shadow: 2px 3px 0 #315f76; }.result-screen__title { font-size: clamp(50px, 15vw, 110px); font-weight: bold; margin: 0; }.result-screen p:not(.result-screen__title) { font-size: 24px; }.retry-button { display: block; margin-top: 12px; padding: 14px 32px; border: 4px solid #fff; border-radius: 999px; background: #54acdb; color: #fff; font: bold 24px "Yomogi", cursive; cursor: pointer; text-decoration: none; }
.crash-shards { position: fixed; z-index: 4; inset: 0; pointer-events: none; overflow: hidden; background: rgba(0, 0, 0, .45); }.shard { position: absolute; display: block; inset: 0; background: linear-gradient(135deg, rgba(255, 255, 255, .12), transparent 22%, rgba(0, 0, 0, .22) 75%), rgba(37, 53, 66, .38); box-shadow: inset 18px 20px 30px rgba(255, 255, 255, .05), inset -20px -24px 35px rgba(0, 0, 0, .35); backdrop-filter: blur(1px); animation: break-away .75s cubic-bezier(.15, .7, .2, 1) both; }.shard--one { --x: -30px; --y: -18px; --rotate: -1.5deg; clip-path: polygon(0 0, 49% 0, 43% 35%, 0 51%); transform-origin: top left; }.shard--two { --x: 36px; --y: -20px; --rotate: 2.5deg; clip-path: polygon(49% 0, 100% 0, 100% 30%, 60% 40%, 43% 35%); transform-origin: top right; animation-delay: .05s; }.shard--three { --x: -34px; --y: 36px; --rotate: 2.5deg; clip-path: polygon(0 51%, 43% 35%, 55% 65%, 26% 100%, 0 100%); transform-origin: bottom left; animation-delay: .1s; }.shard--four { --x: 31px; --y: 8px; --rotate: -2deg; clip-path: polygon(43% 35%, 60% 40%, 100% 30%, 100% 65%, 55% 65%); transform-origin: center right; animation-delay: .14s; }.shard--five { --x: -8px; --y: 42px; --rotate: -1deg; clip-path: polygon(26% 100%, 55% 65%, 74% 100%); transform-origin: bottom center; animation-delay: .18s; }.shard--six { --x: 36px; --y: 38px; --rotate: 2deg; clip-path: polygon(55% 65%, 100% 65%, 100% 100%, 74% 100%); transform-origin: bottom right; animation-delay: .22s; }.impact-point { position: absolute; z-index: 2; top: 42%; left: 51%; width: 18px; height: 18px; border: 2px solid rgba(255, 255, 255, .55); border-radius: 50%; background: #0b1117; box-shadow: 0 0 0 5px rgba(0, 0, 0, .5), 0 0 18px rgba(255, 255, 255, .25); animation: impact .35s ease-out both; }.crack { --angle: 0deg; --length: 35vw; position: absolute; z-index: 3; top: 43%; left: 52%; width: var(--length); height: 2px; transform-origin: left center; transform: rotate(var(--angle)); background: linear-gradient(90deg, rgba(236, 247, 250, .9), rgba(0, 0, 0, .95) 7%, rgba(0, 0, 0, .9) 85%, transparent); box-shadow: 0 1px 1px rgba(255, 255, 255, .3); animation: crack-grow .35s ease-out both; }.crack--one { --angle: -142deg; --length: 43vw; }.crack--two { --angle: -84deg; --length: 40vw; animation-delay: .04s; }.crack--three { --angle: -29deg; --length: 52vw; animation-delay: .08s; }.crack--four { --angle: 24deg; --length: 47vw; animation-delay: .11s; }.crack--five { --angle: 79deg; --length: 46vw; animation-delay: .15s; }.crack--six { --angle: 142deg; --length: 38vw; animation-delay: .18s; }
@keyframes crash { 0% { transform: translate(0); } 33% { transform: translate(-16px, 9px) skew(5deg); } 66% { transform: translate(14px, -7px) skew(-6deg); } } @keyframes break-away { from { opacity: 0; transform: translate(0) rotate(0); } to { opacity: 1; transform: translate(var(--x), var(--y)) rotate(var(--rotate)); } } @keyframes crack-grow { from { opacity: 0; transform: rotate(var(--angle)) scaleX(0); } to { opacity: 1; transform: rotate(var(--angle)) scaleX(1); } } @keyframes impact { from { opacity: 0; transform: scale(3); } to { opacity: 1; transform: scale(1); } } @keyframes appear { from { opacity: 0; transform: scale(1.15); } to { opacity: 1; transform: scale(1); } } @keyframes float { from { transform: translateY(0) scale(.9); } to { transform: translateY(-16px) scale(1.08); } } @keyframes correct-pop { 0% { transform: scale(.92); } 65% { transform: scale(1.04) rotate(1deg); } 100% { transform: scale(1); } }
@media (min-width: 700px) { .main { padding-top: 32px; }.game-rule { justify-content: space-between; }.card-list { grid-template-columns: repeat(4, minmax(0, 1fr)); }.section2 .card { min-height: 120px; } }
.word-board { background: linear-gradient(145deg, rgba(246, 253, 255, .92), rgba(207, 235, 247, .96)); border: clamp(5px, 1.4vw, 8px) solid #54acdb; border-radius: clamp(28px, 7vw, 42px); box-shadow: inset 0 0 0 4px rgba(255, 255, 255, .75), 0 10px 0 rgba(57, 137, 178, .2); margin: 0 auto; max-width: 760px; padding: clamp(12px, 2.8vw, 22px); position: relative; }
.word-board .section1, .word-board .section2, .word-board .section3 { max-width: none; }
.word-header { align-items: flex-end; color: #315f76; display: flex; gap: 12px; justify-content: space-between; margin: 0 auto 14px; max-width: 1120px; position: relative; z-index: 1; }
.word-header h1 { font-size: clamp(2rem, 8vw, 3.1rem); line-height: 1; margin: 0 0 7px; }
.word-header p { font-size: clamp(.9rem, 3.6vw, 1.15rem); font-weight: bold; margin: 0; white-space: nowrap; }
.word-status { display: flex; gap: 6px; text-align: center; }
.word-status span { background: #fff9e7; border: 3px solid #54acdb; border-radius: 14px; box-shadow: 0 4px 0 rgba(57, 137, 178, .18); font-size: clamp(.63rem, 2.8vw, .85rem); font-weight: bold; min-width: 64px; padding: 5px 7px; white-space: nowrap; }
.word-status strong { color: #e05b3f; display: block; font-size: clamp(1.25rem, 5vw, 1.8rem); line-height: 1; }
.word-board__play { align-items: stretch; display: grid; grid-template-columns: 1fr; min-height: clamp(202px, 42vw, 300px); overflow: hidden; position: relative; }
.word-board__play::before, .word-board__play::after { content: '○'; position: absolute; color: rgba(255, 255, 255, .75); font-family: sans-serif; font-size: clamp(1rem, 3vw, 2rem); pointer-events: none; animation: word-bubble 3.5s ease-in-out infinite alternate; }.word-board__play::before { left: 13%; top: 22%; }.word-board__play::after { animation-delay: 1.1s; bottom: 18%; right: 12%; }
.word-board .section1 { display: block; margin: 0; min-width: 0; width: 100%; }
.word-board .section1 .theme { height: 100%; width: 100%; }
.word-board .section1 .card { background: transparent; border: 0; border-radius: 0; box-shadow: none; height: 100%; min-height: 0; padding: 0; }
.word-runner { align-items: center; color: #3989b2; display: flex; font-size: clamp(156px, 37vw, 280px); font-weight: bold; height: 100%; justify-content: center; left: 50%; line-height: 1; position: absolute; text-shadow: 0 5px 0 #c7e6f5; top: 50%; transform: translate(-50%, -50%) translate(var(--word-x), var(--word-y)) scale(var(--word-scale)); transition: transform 4s cubic-bezier(.25, .7, .35, 1); width: 100%; }.word-runner span { display: block; }
.word-controls { margin: 18px auto 0; max-width: 760px; position: relative; z-index: 1; }.word-controls .section2 { margin: 0; max-width: none; }.word-controls .card-list { grid-template-columns: repeat(4, minmax(0, 1fr)); }.word-controls .section2 .card { font-size: clamp(34px, 8vw, 58px); min-height: clamp(76px, 16vw, 102px); }.word-controls .game-start-button { margin-top: 0; }
@keyframes word-bubble { from { transform: translateY(8px) scale(.8); } to { transform: translateY(-12px) scale(1.15); } }
@media (prefers-reduced-motion: reduce) { .word-runner { transition: none; transform: translate(-50%, -50%) scale(1.1); } }
@media (max-width: 480px) { .word-header { align-items: flex-start; flex-direction: column; gap: 9px; }.word-status { justify-content: space-between; width: 100%; }.word-status span { flex: 1; min-width: 0; padding-left: 4px; padding-right: 4px; }.word-board__play { min-height: 210px; }.word-board .section1 .card { border-width: 3px; }.word-controls .card-list { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }.word-controls .section2 .card { border-width: 3px; box-shadow: 0 4px 0 rgba(57, 113, 141, .22); } }

/* どのゲームも、同じテレビ画面の大きさで遊ぶ。 */
.main { display: grid; grid-template-rows: auto minmax(0, 1fr) auto; min-height: 100dvh; }
.word-board { aspect-ratio: 4 / 3; box-sizing: border-box; max-width: 680px; width: 100%; }
.word-board__play { height: 100%; min-height: 0; }
.word-controls { max-width: 680px; }

/* 見出し、案内、進行カードを全ゲームで同じ順に並べる。 */
.word-header { align-items: flex-start; flex-direction: column; gap: 8px; max-width: 680px; }
.word-status { align-self: flex-end; }

@media (min-width: 700px) {
  .word-header { align-items: center; flex-direction: row; }
  .word-status { align-self: auto; }
}

@media (max-width: 520px) {
  .main { padding-top: 24px; }
}

/* 開始画面はゲーム盤とボタンを自然な間隔で続けて置く。 */
.main { display: block; }
.word-board__play { height: auto; min-height: clamp(202px, 42vw, 300px); }

.word-status { display: block; width: 100%; }
.word-board { max-width: none; }
.word-board__play { height: 100%; min-height: 0; }
.word-controls { width: 100%; }
.word-controls .card-list { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; }
.word-controls .section2 .card { min-height: 76px; }
.is-crashing ::v-deep .game-screen-layout__content { animation: crash .45s steps(2) 2; filter: contrast(1.15) saturate(.35) brightness(.9); }
</style>
