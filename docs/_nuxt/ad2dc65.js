(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{513:function(e,t,o){var content=o(549);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(30).default)("6040ddf0",content,!0,{sourceMap:!1})},548:function(e,t,o){"use strict";o(513)},549:function(e,t,o){var n=o(29)((function(i){return i[1]}));n.push([e.i,"#screen,body{overflow:hidden}#screen{background-color:#eee;box-shadow:0 0 20px hsla(0,0%,100%,.5);height:100vh;outline:none;position:relative;width:100vw}.crack{animation:fadeOut 2s forwards;background-size:cover;height:200px;pointer-events:none;position:absolute;width:200px}@keyframes fadeOut{0%{opacity:1}to{opacity:0;transform:scale(2)}}",""]),n.locals={},e.exports=n},577:function(e,t,o){"use strict";o.r(t);o(61);var n={mounted:function(){this.$refs.screen.focus()},methods:{createCrack:function(e,t,o){var n=this.$refs.screen,c=document.createElement("div");c.className="crack",c.style.left="".concat(e-100,"px"),c.style.top="".concat(t-100,"px"),c.style.background="url('/".concat(o,".png')"),c.style.backgroundSize="cover",n.appendChild(c),setTimeout((function(){c.remove()}),2e3)},handleKeydown:function(){var e=this.$refs.screen,t=Math.random()*e.offsetWidth,o=Math.random()*e.offsetHeight,n=Math.floor(6*Math.random())+1;this.createCrack(t,o,n)},handleTouch:function(e){var t=e.touches[0],o=t.clientX,n=t.clientY,c=Math.floor(6*Math.random())+1;this.createCrack(o,n,c)}}},c=(o(548),o(81)),component=Object(c.a)(n,(function(){var e=this;return(0,e._self._c)("div",{ref:"screen",attrs:{id:"screen",tabindex:"0"},on:{keydown:e.handleKeydown,touchstart:e.handleTouch}})}),[],!1,null,null,null);t.default=component.exports}}]);