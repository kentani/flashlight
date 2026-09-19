<template>
  <v-container class="menu-page">
    <header class="menu-hero">
      <span class="menu-hero__sparkle sparkle-left" aria-hidden="true">★</span>
      <span class="menu-hero__sparkle sparkle-right" aria-hidden="true">✦</span>
      <p class="menu-hero__eyebrow">きょうは なにで あそぶ？</p>
      <h1>おもちゃを <span>えらぼう！</span></h1>
      <p class="menu-hero__hint">すきなおもちゃを タップしてね</p>
    </header>
    <v-row
      justify="center"
      class="menu-grid"
    >
      <v-col
        v-for="toy in toyList"
        :key="toy.to"
        cols="6"
        sm="6"
        md="4"
        lg="3"
        xl="2"
        class="menu-column"
      >
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              :color="toy.color"
              rounded="xl"
              :elevation="hover ? 24 : 8"
              nuxt
              :to="toy.to"
              class="menu-card"
            >
              <v-card-text class="menu-card__content text-body-1 font-weight-bold text-center">
                <span class="menu-card__sticker" aria-hidden="true">{{ toy.emoji }}</span>
                <v-icon class="menu-card__icon" aria-hidden="true">{{ toy.icon }}</v-icon>
                <p class="mb-0">{{ toy.title }}</p>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const TOYS = [
  { title: 'ライト', to: '/flashlight', icon: 'mdi-flashlight', emoji: '🔦', color: '#6252c7' },
  { title: 'おえかき', to: '/drawing', icon: 'mdi-palette', emoji: '🎨', color: '#ee6b90' },
  { title: 'おんがく', to: '/music', icon: 'mdi-music', emoji: '🎵', color: '#4aaee8' },
  { title: 'スイッチ', to: '/switch', icon: 'mdi-light-switch-off', emoji: '💡', color: '#f3a72d' },
  { title: 'もじえらび', to: '/word', icon: 'mdi-alpha-a-circle-outline', emoji: '🔤', color: '#55b875' },
  { title: 'おさかな', to: '/fish', icon: 'mdi-fish', emoji: '🐟', color: '#2eb7b1' },
  { title: 'あなごぬき', to: '/anago', icon: 'mdi-fish', emoji: '🐠', color: '#ee8056' },
  { title: 'つり', to: '/fishing', icon: 'mdi-fish', emoji: '🎣', color: '#4986d5' },
  { title: 'ぽけ', to: '/poke', icon: 'mdi-card-account-details-outline', emoji: '👆', color: '#a66ac8' },
  { title: 'もぐらたたき', to: '/mole', icon: 'mdi-hammer', emoji: '🐹', color: '#a97a51' },
  { title: 'ピエロからにげる', to: '/clown', icon: 'mdi-run-fast', emoji: '🤡', color: '#e85b67' },
  { title: 'しんごうき', to: '/traffic-light', icon: 'mdi-traffic-light', emoji: '🚦', color: '#49656f' }
]

export default {
  name: 'IndexPage',
  data () {
    return {
      toyList: TOYS
    }
  }
}
</script>

<style scoped>
.menu-page {
  max-width: 1280px;
  min-height: calc(100vh - 64px);
  padding: 92px 24px 48px !important;
  flex-direction: column;
  align-items: stretch;
}

.menu-hero {
  position: relative;
  width: min(100%, 720px);
  margin: 0 auto 24px;
  padding: 18px 20px 16px;
  text-align: center;
  color: #643e2b;
}

.menu-hero h1 {
  margin: 0;
  font-size: clamp(1.75rem, 5vw, 2.65rem);
  line-height: 1.25;
  letter-spacing: .05em;
}

.menu-hero h1 span {
  white-space: nowrap;
}

.menu-hero__eyebrow, .menu-hero__hint {
  margin: 0;
  font-size: clamp(1rem, 3vw, 1.25rem);
  font-weight: bold;
}

.menu-hero__eyebrow { color: #ef6a4d; }
.menu-hero__hint { margin-top: 6px; color: #79614c; }

.menu-hero__sparkle {
  position: absolute;
  color: #f2ad29;
  font-size: 2rem;
  animation: twinkle 1.7s ease-in-out infinite alternate;
}

.sparkle-left { left: 2%; top: 14px; }
.sparkle-right { right: 3%; bottom: 12px; animation-delay: .5s; }

.menu-grid {
  margin: 0 !important;
  padding: 16px 12px !important;
  background:
    repeating-linear-gradient(90deg, rgba(123, 70, 35, .12) 0 2px, transparent 2px 18px),
    linear-gradient(135deg, #d9924e, #f2ba70 45%, #c9783d);
  border: 8px solid #9b5c32;
  border-radius: 28px;
  box-shadow: inset 0 0 0 4px #ffd794, 0 9px 0 rgba(89, 52, 31, .16);
}

.menu-column {
  display: flex;
}

.menu-card {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border: 4px solid #fff6dc !important;
  box-shadow: 0 7px 0 rgba(91, 60, 43, .22) !important;
  transition: transform .16s ease, box-shadow .16s ease;
}

.menu-card:hover, .menu-card:focus-within {
  transform: translateY(-5px) rotate(-1deg);
  box-shadow: 0 12px 0 rgba(91, 60, 43, .16) !important;
}

.menu-card__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  padding: 16px;
  font-family: 'Yomogi', cursive;
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
  text-shadow: 0 2px 0 rgba(0, 0, 0, .14);
}

.menu-card__icon {
  position: absolute;
  right: -8%;
  bottom: -12%;
  color: rgba(255, 255, 255, .2) !important;
  font-size: clamp(100px, 12vw, 176px);
}

.menu-card__sticker {
  margin-bottom: 8px;
  font-family: sans-serif;
  font-size: clamp(3.2rem, 7vw, 6.3rem);
  filter: drop-shadow(0 4px 0 rgba(69, 45, 30, .18));
  transform: rotate(-7deg);
}

.menu-card__content p {
  position: absolute;
  bottom: 18px;
  left: 50%;
  z-index: 1;
  width: max-content;
  max-width: calc(100% - 24px);
  margin: 0;
  padding: 4px 13px;
  overflow: hidden;
  color: #513d31;
  text-overflow: ellipsis;
  text-shadow: none;
  white-space: nowrap;
  background: rgba(255, 253, 244, .9);
  border-radius: 999px;
  transform: translateX(-50%);
}

@keyframes twinkle {
  from { transform: scale(.8) rotate(-10deg); }
  to { transform: scale(1.12) rotate(10deg); }
}

@media (max-width: 599px) {
  .menu-page {
    padding: 82px 16px 32px !important;
  }

  .menu-column {
    padding: 6px !important;
  }

  .menu-hero {
    margin-bottom: 14px;
    padding-right: 28px;
    padding-left: 28px;
  }

  .menu-hero h1 {
    font-size: clamp(1.65rem, 8vw, 2rem);
  }

  .menu-hero h1 span {
    display: block;
  }

  .menu-grid {
    padding: 8px 5px !important;
    border-width: 6px;
    border-radius: 22px;
  }

  .menu-card__content p {
    bottom: 12px;
    padding: 3px 8px;
    font-size: .98rem;
  }
}
</style>
