<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="导出示例"> 可以选择导出格式 </n-card>
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
          <n-button type="primary" @click="openModal">导出数据</n-button>
        </template>
      </BasicTable>
    </n-card>

    <basicModal @register="modalRegister" ref="modalRef" class="basicModal" @on-ok="okModal">
      <template #default>
        <BasicForm
          @register="register"
          @submit="handleSubmit"
          @reset="handleReset"
          class="basicForm"
        >
          <template #statusSlot="{ model, field }">
            <n-input v-model:value="model[field]" />
          </template>
        </BasicForm>
      </template>
    </basicModal>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, unref, ref, h } from 'vue';
  import { BasicTable, TableAction, BasicColumn } from '@/components/Table';
  import { basicModal, useModal } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
  import { getTableList } from '@/api/table/list';
  import { columns } from '../../comp/table/basicColumns';
  import { jsonToSheetXlsx } from '@/components/Excel';
  import { useDialog, useMessage } from 'naive-ui';

  const schemas: FormSchema[] = [
    {
      field: 'filename',
      component: 'NInput',
      label: '文件名',
      labelMessage: '导出的文件以该名称命名',
      giProps: {
        span: 1,
      },
      componentProps: {
        placeholder: '请输入文件名称',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: '请输入导出的文件名称', trigger: ['blur'] }],
    },
    {
      field: 'bookType',
      component: 'NSelect',
      label: '文件类型',
      componentProps: {
        placeholder: '请选择文件类型',
        options: [
          {
            label: 'xlsx',
            value: 'xlsx',
          },
          {
            label: 'html',
            value: 'html',
          },
          {
            label: 'csv',
            value: 'csv',
          },
          {
            label: 'txt',
            value: 'txt',
          },
        ],
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: '请选择文件类型', trigger: ['change'] }],
    },
  ];

  const message = useMessage();
  const dialog = useDialog();
  const actionRef = ref();
  const modalRef = ref();
  const tableData = ref();

  const params = reactive({
    pageSize: 5,
    name: 'xiaoMa',
  });

  const [modalRegister, { openModal }] = useModal({
    title: '导出数据',
  });

  const [register, { submit }] = useForm({
    gridProps: { cols: 1 },
    collapsedRows: 3,
    labelWidth: 120,
    layout: 'horizontal',
    // submitButtonText: '提交预约',
    showActionButtonGroup: false,
    schemas,
  });

  const actionColumn: BasicColumn = reactive({
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

  async function okModal() {
    const formRes = await submit();
    if (formRes) {
      modalRef.value.closeModal();
      message.success('提交成功');
    } else {
      message.error('验证失败，请填写完整信息');
      modalRef.value.setSubLoading(false);
    }
  }

  function handleReset(values: Recordable) {
    console.log(values);
  }

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

  function handleSubmit(values: Recordable) {
    console.log(values);
    // 默认Object.keys(data[0])作为header
    const { filename, bookType } = values;
    jsonToSheetXlsx({
      data: unref(tableData),
      filename: `${filename.split('.').shift()}.${bookType}`,
      write2excelOpts: {
        bookType,
      },
    });
    message.success(JSON.stringify(values));
  }
</script>

<style lang="less" scoped></style>
