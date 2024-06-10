<template>
  <PageWrapper>
    <n-card :bordered="false" class="mb-3 pt-5">
      <BasicForm
        @register="register"
        @submit="handleSubmit"
        @reset="handleReset"
        @advanced="formAdvanced"
      >
        <!-- 自定义插槽用法 -->
        <!-- <template #statusSlot="{ model, field }">
          <n-input v-model:value="model[field]" />
        </template> -->
      </BasicForm>
    </n-card>

    <n-card :bordered="false" class="mb-3">
      <BasicTable
        :columns="columns"
        :request="loadDataTable"
        :row-key="(row) => row.id"
        ref="tableRef"
        :actionColumn="actionColumn"
        @checked-row-change="onCheckedRow"
        @columns-change="onColumnsChange"
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
            <n-button type="primary" @click="handleDialog">
              <template #icon>
                <n-icon>
                  <PlusOutlined />
                </n-icon>
              </template>
              弹窗新增
            </n-button>
            <n-button type="primary" @click="handleDrawer">
              <template #icon>
                <n-icon>
                  <PlusOutlined />
                </n-icon>
              </template>
              抽屉新增
            </n-button>
          </n-space>
        </template>
      </BasicTable>
    </n-card>

    <CreateDrawer ref="createDrawerRef" :title="title" />
    <CreateDialog ref="createDialogRef" :title="title" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction, BasicColumn } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { getTableList } from '@/api/table/list';
  import { columns } from './columns';
  import { schemas } from './schemas';
  import CreateDrawer from './CreateDrawer.vue';
  import CreateDialog from './CreateDialog.vue';
  import { PlusOutlined, DeleteOutlined, FormOutlined, ExportOutlined } from '@vicons/antd';
  import { useRoute } from 'vue-router';
  import { renderIcon } from '@/utils';

  const route = useRoute();
  const message = useMessage();
  const createDrawerRef = ref();
  const createDialogRef = ref();
  const tableRef = ref();
  const title = ref('新增预约');
  const formParams = reactive({
    name: '',
    address: '',
    date: null,
  });

  const params = ref({
    name: '',
    id: route.params.id,
  });

  const actionColumn: BasicColumn = reactive({
    width: 220,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '删除',
            type: 'error',
            size: 'medium',
            icon: renderIcon(DeleteOutlined),
            onPositiveClick: handleDelete.bind(null, record),
            onNegativeClick: handleNegative.bind(null, record),
            isConfirm: true,
            confirmContent: '您真的，确定要删除吗？',
            positiveText: '确定删除',
          },
          {
            label: '编辑',
            type: 'warning',
            size: 'medium',
            icon: renderIcon(FormOutlined),
            onClick: handleDrawerView.bind(null, record),
          },
        ],
        dropDownProps: {
          label: '更多',
          type: 'info',
          size: 'medium',
          icon: renderIcon(DeleteOutlined),
          // iconPlacement: 'left',
        },
        dropDownActions: [
          {
            label: '启用',
            size: 'medium',
            key: 'enabled',
            // 根据业务控制是否显示: 非enable状态的不显示启用按钮
            ifShow: () => {
              return true;
            },
          },
          {
            label: '禁用',
            key: 'disabled',
            ifShow: () => {
              return true;
            },
          },
        ],
        select: (key) => {
          message.info(`您点击了，${key} 按钮`);
        },
      });
    },
  });

  const [register, {}] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
  });

  function onColumnsChange(columns) {
    console.log('columns', columns);
  }

  function formAdvanced(status) {
    console.log(status);
    tableRef.value.redoHeight();
  }

  function handleDialog() {
    title.value = '新增预约';
    createDialogRef.value.showModal();
  }

  function handleDrawer() {
    title.value = '新增预约';
    createDrawerRef.value.openDrawer();
  }

  function handleDrawerView(record) {
    title.value = '编辑预约';
    createDrawerRef.value.openDrawer(record);
  }

  const loadDataTable = async (res) => {
    return await getTableList({ ...formParams, ...params.value, ...res });
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys.value);
  }

  function reloadTable() {
    tableRef.value.reload();
  }

  function handleDelete(record: Recordable) {
    console.log('点击了删除', record);
    message.info('点击了删除');
  }

  function handleNegative(record: Recordable) {
    console.log('点击了取消', record);
    message.info('点击了取消');
  }

  function handleSubmit(values: Recordable) {
    console.log(values);
    params.value = Object.assign(formParams, values) as any;
    reloadTable();
  }

  function handleReset(values: Recordable) {
    console.log(values);
  }
</script>
