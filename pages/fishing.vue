<template>
  <div>
    <div id="game-area">
      <div id="score">スコア: {{ score }}</div>
      <div class="fishing-rod" ref="rod">
        <div class="hook" ref="hook"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: 0,
      isFishing: false,
    };
  },
  mounted() {
    this.spawnFish();
    this.spawnBubble();
    this.$refs.rod.addEventListener("touchstart", this.startFishing);
    this.$refs.rod.addEventListener("mousedown", this.startFishing);
  },
  methods: {
    spawnFish() {
      setInterval(() => {
        const fish = document.createElement("div");
        fish.className = "fish";

        // 魚の位置を釣り竿の高さより下から生成
        const minY = 150; // 釣り竿の高さ分を避ける
        const maxY = window.innerHeight - 100;
        fish.style.top = `${Math.random() * (maxY - minY) + minY}px`;

        const number = Math.floor(Math.random() * 6) + 1;
        fish.style.background = `url('${number}.png')`;
        fish.style.backgroundSize = 'cover';

        document.getElementById("game-area").appendChild(fish);
        setTimeout(() => fish.remove(), 4000);
      }, 2000);
    },
    spawnBubble() {
      setInterval(() => {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.style.left = `${Math.random() * 100}%`;
        document.getElementById("game-area").appendChild(bubble);
        setTimeout(() => bubble.remove(), 5000);
      }, 1000);
    },
    startFishing(event) {
      if (this.isFishing) return;
      this.isFishing = true;

      const touchY = event.touches ? event.touches[0].clientY : event.clientY;

      this.$refs.hook.style.transition = "transform 0.5s ease";
      this.$refs.hook.style.transform = `translateY(${touchY}px)`;

      setTimeout(() => this.checkCatch(touchY), 500);
    },
    checkCatch(touchY) {
      const fishElements = document.querySelectorAll(".fish");

      fishElements.forEach((fish) => {
        const fishRect = fish.getBoundingClientRect();
        const hookRect = this.$refs.hook.getBoundingClientRect();

        if (
          fishRect.top < hookRect.bottom &&
          fishRect.bottom > hookRect.top &&
          fishRect.left < hookRect.right &&
          fishRect.right > hookRect.left
        ) {
          fish.remove();
          this.score += 10;
        }
      });

      setTimeout(() => {
        this.$refs.hook.style.transition = "transform 0.5s ease";
        this.$refs.hook.style.transform = "translateY(0)";
        this.isFishing = false;
      }, 500);
    },
  },
};
</script>

<style>
body {
  overflow: hidden;
}

#game-area {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #87CEEB, #1E90FF);
}

.fishing-rod {
  position: absolute;
  width: 10px;
  height: 150px;
  background-color: brown;
  border-radius: 20px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10; /* 釣り竿を魚より上に表示 */
}

.hook {
  width: 20px;
  height: 20px;
  background-color: brown;
  position: absolute;
  bottom: 0;
  left: -5px;
  border-radius: 50%;
}

.fish {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  animation: swim 5s linear infinite;
  z-index: 5; /* 魚を釣り竿の下に設定 */
}

@keyframes swim {
  0% {
    right: -100px;
  }
  100% {
    right: 100vw;
  }
}

#score {
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  position: absolute;
  top: 50px;
  left: 10px;
}

.bubble {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  animation: float-up 10s linear infinite;
}

@keyframes float-up {
  0% {
    bottom: 0;
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
  100% {
    bottom: 180%;
    opacity: 0;
  }
}
</style>
