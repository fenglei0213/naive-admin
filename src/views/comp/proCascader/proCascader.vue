<template>
  <PageWrapper
    title="省市区联动 ProCascader"
    content="基于 Cascader 组件扩展，轻松使用 省市区联动选择，支持自定义字段名"
    showFooter
  >
    <n-card :bordered="false" class="mt-3 proCard" title="基本使用" content-style="padding-top: 0;">
      <ProCascader labelField="name" valueField="id" @complete="change" style="width: 220px" />
    </n-card>
    <n-card :bordered="false" class="mt-3 proCard" title="省份" content-style="padding-top: 0;">
      <ProCascader
        onlyProvince
        v-model:value="province"
        labelField="name"
        valueField="id"
        @complete="change"
        style="width: 220px"
      />
    </n-card>
    <n-card
      :bordered="false"
      class="mt-3 proCard"
      title="省份/城市"
      content-style="padding-top: 0;"
    >
      <ProCascader
        hideArea
        labelField="name"
        valueField="id"
        @complete="change"
        style="width: 220px"
      />
    </n-card>
    <n-card
      :bordered="false"
      class="mt-3 proCard"
      title="省份/城市/区县联动"
      content-style="padding-top: 0;"
    >
      <ProCascader
        v-model:value="district"
        labelField="name"
        valueField="id"
        @complete="change"
        style="width: 220px"
      />
    </n-card>
    <n-card
      :bordered="false"
      class="mt-3 proCard"
      title="自定义数据源"
      content-style="padding-top: 0;"
    >
      <ProCascader
        :options="options"
        labelField="name"
        valueField="id"
        @complete="change"
        style="width: 220px"
      >
        <template #action> 站在能分割世界的桥 </template>
      </ProCascader>
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ProCascader } from '@/components/ProCascader/index';

  const district = ref([2, 33, 331]);
  const province = ref([2]);

  const options = ref([
    {
      id: 1,
      name: '广东省',
      children: [
        {
          id: 11,
          name: '深圳市',
        },
        {
          id: 22,
          name: '广州市',
        },
      ],
    },
    {
      id: 2,
      name: '江西省',
    },
  ]);

  function change(value, option, pathValues) {
    console.log('complete:value', value);
    console.log('complete:option', option);
    console.log('complete:pathValues', pathValues);
  }
</script>
