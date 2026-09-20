import { mount } from '@vue/test-utils'
import GameStartButton from '@/components/GameStartButton.vue'

describe('GameStartButton', () => {
  it('shows its game-specific label and emits a tap', async () => {
    const wrapper = mount(GameStartButton, {
      slots: { default: 'はじめる' }
    })

    expect(wrapper.text()).toBe('はじめる')

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
