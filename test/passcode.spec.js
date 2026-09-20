import { mount } from '@vue/test-utils'
import PasscodePage from '@/pages/passcode.vue'

describe('passcode game', () => {
  test('cracks the screen after four wrong digits and adds cracks on screen taps', async () => {
    const wrapper = mount(PasscodePage)
    const wrongCode = ['9', '9', '9', '9']
    wrongCode.slice(0, 3).forEach(number => wrapper.vm.pressNumber(number))
    expect(wrapper.vm.isCracked).toBe(false)
    wrapper.vm.pressNumber(wrongCode[3])
    expect(wrapper.vm.isCracked).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('is-shaking')
    expect(wrapper.vm.crackCount).toBe(1)
    wrapper.vm.addCrack({ clientX: 320, clientY: 240 })
    expect(wrapper.vm.crackCount).toBe(2)
    expect(wrapper.vm.crackLines[3].style).toContain('--left: 31.25%')
    for (let count = 0; count < 20; count++) wrapper.vm.addCrack()
    expect(wrapper.vm.crackCount).toBe(22)
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
