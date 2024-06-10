<template>
  <PageWrapper
    title="弹窗表单"
    content="主要用在弹窗承载表单场景，可以减少繁琐的弹窗逻辑代码"
    showFooter
  >
    <n-card :bordered="false" class="mt-3 proCard" title="基础使用" content-style="padding-top: 0;">
      <div class="mb-4 pl-2">
        <n-text depth="3"> 弹窗表单，优雅解决，繁琐又无味：显示/隐藏/重置等逻辑 </n-text>
      </div>
      <div class="pl-2"><n-button type="info" @click="handleOpen1">点击打开表单</n-button></div>
      <ModalForm
        ref="modalFormRef1"
        subBtuText="提交预约"
        title="添加预约"
        :form="form"
        @submit="formSubmit1"
      >
        <BasicForm @register="register" class="mt-6">
          <template #statusSlot="{ model, field }">
            <n-input v-model:value="model[field]" />
          </template>
        </BasicForm>
      </ModalForm>
    </n-card>
    <n-card
      :bordered="false"
      class="mt-3 proCard"
      title="表单提交完可能还有后续的需求"
      content-style="padding-top: 0;"
    >
      <div class="mb-4 pl-2"
        ><n-text depth="3"> 比如提交完表单，引导形，关联性，等场景需求... </n-text></div
      >

      <div class="pl-2"><n-button type="success" @click="handleOpen2">点击打开表单</n-button></div>
      <ModalForm
        ref="modalFormRef2"
        subBtuText="提交预约"
        title="添加预约"
        :form="form"
        v-model:isShowHeader="isShowHeader"
        v-model:showAction="showAction"
        v-model:isHideForm="isHideForm"
        v-model:isShowFooter="isShowFooter"
        @submit="formSubmit2"
      >
        <template #header>
          <n-alert :show-icon="false" type="warning" class="my-6"
            >有些情况，可能需要适当提示一点内容</n-alert
          >
        </template>
        <BasicForm @register="register" class="mt-6">
          <template #statusSlot="{ model, field }">
            <n-input v-model:value="model[field]" />
          </template>
        </BasicForm>
        <template #footer>
          <div class="mx-3 my-6 flxe justify-center">
            <n-alert title="提交成功" type="success" class="mb-3">
              还需要您去验证一下您的身份信息哦~
            </n-alert>
            <n-space>
              <n-button @click="handleClose">我知道了</n-button>
              <n-button type="primary">立即去验证身份</n-button>
            </n-space>
          </div>
        </template>
      </ModalForm>
    </n-card>
    <n-card
      :bordered="false"
      class="mt-3 proCard"
      title="自定义操作按钮"
      content-style="padding-top: 0;"
    >
      <div class="mb-4 pl-2">
        <n-text depth="3">
          总会有些时候，弹窗操作按钮，会有很多个，或者有特殊的操作逻辑/权限
        </n-text>
      </div>
      <div class="pl-2"
        ><n-button strong secondary type="info" @click="handleOpen3">点击打开表单</n-button></div
      >
      <ModalForm
        ref="modalFormRef3"
        subBtuText="提交预约"
        title="添加预约"
        :form="form"
        @submit="formSubmit3"
      >
        <template #header>
          <n-alert :show-icon="false" type="warning" class="my-6"
            >有些情况，可能需要适当提示一点内容</n-alert
          >
        </template>
        <BasicForm @register="register" class="mt-6">
          <template #statusSlot="{ model, field }">
            <n-input v-model:value="model[field]" />
          </template>
        </BasicForm>
        <template #action>
          <n-space>
            <n-button @click="handleClose3">取消</n-button>
            <n-button type="warning" @click="handleClose3">验证身份</n-button>
            <n-button type="primary" @click="handleFormSubmit">提交预约</n-button>
          </n-space>
        </template>
      </ModalForm>
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ModalForm } from '@/components/ModalForm/index';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';

  const modalFormRef1 = ref();
  const modalFormRef2 = ref();
  const modalFormRef3 = ref();
  const showAction = ref(true);
  const isShowFooter = ref(false);
  const isHideForm = ref(false);
  const isShowHeader = ref(true);

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
    {
      field: 'status',
      label: '状态',
      //插槽
      slot: 'statusSlot',
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
          console.log(e);
        },
      },
    },
    {
      field: 'makeSource',
      component: 'NRadioGroup',
      label: '来源',
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
  ];

  const [register, form] = useForm({
    gridProps: { cols: 1 },
    layout: 'horizontal',
    submitButtonText: '提交预约',
    showActionButtonGroup: false,
    schemas,
  });

  function handleOpen1() {
    modalFormRef1.value.showModal();
  }

  function handleOpen2() {
    modalFormRef2.value.showModal();
  }

  function handleOpen3() {
    modalFormRef3.value.showModal();
  }

  function handleClose() {
    modalFormRef2.value.closeModal();
  }

  function handleClose3() {
    modalFormRef3.value.closeModal();
  }

  function formSubmit1(values, done) {
    console.log('表单值', values);
    // 1、这里做表单 api 提交
    // 2、提交完关闭弹窗
    done(true);
  }

  function formSubmit2(values) {
    console.log('表单值', values);
    // 动态操作一下弹窗，满足需求随意定制化
    modalFormRef1.value.setLoading(false);
    showAction.value = false;
    isShowHeader.value = false;
    isHideForm.value = true;
    isShowFooter.value = true;
  }

  function handleFormSubmit() {
    modalFormRef3.value.submit();
  }

  function formSubmit3(values, done) {
    console.log('表单值', values);
    // 1、这里做表单 api 提交
    // 2、提交完关闭弹窗
    done(true);
  }
</script>
