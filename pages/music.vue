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
    },
    fetchMusic(selectedMusic) {
      switch (selectedMusic) {
        case 'sarada':
          return sarada;
      }
    }
  }
}
</script>

<style scoped>
</style>
