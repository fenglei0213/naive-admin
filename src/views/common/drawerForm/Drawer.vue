<template>
  <n-drawer ref="drawerRef" v-model:show="isDrawer" :width="450" placement="right">
    <n-drawer-content title="添加预约" closable>
      <BasicForm @register="register" class="mt-6">
        <template #statusSlot="{ model, field }">
          <n-input v-model:value="model[field]" />
        </template>
      </BasicForm>
      <template #footer>
        <n-space>
          <n-button @click="closeDrawer">取消</n-button>
          <n-button type="primary" :loading="loading" @click="formSubmit">提交预约</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';

  const drawerRef = ref(null);
  const isDrawer = ref(false);
  const loading = ref(false);
  const message = useMessage();

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'NInput',
      label: '姓名',
      labelMessage: '这是一个提示',
      giProps: {
        span: 1,
      },
      componentProps: {
        placeholder: '请输入姓名',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
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
      giProps: {
        //span: 24,
      },
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
      giProps: {
        //span: 24,
      },
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
      giProps: {
        //span: 24,
      },
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
      giProps: {
        //span: 24,
      },
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
      giProps: {
        //span: 24,
      },
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
    {
      field: 'status',
      label: '状态',
      giProps: {
        //span: 24,
      },
      //插槽
      slot: 'statusSlot',
    },
  ];

  const [register, { submit, getFieldsValue }] = useForm({
    gridProps: { cols: 1 },
    collapsedRows: 3,
    // labelWidth: 120,
    layout: 'horizontal',
    submitButtonText: '提交预约',
    showActionButtonGroup: false,
    schemas,
  });

  function openDrawer() {
    isDrawer.value = true;
  }

  function closeDrawer() {
    isDrawer.value = false;
  }

  async function formSubmit() {
    loading.value = true;
    const formRes = await submit();
    if (formRes) {
      // 此处请求接口保存更新 getFieldsValue() 方法返回整个表单的值
      console.log('formValues', getFieldsValue());
      loading.value = false;
      closeDrawer();
      message.success('提交成功');
    } else {
      loading.value = false;
      message.error('验证失败，请填写完整信息');
    }
  }

  defineExpose({
    openDrawer,
    closeDrawer,
  });
</script>
