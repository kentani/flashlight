<template>
  <v-container class="menu-page">
    <v-row
      justify="center"
      class="menu-grid"
    >
      <v-col
        v-for="toy in toyList"
        :key="toy.to"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
        class="menu-column"
      >
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              color="#26c6da"
              dark
              rounded="xl"
              :elevation="hover ? 24 : 8"
              nuxt
              :to="toy.to"
              class="menu-card"
            >
              <v-card-text class="menu-card__content text-body-1 font-weight-bold text-center">
                <v-icon class="menu-card__icon">{{ toy.icon }}</v-icon>
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
  { title: 'ライト', to: '/flashlight', icon: 'mdi-flashlight' },
  { title: 'おえかき', to: '/drawing', icon: 'mdi-palette' },
  { title: 'おんがく', to: '/music', icon: 'mdi-music' },
  { title: 'スイッチ', to: '/switch', icon: 'mdi-light-switch-off' },
  { title: 'もじえらび', to: '/word', icon: 'mdi-alpha-a-circle-outline' },
  { title: 'おさかな', to: '/fish', icon: 'mdi-fish' },
  { title: 'あなごぬき', to: '/anago', icon: 'mdi-fish' },
  { title: 'つり', to: '/fishing', icon: 'mdi-fish' },
  { title: 'ぽけ', to: '/poke', icon: 'mdi-card-account-details-outline' },
  { title: 'もぐらたたき', to: '/mole', icon: 'mdi-hammer' },
  { title: 'ピエロからにげる', to: '/clown', icon: 'mdi-run-fast' }
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
  max-width: 1440px;
  min-height: calc(100vh - 48px);
  padding: 72px 24px 48px !important;
}

.menu-grid {
  margin: 0 !important;
}

.menu-column {
  display: flex;
}

.menu-card {
  width: 100%;
  aspect-ratio: 1;
}

.menu-card__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 24px;
  font-family: 'Yomogi', cursive;
}

.menu-card__icon {
  font-size: clamp(88px, 9vw, 150px);
  margin-bottom: 16px;
}

@media (max-width: 599px) {
  .menu-page {
    padding: 64px 24px 32px !important;
  }
}
</style>
