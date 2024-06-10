<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="表格选择器">
        选择器增强，用于展示多列数据表格选择器，可实现单选/多选，还能配置表单查询，项目实测，还是挺实用的
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-3 proCard">
      <n-alert title="单选" type="info"> 始终只能选择一个，切换分页也是如此 </n-alert>
      <div class="mt-3">
        <n-space align="center">
          <TableSelect
            ref="TableSelectRef"
            labelField="name"
            valueField="id"
            placeholder="请选择内容（单选）"
            v-model:value="tableSelectData"
            :tableProps="{
              rowKey: (row) => row.id,
              request: loadDataTable,
              columns: columns,
              pagination: {
                simple: true,
              },
            }"
            @change="tableSelectChange"
          />
        </n-space>
      </div>
    </n-card>

    <n-card :bordered="false" class="mt-3 proCard">
      <n-alert title="多选" type="info" class="mt-3">
        支持选择多个，切换分页也不影响，试试吧
      </n-alert>
      <div class="mt-3">
        <n-space align="center">
          <TableSelect
            ref="TableSelectRef"
            labelField="name"
            valueField="id"
            placeholder="请选择内容（多选）"
            :multiple="true"
            :tableProps="{
              rowKey: (row) => row.id,
              request: loadDataTable,
              columns: columns,
              pagination: {
                simple: true,
              },
            }"
            @change="tableSelectChange"
            v-model:value="tableSelectData"
          />
        </n-space>
      </div>
    </n-card>

    <n-card :bordered="false" class="mt-3 proCard">
      <n-alert title="多选" type="info">
        支持配置表单，搜索查询，适用于，查询数据较多，支持分页多选
      </n-alert>
      <div class="mt-3">
        <n-space align="center">
          <TableSelect
            ref="TableSelectRef"
            labelField="name"
            valueField="id"
            placeholder="请选择内容（多选）"
            v-model:formValues="formValues"
            :multiple="true"
            :formProps="formPropsOption"
            :tableProps="{
              rowKey: (row) => row.id,
              request: loadDataTable,
              columns: columns,
              pagination: {
                simple: true,
              },
            }"
            @change="tableSelectChange"
          />
        </n-space>
      </div>
    </n-card>

    <n-card :bordered="false" class="mt-3 proCard">
      <n-alert title="配合Form" type="info"> 外面配合 Form 组件，结合搜索查询 </n-alert>
      <div class="mt-3">
        <BasicForm
          ref="basicFormRef"
          submitButtonText="提交预约"
          layout="horizontal"
          :gridProps="{ cols: 1 }"
          :schemas="FormSchemas"
          @submit="handleSubmit"
          @reset="handleReset"
        >
          <template #tableSelect="{ model, field }">
            <TableSelect
              ref="TableSelectRef"
              labelField="name"
              valueField="id"
              placeholder="请选择内容"
              v-model:value="model[field]"
              :multiple="true"
              :formProps="formPropsOption"
              :tableProps="{
                rowKey: (row) => row.id,
                request: loadDataTable,
                columns: columns,
                pagination: {
                  simple: true,
                },
              }"
              @change="tableSelectChange"
            />
          </template>
        </BasicForm>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { TableSelect } from '@/components/TableSelect';
  import { getTableSelectList } from '@/api/table/list';
  import { columns } from './basicColumns';
  import { BasicForm, FormSchema } from '@/components/Form/index';
  import { useMessage } from 'naive-ui';

  const tableSelectData = ref(['啊俊']);
  const formValues = ref();
  const TableSelectRef = ref();
  const message = useMessage();

  const schemas: FormSchema[] = [
    {
      field: 'name',
      labelMessage: '可以通过名称搜索查询哦',
      component: 'NInput',
      label: '名称',
      componentProps: {
        placeholder: '请输入名称',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      // rules: [{ required: true, message: '请输入名称', trigger: ['blur'] }],
    },
    {
      field: 'versions',
      component: 'NSelect',
      label: '版本',
      componentProps: {
        placeholder: '请选择版本',
        options: [
          {
            value: 'Pro',
            label: 'Admin Pro',
          },
          {
            value: 'Plus',
            label: 'Admin Plus',
          },
        ],
      },
    },
  ];

  const FormSchemas: FormSchema[] = [
    {
      field: 'name',
      label: '名称',
      slot: 'tableSelect',
    },
  ];

  const formPropsOption = {
    gridProps: { cols: '2' },
    labelWidth: 80,
    submitButtonText: '查询',
    showAdvancedButton: false,
    schemas,
  };

  const loadDataTable = async (res) => {
    return await getTableSelectList({ ...formValues.value, ...res });
  };

  function handleSubmit(values: Recordable) {
    message.success(JSON.stringify(values));
  }

  function handleReset(values: Recordable) {
    message.success(JSON.stringify(values));
    TableSelectRef.value.updateSelectedRowKeys();
  }

  function tableSelectChange(list) {
    console.log('list', list);
  }
</script>

<style lang="less" scoped></style>
