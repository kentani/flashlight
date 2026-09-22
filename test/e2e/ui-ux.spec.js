const { test, expect } = require('@playwright/test')

test.describe('UI/UX の基本操作', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
  })

  test('主要画面は横スクロールせず、最初の遊びを選べる', async ({ page }) => {
    for (const route of ['.', 'flashlight', 'traffic-light', 'race']) {
      await page.goto(route)
      await expect(page.locator('body')).toBeVisible()
      const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)
      expect(hasHorizontalOverflow).toBe(false)
    }

    await page.goto('.')
    const flashlightLink = page.getByRole('link', { name: /ライト/ })
    await expect(flashlightLink).toBeVisible()
    const bounds = await flashlightLink.boundingBox()
    expect(bounds.width).toBeGreaterThanOrEqual(44)
    expect(bounds.height).toBeGreaterThanOrEqual(44)
    await flashlightLink.click()
    await expect(page).toHaveURL(/\/flashlight\/flashlight$/)
  })

  test('メニューはできたをめざそうとさわってあそぼうに分かれている', async ({ page }) => {
    await page.goto('.')

    const gameCategory = page.getByRole('region', { name: 'できたをめざそう' })
    await expect(gameCategory.getByRole('link', { name: /もぐらたたき/ })).toBeVisible()
    await expect(gameCategory.getByRole('link', { name: /ライト/ })).toHaveCount(0)
    await expect(gameCategory.getByRole('link', { name: /パスコード/ })).toHaveCount(0)

    const toolCategory = page.getByRole('region', { name: 'さわってあそぼう' })
    await expect(toolCategory.getByRole('link', { name: /ライト/ })).toBeVisible()
    await expect(toolCategory.getByRole('link', { name: /もぐらたたき/ })).toHaveCount(0)
    await expect(toolCategory.getByRole('link', { name: /パスコード/ })).toBeVisible()
  })

  test('くるまレースは大きなボタンで車線を動かせる', async ({ page }) => {
    await page.goto('race')

    const drive = page.getByRole('button', { name: 'はじめる' })
    await expect(drive).toBeVisible()
    const bounds = await drive.boundingBox()
    expect(bounds.width).toBeGreaterThanOrEqual(44)
    expect(bounds.height).toBeGreaterThanOrEqual(44)

    await drive.click()
    const up = page.getByRole('button', { name: /うえ/ })
    await expect(up).toBeEnabled()
    await up.click()
  })

  test('ゲームは共通の基準線で並び、舞台の下から遊びを始められる', async ({ page }) => {
    const games = [
      { route: 'clown', stage: '.race-field' },
      { route: 'race', stage: '.track' },
      { route: 'mole', stage: '.mole-field' },
      { route: 'fishing', stage: '.pond' },
      { route: 'word', stage: '.word-board' }
    ]
    let reference
    for (const game of games) {
      await page.goto(game.route)
      const start = page.getByRole('button', { name: 'はじめる' })
      await expect(start).toBeVisible()
      const stage = page.locator(game.stage)
      const startBox = await start.boundingBox()
      const stageBox = await stage.boundingBox()
      expect(startBox.y).toBeGreaterThanOrEqual(stageBox.y + stageBox.height)
      const regions = await page.locator('.game-screen-layout__heading, .game-screen-layout__progress, .game-screen-layout__board, .game-screen-layout__actions').evaluateAll(elements => elements.map(element => {
        const rect = element.getBoundingClientRect()
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
      }))
      expect(regions).toHaveLength(4)
      if (reference) {
        regions.forEach((region, index) => {
          for (const key of ['x', 'y', 'width', 'height']) {
            expect(Math.abs(region[key] - reference[index][key]), `${game.route}: ${index} ${key}`).toBeLessThanOrEqual(1)
          }
        })
      } else {
        reference = regions
      }
      const viewport = page.viewportSize()
      expect(regions[3].y + regions[3].height).toBeLessThanOrEqual(viewport.height)
      const stageCenter = stageBox.y + stageBox.height / 2
      expect(Math.abs(stageCenter - viewport.height / 2)).toBeLessThanOrEqual(36)
      await start.click()
      if (game.route === 'race') {
        await expect(page.getByRole('button', { name: /うえ/ })).toBeVisible()
        await expect(page.getByRole('button', { name: /した/ })).toBeVisible()
      } else if (game.route === 'clown') {
        await expect(page.locator('.move-choices .move-button')).toHaveCount(3)
      } else if (game.route === 'mole') {
        await expect(page.getByRole('button', { name: /さいしょから/ })).toBeVisible()
      } else if (game.route === 'fishing') {
        await expect(page.locator('.controls .cast')).toBeVisible()
      } else {
        await expect(page.locator('.selectable-card')).toHaveCount(4)
      }
    }
  })

  test('もじえらびは開始後もゲーム盤の位置が変わらない', async ({ page }) => {
    await page.goto('word')

    const stage = page.locator('.word-board')
    const start = page.getByRole('button', { name: 'はじめる' })
    const before = await stage.boundingBox()
    await start.click()
    const after = await stage.boundingBox()

    expect(Math.abs(after.y - before.y)).toBeLessThanOrEqual(1)
  })

  test('ピエロの文字影は見出しだけに使い、進行表示と終了操作を読みやすく保つ', async ({ page }) => {
    await page.goto('clown')

    await expect(page.locator('.game-screen-layout__heading')).not.toHaveCSS('text-shadow', 'none')
    await expect(page.locator('.game-progress-panel__label strong')).toHaveCSS('text-shadow', 'none')
    await expect(page.getByRole('link', { name: 'やめる' })).toHaveCSS('text-shadow', 'none')
  })

  test('しんごうきは大きなボタンで色と合図を切り替えられる', async ({ page }) => {
    await page.goto('traffic-light')
    const goSignal = page.getByRole('button', { name: /すすめ/ })
    await expect(goSignal).toBeVisible()
    const bounds = await goSignal.boundingBox()
    expect(bounds.width).toBeGreaterThanOrEqual(44)
    expect(bounds.height).toBeGreaterThanOrEqual(44)
    await goSignal.click()
    await expect(page.locator('.traffic-light')).toHaveClass(/green/)
    await expect(page.getByText('あお！ すすめ すすめ！')).toBeVisible()
  })

  test('ライトは十分な大きさで、タップ後に視覚的に反応する', async ({ page }) => {
    await page.goto('flashlight')

    const light = page.getByRole('button', { name: 'ライトを動かす' })
    await expect(light).toBeVisible()
    const bounds = await light.boundingBox()
    expect(bounds.width).toBeGreaterThanOrEqual(44)
    expect(bounds.height).toBeGreaterThanOrEqual(44)
    await expect(light).toHaveClass(/position1/)

    await light.click()
    await expect(light).not.toHaveClass(/position1/)
  })
})
