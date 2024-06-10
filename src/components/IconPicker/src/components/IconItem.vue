<template>
  <n-scrollbar style="max-height: 350px">
    <n-el tag="div" class="i-picker-icons">
      <n-grid x-gap="6" y-gap="6" :cols="8">
        <n-gi v-for="item in getList" :key="item">
          <div class="icon-item" :class="{ 'icon-item-on': item === value }" @click="select(item)">
            <Icon :icon="item" :key="item" :size="20" />
          </div>
        </n-gi>
      </n-grid>
    </n-el>
  </n-scrollbar>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Icon } from '@/components/Icon';

  const emit = defineEmits(['update:value']);

  const props = defineProps({
    list: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
  });

  const getList = computed(() => {
    return props.list;
  });

  function select(value) {
    emit('update:value', value);
  }
</script>

<style lang="less" scoped>
  .i-picker-icons {
    padding: 2px;

    .icon-item {
      text-align: center;
      border: 1px solid var(--border-color);
      padding: 10px 0;
      border-radius: 4px;
      transition: all 0.3s;

      &:hover {
        box-shadow: 0 0 1px 2px var(--primary-color);
        cursor: pointer;

        .n-icon {
          color: var(--primary-color);
          transition: all 0.3s;
          transform: scale(1.5, 1.5);
        }
      }
    }

    .icon-item-on {
      box-shadow: 0 0 1px 2px var(--primary-color);

      .n-icon {
        color: var(--primary-color);
        transform: scale(1.5, 1.5);
      }
    }
  }
</style>
