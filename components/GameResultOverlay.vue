<template>
  <section class="game-result-overlay game-result result" :class="`game-result-overlay--${tone}`" role="alert" aria-live="assertive">
    <div class="game-result-overlay__content">
      <div class="game-result-overlay__celebration" aria-hidden="true">{{ celebration }}</div>
      <h2>{{ title }}</h2>
      <div class="game-result-overlay__detail"><slot /></div>
      <GameActionButtons compact @primary="$emit('retry')">{{ retryLabel }}</GameActionButtons>
    </div>
  </section>
</template>

<script>
import GameActionButtons from '@/components/GameActionButtons.vue'

export default {
  name: 'GameResultOverlay',
  components: { GameActionButtons },
  props: {
    title: { type: String, required: true },
    celebration: { type: String, default: '🎉' },
    tone: { type: String, default: 'clear' },
    retryLabel: { type: String, default: 'もういちど' }
  }
}
</script>

<style scoped>
.game-result-overlay { align-items: center; background: rgba(26, 33, 44, .8); color: #fff; display: flex; inset: 0; justify-content: center; padding: 22px 16px; position: fixed; text-align: center; z-index: 30; }
.game-result-overlay--retry { background: rgba(54, 38, 45, .82); }
.game-result-overlay__content { animation: result-arrive .3s ease-out; display: grid; gap: 10px; justify-items: center; max-width: 400px; width: 100%; }
.game-result-overlay__celebration { animation: celebration-pop .5s ease-out both; font-size: clamp(3.8rem, 17vw, 6.6rem); line-height: 1; min-height: 1.1em; }
h2 { font-size: clamp(2.7rem, 13vw, 4.8rem); line-height: 1; margin: 6px 0 10px; text-shadow: 0 3px 0 rgba(0, 0, 0, .16); }
.game-result-overlay__detail { font-size: clamp(1.05rem, 4.5vw, 1.4rem); font-weight: bold; min-height: 2.6em; }
@keyframes result-arrive { from { opacity: 0; transform: scale(.86); } to { opacity: 1; transform: scale(1); } }
@keyframes celebration-pop { from { opacity: 0; transform: scale(.45) rotate(-14deg); } 70% { transform: scale(1.1) rotate(5deg); } to { opacity: 1; transform: scale(1) rotate(0); } }
@media (prefers-reduced-motion: reduce) { .game-result-overlay__content, .game-result-overlay__celebration { animation: none; } }
</style>
