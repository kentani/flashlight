import { shallowMount } from '@vue/test-utils'
import Drawing from '@/pages/drawing.vue'

describe('drawing reset', () => {
  let wrapper
  let ctx

  beforeEach(() => {
    ctx = {
      beginPath: jest.fn(), closePath: jest.fn(), clearRect: jest.fn(),
      moveTo: jest.fn(), lineTo: jest.fn(), stroke: jest.fn()
    }
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(ctx)
    wrapper = shallowMount(Drawing, {
      stubs: {
        'v-app-bar': { template: '<div><slot /></div>' },
        'v-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>' },
        'v-icon': true, 'v-slider': true, 'v-switch': true
      }
    })
    wrapper.vm.canvas.width = 800
    wrapper.vm.canvas.height = 600
  })

  afterEach(() => {
    wrapper.destroy()
    jest.restoreAllMocks()
  })

  test('clears the whole canvas while preserving the selected drawing tools', async () => {
    await wrapper.setData({
      currentBackColor: '#00331b', currentPenColor: '#ffd700',
      currentPenSize: 12, isEraser: true
    })
    await wrapper.find('.reset-button').trigger('click')

    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 800, 600)
    expect(wrapper.vm.currentBackColor).toBe('#00331b')
    expect(wrapper.vm.currentPenColor).toBe('#ffd700')
    expect(wrapper.vm.currentPenSize).toBe(12)
    expect(wrapper.vm.isEraser).toBe(true)
  })

  test('ends the old stroke and allows a new drawing after reset', async () => {
    const canvas = wrapper.find('canvas')
    await canvas.trigger('mousedown')
    await canvas.trigger('mousemove', { clientX: 20, clientY: 30 })
    expect(ctx.stroke).toHaveBeenCalledTimes(1)

    await wrapper.find('.reset-button').trigger('click')
    expect(wrapper.vm.lastPosition).toEqual({ x: null, y: null })
    await canvas.trigger('mousemove', { clientX: 40, clientY: 50 })
    expect(ctx.stroke).toHaveBeenCalledTimes(1)

    await canvas.trigger('mousedown')
    await canvas.trigger('mousemove', { clientX: 60, clientY: 70 })
    expect(ctx.moveTo).toHaveBeenLastCalledWith(60, 70)
    expect(ctx.stroke).toHaveBeenCalledTimes(2)
  })
})
