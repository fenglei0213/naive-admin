import { FormSchema } from '@/components/Form';
export const schemas: FormSchema[] = [
  {
    field: 'username',
    component: 'NInput',
    label: '用户名',
    componentProps: {
      placeholder: '请输入用户名',
    },
    rules: [{ required: true, message: '请输入用户名', trigger: ['blur'] }],
  },
  {
    field: 'mobile',
    component: 'NInputNumber',
    label: '手机号',
    componentProps: {
      placeholder: '请输入手机号码',
      showButton: false,
    },
    rules: [{ required: true, type: 'number', message: '请输入手机号码', trigger: ['blur'] }],
  },
  {
    field: 'email',
    component: 'NInput',
    label: '邮箱',
    componentProps: {
      placeholder: '请输入邮箱',
      showButton: false,
    },
    rules: [{ required: true, type: 'email', message: '请输入邮箱', trigger: ['change'] }],
  },
  {
    field: 'gender',
    component: 'NSelect',
    label: '性别',
    componentProps: {
      placeholder: '请选择性别',
      options: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
      ],
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
    field: 'account',
    component: 'NInput',
    label: '登录账号',
    componentProps: {
      placeholder: '请输入登录账号',
    },
  },
  {
    field: 'password',
    label: '密码',
    slot: 'passwordSlot',
    showFeedback: false,
  },
  {
    field: 'rePassword',
    label: '确认密码',
    slot: 'rePasswordSlot',
    showFeedback: false,
  },
  {
    field: 'introduce',
    component: 'NInput',
    label: '个人介绍',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入登录账号',
    },
  },
];
