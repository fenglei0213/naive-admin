<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="文本复制">
        文本复制示例，用于常规订单号，编号，快速复制等场景
      </n-card>
    </div>
    <n-card
      :bordered="false"
      title="基本信息"
      class="mt-3 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-descriptions label-placement="left" class="py-2">
        <n-descriptions-item>
          <template #label>收款人姓名</template>
          啊俊
        </n-descriptions-item>
        <n-descriptions-item label="收款账户">NaiveUiAdmin@qq.com</n-descriptions-item>
        <n-descriptions-item label="付款类型">支付宝</n-descriptions-item>
        <n-descriptions-item label="付款账户">
          {{ account }}
          <n-button size="small" type="info" @click="handleAccountCopy">复制</n-button>
        </n-descriptions-item>
        <n-descriptions-item label="转账金额">
          <n-space>
            <n-input v-model:value="money" />
            <n-button type="info" @click="handleMoneyCopy">复制</n-button>
          </n-space>
        </n-descriptions-item>
        <n-descriptions-item label="状态">
          <n-tag type="success"> 已到账</n-tag>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { useCopyToClipboard } from '@/hooks/web/useCopyToClipboard';
  import { useMessage } from 'naive-ui';

  const { clipboardRef, copiedRef } = useCopyToClipboard();

  const account = ref('NaiveUiAdmin@163.com');
  const money = ref(null);
  const message = useMessage();

  function handleAccountCopy() {
    const value = unref(account.value);
    clipboardRef.value = value;
    if (unref(copiedRef)) {
      message.success(`拷贝成功：${value}`);
    }
  }

  function handleMoneyCopy() {
    const value = unref(money.value);
    if (!value) {
      message.warning('请输入要复制的内容！');
      return;
    }
    clipboardRef.value = value;
    if (unref(copiedRef)) {
      message.success(`拷贝成功：${value}`);
    }
  }
</script>
