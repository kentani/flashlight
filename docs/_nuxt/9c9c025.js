(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{376:function(t,e,n){"use strict";e.a=n.p+"assets/sounds/33.mp3"},433:function(t,e,n){"use strict";n.r(e);var c=n(370),r=n(371),o=n(387),l=n(377),d=n(432),m=n(439),h=n(359),f=n(379),v=n(431),T=n(367),y=(n(47),n(33),n(376)),_=n.p+"assets/sounds/shiawasenosarada.mp3",M={name:"music",data:function(){return{musicList:{sarada1:{title:"幸せのサラダ1",icon:"mdi-play"},sarada2:{title:"幸せのサラダ2",icon:"mdi-play"},shu:{title:"シュッ",icon:"mdi-play"}},currentMusic:"-",audio:{},currentTime:0,musicTime:0,isPlaying:!1,currentTimeBar:0}},mounted:function(){var time=this.musicTime/100;this.currentTimeBar=this.currentTime/time},watch:{currentTime:function(){var time=this.musicTime/100;this.currentTimeBar=this.currentTime/time}},methods:{musicTitle:function(){return"-"===this.currentMusic?"-":this.musicList[this.currentMusic].title},onclickPlay:function(t){var e=this;this.currentMusic===t?this.isPlaying?(this.isPlaying=!1,this.musicList[t].icon="mdi-play",this.currentTime=this.audio.currentTime,this.audio.pause()):(this.isPlaying=!0,this.musicList[t].icon="mdi-pause",this.audio.ontimeupdate=function(){e.currentTime=e.audio.currentTime},this.audio.onended=function(){e.isPlaying=!1,e.musicList[e.currentMusic].icon="mdi-play",e.audio.currentTime=0},this.audio.play()):(this.isPlaying=!0,this.currentTime=0,"-"!==this.currentMusic&&(this.musicList[this.currentMusic].icon="mdi-play",this.audio.pause(),this.audio.currentTime=0),this.musicList[t].icon="mdi-pause",this.currentMusic=t,this.audio=new Audio(this.fetchMusic(t)),this.audio.preload="metadata",this.audio.load(),this.audio.onloadedmetadata=function(){e.musicTime=e.audio.duration},this.audio.ontimeupdate=function(){e.currentTime=e.audio.currentTime},this.audio.onended=function(){e.isPlaying=!1,e.musicList[e.currentMusic].icon="mdi-play",e.audio.currentTime=0},this.audio.currentTime=0,this.audio.play())},fetchMusic:function(t){switch(t){case"sarada1":case"sarada2":return _;case"shu":return y.a}},convertTime:function(time){var t=this.convertMin(time),e=this.convertSec(time),n=("00"+t).slice(-2),c=("00"+e).slice(-2);return"".concat(n,":").concat(c)},convertMin:function(time){return Math.floor(time/60)},convertSec:function(time){return Math.floor(time%60)}}},w=n(83),component=Object(w.a)(M,(function(){var t=this,e=t._self._c;return e("div",{staticStyle:{height:"100%",width:"100%"}},[e(c.a,{staticClass:"option-bar mt-12",attrs:{fixed:"",dense:"",flat:"",elevation:"0"}},[e(r.a,{staticClass:"ml-2 mr-0",attrs:{fab:"",small:"",depressed:"",ripple:!1,disabled:"-"===t.currentMusic},on:{click:function(e){return t.onclickPlay(t.currentMusic)}}},[e(h.a,{attrs:{color:"#26c6da"}},[t._v(t._s(t.isPlaying?"mdi-pause":"mdi-play"))])],1),t._v(" "),e(o.a,{staticClass:"pb-0",staticStyle:{"min-height":"100%",width:"100%"},attrs:{color:"#f5f5f5",elevation:"0"}},[e(l.b,{staticClass:"pt-1 pb-0 pl-2 pr-0"},[t._v("\n        "+t._s(t.musicTitle())+"\n      ")]),t._v(" "),e(l.a,{staticClass:"pb-0 pl-2 pr-0"},[e(f.a,{staticClass:"ma-0 pa-0",attrs:{color:"#26c6da"},model:{value:t.currentTimeBar,callback:function(e){t.currentTimeBar=e},expression:"currentTimeBar"}})],1)],1),t._v(" "),e(T.a),t._v(" "),e(o.a,{staticClass:"pb-0 mx-0 mt-3",staticStyle:{"min-height":"80%","min-width":"30%"},attrs:{color:"#f5f5f5",elevation:"0"}},[e(l.b,{staticClass:"pt-1 pb-0 px-0 text-center"},[t._v("\n        "+t._s(t.convertTime(t.currentTime))+" / "+t._s(t.convertTime(t.musicTime))+"\n      ")])],1)],1),t._v(" "),e(v.a,{staticStyle:{height:"100%",width:"100%"},attrs:{"no-gutters":"",align:"center",justify:"center"}},t._l(t.musicList,(function(n,c){return e(d.a,{key:c,staticClass:"mx-2",attrs:{cols:"9",md:"3",lg:"2"}},[e(m.a,{scopedSlots:t._u([{key:"default",fn:function(r){var d=r.hover;return[e(o.a,{attrs:{color:"#26c6da",dark:"",rounded:"xl",elevation:d?24:8},on:{click:function(e){return t.onclickPlay(c)}}},[e(l.b,{staticClass:"text-body-1 font-weight-bold text-center"},[e(h.a,{attrs:{size:"150"}},[t._v("\n                "+t._s(n.icon)+"\n              ")]),t._v(" "),e("p",{staticClass:"mb-0"},[t._v(t._s(n.title))])],1)],1)]}}],null,!0)})],1)})),1)],1)}),[],!1,null,"a9a46f04",null);e.default=component.exports}}]);