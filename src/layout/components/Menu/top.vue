<template>
  <ShareMenu v-bind="propsConfig" key="top" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ShareMenu from './ShareMenu.vue';

  const props = defineProps({
    mode: {
      // 菜单模式
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'horizontal',
    },
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean,
    },
    //位置
    location: {
      type: String,
      default: 'top',
    },
    isTop: {
      type: Boolean,
      default: true,
    },
  });

  const propsConfig = ref({
    ...props,
  });
</script>
