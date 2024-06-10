<template>
  <div class="account-root">
    <div class="account-root-item root-left-item">
      <transition name="fade-bottom" appear mode="out-in">
        <div>
          <div class="root-left-logo">
            <img src="~@/assets/images/logo.svg" alt="" />
            <div class="stand-title">Naive Admin</div>
          </div>
          <div class="root-left-title">开箱即用，中后台前端/设计解决方案</div>
          <div class="root-left-desc">多生态支持、功能丰富、高颜值模板</div>
          <div class="coding-img"><img src="~@/assets/images/coding.png" /></div>
        </div>
      </transition>
    </div>
    <div class="account-root-item root-right-item">
      <transition name="fade-bottom" appear mode="out-in">
        <div class="account-form">
          <div class="account-top">
            <div class="user-account">{{ type === 'login' ? '登录' : '注册' }}你的账户</div>
            <div class="user-register">
              <span>{{ type === 'login' ? '没有账户？' : '已有账户？' }}</span>
              <n-button text type="info" icon-placement="right" @click="toggleType">
                {{ type === 'login' ? '免费注册' : '前去登录' }}

                <template #icon>
                  <n-icon>
                    <ChevronForwardCircle />
                  </n-icon>
                </template>
              </n-button>
            </div>
          </div>
          <template v-if="type === 'login'">
            <!-- 登录方式切换 -->
            <div class="account-tabs">
              <div
                class="account-tabs-item"
                :class="{ 'on-item': tab === 'login' }"
                @click="tab = 'login'"
                >账号密码登录</div
              >
              <div
                class="account-tabs-item"
                @click="tab = 'mobile-login'"
                :class="{ 'on-item': tab === 'mobile-login' }"
                >手机验证码登录</div
              >
            </div>
            <!-- 账号密码登录 -->
            <template v-if="tab === 'login'">
              <transition name="fade-bottom" appear mode="out-in">
                <PlusLoginForm ref="LoginFormRef" @goRegister="changeGoRegister" />
              </transition>
            </template>

            <!-- 手机验证码登录 -->
            <template v-if="tab === 'mobile-login'">
              <transition name="fade-bottom" appear mode="out-in">
                <MobileLogin ref="MobileLoginRef" @goRegister="changeGoRegister" />
              </transition>
            </template>

            <n-divider title-placement="center" class="rests-login-type">其他登录方式</n-divider>

            <div class="pb-8">
              <n-space justify="space-around">
                <n-button strong circle type="tertiary">
                  <template #icon>
                    <n-icon size="18">
                      <LogoWechat />
                    </n-icon>
                  </template>
                </n-button>
                <n-button strong circle type="tertiary"
                  ><template #icon>
                    <n-icon size="18">
                      <DingtalkCircleFilled />
                    </n-icon> </template
                ></n-button>
                <n-button strong circle type="tertiary"
                  ><template #icon>
                    <n-icon size="18">
                      <AlipayCircleOutlined />
                    </n-icon> </template
                ></n-button>
              </n-space>
            </div>
          </template>

          <!-- 注册 -->
          <template v-else>
            <div class="account-tabs">
              <div class="account-tabs-item on-item">手机注册</div>
              <div class="account-tabs-item" @click="emailRegister">邮箱注册</div>
            </div>
            <transition name="fade-bottom" appear mode="out-in">
              <PlusRegisterForm @backLogin="changeBackLogin" />
            </transition>
          </template>
        </div>
      </transition>
    </div>
    <TogglePage />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import PlusLoginForm from '../components/PlusLoginForm.vue';
  import MobileLogin from '../components/MobileLogin.vue';
  import { ChevronForwardCircle, LogoWechat } from '@vicons/ionicons5';
  import { DingtalkCircleFilled, AlipayCircleOutlined } from '@vicons/antd';
  import PlusRegisterForm from '../components/PlusRegisterForm.vue';
  import { useMessage } from 'naive-ui';
  import TogglePage from '../components/TogglePage.vue';

  const tab = ref('login');
  const type = ref('login');
  const message = useMessage();

  function changeBackLogin() {
    tab.value = 'login';
  }

  function changeGoRegister() {
    tab.value = 'register';
  }

  function toggleType() {
    type.value = type.value === 'login' ? 'register' : 'login';
  }

  function emailRegister() {
    message.warning('邮箱注册暂未实现');
  }
