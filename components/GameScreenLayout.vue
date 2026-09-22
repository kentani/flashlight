<template>
  <section class="game-screen-layout">
    <div class="game-screen-layout__content">
      <header class="game-screen-layout__heading">
        <slot name="heading" />
      </header>
      <div class="game-screen-layout__progress">
        <slot name="progress" />
      </div>
      <div class="game-screen-layout__board">
        <slot name="board" />
      </div>
      <div class="game-screen-layout__actions">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'GameScreenLayout'
}
</script>

<style scoped>
.game-screen-layout.game-screen-layout {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  min-height: calc(100svh - 56px);
  padding: 64px 12px 20px;
  width: 100%;
}

.game-screen-layout__content {
  box-sizing: border-box;
  display: grid;
  gap: 8px;
  grid-template-rows: 75px 90px auto 124px;
  max-width: min(440px, max(300px, calc((100svh - 490px) * 4 / 3)));
  min-width: 0;
  width: 100%;
}

.game-screen-layout__heading,
.game-screen-layout__progress,
.game-screen-layout__board,
.game-screen-layout__actions {
  min-width: 0;
}

.game-screen-layout__heading {
  align-self: start;
  height: 75px;
  min-height: 0;
}

.game-screen-layout__heading ::v-deep h1 {
  font-size: clamp(1.4rem, 3.4svh, 2rem);
  line-height: 1.1;
  margin: 0 0 6px;
}

.game-screen-layout__heading ::v-deep p {
  font-size: clamp(.85rem, 3.5vw, 1.05rem);
  line-height: 1.3;
  margin: 0;
}

.game-screen-layout__progress {
  align-items: flex-end;
  display: flex;
}

.game-screen-layout__progress ::v-deep .game-progress-panel {
  align-content: center;
  gap: 2px;
  height: 90px;
  padding: 4px 10px;
  width: 100%;
}

.game-screen-layout__progress ::v-deep .game-progress-panel__item {
  gap: 2px;
}

.game-screen-layout__progress ::v-deep .game-progress-panel__label {
  font-size: .88rem;
}

.game-screen-layout__progress ::v-deep .game-progress-panel__label strong {
  font-size: 1.2rem;
}

.game-screen-layout__progress ::v-deep .game-progress-panel__track {
  border-width: 2px;
  height: 12px;
}

.game-screen-layout__board {
  aspect-ratio: 4 / 3;
  min-height: 0;
  width: 100%;
}

.game-screen-layout__board ::v-deep > * {
  box-sizing: border-box;
  height: 100%;
  min-height: 0;
  width: 100%;
}

.game-screen-layout__actions ::v-deep .game-action-buttons {
  margin: 0;
  max-width: none;
}

.game-screen-layout__actions ::v-deep .buttons,
.game-screen-layout__actions ::v-deep .word-controls,
.game-screen-layout__actions ::v-deep .move-choices {
  margin: 0;
  width: 100%;
}

@media (min-width: 600px) {
  .game-screen-layout.game-screen-layout {
    min-height: calc(100svh - 64px);
  }
}

@media (min-height: 721px) {
  .game-screen-layout__content {
    transform: translateY(-45px);
  }
}

@media (max-height: 720px) {
  .game-screen-layout.game-screen-layout {
    align-items: flex-start;
    padding-top: 8px;
  }
}
</style>
