<template>
  <basicModal
    @register="modalRegister"
    ref="modalRef"
    class="basicModal basicFormModal"
    @on-ok="okModal"
  >
    <template #default>
      <BasicForm @register="registerForm" class="pt-6 basicForm">
        <template #passwordSlot="{ model, field }">
          <Password ref="passwordRef" v-model:value="model[field]" :required="false" block />
        </template>
        <template #rePasswordSlot="{ model, field }">
          <Password ref="passwordRef" v-model:value="model[field]" :required="false" block />
        </template>
      </BasicForm>
    </template>
  </basicModal>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
  import { basicModal, useModal } from '@/components/Modal';
  import { Password } from '@/components/Password';
  import { useMessage } from 'naive-ui';

  const message = useMessage();

  const props = defineProps({
    title: {
      type: String,
      default: '添加字典',
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    createType: {
      type: Number,
      default: 1,
    },
  });

  const typeName = computed(() => {
    return props.createType === 1 ? '' : '项';
  });

  //表单项配置
  const schemas: FormSchema[] = reactive([
    {
      field: 'label',
      component: 'NInput',
      label: `字典${typeName.value}名称`,
      componentProps: {
        placeholder: `请输入字典${typeName.value}名称`,
      },
      rules: [
        {
          required: true,
          message: `请输入字典${typeName.value}名称`,
          trigger: ['blur'],
        },
      ],
    },
    {
      field: 'value',
      component: 'NInput',
      label: `字典${typeName.value}值`,
      componentProps: {
        placeholder: `请输入字典${typeName.value}值`,
      },
      rules: [
        {
          required: true,
          message: `请输入字典${typeName.value}值`,
          trigger: ['blur'],
        },
      ],
    },
    {
      field: 'order',
      component: 'NInputNumber',
      label: '排序',
      componentProps: {
        placeholder: '请输入排序',
      },
      rules: [{ required: true, type: 'number', message: '请输入排序', trigger: ['blur'] }],
    },
    {
      field: 'remark',
      component: 'NInput',
      label: '备注',
      componentProps: {
        placeholder: '请输入备注',
        type: 'textarea',
      },
    },
  ]);

  const title = ref(props.title);

  //创建form
  const [registerForm, { submit, setFieldsValue }] = useForm({
    gridProps: { cols: 1 },
    collapsed: false,
    labelWidth: 100,
    layout: 'horizontal',
    submitButtonText: '确定',
    showActionButtonGroup: false,
    schemas,
  });

  //弹窗
  const [modalRegister, { openModal, closeModal, setSubLoading, setProps }] = useModal({
    title,
    subBtuText: '确定',
    width: 450,
  });

  //提交
  async function okModal() {
    const formRes = await submit();
    if (formRes) {
      // const { isEdit } = props;
      message.error('抱歉，您没有操作权限');
      //message.success(isEdit ? '修改成功' : '添加成功');
      closeModal();
    } else {
      message.error('验证失败，请填写完整信息');
      setSubLoading(false);
    }
  }

  //导出方法
  defineExpose({
    openModal,
    closeModal,
    setFieldsValue,
    setProps,
  });
</script>
