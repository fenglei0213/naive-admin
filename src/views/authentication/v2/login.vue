<template>
  <div class="account-root">
    <div class="account-root-item">
      <transition name="fade-bottom" appear mode="out-in">
        <div class="account-root-item-img">
          <img src="~@/assets/images/login-bg.svg" alt="" />
        </div>
      </transition>
    </div>
    <div class="account-root-item root-right-item">
      <transition name="fade-bottom" appear mode="out-in">
        <div class="account-form">
          <div class="account-top">
            <div class="account-top-logo">
              <img src="~@/assets/images/account-logo.png" alt="" />
            </div>
            <div class="account-top-desc">Naive Ui Admin中台前端/设计解决方案</div>
          </div>

          <n-tabs v-model:value="tab" size="large" justify-content="space-evenly">
            <n-tab-pane name="login" tab="登录">
              <transition name="fade-bottom" appear mode="out-in">
                <LoginForm ref="LoginFormRef" @goRegister="changeGoRegister" />
              </transition>
            </n-tab-pane>
            <n-tab-pane name="register" tab="注册">
              <transition name="fade-bottom" appear mode="out-in">
                <RegisterForm ref="RegisterFormRef" @backLogin="changeBackLogin" />
              </transition>
            </n-tab-pane>
          </n-tabs>
        </div>
      </transition>
    </div>
    <TogglePage />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import LoginForm from '../components/LoginForm.vue';
  import RegisterForm from '../components/RegisterForm.vue';
  import TogglePage from '../components/TogglePage.vue';

  const tab = ref('login');

  function changeBackLogin() {
    tab.value = 'login';
  }

  function changeGoRegister() {
    tab.value = 'register';
  }
</script>

<style lang="less" scoped>
  .account-root {
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    height: 100vh;
    justify-content: center;

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
        flex-basis: 50%;
        flex-grow: 0;
        max-width: 50%;
      }

      .root-right-item {
        .account-form {
          flex-basis: 45%;
          flex-grow: 0;
          max-width: 45%;
        }
      }
    }

    &-item {
      box-sizing: border-box;
      margin: 0;
      flex-direction: row;
      // flex-basis: 100%;
      flex-grow: 0;
      max-width: 100%;
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

    .root-right-item {
      background: #fff;
      box-sizing: border-box;
      flex-flow: row wrap;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .account-form {
        flex-basis: 45%;
        flex-grow: 0;
        max-width: 45%;

        .account-top {
          text-align: center;
          margin: 20px 0;

          &-logo {
            text-align: center;

            img {
              width: 100%;
              margin: 0 auto;
            }
          }

          &-desc {
            font-size: 14px;
            color: #808695;
          }
        }
      }
    }
  }
</style>
