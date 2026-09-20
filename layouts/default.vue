<template>
  <v-app class="toybox-app">
    <v-app-bar
      app
      fixed
      dark
      color="#54acdb"
      elevation="6"
      class="toybox-header"
    >
      <v-btn text nuxt to="/" :ripple="false" aria-label="おもちゃばこのメニューへ戻る" class="toybox-home-button" :class="{ 'is-home-pressed': homePressed }" @click.native="playHomePress">
        <img class="header-toybox-icon" src="/flashlight/toybox-icon-192.png" alt="">
        <span class="toybox-title">おもちゃばこ</span>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid pa-0>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      homePressed: false,
      homePressTimer: null,
      clipped: false,
      drawer: false,
      fixed: false,
      active: false,
      ripple: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  beforeDestroy () {
    clearTimeout(this.homePressTimer)
  },
  methods: {
    playHomePress () {
      this.homePressed = true
      clearTimeout(this.homePressTimer)
      this.homePressTimer = setTimeout(() => {
        this.homePressed = false
      }, 180)
    }
  }
}
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}

html, body, #__nuxt, .v-application {
  max-width: 100%;
  overflow-x: hidden;
  overscroll-behavior-x: none;
}

body {
  touch-action: pan-y;
  background: #edf7fb;
}

.container {
  min-height: 100vh;
  max-width: 100%;
  overflow-x: hidden;
  background-color: #edf7fb;
  background-image: radial-gradient(rgba(84, 172, 219, .32) 1.5px, transparent 1.5px);
  background-size: 22px 22px;
  color: #315f76;
  font-family: "Yomogi", cursive !important;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.v-toolbar__content, .v-toolbar__extension {
  padding: 0 8px;
  font-family: "Yomogi", cursive;
  font-weight: bold;
}

.toybox-header,
.toybox-header .v-toolbar__content,
.toybox-home-button {
  overflow: visible !important;
}

.toybox-home-button {
  margin-left: 0 !important;
  padding-left: 0 !important;
  min-height: 48px !important;
  min-width: 236px !important;
  justify-content: flex-start !important;
}

.toybox-header {
  border-bottom: 5px solid #3989b2 !important;
}

.toybox-title {
  color: #f4fdff;
  font-size: 1.35rem !important;
  letter-spacing: .08em;
  text-shadow: 0 2px 0 #3989b2;
}

.header-toybox-icon,
.toybox-title {
  transition: transform .14s ease, filter .14s ease;
}

.toybox-home-button:active .header-toybox-icon,
.toybox-home-button.is-home-pressed .header-toybox-icon {
  transform: translate(7px, 11px) rotate(-2deg) scale(.86);
  filter: brightness(.9);
}

.header-toybox-icon {
  display: inline-block;
  width: 68px;
  height: 68px;
  margin-right: 10px;
  max-width: none;
  object-fit: contain;
  transform: translate(7px, 7px) rotate(-7deg);
}

@media (max-width: 420px) {
  .header-toybox-icon {
    width: 62px;
    height: 62px;
  }
}

.theme--dark.v-btn--active:hover::before, .theme--dark.v-btn--active::before {
  opacity: 0;
}
</style>
