import config from '../nuxt.config'

describe('PWA appearance', () => {
  test('uses an opaque iOS status bar and the app background color', () => {
    expect(config.pwa.meta.appleStatusBarStyle).toBe('default')
    expect(config.pwa.manifest.background_color).toBe('#EDF7FB')
  })
})
