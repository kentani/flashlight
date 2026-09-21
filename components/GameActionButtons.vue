<template>
  <div class="game-action-buttons" :class="{ 'game-action-buttons--compact': compact }">
    <button type="button" class="game-action-buttons__primary game-start-button result-button run-button" @click="$emit('primary')">
      <slot>はじめる</slot>
    </button>
    <nuxt-link to="/" class="game-action-buttons__secondary">やめる</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'GameActionButtons',
  props: {
    compact: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
.game-action-buttons { display: grid; gap: 10px; margin: 22px auto 0; max-width: 400px; width: 100%; }
.game-action-buttons__primary, .game-action-buttons__secondary { align-items: center; border-radius: 999px; box-sizing: border-box; color: #fff; display: flex; font: bold clamp(1.35rem, 5.7vw, 1.9rem) "Yomogi", cursive; justify-content: center; min-height: 62px; text-decoration: none; touch-action: manipulation; width: 100%; }
.game-action-buttons__primary { animation: action-wiggle 1.8s ease-in-out infinite; background: #ff9b45; border: 0; box-shadow: 0 5px 0 #d87327; cursor: pointer; padding: 9px 26px; }
.game-action-buttons__secondary { background: #a9a9a9; border: 0; box-shadow: 0 4px 0 #858585; font-size: clamp(1.08rem, 4.4vw, 1.45rem); min-height: 52px; }
.game-action-buttons__primary:active { animation: none; box-shadow: 0 2px 0 #d87327; transform: translateY(3px); }
.game-action-buttons__secondary:active { box-shadow: 0 1px 0 #858585; transform: translateY(3px); }
.game-action-buttons__primary:focus-visible, .game-action-buttons__secondary:focus-visible { outline: 4px solid #fff; outline-offset: 4px; }
.game-action-buttons--compact { margin-top: 14px; }
.game-action-buttons--compact .game-action-buttons__primary { min-height: 56px; }
@keyframes action-wiggle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
@media (prefers-reduced-motion: reduce) { .game-action-buttons__primary { animation: none; } }
</style>
