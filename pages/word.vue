<template>
  <div>
    <div class="main">
      <div class="section1">
        <div class="theme">
          <div class="card" id="theme-word-card">
            <div class="card-title">
              <span id="theme-word">{{ themeWord }}</span>
            </div>
          </div>
        </div>

        <div class="c-stepper">
          <div class="c-stepper__item doing" id="timer">
            <h3 class="c-stepper__title">
              <span class="timer-item" :style="timerStyle" id="timer-item">{{ timer }}</span>
            </h3>
          </div>
        </div>
      </div>

      <div class="section3">
        <p>おなじもじをえらんでね！</p>
      </div>

      <div class="section2">
        <div class="card-list">
          <div
            v-for="word in words"
            :key="word.id"
            :class="word.class"
            class="selectable-card card"
            @click="selectWord(word.id)"
          >
            {{ word.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import okSound from '@/assets/sounds/ok.mp3'
import ngSound from '@/assets/sounds/ng.mp3'

export default {
  name: 'word',
  data: () => ({
    themeWord: "",
    words: [{}, {}, {}, {}],
    timer: 10,
    timerStyle: "conic-gradient(#26c6da 0deg 100deg, #26c6da 100deg 360deg)",
    cardClassList: ["a", "b", "c", "d"],
    cardTitleClassList: ["sm", "md", "lg", "xl"],
    hiraganaList: ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん"],
    clearId: null,

  }),
  mounted() {
    this.themeWord = "";

    this.words = [{}, {}, {}, {}];

    this.timer = 10;

    document.getElementById("theme-word-card")?.classList?.remove("result");
    Array.from(document.getElementsByClassName("selectable-card")).forEach(el => el?.classList?.remove("selected", "result"));
    this.timerStyle = `background-image: conic-gradient(#26c6da 0deg 360deg)`;

    clearInterval(this.clearId);

    this.setWord();
    this.timerExec();
  },
  unmounted() {
    this.themeWord = "";

    this.words = [{}, {}, {}, {}];

    this.timer = 10;

    document.getElementById("theme-word-card")?.classList?.remove("result");
    Array.from(document.getElementsByClassName("selectable-card")).forEach(el => el?.classList?.remove("selected", "result"));
    this.timerStyle = `background-image: conic-gradient(#26c6da 0deg 360deg)`;

    clearInterval(this.clearId);
  },
  methods: {
    timerExec() {
      this.clearId = setInterval(() => {
        if (this.timer === 0) {
          document.getElementById("theme-word-card")?.classList?.add("result");

          this.words.forEach(word => {
            if (word.text === this.themeWord) {
              word.class += " result";
            }
          })

          this.timerStyle = `background-image: conic-gradient(#e0e0e0 0deg 360deg)`;

          clearInterval(this.clearId);

          setTimeout(() => {
            this.timer = 10;
            document.getElementById("theme-word-card")?.classList?.remove("result");
            Array.from(document.getElementsByClassName("selectable-card")).forEach(el => el?.classList?.remove("selected", "result"));
            this.timerStyle = `background-image: conic-gradient(#26c6da 0deg 360deg)`;
            this.timerExec();
            this.setWord();
          }, 2000)
        } else if (this.timer > 0) {
          this.timer--;

          let diff = 10 - this.timer;
          let grayArea = 36 * diff;

          this.timerStyle = `background-image: conic-gradient(#e0e0e0 0deg ${grayArea}deg, #26c6da ${grayArea}deg 360deg)`;
        };
      }, 1000);
    },
    setWord() {
      this.themeWord = this.hiraganaList[Math.floor(Math.random() * (this.hiraganaList.length - 1))];

      let randomNum = Math.floor(Math.random() * (this.words.length - 1));

      this.words = this.words.map((_v, i) => {
        let text = "";

        if (i === randomNum) {
          text = this.themeWord;
        } else {
          text = this.hiraganaList[Math.floor(Math.random() * (this.hiraganaList.length - 1))];
        }

        let cardClass = this.cardClassList[Math.floor(Math.random() * (this.cardClassList.length - 1))];

        let cardTitleClass = this.cardTitleClassList[Math.floor(Math.random() * (this.cardTitleClassList.length - 1))];

        return { id: i, text: text, class: `${cardClass} ${cardTitleClass}`, selected: false };
      });
    },
    selectWord(wordId) {
      let correct = false;

      this.words.forEach(word => {
        if (word.id === wordId && !word.selected) {
          word.selected = true;
          word.class += " selected";
          if (word.text === this.themeWord) {
            word.class += " result";

            document.getElementById("theme-word-card")?.classList?.add("result");

            this.okAudio = new Audio(okSound);
            this.okAudio.currentTime = 0;
            this.okAudio.play();

            clearInterval(this.clearId);

            setTimeout(() => {
              this.timer = 10;
              document.getElementById("theme-word-card")?.classList?.remove("result");
              Array.from(document.getElementsByClassName("selectable-card")).forEach(el => el?.classList?.remove("selected", "result"));
              this.timerStyle = `background-image: conic-gradient(#26c6da 0deg 360deg)`;
              this.timerExec();
              this.setWord();
            }, 500)

            this.correct = true;
          }
        } else {
          word.selected = false;
          word.class = word.class.replace(" selected", "");

          if (this.correct) return;

          this.ngAudio = new Audio(ngSound);
          this.ngAudio.currentTime = 0;
          this.ngAudio.play();
        }
      })
    }
  }
}
</script>

<style scoped>
.c-stepper {
  display: flex;
  flex-wrap: wrap;
  background: #f5f8fa;
  width: 40vw;
  height: 45vw;
  align-content: center;
}
.c-stepper__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  z-index: 0;
}
.c-stepper__title > span {
  display: inline-block;
  background: #e0e0e0;
  color: #fff;
  font-weight: normal;
  font-size: 80px;
  width: 33vw;
  height: 32vw;
  border-radius: 50%;
  align-content: center;
  padding-bottom: 10px;
}
.c-stepper__item.doing > .c-stepper__title > .timer-item{
  background-image: conic-gradient(#26c6da 0deg 360deg);
}

.header {
  display: flex;
  background: #26c6da;
  color: #fff;
  font-family: "Darumadrop One", sans-serif;
  width: 100%;
  top: 0;
  left: 0;
}

.header h1 {
  font-size: 32px;
  padding: 2px 20px 8px;
  margin: 0;
  letter-spacing: 4px;
}

.main {
  padding: 0 14px;
  padding-top: 80px;
  font-family: "Yomogi", cursive;
}

.card {
  height: 100%;
  border: 0.5px solid rgba(0, 0, 0, 0.15);
  border-radius: 25px;
  padding: 10px;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.23);
  background: #fff;
}
.card .card-title {
  font-size: 14px;
  padding-bottom: 4px;
  font-weight: bold;
}
.card .card-text {
  font-size: 12px;
}

.section1 {
  display: flex;
  justify-content: space-between;
  padding-left: 18px;
}
.section1 .theme {
  width: 50vw;
  height: 40vw;
}
.section1 .card {
  position: relative;
  border: 2px solid #26c6da;
  box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.1);
  box-shadow: none;
}
.section1 .card-title {
  font-weight: 400;
  font-style: normal;
  padding-bottom: 0;
  color: #26c6da;
}
.section1 .card-title span {
  position: absolute;
  top: -40%;
  left: 8%;
  font-size: 180px;
  font-weight: bold;
}

.section2 {
  padding-left: 18px;
}
.section2 .card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
.section2 .card {
  box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.1);
  box-shadow: none;
  border: none;
  text-align: center;
  font-weight: bold;
}
.section2 .card.selected {
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.23);
  /* box-shadow: none; */
  border: none;
}
.section2 .card.sm {
  font-size: 30px;
}
.section2 .card.md {
  font-size: 60px;
}
.section2 .card.lg {
  font-size: 100px;
}
.section2 .card.xl {
  font-size: 150px;
}
.section2 .card.a {
  flex: 1 1 50px;
}
.section2 .card.b {
  flex: 1 1 100px;
}
.section2 .card.c {
  flex: 1 1 120px;
}
.section2 .card.d {
  width: 200px;
}

.section3 {
  padding-left: 18px;
}
.section3 p {
  font-weight: bold;
  font-size: 25px;
  padding: 0;
  letter-spacing: 2px;
}

.card.result,
.card.selected.result {
  border: 5px solid red;
}
</style>
