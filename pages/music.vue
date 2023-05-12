<template>
  <div style="width: 100%; height: 100%;">
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
        style="min-height: 100%; min-width: 70%;"
        elevation="0"
      >
        <v-card-text class="pt-1 pb-0 px-2">
          {{ musicTitle() }}
        </v-card-text>
        <v-card-actions class="pb-0">
          <v-progress-linear
            v-model="currentTime"
            color="#26c6da"
            class="ma-0 pa-0"
          ></v-progress-linear>
        </v-card-actions>
      </v-card>

      <v-card
        class="pb-0 mx-2 mt-3"
        color="#f5f5f5"
        style="min-height: 80%;"
        elevation="0"
      >
        <v-card-text class="pt-1 pb-0 px-2">
          {{ currentTime }}
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
      isPlaying: false
    }
  },
  mounted() {
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
          this.audio.play();
          this.audio.ontimeupdate = this.updateCurrentTime();
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
        this.audio.currentTime = 0;
        this.audio.play();
        this.audio.ontimeupdate = this.updateCurrentTime();
      }
    },
    updateCurrentTime() {
      this.currentTime = this.audio.currentTime;
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
