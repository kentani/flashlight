import { mount } from '@vue/test-utils'
import TrafficLightPage from '@/pages/traffic-light.vue'

describe('traffic light', () => {
  let wrapper
  let play
  const originalAudio = global.Audio
  beforeEach(() => { play = jest.fn().mockResolvedValue(undefined); global.Audio = jest.fn().mockImplementation(() => ({ currentTime: 1, play })); wrapper = mount(TrafficLightPage) })
  afterEach(() => { wrapper.destroy(); global.Audio = originalAudio })
  test('changes the signal and gives each choice a clear accessible state', async () => {
    const buttons = wrapper.findAll('.signal-button')
    expect(buttons).toHaveLength(3)
    expect(wrapper.find('.traffic-light').classes()).toContain('red')
    await buttons.at(2).trigger('click')
    expect(wrapper.find('.traffic-light').classes()).toContain('green')
    expect(buttons.at(2).attributes('aria-pressed')).toBe('true')
    expect(wrapper.text()).toContain('あお！ すすめ')
    expect(play).toHaveBeenCalledTimes(1)
  })
})
