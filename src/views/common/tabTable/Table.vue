<template>
  <BasicTable
    :columns="columns"
    :request="loadDataTable"
    :row-key="(row) => row.id"
    ref="tableRef"
    :autoScrollX="true"
  >
    <template #tableTitle>
      <n-space>
        <n-button type="success">
          <template #icon>
            <n-icon>
              <ExportOutlined />
            </n-icon>
          </template>
          导出
        </n-button>
        <n-button type="error">
          <template #icon>
            <n-icon>
              <DeleteOutlined />
            </n-icon>
          </template>
          批量删除
        </n-button>
      </n-space>
    </template>
  </BasicTable>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { getTableList } from '@/api/table/list';
  import { columns } from './columns';
  import { BasicTable } from '@/components/Table';
  import { DeleteOutlined, ExportOutlined } from '@vicons/antd';

  const params = ref({
    name: '',
  });

  const loadDataTable = async (res) => {
    return await getTableList({ ...params.value, ...res });
  };
</script>
