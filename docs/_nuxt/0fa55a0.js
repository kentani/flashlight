(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{530:function(e,t,d){var content=d(562);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,d(30).default)("358da371",content,!0,{sourceMap:!1})},561:function(e,t,d){"use strict";d(530)},562:function(e,t,d){var r=d(29)((function(i){return i[1]}));r.push([e.i,'.c-stepper[data-v-1987ee11]{align-content:center;background:#f5f8fa;display:flex;flex-wrap:wrap;height:45vw;width:40vw}.c-stepper__item[data-v-1987ee11]{display:flex;flex:1;flex-direction:column;text-align:center;z-index:0}.c-stepper__title>span[data-v-1987ee11]{align-content:center;background:#e0e0e0;border-radius:50%;color:#fff;display:inline-block;font-size:80px;font-weight:400;height:32vw;padding-bottom:10px;width:33vw}.c-stepper__item.doing>.c-stepper__title>.timer-item[data-v-1987ee11]{background-image:conic-gradient(#26c6da 0deg,#26c6da 1turn);background-image:conic-gradient(#26c6da 0deg 1turn)}.header[data-v-1987ee11]{background:#26c6da;color:#fff;display:flex;font-family:"Darumadrop One",sans-serif;left:0;top:0;width:100%}.header h1[data-v-1987ee11]{font-size:32px;letter-spacing:4px;margin:0;padding:2px 20px 8px}.main[data-v-1987ee11]{font-family:"Yomogi",cursive;padding:80px 14px 0}.card[data-v-1987ee11]{background:#fff;border:.5px solid rgba(0,0,0,.15);border-radius:25px;box-shadow:1px 1px 8px rgba(0,0,0,.23);height:100%;padding:10px}.card .card-title[data-v-1987ee11]{font-size:14px;font-weight:700;padding-bottom:4px}.card .card-text[data-v-1987ee11]{font-size:12px}.section1[data-v-1987ee11]{display:flex;justify-content:space-between;padding-left:18px}.section1 .theme[data-v-1987ee11]{height:40vw;width:50vw}.section1 .card[data-v-1987ee11]{border:2px solid #26c6da;box-shadow:1px 1px 30px rgba(0,0,0,.1);box-shadow:none;position:relative}.section1 .card-title[data-v-1987ee11]{color:#26c6da;font-style:normal;font-weight:400;padding-bottom:0}.section1 .card-title span[data-v-1987ee11]{font-size:180px;font-weight:700;left:8%;position:absolute;top:-40%}.section2[data-v-1987ee11]{padding-left:18px}.section2 .card-list[data-v-1987ee11]{display:flex;flex-wrap:wrap;gap:30px}.section2 .card[data-v-1987ee11]{border:none;box-shadow:1px 1px 30px rgba(0,0,0,.1);box-shadow:none;font-weight:700;text-align:center}.section2 .card.selected[data-v-1987ee11]{border:none;box-shadow:2px 2px 20px rgba(0,0,0,.23)}.section2 .card.sm[data-v-1987ee11]{font-size:30px}.section2 .card.md[data-v-1987ee11]{font-size:60px}.section2 .card.lg[data-v-1987ee11]{font-size:100px}.section2 .card.xl[data-v-1987ee11]{font-size:150px}.section2 .card.a[data-v-1987ee11]{flex:1 1 50px}.section2 .card.b[data-v-1987ee11]{flex:1 1 100px}.section2 .card.c[data-v-1987ee11]{flex:1 1 120px}.section2 .card.d[data-v-1987ee11]{width:200px}.section3[data-v-1987ee11]{padding-left:18px}.section3 p[data-v-1987ee11]{font-size:25px;font-weight:700;letter-spacing:2px;padding:0}.card.result[data-v-1987ee11],.card.selected.result[data-v-1987ee11]{border:5px solid red}',""]),r.locals={},e.exports=r},571:function(e,t,d){"use strict";d.r(t);d(7),d(18),d(55),d(48),d(61),d(33),d(54),d(27),d(51);var r=d.p+"assets/sounds/ok.mp3",o=d.p+"assets/sounds/ng.mp3",n={name:"word",data:function(){return{themeWord:"",words:[{},{},{},{}],timer:10,timerStyle:"conic-gradient(#26c6da 0deg 100deg, #26c6da 100deg 360deg)",cardClassList:["a","b","c","d"],cardTitleClassList:["sm","md","lg","xl"],hiraganaList:["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","ら","り","る","れ","ろ","わ","を","ん"],clearId:null,correct:!1}},mounted:function(){var e,t;this.themeWord="",this.words=[{},{},{},{}],this.timer=10,null===(e=document.getElementById("theme-word-card"))||void 0===e||null===(t=e.classList)||void 0===t||t.remove("result"),Array.from(document.getElementsByClassName("selectable-card")).forEach((function(e){var t;return null==e||null===(t=e.classList)||void 0===t?void 0:t.remove("selected","result")})),this.timerStyle="background-image: conic-gradient(#26c6da 0deg 360deg)",clearInterval(this.clearId),this.setWord(),this.timerExec()},unmounted:function(){var e,t;this.themeWord="",this.words=[{},{},{},{}],this.timer=10,this.correct=!1,null===(e=document.getElementById("theme-word-card"))||void 0===e||null===(t=e.classList)||void 0===t||t.remove("result"),Array.from(document.getElementsByClassName("selectable-card")).forEach((function(e){var t;return null==e||null===(t=e.classList)||void 0===t?void 0:t.remove("selected","result")})),this.timerStyle="background-image: conic-gradient(#26c6da 0deg 360deg)",clearInterval(this.clearId)},methods:{timerExec:function(){var e=this;this.clearId=setInterval((function(){var t,d;if(0===e.timer)null===(t=document.getElementById("theme-word-card"))||void 0===t||null===(d=t.classList)||void 0===d||d.add("result"),e.words.forEach((function(t){t.text===e.themeWord&&(t.class+=" result")})),e.timerStyle="background-image: conic-gradient(#e0e0e0 0deg 360deg)",clearInterval(e.clearId),setTimeout((function(){var t,d;e.timer=10,e.correct=!1,null===(t=document.getElementById("theme-word-card"))||void 0===t||null===(d=t.classList)||void 0===d||d.remove("result"),Array.from(document.getElementsByClassName("selectable-card")).forEach((function(e){var t;return null==e||null===(t=e.classList)||void 0===t?void 0:t.remove("selected","result")})),e.timerStyle="background-image: conic-gradient(#26c6da 0deg 360deg)",e.timerExec(),e.setWord()}),2e3);else if(e.timer>0){e.timer--;var r=36*(10-e.timer);e.timerStyle="background-image: conic-gradient(#e0e0e0 0deg ".concat(r,"deg, #26c6da ").concat(r,"deg 360deg)")}}),1e3)},setWord:function(){var e=this;this.themeWord=this.hiraganaList[Math.floor(Math.random()*(this.hiraganaList.length-1))];var t=Math.floor(Math.random()*(this.words.length-1));this.words=this.words.map((function(d,i){var text="";text=i===t?e.themeWord:e.hiraganaList[Math.floor(Math.random()*(e.hiraganaList.length-1))];var r=e.cardClassList[Math.floor(Math.random()*(e.cardClassList.length-1))],o=e.cardTitleClassList[Math.floor(Math.random()*(e.cardTitleClassList.length-1))];return{id:i,text:text,class:"".concat(r," ").concat(o),selected:!1}}))},selectWord:function(e){var t=this;this.words.forEach((function(d){var r,o;d.id!==e||d.selected?(d.selected=!1,d.class=d.class.replace(" selected","")):(d.selected=!0,d.class+=" selected",d.text===t.themeWord&&(d.class+=" result",null===(r=document.getElementById("theme-word-card"))||void 0===r||null===(o=r.classList)||void 0===o||o.add("result"),clearInterval(t.clearId),setTimeout((function(){var e,d;t.timer=10,t.correct=!1,null===(e=document.getElementById("theme-word-card"))||void 0===e||null===(d=e.classList)||void 0===d||d.remove("result"),Array.from(document.getElementsByClassName("selectable-card")).forEach((function(e){var t;return null==e||null===(t=e.classList)||void 0===t?void 0:t.remove("selected","result")})),t.timerStyle="background-image: conic-gradient(#26c6da 0deg 360deg)",t.timerExec(),t.setWord()}),1e3),t.correct=!0))})),this.correct?(this.okAudio=new Audio(r),this.okAudio.currentTime=0,this.okAudio.play()):(this.ngAudio=new Audio(o),this.ngAudio.currentTime=0,this.ngAudio.play())}}},c=n,l=(d(561),d(81)),component=Object(l.a)(c,(function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"main"},[t("div",{staticClass:"section1"},[t("div",{staticClass:"theme"},[t("div",{staticClass:"card",attrs:{id:"theme-word-card"}},[t("div",{staticClass:"card-title"},[t("span",{attrs:{id:"theme-word"}},[e._v(e._s(e.themeWord))])])])]),e._v(" "),t("div",{staticClass:"c-stepper"},[t("div",{staticClass:"c-stepper__item doing",attrs:{id:"timer"}},[t("h3",{staticClass:"c-stepper__title"},[t("span",{staticClass:"timer-item",style:e.timerStyle,attrs:{id:"timer-item"}},[e._v(e._s(e.timer))])])])])]),e._v(" "),e._m(0),e._v(" "),t("div",{staticClass:"section2"},[t("div",{staticClass:"card-list"},e._l(e.words,(function(d){return t("div",{key:d.id,staticClass:"selectable-card card",class:d.class,on:{click:function(t){return e.selectWord(d.id)}}},[e._v("\n          "+e._s(d.text)+"\n        ")])})),0)])])])}),[function(){var e=this._self._c;return e("div",{staticClass:"section3"},[e("p",[this._v("おなじもじをえらんでね！")])])}],!1,null,"1987ee11",null);t.default=component.exports}}]);