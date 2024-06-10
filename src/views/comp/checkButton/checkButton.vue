<template>
  <PageWrapper title="可选按钮" content="基于 Button 组件扩展" showFooter>
    <n-card :bordered="false" class="mt-3 proCard" title="单选" content-style="padding-top: 0;">
      <CheckButton :options="listProps1" @change="checkButtonChange" />
    </n-card>

    <n-card :bordered="false" class="mt-3 proCard" title="多选" content-style="padding-top: 0;">
      <CheckButton
        :options="listProps2"
        multiple
        @change="checkButtonChange"
        v-model:value="checkValue"
      />
      <n-divider />
      <div class="mt-3">
        <n-space>
          <n-button @click="checkValue = [1]">选择第一个</n-button>
          <n-button @click="checkValue = [1, 2, 3]">选择全部</n-button>
          <n-button @click="checkValue = []">取消全部</n-button>
        </n-space>
      </div>
    </n-card>

    <n-card
      :bordered="false"
      class="mt-3 proCard"
      title="自定义风格"
      content-style="padding-top: 0;"
    >
      <n-h4 class="ml-2">更多用法，请参考 Button 组件</n-h4>
      <CheckButton :options="listProps3" @change="checkButtonChange" />
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { CheckButton, OptionsConfig } from '@/components/CheckButton/index';
  import {
    AlertOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
  } from '@vicons/antd';
  import { renderIcon } from '@/utils/index';

  const listProps1 = ref<OptionsConfig[]>([
    {
      label: '催款中',
      value: 1,
    },
    {
      label: '已执行',
      value: 2,
    },
    {
      label: '已关闭',
      value: 3,
    },
    {
      label: '已完成',
      value: 4,
      disabled: true,
    },
  ]);

  const listProps2 = ref<OptionsConfig[]>([
    {
      label: '休眠客户',
      value: 1,
    },
    {
      label: '意向客户',
      value: 2,
    },
    {
      label: '正常客户',
      value: 3,
    },
  ]);

  const listProps3 = ref<OptionsConfig[]>([
    {
      label: '催款中',
      value: 1,
      round: true,
      icon: renderIcon(AlertOutlined),
    },
    {
      label: '已执行',
      value: 2,
      round: true,
      icon: renderIcon(ClockCircleOutlined),
    },
    {
      label: '已关闭',
      value: 3,
      round: true,
      icon: renderIcon(CloseCircleOutlined),
    },
    {
      label: '已完成',
      value: 4,
      round: true,
      icon: renderIcon(CheckCircleOutlined),
    },
  ]);

  const checkValue = ref([1, 3]);

  function checkButtonChange(values, options) {
    console.log('values', values);
    console.log('options', options);
  }
</script>
