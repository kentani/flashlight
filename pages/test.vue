<template>
  <div class="card-wrapper">
    <div class="card color"></div>
    <div class="card highlight"></div>
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
</template>

<script>
export default {
  name: 'TestPage',
  components: {
  },
  data: () => ({
  }),
  mounted() {
    const CARD = document.querySelector('.card-wrapper');

    const addHoverClass = () => CARD.classList.add('hover');
    const removeHoverClass = () => CARD.classList.remove('hover');

    const UPDATE = (event) => {
      let x, y;

      // マウスかタッチかを判定して座標を取得
      if (event.type === 'touchmove') {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
      } else {
        x = event.clientX;
        y = event.clientY;
      }

      const BOUNDS = CARD.getBoundingClientRect()
      const pointerX = x - BOUNDS.x
      const pointerY = y - BOUNDS.y
      const ratioX = pointerX / BOUNDS.width
      const ratioY = pointerY / BOUNDS.height
      CARD.style.setProperty('--ratiox', ratioX)
      CARD.style.setProperty('--ratioy', ratioY)

      const mX = ratioX * 100
      const mY = ratioY * 100
      CARD.style.setProperty('--mx', `${mX}%`)
      CARD.style.setProperty('--my', `${mY}%`)

      const rX = (ratioX - 0.5) * -30
      const rY = (ratioY - 0.5) * 50
      CARD.style.setProperty('--rx', `${rX}deg`)
      CARD.style.setProperty('--ry', `${rY}deg`)

      const posX = 50 + (ratioX - 0.5) * 28
      const posY = 50 + (ratioY - 0.5) * 28
      CARD.style.setProperty('--pos', `${posX}% ${posY}%`)
      CARD.style.setProperty('--posx', `${posX}%`)
      CARD.style.setProperty('--posy', `${posY}%`)

      const hyp = Math.sqrt( Math.pow( ratioX - 0.5, 2 ) + Math.pow( ratioY - 0.5, 2 )) * 10 / 7;
      CARD.style.setProperty('--hyp', hyp)
    }

    document.body.addEventListener('pointermove', UPDATE)
    document.body.addEventListener('touchmove', UPDATE);

    // PC向けのホバーイベント
    CARD.addEventListener('mouseenter', addHoverClass);
    CARD.addEventListener('mouseleave', removeHoverClass);

    // スマホ向けのタッチイベント
    CARD.addEventListener('touchstart', addHoverClass);
    CARD.addEventListener('touchend', removeHoverClass);

    // 初期状態で効果を適用したい場合
    setTimeout(() => {
      const initialX = CARD.getBoundingClientRect().x + 100;  // 任意の初期位置
      const initialY = CARD.getBoundingClientRect().y + 100;  // 任意の初期位置
      UPDATE({ x: initialX, y: initialY });
      addHoverClass();
    }, 500);
  },
  methods: {
  }
}
</script>

<style scoped>
.card {
  border-radius: 15px;
  box-shadow: 0 10px 20px -5px #000;
  height: 100%;
  position: absolute;
  width: 100%;
  overflow: hidden;
}
.color {
  mix-blend-mode: color-dodge;
  display: grid;
  z-index: 1;
}
.card-wrapper {
  border-radius: 15px;
  aspect-ratio: .716;
  display: grid;
  height: 500px;
  width: 300px;
  place-items: center;
  position: absolute;
  top: 100px;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.card-wrapper.hover {
  transform: rotateX(var(--rx)) rotateY(var(--ry));
  translate: calc((var(--ratiox) - 0.5) * -5%) calc((var(--ratioy) - 0.5) * -5%);
}
.card-wrapper.hover > .color {
  background-image: url(""),
        repeating-linear-gradient(0deg,
        rgb(255, 119, 115) 5%,
        rgba(255, 237, 95, 1) 10%,
        rgba(168, 255, 95, 1) 15%,
        rgba(131, 255, 247, 1) 20%,
        rgba(120, 148, 255, 1) 25%,
        rgb(216, 117, 255) 30%,
        rgb(255, 119, 115) 35%
        ),
        repeating-linear-gradient(
        133deg,
        #0e152e 0%,
        hsl(180, 10%, 60%) 3.8%,
        hsl(180, 29%, 66%) 4.5%,
        hsl(180, 10%, 60%) 5.2%,
        #0e152e 10% ,
        #0e152e 12%
        ),
        radial-gradient(
        farthest-corner circle
        at var(--mx) var(--my),
        rgba(0, 0, 0, .1) 12%,
        rgba(0, 0, 0, .15) 20%,
        rgba(0, 0, 0, .25) 120%
        );
  background-blend-mode: exclusion, hue, hard-light;
  background-size: 50% 42%, 200% 700%, 300% 100%, 200% 100%;
  background-position: center center, 0% 0%;
  filter: brightness(calc((var(--hyp) * 0.3) + 0.5)) contrast(1.8) saturate(1.5);
}

.card-wrapper.hover > .color::after {
  content: "";
  grid-area: 1/1;
  background-size: 50% 42%, 200% 400%, 195% 100%, 200% 100%;
  background-position: center center, 0% 100%;
  filter: brightness(calc((var(--hyp) * 0.5) + 0.8)) contrast(1.4) saturate(1.4);
  mix-blend-mode: exclusion;
  background-image: url(""),
        repeating-linear-gradient(0deg,
        rgb(255, 119, 115) 5%,
        rgba(255, 237, 95, 1) 10%,
        rgba(168, 255, 95, 1) 15%,
        rgba(131, 255, 247, 1) 20%,
        rgba(120, 148, 255, 1) 25%,
        rgb(216, 117, 255) 30%,
        rgb(255, 119, 115) 35%
        ),
        repeating-linear-gradient(
        133deg,
        #0e152e 0%,
        hsl(180, 10%, 60%) 3.8%,
        hsl(180, 29%, 66%) 4.5%,
        hsl(180, 10%, 60%) 5.2%,
        #0e152e 10% ,
        #0e152e 12%
        ),
        radial-gradient(
        farthest-corner circle
        at var(--mx) var(--my),
        rgba(0, 0, 0, .1) 12%,
        rgba(0, 0, 0, .15) 20%,
        rgba(0, 0, 0, .25) 120%
        );
  background-blend-mode: exclusion, hue, hard-light;
}

.poke-card {
  background: linear-gradient(135deg, #d07b3a, #feccae, #974f2e);
  background-blend-mode: multiply;
  filter: brightness(1.0);
  border-radius: 15px;
  padding: 5px 15px;
  height: 100%;
  width: 100%;
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
  /* position: absolute; */
  height: 200px;
  z-index: 2;
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
</style>
