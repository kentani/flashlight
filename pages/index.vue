<template>
  <v-row align="center" justify="center" style="height: 100%; width: 100%;">
    <v-col cols="9" md="3" lg="2">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card
            color="#26c6da"
            dark
            rounded="xl"
            :elevation="hover? 24 : 8"
            nuxt
            to="/flashlight"
          >
            <v-card-text class="text-body-1 font-weight-bold text-center">
              <v-icon size="150">mdi-flashlight</v-icon>
              <p class="mb-0">ライト</p>
            </v-card-text>
          </v-card>
        </template>
      </v-hover>
    </v-col>

    <v-col cols="9" md="3" lg="2">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card
            color="#26c6da"
            dark
            rounded="xl"
            :elevation="hover? 24 : 8"
            nuxt
            to="/drawing"
          >
            <v-card-text class="text-body-1 font-weight-bold text-center">
              <v-icon size="150">mdi-palette</v-icon>
              <p class="mb-0">おえかき</p>
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
      pointClass: "position1",
      currentPosition: 1,
      currentZoom: 1
    }
  },
  methods: {
    onClickPointer() {
      const audio = new Audio(sound)
      audio.currentTime = 0 // 連続で鳴らせるように
      audio.play() // 鳴らす

      const positions = ["1", "2", "3", "4", "5"]
      positions.splice(this.currentPosition - 1, 1)
      const newPosition = positions[Math.floor(Math.random()*positions.length)]

      const zooms = ["1", "2", "3", "4"]
      zooms.splice(this.currentZoom - 1, 1)
      const newZoom = zooms[Math.floor(Math.random()*zooms.length)]

      this.pointClass = "position" + newPosition + " " + "zoom" + newZoom
      this.currentPosition = newPosition
      this.currentZoom = newZoom
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
