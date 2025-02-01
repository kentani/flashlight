<template>
  <div id="screen" ref="screen" @keydown="handleKeydown" @touchstart="handleTouch" tabindex="0">
  </div>
</template>

<script>
export default {
  mounted() {
    // フォーカスを取得してキーボードイベントを受け付ける
    this.$refs.screen.focus();
  },
  methods: {
    createCrack(x, y, number) {
      const screen = this.$refs.screen;
      const crack = document.createElement('div');
      crack.className = 'crack';
      crack.style.left = `${x - 100}px`;
      crack.style.top = `${y - 100}px`;
      const basePath = (process.env.BASE_URL || '..');
      crack.style.background = `url('${basePath}/${number}.png')`;
      crack.style.backgroundSize = 'cover';
      screen.appendChild(crack);

      // Remove the crack after animation
      setTimeout(() => {
        crack.remove();
      }, 2000);
    },
    handleKeydown() {
      const screen = this.$refs.screen;
      const x = Math.random() * screen.offsetWidth;
      const y = Math.random() * screen.offsetHeight;
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      this.createCrack(x, y, randomNumber);
    },
    handleTouch(event) {
      const touch = event.touches[0]; // 最初のタッチ位置を取得
      const x = touch.clientX;
      const y = touch.clientY;
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      this.createCrack(x, y, randomNumber);
    },
  },
};
</script>

<style>
body {
  overflow: hidden;
}

#screen {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  outline: none;
}

.crack {
  position: absolute;
  width: 200px;
  height: 200px;
  background-size: cover;
  pointer-events: none;
  animation: fadeOut 2s forwards;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(2);
  }
}
</style>
