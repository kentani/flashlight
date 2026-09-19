import { mount } from '@vue/test-utils'
import WordPage from '@/pages/word.vue'

describe('word game challenge', () => {
  let wrapper

  beforeEach(() => {
    global.Audio = jest.fn().mockImplementation(() => ({
      currentTime: 0,
      play: jest.fn().mockResolvedValue(undefined)
    }))
    wrapper = mount(WordPage)
    wrapper.vm.stopTimer()
  })

  afterEach(() => {
    wrapper.destroy()
    jest.restoreAllMocks()
  })

  test('starts with a 30 second, five-success, three-mistake challenge', () => {
    expect(wrapper.vm.timer).toBe(30)
    expect(wrapper.vm.targetSuccesses).toBe(5)
    expect(wrapper.vm.maxMistakes).toBe(3)
    expect(wrapper.findAll('.selectable-card')).toHaveLength(4)
  })

  test('clears after the target number of correct answers', () => {
    for (let count = 0; count < 5; count++) {
      wrapper.vm.words = [{ id: 0, text: 'あ', class: 'a sm', selected: false, result: false }]
      wrapper.vm.themeWord = 'あ'
      wrapper.vm.roundTransitioning = false
      wrapper.vm.selectWord(0)
    }

    expect(wrapper.vm.successCount).toBe(5)
    expect(wrapper.vm.gameOver).toBe(true)
    expect(wrapper.vm.cleared).toBe(true)
  })

  test('fails and adds the crash class after three mistakes', async () => {
    for (let count = 0; count < 3; count++) {
      wrapper.vm.words = [{ id: 0, text: 'い', class: 'a sm', selected: false, result: false }]
      wrapper.vm.themeWord = 'あ'
      wrapper.vm.roundTransitioning = false
      wrapper.vm.selectWord(0)
    }

    expect(wrapper.vm.gameOver).toBe(true)
    expect(wrapper.vm.cleared).toBe(false)
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('is-crashing')
  })
})
