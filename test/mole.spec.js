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
    wrapper.vm.startGame()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isPlaying).toBe(true)
    expect(wrapper.vm.activeHole).toBe(0)

    await wrapper.findAll('.hole').at(0).trigger('click')
    expect(wrapper.vm.score).toBe(1)
    expect(wrapper.vm.activeHole).toBeNull()
    expect(wrapper.vm.whackedHole).toBe(0)
    expect(wrapper.vm.hitPulse).toBe(1)
    expect(wrapper.find('.hit-effect').exists()).toBe(true)
    expect(wrapper.find('.tap-cheer').exists()).toBe(true)
    expect(wrapper.find('.score-pop').text()).toBe('+1')
    expect(play).toHaveBeenCalled()
  })

  test('reuses prepared audio when restarting the game', async () => {
    wrapper.vm.startGame()
    wrapper.vm.startGame()

    expect(global.Audio).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.isPlaying).toBe(true)
  })

  test('ends the game after fifteen seconds', async () => {
    wrapper.vm.startGame()
    jest.advanceTimersByTime(15000)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isPlaying).toBe(false)
    expect(wrapper.vm.timeLeft).toBe(0)
    expect(wrapper.vm.activeHole).toBeNull()
    expect(wrapper.find('.game-result').exists()).toBe(true)
    expect(wrapper.find('.result-button').text()).toBe('もういちど あそぶ')
  })

  test('keeps a bonus mole available for repeated taps', async () => {
    wrapper.vm.startGame()
    await wrapper.setData({ isBonusMole: true })
    const hole = wrapper.findAll('.hole').at(0)

    await hole.trigger('click')
    await hole.trigger('click')

    expect(wrapper.vm.score).toBe(2)
    expect(wrapper.vm.hitPulse).toBe(2)
    expect(wrapper.vm.activeHole).toBe(0)
  })

  test('shows fever feedback away from the hole and ignores the synthetic click after a touch', async () => {
    wrapper.vm.startGame()
    await wrapper.vm.$nextTick()
    await wrapper.setData({ isBonusMole: true })
    const hole = wrapper.findAll('.hole').at(0)

    await hole.trigger('touchend')
    await hole.trigger('click')

    expect(wrapper.vm.score).toBe(1)
    expect(wrapper.vm.bonusHits).toBe(1)
    expect(wrapper.vm.feverMeter).toBe(20)
    expect(wrapper.find('.fever-status').text()).toContain('フィーバー！')
    expect(wrapper.find('.fever-status__meter i').attributes('style')).toContain('20%')
    expect(wrapper.findAll('.fever-status__meter b.is-filled')).toHaveLength(1)
    await wrapper.setData({ bonusHits: 5 })
    expect(wrapper.vm.feverMeter).toBe(100)
    expect(wrapper.find('.fever-status__meter').classes()).toContain('is-max')
    expect(wrapper.find('.hole .fever-status').exists()).toBe(false)
  })
})
