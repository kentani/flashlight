import { mount } from '@vue/test-utils'
import Mole from '@/pages/mole.vue'

describe('mole game', () => {
  let wrapper

  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(Math, 'random').mockReturnValue(0)
    wrapper = mount(Mole)
  })

  afterEach(() => {
    wrapper.destroy()
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
  })

  test('ends the game after thirty seconds', async () => {
    await wrapper.find('.start-button').trigger('click')
    jest.advanceTimersByTime(30000)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isPlaying).toBe(false)
    expect(wrapper.vm.timeLeft).toBe(0)
    expect(wrapper.vm.activeHole).toBeNull()
  })
})
