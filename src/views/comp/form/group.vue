<template>
  <PageWrapper
    title="分组表单"
    content="试想一下，产品设计了一堆表单给你，刚好需要你把这些表单分组，这时候这个组件就排上用场了"
    showFooter
  >
    <n-card :bordered="false" class="mt-3 proCard">
      <div class="BasicForm">
        <BasicForm
          ref="basicFormRef"
          submitButtonText="提交预约"
          layout="horizontal"
          :group="group"
          :gridProps="{ cols: 1 }"
          @submit="handleSubmit"
          @reset="handleReset"
        />
      </div>
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, unref, h } from 'vue';
  import { BasicForm, FormGroupRow, FormSchema } from '@/components/Form/index';
  import { useMessage, NButton } from 'naive-ui';
  import { useVerificate } from '@/hooks/web/useVerificate';

  const basicFormRef = ref();
  const isMakeSource = ref(true);
  const { isMobile } = useVerificate();

  const getIsMakeSource = computed(() => {
    return isMakeSource.value;
  });

  const group: FormGroupRow[] = [
    {
      title: '基本信息',
      cardProps: {},
      cardSlots: {
        headerExtra: () => {
          return h(
            NButton,
            {
              type: 'tertiary',
              strong: true,
              secondary: true,
              onClick: () => {
                setFormValues();
              },
            },
            {
              default: () => '设置Form值',
            },
          );
        },
      },
      columns: [
        {
          field: 'group_name',
          component: 'NInput',
          label: '姓名',
          labelMessage: '这是一个提示',
          componentProps: {
            placeholder: '请输入姓名',
            onInput: (e: any) => {
              console.log(e);
            },
          },
          rules: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
        },
        {
          field: 'group_mobile',
          component: 'NInput',
          label: '手机',
          componentProps: {
            placeholder: '请输入手机号码',
          },
        },
        {
          field: 'group_point',
          component: 'NInput',
          label: '个人特长',
          componentProps: {
            type: 'textarea',
            placeholder: '请输入个人特长',
          },
        },
      ],
    },
    {
      title: '专业信息',
      columns: [
        {
          field: 'group_industry',
          component: 'NInput',
          label: '岗位',
          componentProps: {
            placeholder: '请输入岗位',
          },
        },
        {
          field: 'group_technical',
          component: 'NInput',
          label: '技能',
          componentProps: {
            placeholder: '请输入岗位',
            option: [
              {
                label: 'Java',
                value: 'Java',
              },
              {
                label: 'PHP',
                value: 'PHP',
              },
              {
                label: 'C++',
                value: 'C++',
              },
              {
                label: 'C#',
                value: 'C#',
              },
              {
                label: 'Python',
                value: 'Python',
              },
            ],
          },
        },
        {
          field: 'group_capacity',
          component: 'NRate',
          label: '能力',
          defaultValue: 2,
          componentProps: {},
        },
      ],
    },
  ];

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

  function setFormValues() {
    console.log(basicFormRef.value);
    basicFormRef.value.setFieldsValue({
      group_name: 'NaiveAdmin',
      group_mobile: '18879988888',
      group_point: 'JavaScript、Java、Python、PHP、C++',
      group_industry: '大PHP',
      group_technical: 'PHP',
      group_capacity: 5,
    });
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
