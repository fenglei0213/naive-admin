import { h } from 'vue';
import { NAvatar, NTag } from 'naive-ui';

const statusArr = ['预约失败', '预约中', '预约成功'];
export const columns = [
  {
    type: 'selection',
  },
  {
    title: '编码',
    key: 'no',
    width: 100,
    form: {
      component: 'NInput',
      rules: [{ required: true, message: '请输入编码', trigger: ['blur'] }],
    },
  },
  {
    title: '姓名',
    key: 'name',
    width: 100,
    form: {
      component: 'NInput',
      rules: [{ required: true, message: '请输入名称', trigger: ['blur'] }],
    },
  },
  {
    title: '性别',
    key: 'gender',
    width: 100,
    render(row) {
      return h(
        'span',
        {},
        {
          default: () => (row.gender === 1 ? '男' : '女'),
        },
      );
    },
    form: {
      component: 'NRadioGroup',
      componentProps: {
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
  },
  {
    title: '头像',
    key: 'avatar',
    width: 100,
    render(row) {
      return h(NAvatar, {
        size: 48,
        src: row.avatar,
        round: true,
      });
    },
    form: {
      isEditShow: true,
      component: 'ImageUpload',
      componentProps: {
        width: 70,
        height: 70,
        action: '/v1.0/upload',
        data: { type: '0' },
        onUploadChange: (fileList) => {
          console.log(fileList);
        },
      },
      rules: [{ required: true, message: '请上传头像', trigger: ['change'] }],
    },
  },
  {
    title: '预约日期',
    key: 'beginTime',
    width: 160,
    form: {
      component: 'NDatePicker',
    },
  },
  {
    title: '预约项目',
    key: 'items',
    width: 120,
  },
  {
    title: '预约医生',
    key: 'doctor',
    width: 120,
  },
  {
    title: '预约状态',
    key: 'status',
    width: 120,
    render(row) {
      return h(
        NTag,
        {
          type: row.status === 0 ? 'error' : row.status === 1 ? 'info' : 'success',
          round: true,
        },
        {
          default: () => statusArr[row.status],
        },
      );
    },
    form: {
      component: 'NRadioGroup',
      componentProps: {
        options: [
          {
            label: '预约失败',
            value: 0,
          },
          {
            label: '预约中',
            value: 1,
          },
          {
            label: '预约成功',
            value: 2,
          },
        ],
      },
    },
  },
  {
    title: '所在地址',
    key: 'address',
    width: 240,
    form: {
      component: 'NInput',
      componentProps: {
        type: 'textarea',
      },
      rules: [{ required: true, message: '请输入名称', trigger: ['blur'] }],
    },
  },
];
