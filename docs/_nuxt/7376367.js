(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{417:function(t,e,n){"use strict";n.r(e);var o=n(364),r=n(365),c=n(353),l=n(416),h={name:"drawing",data:function(){return{isDraw:!1,lastPosition:{x:null,y:null},mouseX:0,mouseY:0,currentBackColor:"#fff",backColorList:["#121212","#fff","#00331b"],currentPenSize:1,currentPenColor:"#121212",penColorList:["#121212","#fff","#26c6da","#a52a2a","#ffd700","#32cd32"]}},mounted:function(){this.canvas=this.$refs.canvas,this.ctx=this.canvas.getContext("2d")},methods:{startDraw:function(t){"touchstart"===t.type&&t.preventDefault(),this.ctx.beginPath(),this.isDrag=!0},endDraw:function(){this.ctx.closePath(),this.isDrag=!1,this.lastPosition.x=null,this.lastPosition.y=null},inDraw:function(t){if(this.isDrag){var e=0,n=0;"touchmove"===t.type?(e=t.changedTouches[0].pageX,n=t.changedTouches[0].pageY):(e=t.clientX,n=t.clientY);var o=0;0===this.currentPenSize?o=1:1===this.currentPenSize?o=5:2===this.currentPenSize&&(o=10),this.rect=this.canvas.getBoundingClientRect(),this.mouseX=e-this.rect.left,this.mouseY=n-this.rect.top,this.ctx.lineCap="round",this.ctx.lineJoin="round",this.ctx.lineWidth=o,this.ctx.strokeStyle=this.currentPenColor,null===this.lastPosition.x||null===this.lastPosition.y?this.ctx.moveTo(this.mouseX,this.mouseY):this.ctx.moveTo(this.lastPosition.x,this.lastPosition.y),this.ctx.lineTo(this.mouseX,this.mouseY),this.ctx.stroke(),this.lastPosition.x=this.mouseX,this.lastPosition.y=this.mouseY}},changeBackColor:function(t){this.currentBackColor=t},changePenColor:function(t){this.currentPenColor=t}}},d=n(92),component=Object(d.a)(h,(function(){var t=this,e=t._self._c;return e("div",[e(o.a,{attrs:{dense:"",elevation:"0"}},[e(c.a,{staticClass:"ml-3 mr-2 mt-1",attrs:{size:"30"}},[t._v("mdi-format-color-fill")]),t._v(" "),t._l(t.backColorList,(function(n,i){return e(r.a,{key:"back-".concat(i),staticClass:"mx-1",attrs:{fab:"","x-small":"",depressed:"",ripple:!1,color:n},on:{click:function(e){return t.changeBackColor(n)}}},[t.currentBackColor==n?e(c.a,{attrs:{color:"#fff"===t.currentBackColor?"#121212":"white"}},[t._v("mdi-check")]):t._e()],1)})),t._v(" "),e(c.a,{staticClass:"ml-6 mr-2",attrs:{size:"28"}},[t._v("mdi-pencil")]),t._v(" "),t._l(t.penColorList,(function(n,i){return e(r.a,{key:"pen-".concat(i),staticClass:"mx-1",attrs:{fab:"","x-small":"",depressed:"",ripple:!1,color:n},on:{click:function(e){return t.changePenColor(n)}}},[t.currentPenColor==n?e(c.a,{attrs:{color:"#fff"===t.currentPenColor?"#121212":"white"}},[t._v("mdi-check")]):t._e()],1)})),t._v(" "),e(l.a,{staticClass:"mx-2",staticStyle:{"max-width":"200px"},attrs:{max:2,step:"1",ticks:"always","tick-size":"2",color:"#26c6da","thumb-color":"#26c6da","track-color":"grey","always-dirty":"",dense:"","hide-details":""},scopedSlots:t._u([{key:"prepend",fn:function(){return[e(c.a,[t._v("\n          mdi-minus\n        ")])]},proxy:!0},{key:"append",fn:function(){return[e(c.a,[t._v("\n          mdi-plus\n        ")])]},proxy:!0}]),model:{value:t.currentPenSize,callback:function(e){t.currentPenSize=e},expression:"currentPenSize"}})],2),t._v(" "),e("canvas",{ref:"canvas",style:"background-color: ".concat(t.currentBackColor,";"),attrs:{width:"2000",height:"1000"},on:{touchstart:t.startDraw,touchend:t.endDraw,touchmove:t.inDraw,mousedown:t.startDraw,mouseup:t.endDraw,mouseout:t.endDraw,mousemove:t.inDraw}})],1)}),[],!1,null,"3a3e92b8",null);e.default=component.exports}}]);