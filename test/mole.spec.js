import { mount } from '@vue/test-utils'
import Mole from '@/pages/mole.vue'

describe('mole game', () => {
  let wrapper
  let play
  const originalAudio = global.Audio

  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(Math, 'random').mockReturnValue(0)
    play = jest.fn().mockResolvedValue(undefined)
    global.Audio = jest.fn().mockImplementation(() => ({
      currentTime: 0,
      muted: false,
      pause: jest.fn(),
      play
    }))
    wrapper = mount(Mole)
  })

  afterEach(() => {
    wrapper.destroy()
    global.Audio = originalAudio
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  test('starts the game and awards a point for a mole tap', async () => {
    await wrapper.find('.start-button').trigger('click')

    expect(wrapper.vm.isPlaying).toBe(true)
    expect(wrapper.vm.activeHole).toBe(0)

    await wrapper.findAll('.hole').at(0).trigger('click')
    expect(wrapper.vm.score).toBe(1)
    expect(wrapper.vm.activeHole).toBeNull()
    expect(wrapper.vm.whackedHole).toBe(0)
    expect(wrapper.find('.hit-effect').exists()).toBe(true)
    expect(play).toHaveBeenCalled()
  })

  test('ends the game after thirty seconds', async () => {
    await wrapper.find('.start-button').trigger('click')
    jest.advanceTimersByTime(30000)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isPlaying).toBe(false)
    expect(wrapper.vm.timeLeft).toBe(0)
    expect(wrapper.vm.activeHole).toBeNull()
    expect(wrapper.find('.game-result').exists()).toBe(true)
    expect(wrapper.find('.result-button').text()).toBe('もういちど あそぶ')
  })

  test('keeps a bonus mole available for repeated taps', async () => {
    await wrapper.find('.start-button').trigger('click')
    await wrapper.setData({ isBonusMole: true })
    const hole = wrapper.findAll('.hole').at(0)

    await hole.trigger('click')
    await hole.trigger('click')

    expect(wrapper.vm.score).toBe(2)
    expect(wrapper.vm.activeHole).toBe(0)
  })
})
