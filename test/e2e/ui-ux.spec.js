const { test, expect } = require('@playwright/test')

test.describe('UI/UX の基本操作', () => {
  test('主要画面は横スクロールせず、最初の遊びを選べる', async ({ page }) => {
    for (const route of ['.', 'flashlight', 'race']) {
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

  test('くるまレースは大きなボタンでゴールを目指せる', async ({ page }) => {
    await page.goto('race')

    const drive = page.getByRole('button', { name: 'はじめる' })
    await expect(drive).toBeVisible()
    const bounds = await drive.boundingBox()
    expect(bounds.width).toBeGreaterThanOrEqual(44)
    expect(bounds.height).toBeGreaterThanOrEqual(44)

    await drive.click()
    await expect(page.getByRole('button', { name: 'はしる！' })).toBeVisible()
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