</script>

<style lang="less" scoped>
  .account-root {
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    height: 100vh;

    @media (min-width: 600px) {
      &-item {
        flex-basis: 100%;
        flex-grow: 0;
        max-width: 100%;
      }
    }

    @media (min-width: 320px) {
      .root-right-item {
        .account-form {
          flex-basis: 60%;
          flex-grow: 0;
          max-width: 60%;
        }
      }
    }

    @media (min-width: 1200px) {
      &-item {
        flex-basis: 40%;
        flex-grow: 0;
        max-width: 40%;
      }

      .root-right-item {
        flex-basis: 60%;
        flex-grow: 0;
        max-width: 60%;

        .account-form {
          flex-basis: 32%;
          flex-grow: 0;
          max-width: 32%;
        }
      }
    }

    &-item {
      box-sizing: border-box;
      margin: 0;
      flex-direction: row;
      flex-grow: 0;
      background: #2d8cf0;

      &-img {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        img {
          width: 70%;
          display: inline-block;
          margin: 0 auto;
        }
      }
    }

    .root-left-item {
      width: 780px;
      display: flex;
      align-items: center;
      padding: 20px 0;
      background: linear-gradient(140.02deg, #f9f9fa, #f7f8ff);

      .root-left-logo {
        margin: 0 auto 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .stand-title {
          font-size: 28px;
          line-height: 1.25;
          font-weight: 600;
          background: linear-gradient(92.06deg, #33c2ff -17.9%, #1e6fff 43.39%, #1e6fff 99.4%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        img {
          width: 35px;
          height: 35px;
          margin-right: 5px;
        }
      }

      .root-left-title {
        height: 80px;
        margin: 0 auto 0;
        font-weight: 600;
        font-size: 1.5rem;
        line-height: 80px;
        color: #333;
        text-align: center;
      }

      .root-left-desc {
        height: 34px;
        margin: 0 auto 0;
        font-size: 1.1rem;
        line-height: 34px;
        text-align: center;
        color: #666;
      }
    }

    .root-right-item {
      flex: 1 1;
      background: #fff;
      box-sizing: border-box;
      flex-flow: row wrap;
      display: flex;
      justify-content: center;
      align-items: center;

      .account-form {
        width: 348px;

        .account-top {
          text-align: left;
          margin: 20px 0;

          .user-account {
            font-family: SourceHanSansCN_Bold;
            color: #333;
            font-size: 1.5rem;
            line-height: 30px;
            margin-bottom: 5px;
          }

          .user-register {
            span {
              opacity: 0.7;
              margin-right: 10px;
            }
          }
        }

        .account-tabs {
          background-color: #f3f7fb;
          border-radius: 10px;
          padding: 4px;
          display: flex;
          align-items: center;
          width: fit-content;
          margin-bottom: 26px;
          margin-top: 30px;

          &-item {
            opacity: 0.7;
            padding: 5px 10px;
            font-weight: 400;

            &:hover {
              cursor: pointer;
            }
          }

          .on-item {
            background-color: #fff;
            opacity: 1;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(23, 28, 39, 0.14);
          }
        }

        .qrcodes-login {
          .qrcodes-img {
            width: 192px;
            height: 192px;
            display: inline-block;
          }

          p {
            width: 192px;
            opacity: 0.7;
            padding-top: 10px;
            text-align: center;
          }
        }
      }
    }
  }

  .rests-login-type {
    opacity: 0.5;
  }

  .coding-img {
    width: 70%;
    margin: 50px auto 20px;
  }
</style>
