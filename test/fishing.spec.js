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

  test('starts with fish ready to catch and adds a gold fish to the catch row', async () => {
    await wrapper.find('.start-button').trigger('click')

    expect(wrapper.vm.isPlaying).toBe(true)
    expect(wrapper.vm.timeLeft).toBe(15)
    expect(wrapper.findAll('.fish-button')).toHaveLength(3)

    await wrapper.findAll('.fish-button').at(0).trigger('click')

    expect(wrapper.vm.catches).toBe(2)
    expect(wrapper.vm.combo).toBe(1)
    expect(wrapper.vm.isCasting).toBe(true)
    expect(wrapper.vm.basketFish).toEqual(['🐠'])
    expect(wrapper.find('.casting-line').exists()).toBe(true)

    jest.advanceTimersByTime(500)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isCasting).toBe(false)
    expect(wrapper.vm.caughtFishId).toBeNull()
  })

  test('does not count the click that follows a touch as a second catch', async () => {
    await wrapper.find('.start-button').trigger('click')
    const fish = wrapper.findAll('.fish-button').at(0)

    await fish.trigger('touchend')
    await fish.trigger('click')

    expect(wrapper.vm.catches).toBe(2)
    expect(wrapper.vm.basketFish).toHaveLength(1)
  })

  test('finishes after fifteen seconds and shows the result', async () => {
    await wrapper.find('.start-button').trigger('click')

    jest.advanceTimersByTime(15000)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isPlaying).toBe(false)
    expect(wrapper.vm.timeLeft).toBe(0)
    expect(wrapper.vm.castingLineStyle).toBeNull()
    expect(wrapper.find('.game-result').exists()).toBe(true)
  })
})
