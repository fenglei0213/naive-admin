import { FormSchema } from '@/components/Form/index';

export const schemas: FormSchema[] = [
  {
    field: 'username',
    component: 'NInput',
    label: '用户名',
    componentProps: {
      placeholder: '请输入用户名',
    },
  },
  {
    field: 'account',
    component: 'NInput',
    label: '登录账号',
    componentProps: {
      placeholder: '请输入登录账号',
    },
  },
  {
    field: 'mobile',
    component: 'NInputNumber',
    label: '手机',
    componentProps: {
      placeholder: '请输入手机号码',
      showButton: false,
    },
  },
  {
    field: 'role',
    component: 'NSelect',
    label: '角色',
    componentProps: {
      placeholder: '请选择角色',
      options: [
        {
          label: '普通用户',
          value: 1,
        },
        {
          label: '推广管理员',
          value: 2,
        },
        {
          label: '发货管理员',
          value: 3,
        },
        {
          label: '财务管理员',
          value: 4,
        },
      ],
    },
  },
  {
    field: 'email',
    component: 'NInput',
    label: '邮箱',
    componentProps: {
      placeholder: '请输入邮箱',
      showButton: false,
    },
  },
  {
    field: 'status',
    component: 'NSelect',
    label: '状态',
    componentProps: {
      placeholder: '请选择角色',
      options: [
        {
          label: '正常',
          value: 'normal',
        },
        {
          label: '禁用',
          value: 'disable',
        },
      ],
    },
  },
];
