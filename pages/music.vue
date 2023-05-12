<template>
  <v-row no-gutters align="center" justify="center" style="height: 100%; width: 100%;">
    <v-col
      v-for="music in musicList"
      cols="9"
      md="3"
      lg="2"
      class="mx-2"
    >
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card
            color="#26c6da"
            dark
            rounded="xl"
            :elevation="hover? 24 : 8"
            nuxt
            @click="onClickPlay(music.music)"
          >
            <v-card-text class="text-body-1 font-weight-bold text-center">
              <v-icon size="150">mdi-play</v-icon>
              <p class="mb-0">{{ music.title }}</p>
            </v-card-text>
          </v-card>
        </template>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import sarada from '@/assets/sounds/shiawasenosarada.mp3'

export default {
  name: 'music',
  data () {
    return {
      musicList: [
        { 'music': 'sarada', 'title': '幸せのサラダ'  }
      ]
    }
  },
  mounted () {
  },
  methods: {
    onClickPlay(selectedMusic) {
      const music = this.fetchMusic(selectedMusic);
      const audio = new Audio(music);
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
    },
    fetchMusic(selectedMusic) {
      switch (selectedMusic) {
        case 'sarada':
          sarada;
          break;
      }
    }
  }
}
</script>

<style scoped>
</style>
