import { mount } from '@vue/test-utils'
import Fishing from '@/pages/fishing.vue'

describe('fishing game', () => {
  let wrapper

  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(Math, 'random').mockReturnValue(0)
    wrapper = mount(Fishing)
  })

  afterEach(() => {
    wrapper.destroy()
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  test('starts from the central button and catches a fish after casting and reeling', async () => {
    expect(wrapper.find('.pond-preview').exists()).toBe(true)
    expect(wrapper.find('.game-start-button').text()).toBe('はじめる')

    wrapper.vm.startGame()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isPlaying).toBe(true)
    expect(wrapper.find('.game-start-button').exists()).toBe(false)
    expect(wrapper.vm.timeLeft).toBe(15)
    expect(wrapper.findAll('.fish')).toHaveLength(3)
    expect(wrapper.vm.phase).toBe('aiming')

    wrapper.vm.power = wrapper.vm.targetFish.power
    wrapper.vm.charging = true
    wrapper.vm.releaseCast()
    jest.advanceTimersByTime(550)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.phase).toBe('reeling')
    expect(wrapper.find('.reel').exists()).toBe(true)

    wrapper.vm.reel()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.reelPower).toBe(Math.round(100 / wrapper.vm.reelTaps))
    expect(wrapper.find('.reel-meter span').element.style.width).toBe(`${wrapper.vm.reelPower}%`)

    for (let taps = 1; taps < wrapper.vm.reelTaps; taps += 1) wrapper.vm.reel()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.catches).toBe(1)
    expect(wrapper.vm.caughtFish).toEqual([wrapper.vm.targetFish.emoji])
    expect(wrapper.vm.phase).toBe('catching')
    expect(wrapper.find('.celebration').exists()).toBe(true)
  })

  test('returns to aiming when the cast does not reach the fish', async () => {
    wrapper.vm.startGame()
    wrapper.vm.power = 0
    wrapper.vm.charging = true
    wrapper.vm.releaseCast()
    jest.advanceTimersByTime(550)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.phase).toBe('aiming')
    expect(wrapper.vm.catches).toBe(0)
    expect(wrapper.vm.castPower).toBe(0)
  })

  test('shows an overshot hook past the fish when the cast is too strong', () => {
    wrapper.vm.startGame()
    const exactCastPower = wrapper.vm.targetFish.power
    wrapper.vm.castPower = exactCastPower
    const exactCastLength = Number.parseFloat(wrapper.vm.lineStyle.width)

    wrapper.vm.castPower = exactCastPower + 13
    wrapper.vm.phase = 'casting'

    expect(wrapper.vm.message).toBe('とおすぎ！')
    expect(Number.parseFloat(wrapper.vm.lineStyle.width)).toBeGreaterThan(exactCastLength)
  })

  test('finishes after fifteen seconds and shows the result', async () => {
    wrapper.vm.startGame()

    jest.advanceTimersByTime(15000)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isPlaying).toBe(false)
    expect(wrapper.vm.timeLeft).toBe(0)
    expect(wrapper.find('.result').exists()).toBe(true)
  })
})
