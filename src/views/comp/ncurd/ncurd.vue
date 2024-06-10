<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="NCURD">
        NCURD 是面向配置的组件，本页展示的所有功能，均无额外业务代码，仅通过 NCURD 的 API 配置实现。
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-3">
      <n-curd :columns="columns" :requestData="getRequestData" />
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { NCurd } from '@/components/Ncurd/index';

  import { getTableList } from '@/api/table/list';

  const columns = ref([
    {
      title: '编码',
      key: 'no',
    },
    {
      title: '名称',
      key: 'name',
    },
    {
      title: '地址',
      key: 'address',
    },
  ]);

  const getRequestData = async (res) => {
    return await getTableList({ ...res });
  };
</script>

<style lang="less" scoped></style>
