<template>
  <div class="game-progress-panel" :class="{ 'is-compact': compact }" aria-live="polite">
    <div v-for="item in items" :key="item.label" class="game-progress-panel__item">
      <div class="game-progress-panel__label"><span>{{ item.icon }}</span>{{ item.label }} <strong>{{ item.value }}</strong><small v-if="item.unit">{{ item.unit }}</small></div>
      <div class="game-progress-panel__track" :aria-label="`${item.label} ${item.value} / ${item.max}`">
        <i :class="`is-${item.tone || 'blue'}`" :style="{ width: `${progress(item)}%` }"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameProgressPanel',
  props: {
    items: { type: Array, required: true },
    compact: { type: Boolean, default: false }
  },
  methods: {
    progress (item) {
      if (!item.max) return 0
      return Math.max(0, Math.min(100, (item.value / item.max) * 100))
    }
  }
}
</script>

<style scoped>
.game-progress-panel { background: #fff9e7; border: 4px solid #44506a; border-radius: 22px; box-shadow: 0 5px 0 rgba(33, 42, 60, .2); box-sizing: border-box; display: grid; gap: 9px; max-width: 100%; padding: 11px 13px; width: 100%; }
.game-progress-panel__item { display: grid; gap: 4px; }
.game-progress-panel__label { align-items: baseline; color: #39445b; display: flex; font-size: clamp(.88rem, 3.6vw, 1.05rem); font-weight: bold; gap: 4px; line-height: 1; }
.game-progress-panel__label strong { color: #e75a41; font-size: clamp(1.35rem, 5.6vw, 1.75rem); margin-left: auto; }
.game-progress-panel__label small { font-size: .75rem; }
.game-progress-panel__track { background: #ded9c9; border: 3px solid #44506a; border-radius: 999px; height: 15px; overflow: hidden; }
.game-progress-panel__track i { border-radius: inherit; display: block; height: 100%; transition: width .2s ease-out; }
.is-blue { background: #55afe0; }.is-green { background: #65be63; }.is-yellow { background: #f3c64a; }.is-red { background: #eb6a59; }.is-purple { background: #a783c9; }
.is-compact { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.is-compact .game-progress-panel__item:last-child:nth-child(odd) { grid-column: 1 / -1; }
.is-compact .game-progress-panel__label { font-size: .78rem; gap: 2px; }
.is-compact .game-progress-panel__label strong { font-size: 1.2rem; }
@media (prefers-reduced-motion: reduce) { .game-progress-panel__track i { transition: none; } }
</style>
