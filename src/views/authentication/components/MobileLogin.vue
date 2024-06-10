<template>
  <n-form
    ref="formRef"
    :show-label="false"
    :show-require-mark="false"
    size="large"
    :model="formInline"
    :rules="rules"
    class="plus-login-form"
  >
    <n-form-item path="mobile">
      <n-input v-model:value="formInline.mobile" placeholder="输入手机号码" class="rounded-lg">
        <template #prefix>
          <n-icon size="18" color="#808695">
            <MobileOutlined />
          </n-icon>
        </template>
      </n-input>
    </n-form-item>
    <n-form-item path="code">
      <n-input
        v-model:value="formInline.code"
        placeholder="输入验证码"
        @keyup.enter="handleSubmit"
        class="rounded-lg"
      >
        <template #prefix>
          <n-icon size="18" color="#808695">
            <SafetyOutlined />
          </n-icon>
        </template>
        <template #suffix>
          <n-button text type="info" :disabled="isGetCode" @click="getCode"
            >{{ codeMsg }}<span v-if="isGetCode">s</span></n-button
          >
        </template>
      </n-input>
    </n-form-item>
    <n-form-item :show-label="false">
      <n-button
        type="primary"
        @click="handleSubmit"
        size="large"
        :loading="loading"
        block
        class="rounded-lg"
      >
        登录
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from 'naive-ui';
  import { ResultEnum } from '@/enums/httpEnum';
  import { MobileOutlined, SafetyOutlined } from '@vicons/antd';
  import { PageEnum } from '@/enums/pageEnum';

  interface FormState {
    mobile: string;
    code: string;
  }

  const formRef = ref();
  const message = useMessage();
  const loading = ref(false);
  const codeMsg = ref<any>('获取验证码');
  const isGetCode = ref(false);
  const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

  const formInline = reactive({
    mobile: '',
    code: '',
  });

  const rules = {
    mobile: { required: true, message: '手机号码不能为空', trigger: 'blur' },
    code: { required: true, message: '验证码不能为空', trigger: 'blur' },
  };
  defineEmits(['goRegister']);
  const userStore = useUserStore();

  const router = useRouter();
  const route = useRoute();

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.value.validate(async (errors) => {
      if (!errors) {
        const { mobile, code } = formInline;
        message.loading('登录中...');
        loading.value = true;

        const params: FormState = {
          mobile,
          code,
        };

        try {
          const { code, message: msg } = await userStore.login(params);
          message.destroyAll();
          if (code == ResultEnum.SUCCESS) {
            const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
            message.success('登录成功，即将进入系统');
            if (route.name === LOGIN_NAME) {
              router.replace('/');
            } else router.replace(toPath);
          } else {
            message.info(msg || '登录失败');
          }
        } finally {
          loading.value = false;
        }
      } else {
        message.error('请填写完整信息，并且进行验证码校验');
      }
    });
  };

  function getCode() {
    if (!formInline.mobile) {
      return message.error('手机号码不能为空');
    }
    codeMsg.value = 60;
    isGetCode.value = true;
    let time = setInterval(() => {
      codeMsg.value--;
      if (codeMsg.value <= 0) {
        clearInterval(time);
        codeMsg.value = '获取验证码';
        isGetCode.value = false;
      }
    }, 1000);
  }
</script>

<style lang="less" scoped>
  .forget {
    opacity: 0.7;
  }
</style>
