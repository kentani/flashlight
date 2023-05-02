<template>
  <div style="width: 100%; height: 100%;">
    <v-app-bar
      dense
      elevation="0"
      style="overflow-x: scroll;"
    >

      <v-icon class="ml-3 mr-2 mt-1" size="30">mdi-format-color-fill</v-icon>
      <v-btn
        v-for="(backColorName, i) in backColorList" :key="`back-${i}`"
        fab
        x-small
        depressed
        :ripple="false"
        :color="backColorName"
        class="mx-1"
        @click="changeBackColor(backColorName)"
      >
        <v-icon v-if="currentBackColor == backColorName" :color="currentBackColor === '#fff' ? '#121212' : 'white'">mdi-check</v-icon>
      </v-btn>

      <v-icon class="ml-6 mr-2" size="28">mdi-pencil</v-icon>
      <v-btn
        v-for="(penColorName, i) in penColorList" :key="`pen-${i}`"
        fab
        x-small
        depressed
        :ripple="false"
        :color="penColorName"
        class="mx-1"
        @click="changePenColor(penColorName)"
      >
        <v-icon v-if="currentPenColor == penColorName" :color="currentPenColor === '#fff' ? '#121212' : 'white'">mdi-check</v-icon>
      </v-btn>

      <v-slider
        v-model="currentPenSize"
        :max="20"
        step="1"
        ticks="always"
        tick-size="0"
        color="#26c6da"
        thumb-color="#26c6da"
        track-color="grey"
        always-dirty
        dense
        hide-details
        class="mx-2"
        style="min-width: 200px; max-width: 200px;"
      >
        <template v-slot:prepend>
          <v-icon @click="decrementPenSize">
            mdi-minus
          </v-icon>
        </template>

        <template v-slot:append>
          <v-icon @click="incrementPenSize">
            mdi-plus
          </v-icon>
        </template>
      </v-slider>
    </v-app-bar>
    <div class="canvas-wrapper" ref="canvasWrapper">
      <canvas
        ref="canvas"
        :style="`background-color: ${currentBackColor};`"
        @touchstart="startDraw"
        @touchend="endDraw"
        @touchmove="inDraw"
        @mousedown="startDraw"
        @mouseup="endDraw"
        @mouseout="endDraw"
        @mousemove="inDraw">
      </canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'drawing',
  data () {
    return {
      isDraw: false,
      lastPosition: { x: null, y: null },
      mouseX: 0,
      mouseY: 0,
      currentBackColor: "#fff",
      backColorList: [
        "#121212",
        "#fff",
        "#00331b",
      ],
      currentPenSize: 5,
      currentPenColor: "#121212",
      penColorList: [
        "#121212",
        "#fff",
        "#26c6da",
        "#a52a2a",
        "#ffd700",
        "#32cd32"
      ]
    }
  },
  mounted () {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    const wrapper = this.$refs.canvasWrapper;
    console.log(wrapper.clientWidth)
    this.canvas.width = wrapper.clientWidth;
    this.canvas.height = wrapper.clientHeight;
    // var w = $('.wrapper').width();
    // var h = $('.wrapper').height();
    // console.log(w, h)
  },
  methods: {
    startDraw(e) {
      if (e.type === "touchstart") {
        e.preventDefault();
      }

      this.ctx.beginPath();
      this.isDrag = true;
    },

    endDraw() {
      this.ctx.closePath();
      this.isDrag = false;
      this.lastPosition.x = null;
      this.lastPosition.y = null;
      // console.log("endDraw", e.originalEvent.changedTouches)
    },

    inDraw(e) {
      if(!this.isDrag) return;

      let x = 0;
      let y = 0;

      if (e.type === "touchmove") {
        x = e.changedTouches[0].pageX;
        y = e.changedTouches[0].pageY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      let pensile = 0;
      if (this.currentPenSize === 0) {
        pensile = 1
      } else if (this.currentPenSize === 1) {
        pensile = 5
      } else if (this.currentPenSize === 2) {
        pensile = 10
      }

      this.rect = this.canvas.getBoundingClientRect();
      this.mouseX = x - this.rect.left;
      this.mouseY = y - this.rect.top;

      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.lineWidth = this.currentPenSize + 1;
      this.ctx.strokeStyle = this.currentPenColor;

      if (this.lastPosition.x === null || this.lastPosition.y === null) {
        this.ctx.moveTo(this.mouseX, this.mouseY);
      } else {
        this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
      }
      this.ctx.lineTo(this.mouseX, this.mouseY);
      this.ctx.stroke();

      this.lastPosition.x = this.mouseX;
      this.lastPosition.y = this.mouseY;
    },

    changeBackColor(color) {
      this.currentBackColor = color;
    },
    changePenColor(color) {
      this.currentPenColor = color;
    },
    incrementPenSize() {
      this.currentPenSize += 1;
    },
    decrementPenSize() {
      this.currentPenSize -= 1;
    }
  }
}
</script>

<style scoped>
.canvas-wrapper{
  width: 100%;
  height: 100%;
}
</style>
