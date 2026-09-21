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
  })

  afterEach(() => {
    wrapper.destroy()
    jest.restoreAllMocks()
  })

  test('starts with a five-success, three-mistake challenge', async () => {
    expect(wrapper.vm.targetSuccesses).toBe(5)
    expect(wrapper.vm.maxMistakes).toBe(3)
    expect(wrapper.findAll('.selectable-card')).toHaveLength(0)
    expect(wrapper.find('.game-start-button').text()).toBe('はじめる')
    expect(wrapper.find('.word-header .word-status').exists()).toBe(true)
    expect(wrapper.find('.word-board .word-status').exists()).toBe(false)
    expect(wrapper.find('.word-board__play .section1').exists()).toBe(true)
    expect(wrapper.find('.word-board .selectable-card').exists()).toBe(false)
    expect(wrapper.find('.word-controls .selectable-card').exists()).toBe(false)
    expect(wrapper.find('.word-runner').text()).toBe(wrapper.vm.themeWord)

    wrapper.vm.startGame()
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.word-controls .selectable-card')).toHaveLength(4)
  })

  test('keeps the target letter large while moving it across the board', () => {
    wrapper.vm.lastMotionPoint = 0

    wrapper.vm.moveWord()

    expect(wrapper.vm.lastMotionPoint).toBe(1)
    expect(wrapper.vm.wordMotion.scale).toBe(wrapper.vm.wordScale)
  })

  test('starts airy letters at a smaller scale so part of the letter is visible', () => {
    expect(wrapper.vm.getWordScale('い')).toBe(3.25)
    expect(wrapper.vm.getWordScale('つ')).toBe(3.25)
    expect(wrapper.vm.getWordScale('あ')).toBe(3.7)
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
