import { h } from 'vue';
import { NImage, NTag } from 'naive-ui';
import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    type: 'selection',
  },
  {
    title: '用户名',
    key: 'username',
    width: 100,
  },
  {
    title: '头像',
    key: 'avatar',
    render(row) {
      return h(NImage, {
        alt: '这是一个图片说明',
        width: 48,
        src: row.avatar,
      });
    },
    width: 100,
  },
  {
    title: '登录账号',
    key: 'account',
    width: 100,
  },
  {
    title: '手机号',
    key: 'mobile',
    width: 100,
  },
  {
    title: '邮箱',
    key: 'email',
    width: 150,
  },
  {
    title: '性别',
    key: 'gender',
    width: 100,
    render(row) {
      return h(
        NTag,
        {
          type: row.gender === 1 ? 'info' : 'error',
        },
        {
          default: () => (row.gender === 1 ? '男' : '女'),
        },
      );
    },
  },
  {
    title: '角色',
    key: 'role',
    width: 100,
    render(row) {
      return h(
        NTag,
        {
          type: 'info',
        },
        {
          default: () => row.role,
        },
      );
    },
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render(row) {
      return h(
        NTag,
        {
          type: row.status === 'normal' ? 'success' : 'error',
        },
        {
          default: () => (row.status === 'normal' ? '正常' : '禁用'),
        },
      );
    },
  },
  {
    title: '创建时间',
    key: 'create_date',
    width: 180,
  },
];
