<template>
  <div class="login">
    <n-grid x-gap="12" cols="1 s:1 m:1 l:12 xl:12 2xl:12" responsive="screen">
      <n-gi :span="4" class="login-left">
        <div class="login-left-logo">
          <img src="~@/assets/images/logo.png" alt="" />
          Naive Admin Plus
        </div>
        <div class="login-left-title">开箱即用</div>
        <div class="login-left-text"> 颜值与实用并存，中后台前后端框架一站式解决方案</div>
        <div class="logo-left">
          <img src="~@/assets/images/logo-left.svg" alt="" />
        </div>
      </n-gi>
      <n-gi :span="8" class="login-right">
        <div class="shadow-xl login-right-form">
          <div class="flex justify-center">
            <n-avatar round :src="schoolboy" :size="80" class="shadow-xl" />
          </div>
          <n-h2 class="flex justify-center"> 欢迎来到 Naive Admin Plus! 👋 </n-h2>
          <n-form
            ref="formRef"
            label-placement="left"
            size="large"
            :model="formInline"
            :rules="rules"
          >
            <n-form-item path="username">
              <n-input
                v-model:value="formInline.username"
                placeholder="请输入用户名"
                class="rounded-xl"
              >
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
                class="rounded-xl"
              >
                <template #prefix>
                  <n-icon size="18" color="#808695">
                    <LockClosedOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
            <div class="flex justify-end">
              <n-button text type="info"> 忘记密码 </n-button>
            </div>
            <n-form-item class="mt-6">
              <n-button
                type="primary"
                @click="handleSubmit"
                size="large"
                :loading="loading"
                block
                class="rounded-3xl"
              >
                登录
              </n-button>
            </n-form-item>
            <div class="flex justify-center">
              <n-text depth="3"> 如您还没有账号？ </n-text>
              <n-button text type="info"> 创建账号 </n-button>
            </div>
            <n-divider dashed>
              <n-text depth="3"> 其他 </n-text>
            </n-divider>
            <n-space justify="center">
              <n-button circle>
                <template #icon>
                  <n-icon><LogoWechat /></n-icon>
                </template>
              </n-button>
              <n-button circle>
                <template #icon>
                  <n-icon><LogoGithub /></n-icon>
                </template>
              </n-button>
              <n-button circle>
                <template #icon>
                  <n-icon><LogoFacebook /></n-icon>
                </template>
              </n-button>
            </n-space>
          </n-form>
        </div>
      </n-gi>
    </n-grid>
    <TogglePage />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from 'naive-ui';
  import { ResultEnum } from '@/enums/httpEnum';
  import schoolboy from '@/assets/images/schoolboy.png';
  import TogglePage from '../components/TogglePage.vue';
  import {
    PersonOutline,
    LockClosedOutline,
    LogoGithub,
    LogoFacebook,
    LogoWechat,
  } from '@vicons/ionicons5';

  interface FormState {
    username: string;
    password: string;
  }

  const formRef = ref();
  const message = useMessage();
  const loading = ref(false);

  const formInline = reactive({
    username: 'admin',
    password: '123456',
    isCaptcha: false,
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

        const { code, message: msg } = await userStore.login(params);

        if (code == ResultEnum.SUCCESS) {
          const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
          message.success('登录成功！');
          router.replace(toPath).then((_) => {
            if (route.name == 'login') {
              router.replace('/');
            }
          });
        } else {
          message.info(msg || '登录失败');
        }
      } else {
        message.error('请填写完整信息');
      }
    });
  };
</script>

<style lang="less" scoped>
  .login {
    width: 100%;
    height: 100vh;

    .n-grid,
    &-left,
    &-right {
      height: 100%;
    }

    &-left {
      background-color: #e9edf7;
      padding: 12px;
      padding-top: 20%;

      &-logo,
      &-title,
      &-text {
        justify-content: center;
        display: flex;
        align-items: center;
      }

      &-logo {
        width: 100%;
        font-size: 32px;
        font-weight: bold;
        color: #1677ff;

        img {
          margin-right: 10px;
          width: 50px;
        }
      }

      .logo-left {
        img {
          width: 75%;
        }
      }

      &-title {
        font-size: 3rem;
        color: #323d6f;
        font-weight: 900;
        margin: 20px 0;
      }

      &-text {
        color: #323d6f;
        font-size: 16px;
        margin: 30px 0;
      }

      .logo-left {
        margin-top: 40px;

        img {
          margin: auto;
        }
      }
    }

    &-right {
      display: flex;
      justify-content: center;
      align-items: center;
      background-attachment: #f0f3fa;
      padding: 20px;

      &-form {
        width: 520px;
        background-color: #fff;
        border-radius: 20px;
        padding: 40px 80px;
      }
    }
  }
</style>
