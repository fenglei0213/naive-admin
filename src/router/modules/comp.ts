import { RouteRecordRaw } from 'vue-router';
import { Layout, ParentLayout } from '@/router/base';
import {
  WalletOutlined,
  FormOutlined,
  InstagramOutlined,
  AlertOutlined,
  TableOutlined,
  UploadOutlined,
  BorderOutlined,
  PicRightOutlined,
  DragOutlined,
  AlignCenterOutlined,
  QrcodeOutlined,
  SelectOutlined,
  CheckSquareOutlined,
  AlignLeftOutlined,
  CodeOutlined,
} from '@vicons/antd';
import {
  CalendarOutline,
  CardOutline,
  RadioButtonOn,
  FileTrayOutline,
  TimeOutline,
  LockClosedOutline,
  EllipseOutline,
} from '@vicons/ionicons5';
import { renderIcon } from '@/utils';
import { t } from '@/hooks/web/useI18n';

const routeName = 'comp';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/comp',
    name: routeName,
    component: Layout,
    redirect: '/comp/table/basic',
    meta: {
      title: t('routes.comp.compExample'),
      icon: renderIcon(WalletOutlined),
      sort: 9,
    },
    children: [
      {
        path: 'table',
        name: `${routeName}_table`,
        redirect: '/comp/table/basic',
        component: ParentLayout,
        meta: {
          title: t('routes.comp.table'),
          icon: renderIcon(TableOutlined),
        },
        children: [
          {
            path: 'basic',
            name: `${routeName}_table_basic`,
            meta: {
              title: t('routes.comp.basicTable'),
            },
            component: () => import('@/views/comp/table/basic.vue'),
          },
          {
            path: 'editCell',
            name: `${routeName}_table_editCell`,
            meta: {
              title: t('routes.comp.editCell'),
            },
            component: () => import('@/views/comp/table/editCell.vue'),
          },
          {
            path: 'editRow',
            name: `${routeName}_table_editRow`,
            meta: {
              title: t('routes.comp.editRow'),
            },
            component: () => import('@/views/comp/table/editRow.vue'),
          },
        ],
      },
      {
        path: 'form',
        name: `${routeName}_form`,
        redirect: '/comp/form/basic',
        component: ParentLayout,
        meta: {
          title: t('routes.comp.formExample'),
          icon: renderIcon(FormOutlined),
        },
        children: [
          {
            path: 'basic',
            name: `${routeName}_form_basic`,
            meta: {
              title: t('routes.comp.basedUsing'),
            },
            component: () => import('@/views/comp/form/basic.vue'),
          },
          {
            path: 'group',
            name: `${routeName}_form_group`,
            meta: {
              title: t('routes.comp.groupForm'),
            },
            component: () => import('@/views/comp/form/group.vue'),
          },
          {
            path: 'useForm',
            name: `useForm`,
            meta: {
              title: t('routes.comp.useForm'),
            },
            component: () => import('@/views/comp/form/useForm.vue'),
          },
        ],
      },
      {
        path: 'modal',
        name: `${routeName}_modal`,
        meta: {
          title: t('routes.comp.modal'),
          icon: renderIcon(BorderOutlined),
        },
        component: () => import('@/views/comp/modal/index.vue'),
      },
      {
        path: 'richtext',
        name: `richtext`,
        meta: {
          title: t('routes.comp.richtext'),
          icon: renderIcon(PicRightOutlined),
        },
        component: () => import('@/views/comp/richtext/vue-quill.vue'),
      },
      {
        path: 'drag',
        name: `Drag`,
        meta: {
          title: t('routes.comp.drag'),
          icon: renderIcon(DragOutlined),
        },
        component: () => import('@/views/comp/drag/index.vue'),
      },
      {
        path: 'region',
        name: `Region`,
        meta: {
          title: t('routes.comp.region'),
          icon: renderIcon(AlignCenterOutlined),
        },
        component: () => import('@/views/comp/region/index.vue'),
      },
      {
        path: 'cropper',
        name: `Cropper`,
        meta: {
          title: t('routes.comp.cropper'),
          icon: renderIcon(InstagramOutlined),
        },
        component: () => import('@/views/comp/cropper/index.vue'),
      },
      {
        path: 'qrcode',
        name: `Qrcode`,
        meta: {
          title: t('routes.comp.qrcode'),
          icon: renderIcon(QrcodeOutlined),
        },
        component: () => import('@/views/comp/qrcode/index.vue'),
      },
      {
        path: 'password',
        name: `Password`,
        meta: {
          title: t('routes.comp.password'),
          icon: renderIcon(LockClosedOutline),
        },
        component: () => import('@/views/comp/password/index.vue'),
      },
      {
        path: 'select',
        name: `Select`,
        meta: {
          title: t('routes.comp.select'),
          icon: renderIcon(SelectOutlined),
        },
        component: () => import('@/views/comp/select/BasicSelect.vue'),
      },
      {
        path: 'tableselect',
        name: `TableSelect`,
        meta: {
          title: t('routes.comp.tableselect'),
          icon: renderIcon(SelectOutlined),
        },
        component: () => import('@/views/comp/tableSelect/tableSelect.vue'),
      },
      {
        path: 'paragraph',
        name: `${routeName}_paragraph`,
        meta: {
          title: t('routes.comp.typographyExtend'),
          icon: renderIcon(CalendarOutline),
        },
        component: () => import('@/views/comp/paragraph/basic.vue'),
      },
      {
        path: 'checkcard',
        name: `${routeName}_checkcard`,
        meta: {
          title: t('routes.comp.checkCard'),
          icon: renderIcon(CardOutline),
        },
        component: () => import('@/views/comp/checkCard/basic.vue'),
      },
      {
        path: 'checkButton',
        name: `${routeName}_checkButton`,
        meta: {
          title: t('routes.comp.checkButton'),
          icon: renderIcon(RadioButtonOn),
        },
        component: () => import('@/views/comp/checkButton/checkButton.vue'),
      },
      {
        path: 'loading',
        name: `${routeName}_loading`,
        meta: {
          title: t('routes.comp.loading'),
          icon: renderIcon(TimeOutline),
        },
        component: () => import('@/views/comp/loading/basic.vue'),
      },
      {
        path: 'iconpicker',
        name: `${routeName}_iconpicker`,
        meta: {
          title: t('routes.comp.iconPicker'),
          icon: renderIcon(InstagramOutlined),
        },
        component: () => import('@/views/comp/iconpicker/iconpicker.vue'),
      },
      {
        path: 'modalform',
        name: `${routeName}_modalform`,
        meta: {
          title: t('routes.comp.modalForm'),
          icon: renderIcon(AlertOutlined),
        },
        component: () => import('@/views/comp/modalForm/modalForm.vue'),
      },
      {
        path: 'drawerform',
        name: `${routeName}_drawerform`,
        meta: {
          title: t('routes.comp.drawerForm'),
          icon: renderIcon(FileTrayOutline),
        },
        component: () => import('@/views/comp/drawerForm/drawerForm.vue'),
      },
      {
        path: 'formTable',
        name: `${routeName}_formTable`,
        meta: {
          title: t('routes.comp.formTable'),
          icon: renderIcon(TableOutlined),
        },
        component: () => import('@/views/comp/formTable/formTable.vue'),
      },
      {
        path: 'upload',
        name: `${routeName}_upload`,
        meta: {
          title: t('routes.comp.uploadImg'),
          icon: renderIcon(UploadOutlined),
        },
        component: () => import('@/views/comp/upload/upload.vue'),
      },
      {
        path: 'ncurd',
        name: `${routeName}_ncurd`,
        meta: {
          title: t('routes.comp.ncurd'),
          icon: renderIcon(TableOutlined),
        },
        component: () => import('@/views/comp/ncurd/ncurd.vue'),
      },
      {
        path: 'procheckbox',
        name: `${routeName}_procheckbox`,
        meta: {
          title: t('routes.comp.remoteCheckbox'),
          icon: renderIcon(CheckSquareOutlined),
        },
        component: () => import('@/views/comp/proCheckbox/proCheckbox.vue'),
      },
      {
        path: 'proradio',
        name: `${routeName}_proradio`,
        meta: {
          title: t('routes.comp.remoteRadio'),
          icon: renderIcon(EllipseOutline),
        },
        component: () => import('@/views/comp/proRadio/proRadio.vue'),
      },
      {
        path: 'procascader',
        name: `${routeName}_proCascader`,
        meta: {
          title: t('routes.comp.provinces'),
          icon: renderIcon(AlignLeftOutlined),
        },
        component: () => import('@/views/comp/proCascader/proCascader.vue'),
      },
      {
        path: 'codeInput',
        name: `${routeName}_codeInput`,
        meta: {
          title: t('routes.comp.codeInput'),
          icon: renderIcon(CodeOutlined),
        },
        component: () => import('@/views/comp/proCode/proCode.vue'),
      },
      {
        path: 'prosearch',
        name: `${routeName}_prosearch`,
        meta: {
          title: t('routes.comp.searchGroup'),
          icon: renderIcon(CodeOutlined),
        },
        component: () => import('@/views/comp/proSearchGroup/proSearchGroup.vue'),
      },
    ],
  },
];

export default routes;
