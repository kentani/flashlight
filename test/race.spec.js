import { mount } from '@vue/test-utils'
import Race from '@/pages/race.vue'

describe('car race game', () => {
  let wrapper

  beforeEach(() => {
    jest.useFakeTimers()
    global.Audio = jest.fn(() => ({ play: jest.fn().mockResolvedValue() }))
    wrapper = mount(Race)
  })

  afterEach(() => {
    wrapper.destroy()
    jest.useRealTimers()
  })

  test('starts and moves between lanes', async () => {
    await wrapper.find('button').trigger('click')
    await wrapper.findAll('button').at(0).trigger('click')
    expect(wrapper.vm.lane).toBe(0)
    await wrapper.findAll('button').at(1).trigger('click')
    expect(wrapper.vm.lane).toBe(1)
  })

  test('refuels after collecting gas', () => {
    wrapper.vm.start()
    wrapper.vm.energy = 50
    wrapper.vm.hit({ lane: 1, type: 'gas', x: 10 })
    expect(wrapper.vm.energy).toBe(76)
    expect(wrapper.vm.message).toContain('チャリン')
  })

  test('crashes after hitting an obstacle', () => {
    wrapper.vm.start()
    wrapper.vm.hit({ lane: 1, type: 'bad', x: 10 })
    expect(wrapper.vm.result).toBe('crash')
  })
})
