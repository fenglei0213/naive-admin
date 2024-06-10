<template>
  <n-drawer v-model:show="isDrawer" :width="props.width" placement="right">
    <n-drawer-content :title="props.title" closable>
      <n-form inline label-placement="left" label-width="auto" :show-feedback="false">
        <n-grid x-gap="46" y-gap="6" :cols="2">
          <n-gi v-for="item in getData" :label="item.label" :key="item.key">
            <n-form-item :label="item.label">
              <Render v-if="item.render" :ref="`Render_${item.key}`" :value="item.render(item)" />
              <template v-else>
                {{ item.value }}
              </template>
            </n-form-item>
          </n-gi>
        </n-grid>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Render } from '@/components/Render';

  const isDrawer = ref(false);

  const props = defineProps({
    title: {
      type: String,
      default: '查看详情',
    },
    width: {
      type: Number,
      default: 550,
    },
    data: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  });

  const getData = computed(() => {
    return props.data;
  });

  function openDrawer() {
    isDrawer.value = true;
  }

  function closeDrawer() {
    isDrawer.value = false;
  }

  defineExpose({
    openDrawer,
    closeDrawer,
  });
</script>
