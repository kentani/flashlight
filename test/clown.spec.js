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

  test('shows the selected action in the runner movement', async () => {
    await wrapper.find('.run-button').trigger('click')
    await wrapper.vm.chooseMove('run')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.runner').classes()).toContain('is-moving-run')
    expect(wrapper.vm.runnerDistance).toBe(1)

    wrapper.setData({ nextMove: 'hide' })
    await wrapper.vm.chooseMove('hide')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.runner').classes()).toContain('is-moving-hide')
    expect(wrapper.vm.runnerDistance).toBe(2)

    wrapper.setData({ nextMove: 'jump' })
    await wrapper.vm.chooseMove('jump')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.runner').classes()).toContain('is-moving-jump')
    expect(wrapper.vm.runnerDistance).toBe(3)
  })

  test('reaches home through the run, hide, and jump route', async () => {
    await wrapper.find('.run-button').trigger('click')
    while (wrapper.vm.runnerDistance < 6) {
      if (wrapper.vm.isHiding) {
        jest.advanceTimersByTime(1400)
        await wrapper.vm.$nextTick()
      } else {
        await wrapper.find('.move-button.is-next').trigger('click')
      }
    }

    expect(wrapper.vm.result).toBe('safe')
    expect(wrapper.vm.isPlaying).toBe(false)
    expect(wrapper.text()).toContain('にげきれた！')
  })

  test('keeps the runner hidden at the tree until the next action', async () => {
    await wrapper.find('.run-button').trigger('click')
    wrapper.setData({ route: ['run', 'hide', 'jump', 'run', 'jump', 'run'], nextMove: 'run' })
    await wrapper.find('.move-button.is-next').trigger('click')
    await wrapper.find('.move-button.is-next').trigger('click')

    expect(wrapper.vm.isHidden).toBe(true)
    expect(wrapper.vm.isHiding).toBe(true)

    jest.advanceTimersByTime(1400)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isHidden).toBe(false)
    expect(wrapper.vm.clownPassed).toBe(true)
  })

  test('changes the action order for a new course', () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValueOnce(.1).mockReturnValueOnce(.8).mockReturnValueOnce(.2)
    const firstCourse = wrapper.vm.createRoute()
    randomSpy.mockReturnValueOnce(.9).mockReturnValueOnce(.3).mockReturnValueOnce(.7)
    const secondCourse = wrapper.vm.createRoute()

    expect(firstCourse).not.toEqual(secondCourse)
    expect(firstCourse).toHaveLength(6)
    expect(firstCourse[0]).toBe('run')
    randomSpy.mockRestore()
  })

  test('ends kindly when the clown catches up', async () => {
    await wrapper.find('.run-button').trigger('click')
    jest.advanceTimersByTime(6400)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.result).toBe('caught')
    expect(wrapper.find('.run-button').text()).toContain('もういちど')
  })
})
