<template>
  <v-app class="toybox-app">
    <v-app-bar
      fixed
      dark
      color="#54acdb"
      elevation="6"
      class="toybox-header"
    >
      <v-btn icon nuxt to="/" aria-label="おもちゃばこのメニューへ">
        <span class="header-bear" aria-hidden="true">🧸</span>
      </v-btn>

      <v-btn text nuxt to="/" aria-label="おもちゃばこのメニューへ戻る" class="toybox-title-button">
        <v-app-bar-title class="toybox-title">おもちゃばこ</v-app-bar-title>
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

.toybox-header {
  border-bottom: 5px solid #3989b2 !important;
}

.toybox-title {
  color: #f4fdff;
  font-size: 1.35rem !important;
  letter-spacing: .08em;
  text-shadow: 0 2px 0 #3989b2;
}

.toybox-title-button { min-height: 48px !important; min-width: 190px !important; justify-content: flex-start !important; }

.header-bear {
  display: inline-block;
  font-size: 1.7rem;
  line-height: 1;
  transform: rotate(-8deg);
}

.theme--dark.v-btn--active:hover::before, .theme--dark.v-btn--active::before {
  opacity: 0;
}
</style>
