<template>
  <n-form
    ref="formRef"
    :show-label="false"
    :show-require-mark="false"
    size="large"
    :model="formInline"
    :rules="rules"
  >
    <!-- <n-form-item path="username">
      <n-input v-model:value="formInline.username" placeholder="请输入用户名" class="rounded-lg">
        <template #prefix>
          <n-icon size="18" color="#808695">
            <PersonOutline />
          </n-icon>
        </template>
      </n-input>
    </n-form-item> -->
    <n-form-item path="mobile">
      <n-input
        class="order-first rounded-lg"
        v-model:value="formInline.mobile"
        placeholder="请输入手机号码"
      >
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
        placeholder="请输入验证码"
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
    <n-form-item path="password">
      <n-input
        v-model:value="formInline.password"
        type="password"
        showPasswordOn="click"
        placeholder="请输入密码"
        class="rounded-lg"
      >
        <template #prefix>
          <n-icon size="18" color="#808695">
            <LockClosedOutline />
          </n-icon>
        </template>
      </n-input>
    </n-form-item>

    <n-form-item path="retPassword">
      <n-input
        v-model:value="formInline.retPassword"
        type="password"
        showPasswordOn="click"
        placeholder="请再次输入密码"
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

    <!-- <n-form-item class="default-color" path="agreement">
      <div class="flex justify-between">
        <div class="flex-initial">
          <n-checkbox v-model:checked="formInline.agreement">我同意隐私协议</n-checkbox>
        </div>
      </div>
    </n-form-item> -->

    <n-form-item :show-label="false">
      <n-button
        type="primary"
        @click="handleSubmit"
        size="large"
        :loading="loading"
        block
        class="rounded-lg"
      >
        注册
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { LockClosedOutline } from '@vicons/ionicons5';
  import { MobileOutlined, SafetyOutlined } from '@vicons/antd';

  const formRef = ref();
  const message = useMessage();
  const loading = ref(false);
  const codeMsg = ref<any>('获取验证码');
  const isGetCode = ref(false);

  const formInline = reactive({
    username: '',
    password: '',
    retPassword: '',
    mobile: '',
    code: '',
    agreement: false,
  });

  const rules = {
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    mobile: { required: true, message: '请输入手机号码', trigger: 'blur' },
    code: { required: true, message: '请输入短信验证码', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
    retPassword: { required: true, message: '请输入确认密码', trigger: 'blur' },
    agreement: {
      required: true,
      type: 'boolean',
      trigger: 'change',
      message: '请先勾选协议',
      validator: (_, value) => value === true,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.value.validate(async (errors) => {
      if (!errors) {
        message.success('注册准备就绪');
        loading.value = true;
      } else {
        message.error('请填写完整信息');
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
