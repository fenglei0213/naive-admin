<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="导出示例"> 根据JSON格式的数据进行导出 </n-card>
    </div>
    <n-card :bordered="false" class="mt-3 proCard">
      <BasicTable
        title="表格列表"
        titleTooltip="这是一个提示"
        :columns="columns"
        :request="loadDataTable"
        :row-key="(row) => row.id"
        ref="actionRef"
        :actionColumn="actionColumn"
        :scroll-x="1360"
        @update:checked-row-keys="onCheckedRow"
      >
        <template #toolbar>
          <n-space>
            <n-button type="primary" @click="customHeader">导出自定义表头</n-button>
            <n-button type="primary" @click="defaultHeader">导出默认表头</n-button>
          </n-space>
        </template>
      </BasicTable>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, h, unref } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { getTableList } from '@/api/table/list';
  import { columns } from '../../comp/table/basicColumns';
  import { jsonToSheetXlsx } from '@/components/Excel';
  import { useDialog, useMessage } from 'naive-ui';

  const message = useMessage();
  const dialog = useDialog();
  const actionRef = ref();
  const tableData = ref();

  const params = reactive({
    pageSize: 5,
    name: 'xiaoMa',
  });

  const actionColumn = reactive({
    width: 150,
    title: '操作',
    key: 'action',
    fixed: 'right',
    align: 'center',
    render(record) {
      return h(TableAction, {
        style: 'button',
        actions: createActions(record),
      });
    },
  });

  function createActions(record) {
    return [
      {
        label: '删除',
        onClick: handleDelete.bind(null, record),
        // 根据业务控制是否显示 isShow 和 auth 是并且关系
        ifShow: () => {
          return true;
        },
        // 根据权限控制是否显示: 有权限，会显示，支持多个
        auth: ['basic_list'],
      },
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        ifShow: () => {
          return true;
        },
        auth: ['basic_list'],
      },
    ];
  }

  const loadDataTable = async (res) => {
    const result = await getTableList({ ...params, ...res });
    tableData.value = result.list;
    return result;
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function handleDelete(record) {
    console.log(record);
    dialog.info({
      title: '提示',
      content: `您想删除${record.name}`,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        message.success('删除成功');
      },
      onNegativeClick: () => {},
    });
  }

  function handleEdit(record) {
    console.log(record);
    message.success('您点击了编辑按钮');
  }

  function defaultHeader() {
    // 默认Object.keys(data[0])作为header
    jsonToSheetXlsx({
      data: unref(tableData),
      filename: '使用key作为默认表头.xlsx',
    });
  }

  function customHeader() {
    jsonToSheetXlsx({
      data: unref(tableData),
      header: {
        id: 'ID',
        no: '编码',
        name: '名称',
        avatar: '头像',
        address: '地址',
        beginTime: '开始日期',
        endTime: '结束时间',
        status: '状态',
        date: '创建时间',
        time: '停留时间',
      },
      filename: '自定义表头.xlsx',
      json2sheetOpts: {
        // 指定顺序
        //header: ['id', 'no','name','avatar','address','beginTime','endTime','status','date','time'],
      },
    });
  }
</script>

<style lang="less" scoped></style>
