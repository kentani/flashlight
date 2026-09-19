import { mount } from '@vue/test-utils'
import SwitchPage from '@/pages/switch.vue'

describe('switch', () => {
  let wrapper
  let play
  const originalAudio = global.Audio

  beforeEach(() => {
    play = jest.fn().mockResolvedValue(undefined)
    global.Audio = jest.fn().mockImplementation(() => ({ currentTime: 1, play }))
    wrapper = mount(SwitchPage)
  })

  afterEach(() => {
    wrapper.destroy()
    global.Audio = originalAudio
  })

  test('lights each switch and celebrates when all switches are on', async () => {
    const switches = wrapper.findAll('.switch-card')

    expect(switches).toHaveLength(3)
    expect(wrapper.text()).toContain('どれを いれる？')

    await switches.at(0).trigger('click')
    expect(switches.at(0).classes()).toContain('is-on')
    expect(switches.at(0).attributes('aria-pressed')).toBe('true')
    expect(wrapper.text()).toContain('1こ ひかった！')

    await switches.at(1).trigger('click')
    await switches.at(2).trigger('click')
    expect(wrapper.text()).toContain('ぜんぶ ひかった！')
    expect(play).toHaveBeenCalledTimes(3)
  })
})
