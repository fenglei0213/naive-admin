<template>
  <PageWrapper
    title="远程Radio"
    content="基于 Radio 组件扩展，很多时候这些数据或许是从 api 获取的，再次点击还可以取消选中哦"
    showFooter
  >
    <n-card :bordered="false" class="mt-3 proCard" title="基本使用" content-style="padding-top: 0;">
      <ProRadio
        ref="proRadioRef"
        :request="loadCheckboxData"
        v-model:value="state1Value"
        @update:value="radioChange"
        @complete="complete"
        class="p-3"
      />
      <n-divider />
      <div class="flex pl-3 mt-6">
        <n-button type="primary" @click="handleUpdata">改变数据</n-button>
      </div>
    </n-card>

    <n-card :bordered="false" class="mt-3 proCard" title="按钮组" content-style="padding-top: 0;">
      <ProRadio
        ref="proRadioRef"
        :request="loadCheckboxData"
        v-model:value="state2Value"
        @update:value="radioChange"
        @complete="complete"
        class="p-3"
        isButton
      />
      <n-divider />
      <div class="flex pl-3 mt-6">
        <n-button type="primary" @click="handleUpdata">改变数据</n-button>
      </div>
    </n-card>

    <n-card :bordered="false" class="mt-3 proCard" title="静态数据" content-style="padding-top: 0;">
      <ProRadio
        :options="newOptions"
        v-model:value="state3Value"
        @update:value="radioChange"
        @complete="complete"
        class="p-3"
      />
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ProRadio } from '@/components/ProRadio/index';
  import { stateList } from '@/api/common/index';

  const state1Value = ref(2);
  const state2Value = ref(3);
  const state3Value = ref(7);
  const proRadioRef = ref();
  const newOptions = ref([
    { label: '已完成', value: 6 },
    { label: '已售后', value: 7 },
    { label: '已服务', value: 8 },
  ]);

  async function loadCheckboxData() {
    return await stateList();
  }

  function handleUpdata() {
    proRadioRef.value.setOptions(newOptions.value);
  }

  function radioChange(value) {
    console.log(value);
  }

  function complete(options) {
    console.log('请求完成', options);
  }
</script>
