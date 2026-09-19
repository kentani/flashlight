import { mount } from '@vue/test-utils'
import Flashlight from '@/pages/flashlight.vue'

describe('flashlight', () => {
  let wrapper
  let play
  const originalAudio = global.Audio

  beforeEach(() => {
    play = jest.fn().mockResolvedValue(undefined)
    global.Audio = jest.fn().mockImplementation(() => ({ currentTime: 1, play }))
    jest.spyOn(Math, 'random').mockReturnValue(0)
    wrapper = mount(Flashlight)
  })

  afterEach(() => {
    wrapper.destroy()
    global.Audio = originalAudio
    jest.restoreAllMocks()
  })

  test('moves and resizes the light and plays sound when tapped', async () => {
    const light = wrapper.find('.inner')
    expect(light.classes()).toContain('position1')

    await light.trigger('click')
    expect(light.classes()).toEqual(expect.arrayContaining(['position2', 'zoom2']))
    expect(play).toHaveBeenCalledTimes(1)

    await light.trigger('click')
    expect(light.classes()).toEqual(expect.arrayContaining(['position1', 'zoom1']))
    expect(play).toHaveBeenCalledTimes(2)
  })
})
