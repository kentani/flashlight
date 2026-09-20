<template>
  <section class="passcode-game" :class="{ 'is-shaking': isCracked }">
    <div class="phone" aria-live="polite">
      <i class="lock-icon" aria-hidden="true"></i>
      <p class="phone__instruction">パスコードを入力</p>
      <div class="passcode-dots" aria-label="入力したばんごう"><i v-for="index in passcode.length" :key="index" :class="{ 'is-filled': enteredCode.length >= index }"></i></div>
      <p v-if="isUnlocked" class="message message--success">あいた！ 🎉</p>
      <div class="keypad" aria-label="ばんごうボタン">
        <button v-for="key in keys" :key="key.number" class="keypad__key" type="button" :disabled="isCracked || isUnlocked" @click.stop="pressNumber(key.number, $event)"><span>{{ key.number }}</span><small>{{ key.letters }}</small></button>
        <button class="keypad__key keypad__key--zero" type="button" :disabled="isCracked || isUnlocked" @click.stop="pressNumber('0', $event)"><span>0</span></button>
      </div>
      <button class="restart-button" type="button" @click.stop="restart">{{ isCracked || isUnlocked ? 'もういちど' : 'やりなおす' }}</button>
    </div>
    <div v-if="isCracked" class="crack-overlay" aria-hidden="true" @click="addCrack($event)"><i class="impact"></i><i v-for="line in visibleCrackLines" :key="line.className" class="crack-line" :class="line.className" :style="line.style"></i></div>
  </section>
</template>

<script>
const PASSCODE = ['0', '7', '2', '7']
export default {
  name: 'PasscodePage',
  data: () => ({
    passcode: PASSCODE, enteredCode: [], crackCount: 0, crackLines: [], isCracked: false, isUnlocked: false,
    keys: [
      { number: '1', letters: '' }, { number: '2', letters: 'ABC' }, { number: '3', letters: 'DEF' },
      { number: '4', letters: 'GHI' }, { number: '5', letters: 'JKL' }, { number: '6', letters: 'MNO' },
      { number: '7', letters: 'PQRS' }, { number: '8', letters: 'TUV' }, { number: '9', letters: 'WXYZ' }
    ]
  }),
  computed: {
    visibleCrackLines () { return this.crackLines }
  },
  methods: {
    pressNumber (number, event) {
      this.enteredCode.push(number)
      if (this.enteredCode.length < this.passcode.length) return
      if (this.enteredCode.join('') === this.passcode.join('')) {
        this.isUnlocked = true
      } else {
        this.isCracked = true
        this.addCrack(event)
      }
    },
    addCrack (event) {
      if (!this.isCracked) return
      const index = this.crackCount
      const angles = [-154, -84, -29, 24, 78, 143]
      const viewportWidth = window.innerWidth || 1
      const viewportHeight = window.innerHeight || 1
      const hasPosition = event && typeof event.clientX === 'number' && typeof event.clientY === 'number'
      const origin = hasPosition
        ? [Math.max(0, Math.min(100, (event.clientX / viewportWidth) * 100)), Math.max(0, Math.min(100, (event.clientY / viewportHeight) * 100))]
        : [49, 47]
      const rotation = (index % 5) * 11
      angles.slice(index % 3, (index % 3) + 3).forEach((angle, lineIndex) => {
        this.crackLines.push({
          className: `crack-line--${index}-${lineIndex}`,
          style: `--top: ${origin[1]}%; --left: ${origin[0]}%; --angle: ${angle + rotation}deg; --length: ${38 + ((index + lineIndex) % 5) * 9}vw;`
        })
      })
      this.crackCount++
    },
    restart () { this.enteredCode = []; this.crackCount = 0; this.crackLines = []; this.isCracked = false; this.isUnlocked = false }
  }
}
</script>

