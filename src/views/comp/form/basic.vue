<template>
  <PageWrapper
    title="基础表单"
    content="基础表单，用于向用户收集表单信息，并展示业务逻辑交互使用示例"
    showFooter
  >
    <n-card :bordered="false" class="mt-3 proCard">
      <div class="BasicForm">
        <BasicForm
          ref="basicFormRef"
          submitButtonText="提交预约"
          layout="horizontal"
          :gridProps="{ cols: 1 }"
          :schemas="schemas"
          @submit="handleSubmit"
          @reset="handleReset"
        />
      </div>
    </n-card>
    <template #leftFooter>
      <n-space>
        <n-button @click="verifyMobile">只验证手机号码</n-button>
        <n-button @click="setName">设置姓名</n-button>
      </n-space>
    </template>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, unref } from 'vue';
  import { BasicForm, FormSchema } from '@/components/Form/index';
  import { useMessage } from 'naive-ui';
  import { useVerificate } from '@/hooks/web/useVerificate';

  const basicFormRef = ref();
  const isMakeSource = ref(true);
  const { isMobile } = useVerificate();

  const getIsMakeSource = computed(() => {
    return isMakeSource.value;
  });

  const schemas: FormSchema[] = reactive([
    {
      field: 'id',
      defaultValue: 128,
      hidden: true,
    },
    {
      field: 'identity',
      defaultValue: '我是一个隐藏字段内容',
      hidden: true,
    },
    {
      field: 'info.name',
      component: 'NInput',
      label: '姓名',
      labelMessage: '这是一个提示',
      // defaultValue: '啊俊',
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
      rules: [
        {
          key: 'mobile',
          required: true,
          validator: isMobile,
          trigger: ['input', 'blur'],
        },
      ],
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
      // 根据 上面选择的类型，获取页面其他逻辑字段 处理显示表单
      // 可用字段 schema, values, model, field
      hidden: ({ model }) => {
        return !model.type;
      },
      rules: [{ required: true, type: 'number', message: '请选择预约时间', trigger: ['change'] }],
    },
    {
      field: 'makeTime',
      component: 'NTimePicker',
      label: '停留时间',
      componentProps: {
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
          // 动态切换 来源 表单是否显示
          isMakeSource.value = e.includes(3);
          basicFormRef.value.setSchema(getNewSchemas());
        },
      },
    },
    {
      field: 'makeSource',
      component: 'NRadioGroup',
      label: '来源',
      hidden: getIsMakeSource.value,
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
  ]);

  function setName() {
    basicFormRef.value.setFieldsValue({
      'info.name': '我是啊俊',
    });
  }

  function verifyMobile() {
    basicFormRef.value.validate(['mobile']);
  }

  function getNewSchemas() {
    const newSchemas = unref(schemas);
    newSchemas.forEach((item) => {
      if (item.field === 'makeSource') {
        item.hidden = !isMakeSource.value;
      }
    });
    return newSchemas;
  }

  const message = useMessage();

  function handleSubmit(values: Recordable) {
    message.success(JSON.stringify(values));
  }

  function handleReset(values: Recordable) {
    message.success(JSON.stringify(values));
  }
</script>

<style lang="less" scoped>
  .BasicForm {
    width: 550px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 20px;
  }
</style>
