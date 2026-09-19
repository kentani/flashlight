<template>
  <div class="game-start-overlay" role="dialog" aria-modal="true">
    <div class="game-start-overlay__content">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button type="button" @click="$emit('start')">はじめる</button>
      <nuxt-link to="/">やめる</nuxt-link>
    </div>
  </div>
</template>

<script>
export default { name: 'GameStartOverlay', props: { title: { type: String, required: true }, message: { type: String, required: true } } }
</script>

<style scoped>
.game-start-overlay { align-items:center; background:rgba(0, 0, 0, .86); color:#fff; display:flex; inset:0; justify-content:center; position:fixed; text-align:center; z-index:20; }
h2 { font-size:clamp(3.5rem,14vw,6rem); margin:0; } p { font-size:clamp(1.3rem,5vw,2rem); margin:22px 0 34px; } button { background:#26c6da; border:4px solid #f7f7f7; border-radius:999px; box-shadow:0 5px 0 #17899a; color:#fff; display:block; font:inherit; font-size:clamp(1.8rem,7vw,2.5rem); margin:12px auto 0; min-height:76px; min-width:260px; } button:active { box-shadow:0 2px 0 #17899a; transform:translateY(3px); } a { align-items:center; background:#70757a; border:2px solid #c8cbce; border-radius:999px; box-shadow:0 3px 0 #3f4347; color:#fff; display:inline-flex; font:inherit; font-size:clamp(1rem,4vw,1.25rem); justify-content:center; margin-top:18px; min-height:44px; min-width:132px; padding:8px 20px; text-decoration:none; } a:active { box-shadow:0 1px 0 #3f4347; transform:translateY(2px); }
</style>
