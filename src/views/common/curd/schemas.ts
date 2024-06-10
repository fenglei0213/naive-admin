import { FormSchema } from '@/components/Form/index';

export const schemas: FormSchema[] = [
  // 隐藏字段
  {
    field: 'id',
    hidden: true,
  },
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
  // {
  //   field: 'status',
  //   label: '状态',
  //   //插槽用法
  //   slot: 'statusSlot',
  // },
  {
    field: 'source',
    component: 'NInput',
    label: '来源',
    componentProps: {
      placeholder: '请输入来源',
      onInput: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'address',
    component: 'NInput',
    label: '地区',
    componentProps: {
      placeholder: '请输入地区',
      onInput: (e: any) => {
        console.log(e);
      },
    },
  },
];
