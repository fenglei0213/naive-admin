<template>
  <basicModal
    @register="modalRegister"
    ref="modalRef"
    class="basicModal basicFormModal"
    @on-ok="formSubmit"
    subBtuText="确定"
    display-directive="show"
  >
    <template #default>
      <div class="px-6 py-4">
        <BasicForm @register="register" @reset="handleReset" class="basicForm" />
      </div>
    </template>
  </basicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { basicModal, useModal } from '@/components/Modal';
  import { useMessage } from 'naive-ui';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';

  const schemas: FormSchema[] = [
    {
      field: 'formerPwd',
      component: 'NInput',
      label: '旧密码',
      giProps: {
        span: 1,
      },
      componentProps: {
        placeholder: '请输入旧密码',
      },
      rules: [{ required: true, message: '请输入旧密码', trigger: ['blur'] }],
    },
    {
      field: 'password',
      component: 'NInput',
      label: '新密码',
      giProps: {
        span: 1,
      },
      componentProps: {
        placeholder: '请输入新密码',
      },
      rules: [{ required: true, message: '请输入新密码', trigger: ['blur'] }],
    },
    {
      field: 'rePassword',
      component: 'NInput',
      label: '确认密码',
      giProps: {
        span: 1,
      },
      componentProps: {
        placeholder: '请再次输入新密码',
      },
      rules: [{ required: true, message: '请再次输入新密码', trigger: ['blur'] }],
    },
  ];

  export default defineComponent({
    components: { basicModal, BasicForm },
    setup() {
      const modalRef: any = ref(null);
      const message = useMessage();

      const formParams = ref({
        formerPwd: '',
        password: '',
        rePassword: '',
      });

      const [register, { submit, resetFields }] = useForm({
        gridProps: { cols: 1 },
        collapsedRows: 3,
        labelWidth: 80,
        layout: 'horizontal',
        showActionButtonGroup: false,
        schemas,
      });

      const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
        title: '修改密码',
        subBtuText: '提交修改',
      });

      async function formSubmit() {
        const formRes = await submit();
        if (formRes) {
          await resetFields();
          closeModal();
          message.success('修改成功');
        } else {
          message.error('验证失败，请填写完整信息');
          setSubLoading(false);
        }
      }

      function showModal() {
        openModal();
      }

      function handleReset(values: Recordable) {
        console.log(values);
      }

      return {
        modalRef,
        modalRegister,
        handleReset,
        showModal,
        formSubmit,
        formParams,
        register,
      };
    },
  });
</script>

<style lang="less" scoped></style>
