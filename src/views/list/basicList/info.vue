<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="基础详情"> 基础详情，有时也用于显示只读信息。 </n-card>
    </div>
    <n-card :bordered="false" class="mt-3 proCard" size="small" :segmented="{ content: true }">
      <n-descriptions label-placement="left" class="py-2">
        <n-descriptions-item>
          <template #label>收款人姓名</template>
          啊俊
        </n-descriptions-item>
        <n-descriptions-item label="收款账户">NaiveUiAdmin@qq.com</n-descriptions-item>
        <n-descriptions-item label="付款类型">支付宝</n-descriptions-item>
        <n-descriptions-item label="付款账户">NaiveUiAdmin@163.com</n-descriptions-item>
        <n-descriptions-item label="转账金额">￥1980.00</n-descriptions-item>
        <n-descriptions-item label="状态">
          <n-tag type="success"> 已到账</n-tag>
        </n-descriptions-item>
      </n-descriptions>
      <div class="w-full">
        <n-space>
          <label>测试页面缓存</label>
          <n-input placeholder="输入点内容试试" />
          <n-button type="primary" @click="setTabsTitle">更新当前页面标题</n-button>
        </n-space>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'BasicInfo',
  };
</script>
<script lang="ts" setup>
  import { useMessage } from 'naive-ui';
  import { useTabs } from '@/hooks/web/useTags';
  import { useRoute } from 'vue-router';

  const route = useRoute(); // 第一步
  const useTagsHooks = useTabs();
  const message = useMessage();

  function setTabsTitle() {
    const id = route.params && route.params.id;
    useTagsHooks.setTitle(`基础详情：id-${id}`, {
      fullPath: `/list/basic-info/${id}`,
    });
    message.success('设置成功');
  }
</script>

<style lang="less" scoped></style>
