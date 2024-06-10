<template>
  <PageWrapper
    title="远程Checkbox"
    content="基于 Checkbox 组件扩展，很多时候这些数据或许是从 api 获取的"
    showFooter
  >
    <n-card :bordered="false" class="mt-3 proCard" title="基本使用" content-style="padding-top: 0;">
      <ProCheckbox
        ref="proCheckboxRef"
        :request="loadCheckboxData"
        v-model:value="stateValue"
        @update:value="checkboxChange"
        @complete="complete"
        class="p-3"
      />
      <n-divider />
      <div class="flex pl-3 mt-6">
        <n-button type="primary" @click="handleUpdata">改变数据</n-button>
      </div>
    </n-card>

    <n-card :bordered="false" class="mt-3 proCard" title="静态数据" content-style="padding-top: 0;">
      <ProCheckbox
        :options="newOptions"
        v-model:value="state2Value"
        @update:value="checkboxChange"
        @complete="complete"
        class="p-3"
      />
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ProCheckbox } from '@/components/ProCheckbox/index';
  import { stateList } from '@/api/common/index';

  const stateValue = ref([2]);
  const state2Value = ref([7]);
  const proCheckboxRef = ref();
  const newOptions = ref([
    { label: '已完成', value: 6 },
    { label: '已售后', value: 7 },
    { label: '已服务', value: 8 },
  ]);

  async function loadCheckboxData() {
    return await stateList();
  }

  function handleUpdata() {
    proCheckboxRef.value.setOptions(newOptions.value);
  }

  function checkboxChange(value, meta) {
    console.log(value);
    console.log(meta);
  }

  function complete(options) {
    console.log('请求完成', options);
  }
</script>
