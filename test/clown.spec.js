import { mount } from '@vue/test-utils'
import Clown from '@/pages/clown.vue'

describe('clown escape game', () => {
  let wrapper

  beforeEach(() => {
    jest.useFakeTimers()
    wrapper = mount(Clown)
  })

  afterEach(() => {
    wrapper.destroy()
    jest.useRealTimers()
  })

  test('starts when the large button is tapped and moves the runner', async () => {
    await wrapper.find('.run-button').trigger('click')
    expect(wrapper.vm.isPlaying).toBe(true)

    await wrapper.find('.run-button').trigger('click')
    expect(wrapper.vm.runnerDistance).toBe(1)
    expect(wrapper.vm.stepEffect).toBe(true)
  })

  test('reaches home after twelve taps', async () => {
    await wrapper.find('.run-button').trigger('click')
    for (let count = 0; count < 12; count += 1) await wrapper.find('.run-button').trigger('click')

    expect(wrapper.vm.result).toBe('safe')
    expect(wrapper.vm.isPlaying).toBe(false)
    expect(wrapper.text()).toContain('にげきれた！')
  })

  test('ends kindly when the clown catches up', async () => {
    await wrapper.find('.run-button').trigger('click')
    jest.advanceTimersByTime(900)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.result).toBe('caught')
    expect(wrapper.find('.run-button').text()).toContain('もういちど')
  })
})
