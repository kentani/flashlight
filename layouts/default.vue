<template>
  <div>
    <v-app-bar
      fixed
      dense
      dark
      color="#26c6da"
      elevation="0"
      class="pa-0"
    >
      <v-btn icon nuxt to="/">
        <v-icon>mdi-teddy-bear</v-icon>
      </v-btn>
      <v-app-bar-title class="font-weight-bold">ToyBox</v-app-bar-title>

      <v-spacer />

      <v-btn icon nuxt to="/">
        <v-icon>mdi-apps</v-icon>
      </v-btn>
    </v-app-bar>
    <v-app>
      <v-main>
        <v-container fluid pa-0>
          <nuxt />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
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

.container {
  height: 100%;
}

.v-toolbar__content, .v-toolbar__extension {
  padding: 0px;
}
</style>
