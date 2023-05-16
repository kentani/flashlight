<template>
  <div style="height: 100%; width: 100%;">
    <v-app-bar
      dense
      elevation="0"
      class="option-bar"
    >

      <v-btn
        fab
        small
        depressed
        :ripple="false"
        class="ml-2 mr-0"
        :disabled="currentMusic === '-'"
        @click="onclickPlay(currentMusic)"
      >
        <v-icon color="#26c6da">{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
      </v-btn>

      <v-card
        class="pb-0"
        color="#f5f5f5"
        style="min-height: 100%; width: 100%;"
        elevation="0"
      >
        <v-card-text class="pt-1 pb-0 pl-2 pr-0">
          {{ musicTitle() }}
        </v-card-text>

        <v-card-actions class="pb-0 pl-2 pr-0">
          <v-progress-linear
            v-model="currentTimeBar"
            color="#26c6da"
            class="ma-0 pa-0"
          ></v-progress-linear>
        </v-card-actions>
      </v-card>

      <v-spacer></v-spacer>

      <v-card
        class="pb-0 mx-0 mt-3"
        color="#f5f5f5"
        style="min-height: 80%; min-width: 30%;"
        elevation="0"
      >
        <v-card-text class="pt-1 pb-0 px-0 text-center">
          {{ convertTime(currentTime) }} / {{ convertTime(musicTime) }}
        </v-card-text>
      </v-card>
    </v-app-bar>

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
              @click="onclickPlay(key)"
            >
              <v-card-text class="text-body-1 font-weight-bold text-center">
                <v-icon size="150">
                  {{ music.icon }}
                </v-icon>
                <p class="mb-0">{{ music.title }}</p>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import shu from '@/assets/sounds/33.mp3'
import sarada from '@/assets/sounds/shiawasenosarada.mp3'

export default {
  name: 'music',
  data () {
    return {
      musicList: {
        'sarada': { 'title': '幸せのサラダ', 'icon': 'mdi-play' },
        'shu': { 'title': 'シュッ', 'icon': 'mdi-play' }
      },
      currentMusic: '-',
      audio: {},
      currentTime: 0,
      musicTime: 0,
      isPlaying: false,
      currentTimeBar: 0
    }
  },
  mounted() {
    const time = this.musicTime / 100;
    this.currentTimeBar = this.currentTime / time
  },
  watch: {
    currentTimeBar: function() {
      const time = this.musicTime / 100;
      this.currentTimeBar = this.currentTime / time
    }
  },
  methods: {
    musicTitle() {
      if (this.currentMusic === '-') {
        return '-';
      } else {
        return this.musicList[this.currentMusic]['title'];
      }
    },
    onclickPlay(selectedMusic) {
      if (this.currentMusic === selectedMusic) {
        if (this.isPlaying) {
          this.isPlaying = false;
          this.musicList[selectedMusic]['icon'] = 'mdi-play';
          this.currentTime = this.audio.currentTime;
          this.audio.pause();
        } else {
          this.isPlaying = true;
          this.musicList[selectedMusic]['icon'] = 'mdi-pause';
          this.audio.ontimeupdate = () => {
          this.currentTime = this.audio.currentTime;
          };
          this.audio.onended = () => {
            this.isPlaying = false;
            this.musicList[this.currentMusic]['icon'] = 'mdi-play';
            this.audio.currentTime = 0;
          };
          this.audio.play();
        }
      } else {
        this.isPlaying = true;
        this.currentTime = 0;
        if (this.currentMusic !== '-') {
          this.musicList[this.currentMusic]['icon'] = 'mdi-play';
          this.audio.pause();
          this.audio.currentTime = 0;
        }
        this.musicList[selectedMusic]['icon'] = 'mdi-pause';
        this.currentMusic = selectedMusic;
        this.audio = new Audio(this.fetchMusic(selectedMusic));
        this.audio.preload = 'metadata';
        this.audio.load();
        this.audio.onloadedmetadata = () => {
          this.musicTime = this.audio.duration;
        };
        this.audio.ontimeupdate = () => {
          this.currentTime = this.audio.currentTime;
        };
        this.audio.onended = () => {
          this.isPlaying = false;
          this.musicList[this.currentMusic]['icon'] = 'mdi-play';
          this.audio.currentTime = 0;
        };
        this.audio.currentTime = 0;
        this.audio.play();
      }
    },
    fetchMusic(selectedMusic) {
      switch (selectedMusic) {
        case 'sarada':
          return sarada;
        case 'shu':
          return shu;
      }
    },
    convertTime(time) {
      const min = this.convertMin(time);
      const sec = this.convertSec(time);
      const mm = ( '00' + min ).slice( -2 );
      const ss = ( '00' + sec ).slice( -2 );
      return `${mm}:${ss}`;
    },
    convertMin(time) {
      return Math.floor(time / 60);
    },
    convertSec(time) {
      return Math.floor(time % 60);
    }
  }
}
</script>

<style scoped>
</style>
