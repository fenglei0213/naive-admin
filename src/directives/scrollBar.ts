import { nextTick } from 'vue';
import PerfectScrollbar from 'perfect-scrollbar';

const elScrollBar = (el) => {
  if (el._ps_ instanceof PerfectScrollbar) {
    el._ps_.update();
  } else {
    el._ps_ = new PerfectScrollbar(el, {
      suppressScrollX: true,
    });
  }
};

export const scrollBar = {
  mounted(el) {
    try {
      nextTick(() => {
        elScrollBar(el);
      });
    } catch (error) {
      console.error(error);
      elScrollBar(el);
    }
  },
};
