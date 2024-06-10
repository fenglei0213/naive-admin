<template>
  <PageWrapper>
    <n-card :bordered="false" size="small" class="proCard tabsCard">
      <n-tabs type="line" size="large">
        <n-tab-pane name="basic" tab="基本设置">
          <BasicSetting />
        </n-tab-pane>
        <n-tab-pane name="reveal" tab="显示设置"><RevealSetting /></n-tab-pane>
        <n-tab-pane name="email" tab="邮件设置"><EmailSetting /></n-tab-pane>
      </n-tabs>
    </n-card>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '@/components/Page';
  import BasicSetting from './BasicSetting.vue';
  import RevealSetting from './RevealSetting.vue';
  import EmailSetting from './EmailSetting.vue';
</script>
<style lang="less" scoped>
  .thing-cell {
    margin: 0 -16px 10px;
    padding: 5px 16px;

    &:hover {
      background: #f3f3f3;
      cursor: pointer;
    }
  }

  .thing-cell-on {
    background: #f0faff;
    color: #2d8cf0;

    :deep(.n-thing-main .n-thing-header .n-thing-header__title) {
      color: #2d8cf0;
    }

    &:hover {
      background: #f0faff;
    }
  }
</style>
