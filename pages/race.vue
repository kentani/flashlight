<template><section class="race" :class="{ crash:result==='crash' }"><div class="panel"><header><div><h1>くるまレース！</h1><p>{{ guide }}</p></div><GameProgressPanel :items="progressItems" /></header><div class="track"><span class="road"></span><span v-for="x in items" :key="x.id" :class="['item','lane'+x.lane]" :style="{left:x.x+'%'}">{{ x.type === 'gas' ? '⛽' : '🚧' }}</span><span :class="['car','lane'+lane]">🏎️</span><b v-if="message" class="pop">{{ message }}</b></div><div class="buttons" :class="{ 'is-ready': !playing, 'is-playing': playing }"><button v-if="playing" @click="up">⬆️ うえ</button><GameActionButtons v-else-if="!result" @primary="start">はじめる</GameActionButtons><button v-if="playing" @click="down">した ⬇️</button></div></div><GameResultOverlay v-if="result" :title="result === 'win' ? 'ゴール！' : 'もういちど！'" :celebration="result === 'win' ? '🏎️🏁🎉' : '🏎️💪'" :tone="result === 'win' ? 'clear' : 'retry'" @retry="start">{{ result === 'win' ? 'さいごまで はしれたね！' : 'こんどは よけて すすもう！' }}</GameResultOverlay></section></template>
<script>
import ok from '@/assets/sounds/ok.mp3'
import ng from '@/assets/sounds/ng.mp3'
import GameActionButtons from '@/components/GameActionButtons.vue'
import GameResultOverlay from '@/components/GameResultOverlay.vue'
import GameProgressPanel from '@/components/GameProgressPanel.vue'
export default {components:{GameActionButtons,GameResultOverlay,GameProgressPanel},data(){return{lane:1,score:0,energy:70,items:[],playing:false,result:'',message:'',timer:null,id:0}},computed:{guide(){return this.playing?'うえ・したで よけよう！ ⛽で げんき！':this.result==='crash'?'もういちど ちょうせん！':'🚧を よけて、⛽を とろう！'},progressItems(){return[{label:'ゴール',value:this.score,max:20,unit:'/ 20',tone:'yellow'},{icon:'⛽',label:'エネルギー',value:this.energy,max:100,unit:'%',tone:this.energy<=35?'red':'green'}]}},beforeDestroy(){clearInterval(this.timer)},methods:{start(){this.lane=1;this.score=0;this.energy=70;this.items=[];this.result='';this.playing=true;this.timer=setInterval(this.tick,650)},up(){this.lane=Math.max(0,this.lane-1)},down(){this.lane=Math.min(2,this.lane+1)},tick(){this.items=this.items.map(x=>({...x,x:x.x-22}));this.items.forEach(this.hit);this.items=this.items.filter(x=>x.x>-15);this.score++;this.energy=Math.max(0,this.energy-3);if(this.energy===0)this.end('crash');else if(this.score>=20)this.end('win');else if(this.items.length<3)this.items.push({id:this.id++,lane:Math.floor(Math.random()*3),type:Math.random()>.68?'gas':'bad',x:110})},hit(x){if(x.x<2||x.x>24||x.lane!==this.lane)return;if(x.type==='gas'){this.energy=Math.min(100,this.energy+26);this.message='✨ チャリン！';this.sound(ok);x.x=-20;setTimeout(()=>{this.message=''},600)}else this.end('crash')},end(x){this.result=x;this.playing=false;clearInterval(this.timer);if(x==='crash')this.sound(ng)},sound(src){const a=new Audio(src);a.play().catch(()=>{})}}}
</script>
<style scoped>
.race{background:linear-gradient(#94dcff 0 55%,#80c95d 55%);box-sizing:border-box;min-height:100vh;padding:76px 16px 28px;touch-action:manipulation}.panel{margin:auto;max-width:680px}header{align-items:flex-end;color:#384357;display:flex;justify-content:space-between;margin-bottom:16px}h1{font-size:clamp(2rem,8vw,3.15rem);margin:0}p{font-size:clamp(1rem,4vw,1.2rem);font-weight:bold;margin:0}.meters{background:#fff9e6;border:3px solid #384357;border-radius:16px;padding:7px 10px;width:min(46vw,210px)}label{display:block;font-size:.8rem;font-weight:bold}label+label{margin-top:6px}i{background:#d8d4c8;border:2px solid #384357;border-radius:99px;display:block;height:14px;overflow:hidden}i b{background:#4aaee8;display:block;height:100%}label+label b{background:#62bd62}label+label b.low{background:#e84a45}.track{background:#505967;border:6px solid #384357;border-radius:28px;box-shadow:0 9px 0 rgba(56,67,87,.2);height:min(68vw,410px);min-height:320px;overflow:hidden;position:relative}.road{background:repeating-linear-gradient(#505967 0 30%,#fff6d7 30% 32%,#505967 32% 66%,#fff6d7 66%,#505967 68%);height:90%;left:0;position:absolute;top:5%;width:100%}.car,.item{font-size:clamp(3rem,14vw,5rem);line-height:1;position:absolute;transform:translateY(-50%);z-index:2}.car{left:78%;transition:top .18s}.item{transition:left .35s}.lane0{top:20%}.lane1{top:50%}.lane2{top:80%}.pop{animation:pop .3s;background:#fff9e6;border:3px solid #384357;border-radius:99px;color:#e84a45;font-size:clamp(1rem,5vw,1.6rem);left:50%;padding:7px 14px;position:absolute;top:8%;transform:translateX(-50%);white-space:nowrap;z-index:4}.buttons{display:grid;gap:8px;grid-template-columns:1fr 1.3fr 1fr;margin-top:22px}.buttons.is-ready{grid-template-columns:minmax(210px,1.3fr);justify-content:center}.buttons>button{align-items:center;background:#4aaee8;border:4px solid #384357;border-radius:99px;box-shadow:0 6px 0 #384357;color:#fff;display:flex;font:bold clamp(1rem,5vw,1.5rem) Yomogi,cursive;justify-content:center;min-height:68px;padding:8px}.crash .track{animation:shake .18s 5;background:#e84a45}@keyframes shake{50%{transform:translateX(14px) rotate(1deg)}}@keyframes pop{from{opacity:0;transform:translateX(-50%) scale(.4)}}@media(max-width:430px){header{align-items:flex-start;flex-direction:column;gap:8px}.meters{align-self:flex-end}.track{height:90vw;min-height:300px}}
.car { left:12%; }
.car { transform:translateY(-50%) scaleX(-1); }
.race { width:100%; }
.track::after { content:'🏁 ゴール！'; color:#fff9e6; font-size:clamp(1rem,4vw,1.7rem); font-weight:bold; position:absolute; right:2%; text-align:center; text-shadow:0 2px #384357; top:7%; z-index:3; }.track::before { background:repeating-conic-gradient(#fff 0 25%,#222 0 50%) 0 / 20px 20px; content:''; height:100%; position:absolute; right:4%; top:0; width:18px; z-index:1; }
.track { height:min(48vw,330px); min-height:260px; }.race { align-items:center; display:flex; }.panel { transform:translateY(clamp(-72px, -8vh, -40px)); width:100%; }.road { background:repeating-linear-gradient(#505967 0 30%,#fff6d7 30% 32%,#505967 32% 66%,#fff6d7 66% 68%,#505967 68%); }.buttons.is-playing { grid-template-columns:repeat(2,1fr); }.buttons.is-ready button { background:#ee8b3d; border-color:#58435a; box-shadow:0 6px 0 #58435a; }.road::after { color:rgba(255,246,215,.6); content:'→ → →'; font-size:clamp(2rem,8vw,4rem); left:35%; position:absolute; top:43%; }.track::after { background:repeating-conic-gradient(#fff 0 25%,#222 0 50%) 0 / 18px 18px; content:'🏁'; font-size:clamp(2rem,8vw,4rem); height:100%; position:absolute; right:3%; text-align:center; top:0; width:36px; z-index:3; }

/* どのゲームも、同じテレビ画面の大きさで遊ぶ。 */
.track { aspect-ratio: 4 / 3; height: auto; min-height: 0; }

/* 見出し、案内、進行カードを全ゲームで同じ順に並べる。 */
header { align-items: flex-start; flex-direction: column; gap: 8px; }
.game-progress-panel { align-self: flex-end; }

/* テレビ画面の上端を、ほかのゲームと同じ基準線にそろえる。 */
.panel { transform: translateY(-57px); }
@media (max-width: 520px) { .panel { transform: translateY(-35px); } }

/* 共通の見出し位置: ヘッダー直後からゲームを始める。 */
.race { padding-top: 28px; }
.race { align-items: flex-start; }
.panel { margin: 0 auto; transform: none; }
.panel { display: grid; grid-template-rows: auto minmax(0, 1fr) auto; height: calc(100dvh - 120px); }
header p { white-space: nowrap; }
.track { aspect-ratio: auto; height: 100%; min-height: 0; }
header > .game-progress-panel { width: 100%; }
.panel, header, .track { min-width: 0; }
</style>
