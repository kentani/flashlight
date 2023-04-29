<template>
  <div>
    <canvas
      style="border: 1px solid white;"
      ref="canvas"
      width="2000"
      height="1000"
      @touchdown="startDraw"
      @touchup="endDraw"
      @touchout="endDraw"
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
      currentColor: "#fff",
      mouseX: 0,
      mouseY: 0
    }
  },
  mounted () {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
  },
  methods: {
    startDraw() {
      this.ctx.beginPath();
      this.isDrag = true;
    },

    endDraw() {
      this.ctx.closePath();
      this.isDrag = false;
      this.lastPosition.x = null;
      this.lastPosition.y = null;
    },

    inDraw(e) {
      if(!this.isDrag) return;

      this.rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - this.rect.left;
      this.mouseY = e.clientY - this.rect.top;

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
    }
  }
}
</script>

<style scoped>
</style>
