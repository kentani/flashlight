import { mount } from '@vue/test-utils'
import PasscodePage from '@/pages/passcode.vue'

describe('passcode game', () => {
  test('cracks the screen immediately after a wrong number', async () => {
    const wrapper = mount(PasscodePage)
    wrapper.vm.pressNumber('9')
    expect(wrapper.vm.isCracked).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.crack-overlay').exists()).toBe(true)
  })

  test('unlocks only with 0727 and restarts safely', () => {
    const wrapper = mount(PasscodePage)
    const unlockCode = ['0', '7', '2', '7']
    unlockCode.forEach(number => wrapper.vm.pressNumber(number))
    expect(wrapper.vm.isUnlocked).toBe(true)
    wrapper.vm.restart()
    expect(wrapper.vm.enteredCode).toEqual([])
    expect(wrapper.vm.isCracked).toBe(false)
  })
})
