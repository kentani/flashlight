(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{405:function(t,o,n){"use strict";n.r(o);var e={name:"drawing",data:function(){return{isDraw:!1,lastPosition:{x:null,y:null},currentColor:"#000",mouseX:0,mouseY:0}},mounted:function(){this.canvas=this.$refs.canvas,this.ctx=this.canvas.getContext("2d")},methods:{startDraw:function(t){"touchstart"===t.type&&t.preventDefault(),this.ctx.beginPath(),this.isDrag=!0},endDraw:function(){this.ctx.closePath(),this.isDrag=!1,this.lastPosition.x=null,this.lastPosition.y=null},inDraw:function(t){if(this.isDrag){var o=0,n=0;"touchmove"===t.type?(o=t.changedTouches[0].pageX,n=t.changedTouches[0].pageY):(o=t.clientX,n=t.clientY),this.rect=this.canvas.getBoundingClientRect(),this.mouseX=o-this.rect.left,this.mouseY=n-this.rect.top,this.ctx.lineCap="round",this.ctx.lineJoin="round",this.ctx.lineWidth=5,this.ctx.strokeStyle=this.currentColor,null===this.lastPosition.x||null===this.lastPosition.y?this.ctx.moveTo(this.mouseX,this.mouseY):this.ctx.moveTo(this.lastPosition.x,this.lastPosition.y),this.ctx.lineTo(this.mouseX,this.mouseY),this.ctx.stroke(),this.lastPosition.x=this.mouseX,this.lastPosition.y=this.mouseY}}}},h=n(91),component=Object(h.a)(e,(function(){var t=this,o=t._self._c;return o("div",[o("canvas",{ref:"canvas",attrs:{width:"2000",height:"1000"},on:{touchstart:t.startDraw,touchend:t.endDraw,touchmove:t.inDraw,mousedown:t.startDraw,mouseup:t.endDraw,mouseout:t.endDraw,mousemove:t.inDraw}})])}),[],!1,null,"1883c136",null);o.default=component.exports}}]);