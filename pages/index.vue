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
      <v-row
        justify="center"
        class="menu-grid"
      >
        <v-col
          v-for="toy in category.toys"
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
    </section>
  </v-container>
</template>

<script>
const GAMES = [
  { title: 'もじえらび', to: '/word', icon: 'mdi-alpha-a-circle-outline', emoji: '🔤', color: '#55b875' },
  { title: 'つり', to: '/fishing', icon: 'mdi-fish', emoji: '🎣', color: '#4986d5' },
  { title: 'もぐらたたき', to: '/mole', icon: 'mdi-hammer', emoji: '🐹', color: '#a97a51' },
  { title: 'ピエロ', to: '/clown', icon: 'mdi-run-fast', emoji: '🤡', color: '#e85b67' },
  { title: 'くるまレース', to: '/race', icon: 'mdi-car-sports', emoji: '🏎️', color: '#e84a45' }
]

const TOOLS = [
  { title: 'ライト', to: '/flashlight', icon: 'mdi-flashlight', emoji: '🔦', color: '#6252c7' },
  { title: 'おえかき', to: '/drawing', icon: 'mdi-palette', emoji: '🎨', color: '#ee6b90' },
  { title: 'おんがく', to: '/music', icon: 'mdi-music', emoji: '🎵', color: '#4aaee8' },
  { title: 'スイッチ', to: '/switch', icon: 'mdi-light-switch-off', emoji: '💡', color: '#f3a72d' },
  { title: 'おさかな', to: '/fish', icon: 'mdi-fish', emoji: '🐟', color: '#2eb7b1' },
  { title: 'あなごぬき', to: '/anago', icon: 'mdi-fish', emoji: '🐠', color: '#ee8056' },
  { title: 'ぽけ', to: '/poke', icon: 'mdi-card-account-details-outline', emoji: '👆', color: '#a66ac8' },
  { title: 'しんごうき', to: '/traffic-light', icon: 'mdi-traffic-light', emoji: '🚦', color: '#49656f' },
  { title: 'パスコード', to: '/passcode', icon: 'mdi-cellphone-lock', emoji: '📱', color: '#405a70' }
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
  padding: 76px 24px 48px !important;
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
  margin: 0 !important;
  padding: 8px 4px !important;
}

.menu-column {
  display: flex;
}

.menu-card {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border: 4px solid #f4fdff !important;
  box-shadow: 0 7px 0 rgba(27, 102, 135, .22) !important;
  transition: transform .16s ease, box-shadow .16s ease;
}

.menu-card:hover, .menu-card:focus-within {
  transform: translateY(-5px) rotate(-1deg);
  box-shadow: 0 12px 0 rgba(27, 102, 135, .16) !important;
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
  filter: drop-shadow(0 4px 0 rgba(20, 84, 110, .18));
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
  color: #174d68;
  text-overflow: ellipsis;
  text-shadow: none;
  white-space: nowrap;
  background: rgba(244, 253, 255, .92);
  border-radius: 999px;
  transform: translateX(-50%);
}

@media (max-width: 599px) {
  .menu-page {
    padding: 72px 16px 32px !important;
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

  .menu-column {
    padding: 6px !important;
  }

  .menu-grid {
    padding: 4px !important;
  }

  .menu-card__content p {
    bottom: 12px;
    padding: 3px 8px;
    font-size: .98rem;
  }
}
</style>
