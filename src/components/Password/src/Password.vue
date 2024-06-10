<template>
  <div class="password-box" :class="{ 'block-box': block }">
    <n-popover
      ref="popoverRef"
      trigger="focus"
      display-directive="show"
      :class="{ 'block-box': block }"
    >
      <template #trigger>
        <n-form
          :model="formValue"
          :inline="!block"
          :show-label="false"
          :rules="rules"
          ref="formRef"
        >
          <n-form-item path="password">
            <n-input
              type="password"
              ref="passwordRef"
              v-model:value="formValue.password"
              @update:value="inputChange"
              @focus="inputFocus"
              @blur="inputBlur"
              showPasswordOn="click"
              placeholder="请输入密码"
              :maxlength="maxLength"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="repeat" v-if="repeat">
            <n-input
              type="password"
              v-model:value="formValue.repeat"
              placeholder="请再次输入密码"
              showPasswordOn="click"
              :maxlength="maxLength"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
        </n-form>
      </template>
      <Intensity v-bind="intensityValue" />
    </n-popover>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, computed, nextTick } from 'vue';
  import { LockClosedOutline } from '@vicons/ionicons5';
  import Intensity from './components/Intensity.vue';
  import { basicProps } from './props';

  const props = defineProps({ ...basicProps });

  const emit = defineEmits(['change', 'focus', 'update:value']);

  const isSuccess = ref(false);

  const formValue = ref({
    password: props.value,
    repeat: '',
  });

  const password = ref({
    strength: 0,
    tips: null,
    length: false,
    format: false,
    complexity: false,
  });

  const rules = {
    password: [{ required: true, validator: checkPasswordVal, trigger: ['input', 'blur'] }],
    repeat: [{ required: props.repeat, validator: checkRepeat, trigger: ['input', 'blur'] }],
  };

  const popoverRef = ref();
  const passwordRef = ref();

  const intensityValue: any = computed(() => {
    return {
      value: formValue.value.password,
      complexity: props.complexity,
      minLength: props.minLength,
      maxLength: props.maxLength,
      password: password.value,
      complexityTip: props.complexityTip,
    };
  });

  function inputChange(value) {
    emit('change', value);
    emit('update:value', value);
    password.value.strength = getStrength(value);
  }

  function inputFocus() {
    popoverRef.value.handleFocus();
  }

  function inputBlur() {
    popoverRef.value.handleBlur();
  }

  function checkPasswordVal(_, value) {
    if (!props.required && !value) {
      isSuccess.value = true;
      return true;
    }
    if (!value) {
      password.value = {
        strength: 0,
        tips: null,
        length: false,
        format: false,
        complexity: false,
      };
      isSuccess.value = false;
      return new Error('请设置密码');
    } else {
      password.value.format = true;
      if (value.length < props.minLength) {
        password.value.length = false;
        password.value.strength = 0;
        password.value.tips = null;
        return new Error(`密码长度至少为${props.minLength}个字符`);
      }
      if (props.complexity) {
        if (checkPassword(value)) {
          password.value.length = true;
          const strength = getStrength(value);
          password.value.strength = strength;
          password.value.tips = props.level[strength];
          if (strength <= 1) {
            password.value.complexity = false;
            return new Error(props.complexityTip);
          } else {
            password.value.complexity = true;
            isSuccess.value = true;
            return true;
          }
        }
      } else {
        password.value.length = true;
        const strength = getStrength(value);
        password.value.strength = strength;
        password.value.tips = props.level[strength];
        password.value.complexity = true;
        isSuccess.value = true;
        return true;
      }
    }
    isSuccess.value = true;
    return true;
  }

  function checkRepeat(_, value) {
    if (!props.required && !value) {
      isSuccess.value = true;
      return true;
    }
    if (!value) {
      return new Error('请再次输入密码');
    } else {
      if (formValue.value.password !== value) {
        return new Error('两次密码输入不一致');
      }
      return true;
    }
  }

  function checkPassword(password: string): boolean {
    const regExp = /^[A-Za-z0-9~!@#$%^&*()_+=\-.,]{6,32}$/;
    return regExp.test(password);
  }

  function getStrength(password: string): number {
    const reg = {
      lower: /[a-z]/,
      upper: /[A-Z]/,
      number: /[\d]/,
      character: /[~!@#$%^&*()_+=\-.,]/,
    };
    let strength = 0;
    if (reg.lower.test(password)) strength++;
    if (reg.upper.test(password)) strength++;
    if (reg.number.test(password)) strength++;
    if (reg.character.test(password)) strength++;
    return strength;
  }

  function showValidator() {
    passwordRef.value.focus();
    passwordRef.value.blur();
    nextTick(() => {
      passwordRef.value.focus();
    });
  }

  function isValidator() {
    return unref(isSuccess);
  }

  defineExpose({
    isValidator,
    showValidator,
  });
</script>

<style lang="less" scoped>
  .password-box {
    display: inline-block;
  }

  .block-box {
    display: block;
    width: 100%;
  }
</style>