<style scoped>
.passcode-game { display: grid; min-height: 100vh; place-items: center; overflow: hidden; padding: 68px 16px 24px; box-sizing: border-box; background: radial-gradient(ellipse at 50% 42%, #303030 0, #090909 36%, #050505 100%); font-family: -apple-system, BlinkMacSystemFont, sans-serif; touch-action: manipulation; }.passcode-game.is-shaking { animation: shake .42s ease-out; }.phone { position: relative; width: min(100%, 400px); padding: 16px 24px; box-sizing: border-box; color: #fff; text-align: center; }.lock-icon { position: relative; display: block; width: 24px; height: 22px; margin: 0 auto 78px; border-radius: 3px; background: #fff; box-shadow: 0 1px 2px rgba(255, 255, 255, .45); }.lock-icon::before { content: ''; position: absolute; top: -15px; left: 3px; width: 12px; height: 16px; border: 3px solid #fff; border-bottom: 0; border-radius: 10px 10px 0 0; }.phone__instruction { margin: 0 0 22px; font-size: clamp(22px, 6vw, 27px); font-weight: 400; letter-spacing: .03em; }.passcode-dots { display: flex; justify-content: center; gap: 22px; margin: 0 0 42px; }.passcode-dots i { width: 14px; height: 14px; border: 2px solid #f5f5f5; border-radius: 50%; }.passcode-dots i.is-filled { background: #fff; }.message { min-height: 28px; margin: 0 0 2px; color: #fff4a5; font: 600 20px "Yomogi", cursive; }.keypad { display: grid; grid-template-columns: repeat(3, 72px); justify-content: center; gap: 18px 42px; }.keypad__key { display: grid; width: 72px; height: 72px; place-content: center; border: 0; border-radius: 50%; color: #fff; background: #303030; box-shadow: inset 0 1px rgba(255, 255, 255, .08); cursor: pointer; transition: transform .1s, background .1s; }.keypad__key span { font-size: 35px; font-weight: 300; line-height: .85; }.keypad__key small { min-height: 11px; margin-top: 5px; font-size: 10px; font-weight: 700; letter-spacing: .16em; }.keypad__key:not(:disabled):active { transform: scale(.9); background: #666; }.keypad__key:disabled { cursor: default; }.keypad__key--zero { grid-column: 2; }.restart-button { position: relative; z-index: 3; min-height: 44px; margin-top: 18px; padding: 8px 20px; border: 0; border-radius: 999px; color: #fff; background: transparent; font: 600 17px "Yomogi", cursive; cursor: pointer; }.restart-button:focus-visible, .keypad__key:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }.crack-overlay { position: fixed; z-index: 2; inset: 0; overflow: hidden; cursor: pointer; background: linear-gradient(120deg, rgba(255, 255, 255, .06), transparent 20%, rgba(0, 0, 0, .2) 80%); }.impact { position: absolute; top: 47%; left: 49%; width: 18px; height: 18px; border: 2px solid rgba(255, 255, 255, .8); border-radius: 50%; background: #101010; box-shadow: 0 0 0 5px rgba(0, 0, 0, .6), 0 0 20px rgba(255, 255, 255, .8); animation: impact .25s ease-out both; }.crack-line { position: absolute; top: var(--top); left: var(--left); width: var(--length); height: 2px; transform-origin: left center; background: linear-gradient(90deg, rgba(247, 250, 252, .98), rgba(15, 15, 15, .95) 8%, rgba(216, 232, 240, .75) 15%, rgba(0, 0, 0, .95) 72%, transparent); box-shadow: 0 1px 1px rgba(255, 255, 255, .45); animation: crack-grow .35s ease-out both; } @keyframes shake { 0%, 100% { transform: translateX(0); } 18% { transform: translateX(-11px); } 36% { transform: translateX(10px); } 54% { transform: translateX(-7px); } 72% { transform: translateX(5px); } } @keyframes crack-grow { from { opacity: 0; transform: rotate(var(--angle)) scaleX(0); } to { opacity: 1; transform: rotate(var(--angle)) scaleX(1); } } @keyframes impact { from { opacity: 0; transform: scale(3); } to { opacity: 1; transform: scale(1); } } @media (min-width: 700px) { .keypad { grid-template-columns: repeat(3, 76px); gap: 20px 48px; }.keypad__key { width: 76px; height: 76px; } }
</style>
