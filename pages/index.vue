<template>
  <v-container class="menu-page">
    <section
      v-for="category in categories"
      :key="category.title"
      class="menu-category"
      :aria-labelledby="category.id"
    >
      <header class="menu-category__header">
        <span class="menu-category__emoji" aria-hidden="true">{{ category.emoji }}</span>
        <h2 :id="category.id">{{ category.title }}</h2>
      </header>
      <div class="menu-grid">
        <NuxtLink
          v-for="toy in category.toys"
          :key="toy.to"
          :to="toy.to"
          class="menu-card"
          :style="{ backgroundColor: toy.color }"
        >
          <span class="menu-card__content">
            <img
              class="menu-card__sticker"
              :src="toy.image"
              alt=""
              draggable="false"
            >
            <span class="menu-card__title">{{ toy.title }}</span>
          </span>
        </NuxtLink>
      </div>
    </section>
  </v-container>
</template>

<script>
const GAMES = [
  { title: 'もじえらび', to: '/word', image: '/flashlight/menu-icons/word.svg', color: '#55b875' },
  { title: 'つり', to: '/fishing', image: '/flashlight/menu-icons/fishing.svg', color: '#4986d5' },
  { title: 'もぐらたたき', to: '/mole', image: '/flashlight/menu-icons/mole.svg', color: '#a97a51' },
  { title: 'ピエロ', to: '/clown', image: '/flashlight/menu-icons/clown.svg', color: '#e85b67' },
  { title: 'くるまレース', to: '/race', image: '/flashlight/menu-icons/race.svg', color: '#e84a45' }
]

const TOOLS = [
  { title: 'ライト', to: '/flashlight', image: '/flashlight/menu-icons/flashlight.svg', color: '#6252c7' },
  { title: 'おえかき', to: '/drawing', image: '/flashlight/menu-icons/drawing.svg', color: '#ee6b90' },
  { title: 'おんがく', to: '/music', image: '/flashlight/menu-icons/music.svg', color: '#4aaee8' },
  { title: 'スイッチ', to: '/switch', image: '/flashlight/menu-icons/switch.svg', color: '#f3a72d' },
  { title: 'おさかな', to: '/fish', image: '/flashlight/menu-icons/fish.svg', color: '#2eb7b1' },
  { title: 'あなごぬき', to: '/anago', image: '/flashlight/menu-icons/anago.svg', color: '#ee8056' },
  { title: 'ぽけ', to: '/poke', image: '/flashlight/menu-icons/poke.svg', color: '#a66ac8' },
  { title: 'しんごうき', to: '/traffic-light', image: '/flashlight/menu-icons/traffic-light.svg', color: '#49656f' },
  { title: 'パスコード', to: '/passcode', image: '/flashlight/menu-icons/passcode.svg', color: '#405a70' }
]

const CATEGORIES = [
  { id: 'game-category', title: 'できたをめざそう', emoji: '🏁', toys: GAMES },
  { id: 'tool-category', title: 'さわってあそぼう', emoji: '✨', toys: TOOLS }
]

export default {
  name: 'IndexPage',
  data () {
    return {
      categories: CATEGORIES
    }
  }
}
</script>

<style scoped>
.menu-page {
  max-width: 1280px;
  min-height: calc(100vh - 64px);
  padding: 28px 24px 48px !important;
  flex-direction: column;
  align-items: stretch;
}

.menu-category + .menu-category {
  margin-top: 42px;
}

.menu-category__header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 8px 8px;
  color: #174d68;
  font-family: 'Yomogi', cursive;
}

.menu-category__emoji {
  display: grid;
  width: 54px;
  height: 54px;
  place-items: center;
  border: 3px solid #f4fdff;
  border-radius: 50%;
  background: #d7f3fb;
  box-shadow: 0 4px 0 rgba(27, 102, 135, .18);
  font-family: sans-serif;
  font-size: 2rem;
}

.menu-category__header h2 {
  margin: 0;
  font-size: clamp(1.55rem, 4.5vw, 2rem);
  line-height: 1.1;
}

.menu-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  padding: 8px 4px;
}

.menu-card {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border: 4px solid #f4fdff;
  border-radius: 26px;
  box-shadow: 0 7px 0 rgba(27, 102, 135, .22);
  text-decoration: none;
  transition: transform .16s ease, box-shadow .16s ease;
}

.menu-card:hover, .menu-card:focus-within {
  transform: translateY(-5px) rotate(-1deg);
  box-shadow: 0 12px 0 rgba(27, 102, 135, .16);
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
  display: block;
  width: min(74%, 150px);
  height: min(74%, 150px);
  margin: -12px 0 18px;
  filter: drop-shadow(0 4px 0 rgba(20, 84, 110, .18));
  object-fit: contain;
  pointer-events: none;
  transform: rotate(-4deg);
  transition: transform .16s ease;
  user-select: none;
}

.menu-card:hover .menu-card__sticker,
.menu-card:focus-visible .menu-card__sticker {
  transform: rotate(2deg) scale(1.05);
}

.menu-card__title {
  position: absolute;
  bottom: 18px;
  left: 50%;
  z-index: 1;
  width: max-content;
  max-width: calc(100% - 16px);
  padding: 4px 10px;
  overflow: hidden;
  color: #174d68;
  font-size: clamp(.95rem, 1.9vw, 1.2rem);
  text-overflow: ellipsis;
  text-shadow: none;
  white-space: nowrap;
  background: rgba(244, 253, 255, .92);
  border-radius: 999px;
  transform: translateX(-50%);
}

@media (max-width: 599px) {
  .menu-page {
    padding: 24px 16px 32px !important;
  }

  .menu-category + .menu-category {
    margin-top: 32px;
  }

  .menu-category__header {
    margin-left: 4px;
  }

  .menu-category__emoji {
    width: 48px;
    height: 48px;
    font-size: 1.75rem;
  }

  .menu-grid {
    gap: 10px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 4px;
  }

  .menu-card__title {
    bottom: 12px;
    padding: 3px 8px;
    font-size: .98rem;
  }
}
</style>
