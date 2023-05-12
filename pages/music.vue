<template>
  <v-row
    no-gutters
    align="center"
    justify="center"
    style="height: 100%; width: 100%;"
  >
    <v-col
      v-for="(music, key) in musicList"
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
            <v-card-text class="text-body-1 font-weight-bold text-center pb-0" @click="onClickMusicBtn(key)">
              <v-icon size="150">
                {{ music.icon }}
              </v-icon>
              <p class="mb-0">{{ music.title }}</p>
            </v-card-text>

            <v-card-actions class="pt-0">
              <v-slider
                hide-details
                max="50"
                min="-50"
              ></v-slider>
            </v-card-actions>
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
      musicList: {
        'sarada': { 'title': '幸せのサラダ', 'icon': 'mdi-play' }
      },
      playingMusic: ''
    }
  },
  mounted () {
  },
  methods: {
    onClickMusicBtn(selectedMusic) {
      const music = this.fetchMusic(selectedMusic);
      const audio = new Audio(music);

      if (this.playingMusic === selectedMusic) {
        audio.pause();
        this.playingMusic = '';
        this.musicList[selectedMusic]['icon'] = 'mdi-play';
      } else {
        audio.currentTime = 0;
        audio.play();
        this.playingMusic = selectedMusic;
        this.musicList[selectedMusic]['icon'] = 'mdi-pause';
      }
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
