<template>
  <PageWrapper
    title="验证码输入框 ProCode"
    content="考虑到用户实际发送验证码的场景较多，特此封装，无需考虑交互逻辑，只需发起请求获取验证码"
    showFooter
  >
    <n-card :bordered="false" class="mt-3 proCard" title="基本使用" content-style="padding-top: 0;">
      <ProCode
        ref="proCodeRef"
        style="width: 280px"
        v-model:value="mobile"
        :inputProps="{ placeholder: '请输入手机号码', clearable: true }"
        :buttonProps="{
          type: 'primary',
        }"
        @start="onStart"
      />
    </n-card>
    <n-card :bordered="false" class="mt-3 proCard" title="内部验证" content-style="padding-top: 0;">
      <ProCode
        ref="proCodeRef"
        style="width: 280px"
        v-model:value="mobile"
        isVerify
        :inputProps="{ placeholder: '请输入手机号码', clearable: true }"
        :buttonProps="{
          type: 'primary',
        }"
        @start="onStart"
      />
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ProCode } from '@/components/ProCode/index';
  import { useMessage } from 'naive-ui';

  const message = useMessage();

  const proCodeRef = ref();
  const mobile = ref();

  function onStart() {
    console.log(mobile.value);
    // TOOD 手机号码验证
    if (!mobile.value || mobile.value.length < 11) {
      return message.error('手机号码不正确');
    }
    // TOOD 开始获取验证码
    message.loading('正在获取验证码');
    setTimeout(() => {
      message.success('获取成功，请查收');
      // 开始倒计时
      proCodeRef.value.start();
    }, 2000);
  }
</script>
