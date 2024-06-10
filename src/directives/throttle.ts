import { DirectiveBinding } from 'vue';

let throttleTimer: NodeJS.Timeout | null;

export const throttle = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const eventType: string = Object.keys(binding.modifiers)[0] || 'click';

    el.addEventListener(eventType, () => {
      const dealy: number = binding.arg ? parseInt(binding.arg) : 300;
      const fn: unknown = binding.value;

      if (isNaN(dealy)) {
        throw Error('v-throttle:arg必须为数字!');
      }

      if (typeof fn !== 'function') {
        throw Error('v-throttle绑定值必须为函数!');
      }

      if (throttleTimer) {
        return;
      }

      throttleTimer = setTimeout(() => {
        fn();
        throttleTimer = null;
      }, dealy);
    });
  },
};
