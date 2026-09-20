<template>
  <section class="passcode-game">
    <div class="phone" aria-live="polite">
      <p class="phone__time">9:41</p>
      <p class="phone__instruction">ばんごうを おしてね</p>
      <div class="passcode-dots" aria-label="入力したばんごう"><i v-for="index in passcode.length" :key="index" :class="{ 'is-filled': enteredCode.length >= index }"></i></div>
      <p v-if="isCracked" class="message message--mistake">あっ！ がめんに ヒビが…</p>
      <p v-else-if="isUnlocked" class="message message--success">あいた！ 🎉</p>
      <p v-else class="message">まちがえても だいじょうぶ</p>
      <div class="keypad" aria-label="ばんごうボタン">
        <button v-for="number in numbers" :key="number" class="keypad__key" type="button" :disabled="isCracked || isUnlocked" @click="pressNumber(number)">{{ number }}</button>
        <button class="keypad__key keypad__key--zero" type="button" :disabled="isCracked || isUnlocked" @click="pressNumber('0')">0</button>
      </div>
      <button class="restart-button" type="button" @click="restart">{{ isCracked || isUnlocked ? 'もういちど' : 'やりなおす' }}</button>
    </div>
    <div v-if="isCracked" class="crack-overlay" aria-hidden="true"><i class="impact"></i><i v-for="line in crackLines" :key="line.className" class="crack-line" :class="line.className" :style="line.style"></i></div>
  </section>
</template>

<script>
const PASSCODE = ['0', '7', '2', '7']
export default {
  name: 'PasscodePage',
  data: () => ({
    passcode: PASSCODE, enteredCode: [], isCracked: false, isUnlocked: false, numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    crackLines: [
      { className: 'crack-line--one', style: '--angle: -151deg; --length: 48vw;' }, { className: 'crack-line--two', style: '--angle: -102deg; --length: 42vw;' }, { className: 'crack-line--three', style: '--angle: -45deg; --length: 55vw;' }, { className: 'crack-line--four', style: '--angle: 9deg; --length: 49vw;' }, { className: 'crack-line--five', style: '--angle: 68deg; --length: 52vw;' }, { className: 'crack-line--six', style: '--angle: 127deg; --length: 46vw;' }
    ]
  }),
  methods: {
    pressNumber (number) {
      const nextIndex = this.enteredCode.length
      if (number !== this.passcode[nextIndex]) { this.isCracked = true; return }
      this.enteredCode.push(number)
      if (this.enteredCode.length === this.passcode.length) this.isUnlocked = true
    },
    restart () { this.enteredCode = []; this.isCracked = false; this.isUnlocked = false }
  }
}
</script>

<style scoped>
.passcode-game { display: grid; min-height: 100vh; place-items: center; overflow: hidden; padding: 68px 16px 24px; box-sizing: border-box; background: radial-gradient(circle at 50% 12%, #4a6578, #15212b 56%, #0c1218); font-family: "Yomogi", cursive; touch-action: manipulation; }.phone { position: relative; z-index: 1; width: min(100%, 390px); min-height: min(680px, calc(100dvh - 92px)); padding: 20px 24px 16px; border: 6px solid #c7d2d9; border-radius: 38px; box-sizing: border-box; color: #fff; text-align: center; background: linear-gradient(145deg, rgba(68, 99, 120, .92), rgba(13, 25, 35, .95)); box-shadow: 0 18px 38px rgba(0, 0, 0, .5), inset 0 0 0 2px rgba(255, 255, 255, .24); }.phone__time { margin: 0; font-family: sans-serif; font-size: 14px; font-weight: bold; text-align: left; }.phone__instruction { margin: clamp(40px, 10vh, 82px) 0 8px; font-size: clamp(22px, 6vw, 28px); font-weight: bold; }.passcode-dots { display: flex; justify-content: center; gap: 18px; margin: 20px 0 12px; }.passcode-dots i { width: 14px; height: 14px; border: 2px solid #fff; border-radius: 50%; }.passcode-dots i.is-filled { background: #fff; }.message { min-height: 28px; margin: 0 0 8px; color: #dbeef4; font-size: 17px; font-weight: bold; }.message--mistake { color: #fff2a8; }.message--success { color: #fff4a5; font-size: 22px; }.keypad { display: grid; grid-template-columns: repeat(3, 70px); justify-content: center; gap: clamp(10px, 2.7vw, 16px); }.keypad__key { width: 70px; height: 70px; border: 0; border-radius: 50%; color: #fff; background: rgba(223, 238, 245, .22); box-shadow: inset 0 1px rgba(255, 255, 255, .22); font: 32px sans-serif; cursor: pointer; transition: transform .1s, background .1s; }.keypad__key:not(:disabled):active { transform: scale(.9); background: rgba(255, 255, 255, .5); }.keypad__key:disabled { cursor: default; }.keypad__key--zero { grid-column: 2; }.restart-button { min-height: 44px; margin-top: 12px; padding: 8px 20px; border: 0; border-radius: 999px; color: #fff; background: transparent; font: bold 18px "Yomogi", cursive; cursor: pointer; }.restart-button:focus-visible, .keypad__key:focus-visible { outline: 3px solid #f6dc67; outline-offset: 3px; }.crack-overlay { position: fixed; z-index: 2; inset: 0; overflow: hidden; pointer-events: none; background: rgba(5, 11, 16, .18); }.impact { position: absolute; top: 47%; left: 49%; width: 18px; height: 18px; border: 2px solid rgba(255, 255, 255, .7); border-radius: 50%; background: #15232d; box-shadow: 0 0 0 5px rgba(0, 0, 0, .45), 0 0 16px #fff; animation: impact .25s ease-out both; }.crack-line { position: absolute; top: 48%; left: 50%; width: var(--length); height: 3px; transform-origin: left center; background: linear-gradient(90deg, rgba(255, 255, 255, .95), rgba(4, 9, 13, .95) 11%, rgba(233, 247, 255, .68) 17%, rgba(5, 10, 14, .9) 76%, transparent); box-shadow: 0 1px 1px rgba(255, 255, 255, .65); animation: crack-grow .35s ease-out both; }.crack-line--two { animation-delay: .05s; }.crack-line--three { animation-delay: .1s; }.crack-line--four { animation-delay: .14s; }.crack-line--five { animation-delay: .18s; }.crack-line--six { animation-delay: .22s; } @keyframes crack-grow { from { opacity: 0; transform: rotate(var(--angle)) scaleX(0); } to { opacity: 1; transform: rotate(var(--angle)) scaleX(1); } } @keyframes impact { from { opacity: 0; transform: scale(3); } to { opacity: 1; transform: scale(1); } } @media (min-width: 700px) { .phone { min-height: 650px; }.keypad { grid-template-columns: repeat(3, 76px); }.keypad__key { width: 76px; height: 76px; } }
</style>
