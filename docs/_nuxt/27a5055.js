(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{373:function(t,o,n){"use strict";o.a=n.p+"assets/sounds/33.mp3"},376:function(t,o,n){var content=n(405);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(30).default)("5ecd427a",content,!0,{sourceMap:!1})},404:function(t,o,n){"use strict";n(376)},405:function(t,o,n){var r=n(29)((function(i){return i[1]}));r.push([t.i,'.theme--light.v-application[data-v-5b3b7af9]{background:#000;color:rgba(0,0,0,.87)}@keyframes pulseMotion-5b3b7af9{0%{background-color:hsla(26,22%,57%,.4);transform:translate(-50%,-50%) scale(1)}to{background-color:hsla(26,22%,57%,0);transform:translate(-50%,-50%) scale(6.5)}}.inner[data-v-5b3b7af9],.point[data-v-5b3b7af9]{position:relative}.point[data-v-5b3b7af9]{background-color:#ccc;border-radius:50%;cursor:pointer;display:inline-block;height:60px;margin:0 60px;transition:background-color .4s cubic-bezier(.215,.61,.355,1);width:60px}.point[data-v-5b3b7af9]:after{animation:pulseMotion-5b3b7af9 1.4s linear infinite;border-radius:50%;content:"";display:block;height:100%;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);transition:opacity .4s linear;width:100%}.zoom1[data-v-5b3b7af9]{transform:scale(1)}.zoom1[data-v-5b3b7af9],.zoom2[data-v-5b3b7af9]{transition:1.2s}.zoom2[data-v-5b3b7af9]{transform:scale(2)}.zoom3[data-v-5b3b7af9]{transform:scale(3)}.zoom3[data-v-5b3b7af9],.zoom4[data-v-5b3b7af9]{transition:1.2s}.zoom4[data-v-5b3b7af9]{transform:scale(4)}.position1[data-v-5b3b7af9]{left:10%;position:absolute;top:20%}.position2[data-v-5b3b7af9]{left:45%;position:absolute;top:55%}.position3[data-v-5b3b7af9]{left:70%}.position3[data-v-5b3b7af9],.position4[data-v-5b3b7af9]{position:absolute;top:35%}.position4[data-v-5b3b7af9]{left:30%}.position5[data-v-5b3b7af9]{left:80%;position:absolute;top:70%}',""]),r.locals={},t.exports=r},421:function(t,o,n){"use strict";n.r(o);n(247);var r=n(373),e={name:"flashlight",data:function(){return{pointClass:"position1",currentPosition:1,currentZoom:1}},mounted:function(){},methods:{onClickPointer:function(){var audio=new Audio(r.a);audio.currentTime=0,audio.play();var t=["1","2","3","4","5"];t.splice(this.currentPosition-1,1);var o=t[Math.floor(Math.random()*t.length)],n=["1","2","3","4"];n.splice(this.currentZoom-1,1);var e=n[Math.floor(Math.random()*n.length)];this.pointClass="position"+o+" zoom"+e,this.currentPosition=o,this.currentZoom=e}}},l=(n(404),n(92)),component=Object(l.a)(e,(function(){var t=this,o=t._self._c;return o("div",{staticStyle:{height:"100%",width:"100%","background-color":"#121212"},attrs:{id:"flashlight"}},[o("div",{staticClass:"inner",class:t.pointClass,on:{click:t.onClickPointer}},[o("span",{staticClass:"point"})])])}),[],!1,null,"5b3b7af9",null);o.default=component.exports}}]);