<template>
  <v-row
    no-gutters
    align="center"
    justify="center"
    class="mt-12"
    style="height: 100%; width: 100%;"
  >
    <v-col
      v-for="toy in toyList"
      :key="toy.icon"
      cols="9"
      md="3"
      lg="2"
    >
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card
            color="#26c6da"
            dark
            rounded="xl"
            :elevation="hover? 24 : 8"
            nuxt
            class="my-4"
            :to="toy.to"
          >
            <v-card-text class="text-body-1 font-weight-bold text-center">
              <v-icon size="150">{{ toy.icon }}</v-icon>
              <p class="mb-0" style="font-family: 'Yomogi', cursive; font-weight: bold;">{{ toy.title }}</p>
            </v-card-text>
          </v-card>
        </template>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import sound from '@/assets/sounds/33.mp3'

export default {
  name: 'IndexPage',
  data () {
    return {
      toyList: [
        { 'title': 'ライト', 'to': '/flashlight', 'icon': 'mdi-flashlight' },
        { 'title': 'おえかき', 'to': '/drawing', 'icon': 'mdi-palette' },
        { 'title': 'おんがく', 'to': '/music', 'icon': 'mdi-music' },
        { 'title': 'スイッチ', 'to': '/switch', 'icon': 'mdi-light-switch-off' },
        { 'title': 'もじえらび', 'to': '/word', 'icon': 'mdi-alpha-a-circle-outline' },
      ]

    }
  }
}
</script>

<style scoped>
.zoom1 {
  transition: 1.2s;
  transform: scale(1);
}
</style>
