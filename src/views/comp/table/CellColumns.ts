import { h } from 'vue';
import { NAvatar, NTag } from 'naive-ui';
import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: '编码',
    key: 'no',
    width: 100,
  },
  {
    title: '名称',
    key: 'name',
    editComponent: 'NInput',
    // 默认必填校验
    editRule: true,
    edit: true,
    width: 80,
    editCellRender: (value) => {
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: 'info',
        },
        {
          default: () => value,
        },
      );
    },
  },
  {
    title: '头像',
    key: 'avatar',
    width: 100,
    render(row) {
      return h(NAvatar, {
        size: 48,
        src: row.avatar,
      });
    },
  },
  {
    title: '地址',
    key: 'address',
    editComponent: 'NSelect',
    editComponentProps: {
      options: [
        {
          label: '广东省',
          value: 1,
        },
        {
          label: '浙江省',
          value: 2,
        },
      ],
    },
    edit: true,
    width: 200,
    ellipsis: false,
  },
  {
    title: '开始日期',
    key: 'beginTime',
    edit: true,
    width: 160,
    editComponent: 'NDatePicker',
    editComponentProps: {
      type: 'datetime',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
    ellipsis: false,
  },
  {
    title: '结束日期',
    key: 'endTime',
    width: 160,
  },
  {
    title: '创建时间',
    key: 'date',
    width: 160,
  },
  {
    title: '停留时间',
    key: 'time',
    width: 80,
  },
];
