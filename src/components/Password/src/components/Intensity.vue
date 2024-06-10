<template>
  <div class="intensity">
    <div class="intensity-item">
      <n-space>
        <span>密码强度</span>
        <span class="lump" :class="{ active: password.strength > 0 }"></span>
        <span class="lump" :class="{ active: password.strength > 1 }"></span>
        <span class="lump" :class="{ active: password.strength > 2 }"></span>
        <span class="lump" :class="{ active: password.strength > 3 }"></span>
        <span v-if="password.tips" class="primary-color">{{ password.tips }}</span>
      </n-space>
    </div>

    <div class="intensity-item">
      <n-space>
        <span>
          <n-icon class="text-red-500" v-if="!password.length">
            <CloseOutlined />
          </n-icon>
          <n-icon class="text-green-500" v-else>
            <CheckOutlined />
          </n-icon>
        </span>
        <span>{{ minLength }}-{{ maxLength }}个字符，区分大小写，前后无空格</span>
      </n-space>
    </div>

    <div class="intensity-item">
      <n-space>
        <span>
          <n-icon class="text-red-500" v-if="!password.format">
            <CloseOutlined />
          </n-icon>
          <n-icon class="text-green-500" v-else>
            <CheckOutlined />
          </n-icon>
        </span>
        <span>字母、数字及英文符号 ~!@#$%^&*(.,)_+=-</span>
      </n-space>
    </div>

    <div class="intensity-item" v-if="complexity">
      <n-space>
        <span>
          <n-icon class="text-red-500" v-if="!password.complexity">
            <CloseOutlined />
          </n-icon>
          <n-icon class="text-green-500" v-else>
            <CheckOutlined />
          </n-icon>
        </span>
        <span>{{ complexityTip }}</span>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CloseOutlined, CheckOutlined } from '@vicons/antd';
  import { useDesignSetting } from '@/hooks/setting/useDesignSetting';

  const { getAppTheme } = useDesignSetting();
  defineProps({
    value: {
      type: String,
      default: '',
    },
    complexity: {
      type: Boolean,
      default: false,
    },
    complexityTip: {
      type: String,
      default: '需包含字母、数字及特殊字符两种或以上组合',
    },
    minLength: {
      type: Number,
      default: 6,
    },
    maxLength: {
      type: Number,
      default: 32,
    },
    password: {
      type: Object,
      default: () => {
        return {
          strength: 0,
          tips: null,
          length: false,
          format: false,
          complexity: false,
        };
      },
    },
  });
</script>

<style lang="less" scoped>
  .intensity {
    padding: 10px 0;

    &-item {
      padding: 5px 0;
    }

    span.lump {
      width: 40px;
      height: 12px;
      background: #f0f0f0;
      display: inline-block;
      border-radius: 2px;
    }

    span.active {
      background: v-bind(getAppTheme);
    }

    span.primary-color {
      color: v-bind(getAppTheme);
    }
  }
</style>
