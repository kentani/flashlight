<template>
  <div class="poke">
    <div class="card-container" ref="cardContainer">
      <div class="shiny-card" ref="shinyCard">
        <div class="poke-card">
          <div class="poke-header">
            <div class="name">けんと</div>
            <div class="hp">
              <span class="label">HP</span>
              <span class="value">140</span>
            </div>
          </div>
          <div class="poke-icon">
            <img src="tani.jpg" alt="ポケモンカード" class="card-image" ref="cardImage" />
          </div>
          <div class="poke-body">
            <div class="skill">
              <div class="name">のしかかり</div>
              <div class="value">80 ×</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="card pattern"></div>
      <div class="card color"></div>
      <div class="card highlight"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const cardContainer = this.$refs.cardContainer;
    const shinyCard = this.$refs.shinyCard;

    cardContainer.addEventListener("mousemove", (e) => this.handle3DRotate(e, cardContainer, shinyCard));
    cardContainer.addEventListener("touchmove", (e) => this.handle3DRotate(e.touches[0], cardContainer, shinyCard));
    cardContainer.addEventListener("mouseleave", () => this.resetRotation(shinyCard));
    cardContainer.addEventListener("touchend", () => this.resetRotation(shinyCard));

    const CARD = this.$refs.shinyCard;

    const UPDATE = ({ x, y }) => {
      const BOUNDS = CARD.getBoundingClientRect()
      const posX = x - BOUNDS.x
      const posY = y - BOUNDS.y
      const ratioX = posX / BOUNDS.width
      const ratioY = posY / BOUNDS.height
      CARD.style.setProperty('--ratio-x', ratioX)
      CARD.style.setProperty('--ratio-y', ratioY)
    }
  },
  methods: {
    handle3DRotate(event, container, card) {
      const rect = container.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((centerY - offsetY) / centerY) * 10;
      const rotateY = ((offsetX - centerX) / centerX) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    },
    resetRotation(card) {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    },
  },
};
</script>

<style scoped>
body {
  overflow: hidden;
}
.poke {
  width: 100vw;
  overflow: hidden;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 48px;
}
.card-container {
  width: 100%;
  height: 450px;
  perspective: 1000px;
  position: relative;
}
.shiny-card {
  width: 100%;
  height: 100%;
  padding: 15px;
  position: relative;
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}
.poke-card {
  background: linear-gradient(135deg, #e0a97e, #d4946c, #c97b58);
  background-blend-mode: multiply;
  filter: brightness(1.3);
  border-radius: 10px;
  padding: 10px;
  height: 100%;
  z-index: 99;
}
.poke-header {
  display: flex;
  justify-content: space-between;
}
.poke-header .name {
  font-size: 20px;
  font-weight: bold;
}
.poke-header .hp .label {
  font-size: 14px;
}
.poke-header .hp .value {
  font-size: 24px;
  font-weight: bold;
}
.poke-icon {
  height: 200px;
}
.poke-icon .card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
.poke-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 150px;
}
.poke-body .skill {
  display: flex;
  justify-content: space-between;
}
.poke-body .skill .name {
  font-weight: bold;
}
.poke-body .skill .value {
  font-weight: bold;
}

.card {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}
.pattern {
  background: repeating-radial-gradient(circle at -150% -25%, #fff, #777 3px, #fff 3px);
  background-position: 50% 50%;
  background-size: 120% 120%;
  mix-blend-mode: color-dodge;
  opacity: 0.2;
}
.color {
  background: linear-gradient(115deg, transparent 20%, #e6d26b 30%, transparent 48% 52%, #ffd208 70%, transparent);
  background-position: 50% 50%;
  background-size: 200% 200%;
  mix-blend-mode: overlay;
}
.card-wrapper:hover > .pattern {
  background-position: calc(50% + (var(--ratio-x) * -50%)) calc(50% + (var(--ratio-y) * -50%));
}
.card-wrapper:hover > .color {
  background-position: calc(50% + (var(--ratio-x) * -50%)) calc(50% + (var(--ratio-y) * -50%));
}
.card-wrapper:hover > .highlight {
  background: radial-gradient(circle at calc(var(--ratio-x) * 100%) calc(var(--ratio-y) * 100%), hsl(0 0% 100% / 0.2), transparent 50%);
  background-repeat: no-repeat;
}
</style>
