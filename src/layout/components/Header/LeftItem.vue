<template>
  <div class="left-item">
    <!-- 菜单收起 -->
    <n-button
      strong
      circle
      secondary
      type="tertiary"
      class="ml-4 left-item-trigger"
      @click="() => $emit('update:collapsed')"
    >
      <template #icon>
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon v-if="collapsed" size="18">
              <MenuUnfoldOutlined />
            </n-icon>
            <n-icon v-else size="18">
              <MenuFoldOutlined />
            </n-icon>
          </template>
          <span>{{ collapsed ? '展开菜单' : '折叠菜单' }}</span>
        </n-tooltip>
      </template>
    </n-button>
    <!-- 刷新 -->
    <n-button
      strong
      circle
      secondary
      type="tertiary"
      v-if="getIsReload"
      class="left-item-trigger"
      @click="reloadPage"
    >
      <template #icon>
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <ReloadOutlined />
            </n-icon>
          </template>
          <span>刷新</span>
        </n-tooltip>
      </template>
    </n-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch, inject } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { useRedo } from '@/hooks/web/usePage';
  import { MenuFoldOutlined, MenuUnfoldOutlined, ReloadOutlined } from '@vicons/antd';

  defineEmits(['update:collapsed']);

  const isRefresh = ref(false);
  const { getIsReload } = useProjectSetting();

  defineProps({
    inverted: {
      type: Boolean,
    },
  });

  const collapsed = inject('collapsed');

  const router = useRouter();
  const route = useRoute();

  watch(
    () => route.fullPath,
    (to) => {
      isRefresh.value = to.indexOf('/redirect/') != -1;
    },
    { immediate: true },
  );

  // 刷新页面
  async function reloadPage() {
    const redo = useRedo(router);
    await redo();
  }
</script>

<style lang="less" scoped>
  .left-item {
    display: flex;
    height: 56px;
    align-items: center;
    padding-right: 20px;

    &-trigger {
      margin: 0 12px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    &-divider {
      margin: 0;
    }
  }
</style>
