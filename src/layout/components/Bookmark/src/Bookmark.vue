<template>
  <div class="flex justify-between bookmark">
    <div class="bookmark-crumbs">
      <Crumbs />
    </div>
    <n-el tag="div" class="bookmark-list">
      <n-tabs type="card" closable class="bookmark-tabs">
        <n-tab-pane v-for="item in tabs" :key="item.path" :tab="item.name" :name="item.name" />
        <template #suffix>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button text class="mr-2">
                <template #icon>
                  <n-icon :component="PushpinOutlined" :size="20" />
                </template>
              </n-button>
            </template>
            固定当前页面
          </n-tooltip>
        </template>
      </n-tabs>
    </n-el>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { PushpinOutlined } from '@vicons/antd';
  import Crumbs from './Crumbs.vue';

  const tabs = ref([
    {
      name: '主控台1',
      path: 'zhukt1',
    },
    {
      name: '主控台2',
      path: 'zhukt2',
    },
    {
      name: '主控台3',
      path: 'zhukt4',
    },
    {
      name: '主控台4',
      path: 'zhukt4',
    },
    {
      name: '主控台5',
      path: 'zhukt5',
    },
    {
      name: '主控台6',
      path: 'zhukt6',
    },
  ]);
</script>

<style lang="less" scoped>
  .bookmark {
    padding-right: 15px;

    &-crumbs {
      padding-top: 5px;
    }

    &-list {
      .bookmark-tabs {
        margin-bottom: 10px;

        :deep(.n-tabs-nav__suffix) {
          border: none;
        }

        :deep(.n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab) {
          background-color: var(--n-tab-color-segment);
          border: none;
          border-radius: 4px;
        }

        .n-tab-pane {
          display: none;
        }
      }
    }
  }
</style>
