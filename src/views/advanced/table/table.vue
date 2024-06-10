<template>
  <div class="ncrud-container">
    <n-alert id="说明" title="说明" type="info" class="mb-4" closable>
      <n-collapse-transition :show="isExplain">
        <n-p
          >AdvancedTable 面向配置的组件，基于 BasicForm 和 BasicTable
          组件深度封装，在线预览仅展示了部分核心功能，具体如下:</n-p
        >
        <n-space justify="space-between">
          <n-ul class="advanced-table-ul">
            <n-li>数据获取、后端分页</n-li>
            <n-li>查询表单（可配置，支持显示/隐藏切换）</n-li>
            <n-li>抽屉、查看数据（支持定义每列数据展示）</n-li>
            <n-li>弹窗、编辑数据（支持指定字段、支持拖拽移动）</n-li>
            <n-li>列设置、显示/隐藏、拖拽排序、左固定/右固定/不固定</n-li>
          </n-ul>
          <n-ul class="advanced-table-ul">
            <n-li>每列，支持渲染自定义组件：标签组件，头像，等</n-li>
            <n-li>查询表单，完全自定义配置，灵活，扩展性强</n-li>
            <n-li>支持单独全屏切换</n-li>
            <n-li>风格定制，斑马纹，密度</n-li>
            <n-li>高度自适应，增强体验</n-li>
          </n-ul>
          <n-ul class="advanced-table-ul">
            <n-li>选中行数量提示（内容支持定制）</n-li>
            <n-li>操作列，支持配置自定义内容，例如更多按钮</n-li>
            <n-li>继承BasicForm 和 BasicTable组件，全部功能</n-li>
            <n-li>导出数据为 xlsx（开发中）</n-li>
            <n-li>打印机打印表格（开发中）</n-li>
          </n-ul>
        </n-space>
      </n-collapse-transition>
      <n-space justify="center" :class="{ '-mt-8': !isExplain }">
        <n-button @click="isExplain = !isExplain" type="info" text>{{
          isExplain ? '收起说明' : '展开说明'
        }}</n-button>
      </n-space>
    </n-alert>
    <AdvancedTable
      ref="ncrudRef"
      :table-props="tableProps"
      :form-props="formProps"
      :row-key="(row) => row.id"
      @update:checked-row-keys="handleCheck"
      @fetch-add="addTable"
      @fetch-edit="editTable"
      @fetch-delete="deleteTable"
    >
      <template #tableTitle>
        <n-button type="primary" @click="handleCreate">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          新增
        </n-button>
      </template>
    </AdvancedTable>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { AdvancedTable } from '@/components/AdvancedTable/index';
  import { reactive, ref, h } from 'vue';
  import { BasicColumn, TableAction } from '@/components/Table';
  import { FormSchema } from '@/components/Form/index';
  import { makeList, makeEdit, makeAdd, makeDelete } from '@/api/make/index';
  import { columns } from './basicColumns';
  import { useMessage } from 'naive-ui';
  import { PlusOutlined, DeleteOutlined, FormOutlined, EyeOutlined } from '@vicons/antd';
  import { renderIcon } from '@/utils';
  import { milliseconds } from 'date-fns';
  import { cloneDeep } from 'lodash-es';

  const message = useMessage();
  const ncrudRef = ref();
  const isExplain = ref(true);

  //附加参数
  const params = reactive({
    name: 'xiaoMa',
  });

  //查询表单 附加参数
  const formParams = reactive({
    name: '',
    address: '',
    date: null,
  });

  // 操作按钮配置，支持多个
  const actionColumn: BasicColumn = reactive({
    width: 220,
    title: '操作',
    key: 'action',
    align: 'center',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'text',
        actions: [
          {
            label: '查看',
            type: 'info',
            size: 'small',
            icon: renderIcon(EyeOutlined),
            onClick: handleLook.bind(null, record),
          },
          {
            label: '编辑',
            type: 'info',
            size: 'small',
            icon: renderIcon(FormOutlined),
            onClick: handleEdit.bind(null, record),
          },
          {
            label: '删除',
            type: 'error',
            size: 'medium',
            icon: renderIcon(DeleteOutlined),
            onClick: handleDelete.bind(null, record),
            // 轻量二次确认提示弹窗
            // onPositiveClick: handleDelete.bind(null, record),
            // onNegativeClick: handleNegative.bind(null, record),
            // isConfirm: true,
            // confirmContent: '确定删除这条数据吗？',
            // positiveText: '确定',
          },
        ],
      });
    },
  });

  // 查询表单 schemas 配置
  const schemas: FormSchema[] = [
    {
      field: 'name',
      labelMessage: '这是一个提示',
      component: 'NInput',
      label: '姓名',
      componentProps: {
        placeholder: '请输入姓名',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      // rules: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
    },
    {
      field: 'mobile',
      component: 'NInputNumber',
      label: '手机',
      componentProps: {
        placeholder: '请输入手机号码',
        showButton: false,
        onInput: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'type',
      component: 'NSelect',
      label: '类型',
      componentProps: {
        placeholder: '请选择类型',
        options: [
          {
            label: '舒适性',
            value: 1,
          },
          {
            label: '经济性',
            value: 2,
          },
        ],
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeDate',
      component: 'NDatePicker',
      label: '预约时间',
      defaultValue: 1183135260000,
      componentProps: {
        type: 'date',
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeTime',
      component: 'NTimePicker',
      label: '停留时间',
      componentProps: {
        clearable: true,
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeProject',
      component: 'NCheckbox',
      label: '预约项目',
      componentProps: {
        placeholder: '请选择预约项目',
        options: [
          {
            label: '种牙',
            value: 1,
          },
          {
            label: '补牙',
            value: 2,
          },
          {
            label: '根管',
            value: 3,
          },
        ],
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeSource',
      component: 'NRadioGroup',
      label: '来源',
      componentProps: {
        options: [
          {
            label: '网上',
            value: 1,
          },
          {
            label: '门店',
            value: 2,
          },
        ],
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
  ];

  // 表格配置
  const tableProps = computed(() => {
    return {
      columns,
      actionColumn,
      request: loadDataTable,
      canResize: false,
      pagination: false,
    };
  });

  // 查询 form 表单配置
  const formProps = computed(() => {
    return {
      schemas,
      gridProps: { cols: '1 s:1 m:2 l:4 xl:4 2xl:4' },
    };
  });

  //创建
  function handleCreate() {
    ncrudRef.value.openModal();
  }

  // 选中行回调
  function handleCheck(rowKeys) {
    console.log('handleCheck ~ rowKeys', rowKeys);
  }

  //表格加载数据
  const loadDataTable = async (res) => {
    return await makeList({ ...formParams, ...params, ...res });
  };

  // 查看抽屉
  function handleLook(record: Recordable) {
    ncrudRef.value.openDrawer(record);
  }

  //删除弹窗
  function handleDelete(record: Recordable) {
    ncrudRef.value.openDeleteModal(record);
  }

  //编辑弹窗
  function handleEdit(record: Recordable) {
    const info = cloneDeep(record);
    console.log('点击了编辑', info);
    info.avatar = [info.avatar];
    info.beginTime = milliseconds(info.beginTime);
    info.endTime = milliseconds(info.endTime);
    info.date = milliseconds(info.date);
    ncrudRef.value.openModal(info);
  }

  // 轻提示
  // function handleNegative(record: Recordable) {
  //   console.log('点击了取消', record);
  //   message.info('点击了取消');
  // }

  // 新增
  async function addTable(row, callback) {
    console.log(row);
    try {
      await makeAdd(row);
      message.success('新增成功');
      return callback(true);
    } catch {
      return callback(false);
    }
  }

  // 编辑
  async function editTable(row, callback) {
    console.log(row);
    try {
      await makeEdit(row);
      message.success('编辑成功');
      return callback(true);
    } catch {
      return callback(false);
    }
  }

  // 删除
  async function deleteTable(row, callback) {
    console.log(row);
    try {
      await makeDelete(row);
      message.success('删除成功');
      return callback(true);
    } catch {
      return callback(false);
    }
  }
</script>

<style lang="less" scoped>
  .ncrud-container {
    width: 100%;
  }

  .advanced-table-ul {
    padding-left: 0;
    list-style-type: circle;
  }
</style>
