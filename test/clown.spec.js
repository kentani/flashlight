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

  test('starts when the large button is tapped and moves the runner with the highlighted direction', async () => {
    await wrapper.find('.run-button').trigger('click')
    expect(wrapper.vm.isPlaying).toBe(true)

    await wrapper.find('.move-button.is-next').trigger('click')
    expect(wrapper.vm.runnerDistance).toBe(1)
    expect(wrapper.vm.stepEffect).toBe(true)
  })

  test('does not advance when a different direction is tapped', async () => {
    await wrapper.find('.run-button').trigger('click')
    await wrapper.findAll('.move-button').at(1).trigger('click')

    expect(wrapper.vm.runnerDistance).toBe(0)
    expect(wrapper.vm.wrongMove).toBe(true)
  })

  test('shows the selected direction in the runner movement', async () => {
    await wrapper.find('.run-button').trigger('click')
    await wrapper.vm.chooseMove('left')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.runner').classes()).toContain('is-moving-left')
    expect(wrapper.vm.runnerPosition).toBe(17)

    wrapper.setData({ nextMove: 'right' })
    await wrapper.vm.chooseMove('right')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.runner').classes()).toContain('is-moving-right')
    expect(wrapper.vm.runnerPosition).toBe(24)

    wrapper.setData({ nextMove: 'jump' })
    await wrapper.vm.chooseMove('jump')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.runner').classes()).toContain('is-moving-jump')
    expect(wrapper.vm.runnerPosition).toBe(24)
  })

  test('reaches home after eight matching moves', async () => {
    await wrapper.find('.run-button').trigger('click')
    for (let count = 0; count < 8; count += 1) await wrapper.find('.move-button.is-next').trigger('click')

    expect(wrapper.vm.result).toBe('safe')
    expect(wrapper.vm.isPlaying).toBe(false)
    expect(wrapper.text()).toContain('にげきれた！')
  })

  test('ends kindly when the clown catches up', async () => {
    await wrapper.find('.run-button').trigger('click')
    jest.advanceTimersByTime(6400)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.result).toBe('caught')
    expect(wrapper.find('.run-button').text()).toContain('もういちど')
  })
})
