<template>
  <v-row
    no-gutters
    align="center"
    justify="center"
    style="height: 100%; width: 100%;"
  >
    <v-col
      v-for="(music, key) in musicList"
      :key="key"
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
          >
            <v-card-text
              class="text-body-1 font-weight-bold text-center pb-0"
              @click="onClickMusicBtn(key)"
            >
              <v-icon size="150">
                {{ music.icon }}
              </v-icon>
              <p class="mb-0">{{ music.title }}</p>
            </v-card-text>

            <v-card-actions class="pt-0">
              <v-slider
                v-model="musicList[key]['currentTime']"
                hide-details
                min="0"
              ></v-slider>
            </v-card-actions>
          </v-card>
        </template>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import shu from '@/assets/sounds/33.mp3'
import sarada from '@/assets/sounds/shiawasenosarada.mp3'

export default {
  name: 'music',
  data () {
    return {
      musicList: {
        'sarada': { 'title': '幸せのサラダ', 'icon': 'mdi-play', 'currentTime': 0 },
        'shu': { 'title': 'シュッ', 'icon': 'mdi-play', 'currentTime': 0 }
      },
      playingMusic: '',
      audio: {}
    }
  },
  mounted() {
  },
  methods: {
    onClickMusicBtn(selectedMusic) {
      if (this.playingMusic === selectedMusic) {
        this.audio.pause();
        this.playingMusic = '';
        this.musicList[selectedMusic]['currentTime'] = this.audio.currentTime;
        this.musicList[selectedMusic]['icon'] = 'mdi-play';
      } else {
        const music = this.fetchMusic(selectedMusic);
        this.audio = new Audio(music);
        this.audio.play();
        this.playingMusic = selectedMusic;
        this.musicList[selectedMusic]['icon'] = 'mdi-pause';
      }
    },
    fetchMusic(selectedMusic) {
      switch (selectedMusic) {
        case 'sarada':
          return sarada;
        case 'shu':
          return shu;
      }
    }
  }
}
</script>

<style scoped>
</style>
