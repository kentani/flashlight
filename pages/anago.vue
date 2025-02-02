<template>
  <div id="game-area" ref="gameArea" tabindex="0"></div>
</template>

<script>
export default {
  mounted() {
    // 最初に草を5つ生成
    for (let i = 0; i < 5; i++) {
      this.spawnGrass();
    }

    // 一定間隔で草を生成
    setInterval(this.spawnGrass, 1500);
  },
  methods: {
    spawnGrass() {
      const gameArea = this.$refs.gameArea;
      const grass = document.createElement('div');
      const number = Math.floor(Math.random() * 2) + 11;
      const x = Math.random() * (gameArea.offsetWidth);
      const y = Math.random() * (gameArea.offsetHeight);
      grass.className = 'grass';
      grass.style.left = `${x - 100}px`;
      grass.style.top = `${y - 100}px`;
      grass.style.background = `url('${number}.png')`;
      grass.style.backgroundSize = 'cover';

      // 草を引っこ抜いたときのアニメーション
      grass.addEventListener('click', () => {
        grass.style.animation = 'pop-out 0.7s forwards';
        setTimeout(() => grass.remove(), 700);
      });

      gameArea.appendChild(grass);
    }
  },
};
</script>

<style>
body {
  overflow: hidden;
}

#game-area {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  outline: none;
}

.grass {
  position: absolute;
  width: 100px;
  height: 100px;
  background-size: cover;
  cursor: pointer;
  animation: grow 3s ease-in-out infinite;
}

@keyframes grow {
  0% {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.8);
  }
}

@keyframes pop-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(1.5) rotate(30deg);
    opacity: 0;
  }
}
</style>
