<template>
  <div class="card-container" ref="cardContainer">
    <div class="shiny-card" ref="shinyCard">
      <div class="shine-overlay"></div>
      <div class="card">
        <img src="tani.jpg" alt="ポケモンカード" class="card-image" ref="cardImage" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const cardContainer = this.$refs.cardContainer;
    const shinyCard = this.$refs.shinyCard;

    // マウスやタッチの動きでカードを回転させる
    cardContainer.addEventListener("mousemove", (e) => this.handle3DRotate(e, cardContainer, shinyCard));
    cardContainer.addEventListener("touchmove", (e) => this.handle3DRotate(e.touches[0], cardContainer, shinyCard));
    cardContainer.addEventListener("mouseleave", () => this.resetRotation(shinyCard));
    cardContainer.addEventListener("touchend", () => this.resetRotation(shinyCard));
  },
  methods: {
    handle3DRotate(event, container, card) {
      const rect = container.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 回転角度を計算
      const rotateX = ((centerY - offsetY) / centerY) * 10; // 上下に10度回転
      const rotateY = ((offsetX - centerX) / centerX) * 10; // 左右に10度回転

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    },
    resetRotation(card) {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    },
  },
};
</script>

<style scoped>
.card-container {
  width: 300px;
  height: 450px;
  perspective: 1000px; /* 3D効果に必要な視点 */
  margin: 20px auto;
  margin-top: 100px;
}

.shiny-card {
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

/* キラキラエフェクト */
.shine-overlay {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 70%);
  animation: move-glow 6s infinite linear;
  pointer-events: none;
  opacity: 0.6;
}

@keyframes move-glow {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(50%, 50%) rotate(360deg);
  }
}

/* カード画像 */
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}
</style>
