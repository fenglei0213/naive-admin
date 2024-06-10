<template>
  <div>
    <n-card :bordered="false" class="pt-3 mb-3 proCard">
      <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
        <template #statusSlot="{ model, field }">
          <n-input v-model:value="model[field]" />
        </template>
      </BasicForm>
    </n-card>
    <n-card :bordered="false" class="proCard">
      <BasicTable
        :columns="columns"
        :request="loadDataTable"
        :row-key="(row) => row.id"
        ref="basicTableRef"
        :actionColumn="actionColumn"
        @update:checked-row-keys="onCheckedRow"
        scroll-x="1200"
        virtual-scroll
      >
        <template #tableTitle>
          <n-space>
            <n-button type="primary" @click="addUser">
              <template #icon>
                <n-icon>
                  <PlusOutlined />
                </n-icon>
              </template>
              新建
            </n-button>

            <n-button type="error" @click="openRemoveModal" :disabled="!rowKeys.length">
              <template #icon>
                <n-icon>
                  <DeleteOutlined />
                </n-icon>
              </template>
              删除
            </n-button>
            <n-button @click="addTable">
              <template #icon>
                <n-icon>
                  <ToTopOutlined />
                </n-icon>
              </template>
              导入
            </n-button>
          </n-space>
        </template>
      </BasicTable>
    </n-card>

    <basicModal
      @register="lightModalRegister"
      class="basicModalLight"
      ref="modalRef"
      @on-ok="removeOkModal"
    >
      <template #default>
        <p class="text-gray-600" style="padding-left: 35px"
          >您确认要删除用户，<n-text strong>{{ rowKeysName }} ?</n-text></p
        >
      </template>
    </basicModal>

    <CreateModal ref="createModalRef" :title="createModalTitle" :isEdit="isEdit" />
  </div>
</template>

<script lang="ts" setup>
  import { h, nextTick, reactive, ref, unref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { getUserList } from '@/api/system/user';
  import { columns } from './columns';
  import { PlusOutlined, DeleteOutlined, ToTopOutlined } from '@vicons/antd';
  import CreateModal from './CreateModal.vue';
  import { basicModal, useModal } from '@/components/Modal';
  import { schemas } from './querySchemas';

  const message = useMessage();
  const basicTableRef = ref();
  const createModalRef = ref();
  const rowKeys = ref([]);
  const rowKeysName = ref([]);
  const tableData = ref();
  const isEdit = ref(false);
  const createModalTitle = ref('添加用户');

  const showModal = ref(false);
  const formParams = reactive({
    name: '',
    address: '',
    date: null,
  });

  const params = ref({
    pageSize: 10,
    name: 'xiaoma',
  });

  const actionColumn = reactive({
    width: 170,
    title: '操作',
    key: 'action',
    fixed: 'right',
    align: 'center',
    render(record) {
      return h(TableAction as any, {
        style: 'text',
        actions: [
          {
            label: '删除',
            onClick: handleDelete.bind(null, record),
          },
          {
            label: '编辑',
            onClick: handleEdit.bind(null, record),
          },
        ],
        dropDownActions: [
          {
            label: '启用',
            key: 'enabled',
          },
          {
            label: '禁用',
            key: 'disabled',
          },
        ],
        select: (key) => {
          message.info(`您点击了，${key} 按钮`);
        },
      });
    },
  });

  function addTable() {
    showModal.value = true;
  }

  const loadDataTable = async (res) => {
    const result = await getUserList({ ...formParams, ...params.value, ...res });
    tableData.value = result.list;
    return result;
  };

  function onCheckedRow(keys) {
    rowKeys.value = keys;
    rowKeysName.value = tableData.value
      .filter((item) => {
        return keys.includes(item.id);
      })
      .map((item) => {
        return item.username;
      })
      .join('，');
  }

  function reloadTable() {
    basicTableRef.value.reload();
  }

  function handleEdit(record: Recordable) {
    record.mobile = parseInt(record.mobile);
    addUser();
    nextTick(() => {
      isEdit.value = true;
      createModalRef.value.setProps({ title: '编辑用户' });
      createModalRef.value.setFieldsValue({
        ...unref(record),
      });
    });
  }

  function handleDelete(record: Recordable) {
    rowKeysName.value = record.username;
    openRemoveModal();
  }

  function handleSubmit(values: Recordable) {
    console.log(values);
    reloadTable();
  }

  function handleReset(values: Recordable) {
    console.log(values);
  }

  const [register, {}] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
  });

  const [
    lightModalRegister,
    { openModal: lightOpenModal, closeModal: lightCloseModal, setSubLoading: lightSetSubLoading },
  ] = useModal({
    title: '删除确认',
    showIcon: true,
    type: 'warning',
    closable: false,
    maskClosable: true,
    width: 380,
  });

  //删除
  function openRemoveModal() {
    lightOpenModal();
  }

  //添加
  function addUser() {
    isEdit.value = false;
    createModalRef.value.setProps({ title: '添加用户' });
    createModalRef.value.openModal();
  }

  //确认删除
  function removeOkModal() {
    lightCloseModal();
    lightSetSubLoading();
    message.error('抱歉，您没有操作权限');
  }
</script>

<style lang="less" scoped></style>
