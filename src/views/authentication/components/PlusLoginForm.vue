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
    <n-form-item path="username">
      <n-input v-model:value="formInline.username" placeholder="请输入用户名" class="rounded-lg">
        <template #prefix>
          <n-icon size="18" color="#808695">
            <PersonOutline />
          </n-icon>
        </template>
      </n-input>
    </n-form-item>
    <n-form-item path="password">
      <n-input
        v-model:value="formInline.password"
        type="password"
        showPasswordOn="click"
        placeholder="请输入密码"
        @keyup.enter="handleSubmit"
        class="rounded-lg"
      >
        <template #prefix>
          <n-icon size="18" color="#808695">
            <LockClosedOutline />
          </n-icon>
        </template>
      </n-input>
    </n-form-item>
    <div class="mb-6 default-color">
      <div class="flex justify-between">
        <div class="flex-initial">
          <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
        </div>
        <div class="flex-initial order-last">
          <n-button text class="forget" @click="forgetPassword"> 忘记密码? </n-button>
        </div>
      </div>
    </div>
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
  import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5';
  import { PageEnum } from '@/enums/pageEnum';

  interface FormState {
    username: string;
    password: string;
  }

  const formRef = ref();
  const message = useMessage();
  const loading = ref(false);
  const autoLogin = ref(true);
  const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

  const formInline = reactive({
    username: 'admin',
    password: '123456',
  });

  const rules = {
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
  };
  const userStore = useUserStore();

  const router = useRouter();
  const route = useRoute();

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.value.validate(async (errors) => {
      if (!errors) {
        const { username, password } = formInline;
        message.loading('登录中...');
        loading.value = true;

        const params: FormState = {
          username,
          password,
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
        message.error('请填写完整信息');
      }
    });
  };

  function forgetPassword() {
    message.warning('忘记密码暂未实现');
  }
</script>

<style lang="less" scoped>
  .forget {
    opacity: 0.7;
  }
</style>
