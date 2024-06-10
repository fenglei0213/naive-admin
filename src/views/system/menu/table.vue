<template>
  <PageWrapper>
    <n-card :bordered="false" class="proCard">
      <BasicTable
        :columns="columns"
        :request="loadDataTable"
        :row-key="(row) => row.key"
        v-model:expanded-row-keys="expandedRowKeys"
        ref="tableRef"
        :actionColumn="actionColumn"
        @checked-row-change="onCheckedRow"
        @columns-change="onColumnsChange"
        :autoScrollX="true"
      >
        <template #tableTitle>
          <n-space>
            <n-button type="primary" @click="openCreateDrawer">
              <template #icon>
                <n-icon>
                  <PlusOutlined />
                </n-icon>
              </template>
              新增
            </n-button>
            <n-button @click="packHandle"> 展开/折叠 </n-button>
          </n-space>
        </template>
      </BasicTable>
      <CreateDrawer ref="createDrawerRef" :title="drawerTitle" />
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { BasicTable, TableAction, BasicColumn } from '@/components/Table';
  import { getMenuList } from '@/api/system/menu';
  import { columns } from './columns';
  import { PlusOutlined, DeleteOutlined, FormOutlined } from '@vicons/antd';
  import { useRoute } from 'vue-router';
  import { renderIcon } from '@/utils';
  import { getTreeValues } from '@/utils/helper/treeHelper';
  import CreateDrawer from './CreateDrawer.vue';

  const route = useRoute();
  const tableRef = ref();
  const createDrawerRef = ref();
  const drawerTitle = ref('新增菜单');

  const expandedRowKeys = ref<string[]>([]);
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
            label: '新增',
            type: 'primary',
            text: true,
            size: 'medium',
            icon: renderIcon(PlusOutlined),
            onclick: openCreateDrawer.bind(null, record),
          },
          {
            label: '编辑',
            type: 'primary',
            text: true,
            size: 'medium',
            icon: renderIcon(FormOutlined),
            onclick: openEidtDrawer.bind(null, record),
          },
          {
            label: '删除',
            type: 'error',
            size: 'medium',
            text: true,
            icon: renderIcon(DeleteOutlined),
            onPositiveClick: handleDelete.bind(null, record),
            isConfirm: true,
            confirmContent: '您真的，确定要删除吗？',
            positiveText: '确定删除',
          },
        ],
      });
    },
  });

  function openCreateDrawer() {
    drawerTitle.value = '新增菜单';
    const { openDrawer } = createDrawerRef.value;
    openDrawer();
  }

  function openEidtDrawer() {
    drawerTitle.value = '编辑菜单';
    const { openDrawer } = createDrawerRef.value;
    openDrawer();
  }

  function packHandle() {
    if (!expandedRowKeys.value.length) {
      expandedRowKeys.value = getTreeValues(tableRef.value.getDataSource(), 'key');
    } else {
      expandedRowKeys.value = [];
    }
    console.log(expandedRowKeys.value);
  }

  function onColumnsChange(columns) {
    console.log('columns', columns);
  }

  const loadDataTable = async (res) => {
    return await getMenuList({ ...formParams, ...params.value, ...res });
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys.value);
  }

  function handleDelete(record: Recordable) {
    console.log('点击了删除', record);
    window['$message'].info('点击了删除');
  }
</script>
