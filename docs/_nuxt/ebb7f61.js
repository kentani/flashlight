(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{510:function(e,t,n){"use strict";(function(e){n(33),n(61);t.a={mounted:function(){this.$refs.screen.focus()},methods:{createCrack:function(t,n,o){var c=this.$refs.screen,r=document.createElement("div");r.className="crack",r.style.left="".concat(t-100,"px"),r.style.top="".concat(n-100,"px");var l=e.env.BASE_URL||"..";r.style.background="url('".concat(l,"/").concat(o,".png')"),r.style.backgroundSize="cover",c.appendChild(r),setTimeout((function(){r.remove()}),2e3)},handleKeydown:function(){var e=this.$refs.screen,t=Math.random()*e.offsetWidth,n=Math.random()*e.offsetHeight,o=Math.floor(6*Math.random())+1;this.createCrack(t,n,o)},handleTouch:function(e){var t=e.touches[0],n=t.clientX,o=t.clientY,c=Math.floor(6*Math.random())+1;this.createCrack(n,o,c)}}}}).call(this,n(185))},514:function(e,t,n){var content=n(550);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(30).default)("9a1efb98",content,!0,{sourceMap:!1})},549:function(e,t,n){"use strict";n(514)},550:function(e,t,n){var o=n(29)((function(i){return i[1]}));o.push([e.i,"#screen,body{overflow:hidden}#screen{background-color:#eee;box-shadow:0 0 20px hsla(0,0%,100%,.5);height:100vh;outline:none;position:relative;width:100vw}.crack{animation:fadeOut 2s forwards;background-size:cover;height:200px;pointer-events:none;position:absolute;width:200px}@keyframes fadeOut{0%{opacity:1}to{opacity:0;transform:scale(2)}}",""]),o.locals={},e.exports=o},582:function(e,t,n){"use strict";n.r(t);var o=n(510).a,c=(n(549),n(81)),component=Object(c.a)(o,(function(){var e=this;return(0,e._self._c)("div",{ref:"screen",attrs:{id:"screen",tabindex:"0"},on:{keydown:e.handleKeydown,touchstart:e.handleTouch}})}),[],!1,null,null,null);t.default=component.exports}}]);