<template>
  <v-row
    align="center"
    justify="center"
    class="my-12"
  >
    <v-col
      v-for="toy in toyList"
      :key="toy.to"
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
            :to="toy.to"
            class="menu"
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
        { 'title': 'おさかな', 'to': '/fish', 'icon': 'mdi-fish' },
        { 'title': 'あなごぬき', 'to': '/anago', 'icon': 'mdi-fish' },
        { 'title': 'つり', 'to': '/fishing', 'icon': 'mdi-fish' },
      ]

    }
  }
}
</script>

<style scoped>
  .menu {
    flex: 1
  }
</style>
