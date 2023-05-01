<template>
  <div>
    <canvas
      ref="canvas"
      width="2000"
      height="1000"
      @touchstart="startDraw"
      @touchend="endDraw"
      @touchmove="inDraw"
      @mousedown="startDraw"
      @mouseup="endDraw"
      @mouseout="endDraw"
      @mousemove="inDraw">
    </canvas>
  </div>
</template>

<script>
export default {
  name: 'drawing',
  data () {
    return {
      isDraw: false,
      lastPosition: { x: null, y: null },
      currentColor: "#000",
      mouseX: 0,
      mouseY: 0
    }
  },
  mounted () {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
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

      this.rect = this.canvas.getBoundingClientRect();
      this.mouseX = x - this.rect.left;
      this.mouseY = y - this.rect.top;

      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = this.currentColor;

      if (this.lastPosition.x === null || this.lastPosition.y === null) {
        this.ctx.moveTo(this.mouseX, this.mouseY);
      } else {
        this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
      }
      this.ctx.lineTo(this.mouseX, this.mouseY);
      this.ctx.stroke();

      this.lastPosition.x = this.mouseX;
      this.lastPosition.y = this.mouseY;

      // console.log("inDraw", e.originalEvent.changedTouches)
    }
  }
}
</script>

<style scoped>
</style>
