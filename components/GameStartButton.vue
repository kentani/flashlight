<template>
  <button type="button" class="game-start-button" :disabled="disabled" @click="$emit('click', $event)">
    <slot>はじめる</slot>
  </button>
</template>

<script>
export default {
  name: 'GameStartButton',
  props: {
    disabled: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
.game-start-button { animation: start-wiggle 1.8s ease-in-out infinite; background: #ee8b3d; border: 4px solid #58435a; border-radius: 999px; box-shadow: 0 6px 0 #58435a; color: #fff; cursor: pointer; display: block; font: bold clamp(1.45rem, 6vw, 2rem) "Yomogi", cursive; margin: 22px auto 0; min-height: 68px; padding: 10px 42px; touch-action: manipulation; width: min(100%, 400px); }
.game-start-button:active { animation: none; box-shadow: 0 2px 0 #58435a; transform: translateY(4px); }
.game-start-button:focus-visible { outline: 4px solid #fff; outline-offset: 4px; }
.game-start-button:disabled { animation: none; cursor: default; opacity: .55; }
@keyframes start-wiggle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
</style>
