<template>
  <PageWrapper
    title="搜索表单组"
    content="ProSearchGroup 基于 NInputGroup 组件扩展，很多时候这种表单组搜索很实用"
    showFooter
  >
    <n-card :bordered="false" class="mt-3" title="基本使用" content-style="padding-top: 0;">
      <ProSearchGroup
        ref="proSearchGroupRef"
        :options="searchOptions"
        :selectProps="SelectProps"
        :inputProps="InputProps"
        @submit="searchGroupSubmit"
      />
    </n-card>

    <n-card :bordered="false" class="mt-3" title="带重置功能" content-style="padding-top: 0;">
      <ProSearchGroup
        ref="proSearchGroupRef"
        isReset
        :options="searchOptions"
        :selectProps="SelectProps"
        :inputProps="InputProps"
        @submit="searchGroupSubmit"
      />
    </n-card>

    <n-card :bordered="false" class="mt-3" title="不展示按钮" content-style="padding-top: 0;">
      <ProSearchGroup
        ref="proSearchGroupRef"
        :isButton="false"
        :options="searchOptions"
        :selectProps="SelectProps"
        :inputProps="InputProps"
        @submit="searchGroupSubmit"
      />
    </n-card>

    <n-card :bordered="false" class="mt-3" title="远程获取数据" content-style="padding-top: 0;">
      <ProSearchGroup
        ref="proSearchGroupRef"
        :request="getStateList"
        :selectProps="SelectProps"
        :inputProps="InputProps"
        @submit="searchGroupSubmit"
      />
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ProSearchGroup } from '@/components/ProSearchGroup';
  import { SelectProps } from 'naive-ui';
  import { stateList } from '@/api/common';

  const SelectProps: any = ref({
    style: { width: '160px' },
  });

  const InputProps = ref({
    placeholder: '请输入查询内容',
  });

  const proSearchGroupRef = ref();
  const searchOptions = [
    {
      label: '账号',
      value: 'uid',
    },
    {
      label: '邮箱',
      value: 'emial',
    },
  ];

  function searchGroupSubmit(res) {
    console.log('表单组返回参数', res);
  }

  async function getStateList() {
    const res = await stateList();
    return res;
  }
</script>
