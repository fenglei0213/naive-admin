<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="密码强度校验组件">
        用于常用密码强度设置，通常要求比较严格一点密码适用，验证，灵活配置，脱离 Form
        单独使用也可以哦~
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-3 proCard">
      <n-alert title="基础效果" type="info"> 密码长度，6-32，复杂密码</n-alert>
      <Password class="mt-3" />

      <n-alert title="设定密码长度" type="info">比如来个，( 12 - 16 个字符 )</n-alert>
      <Password :min-length="12" :max-length="16" class="mt-3" />

      <n-alert title="简单密码" type="info"
        >不需要满足字母、数字及特殊字符两种或以上组合条件
      </n-alert>
      <Password class="mt-3" :complexity="false" />

      <n-alert title="自定义密码强度等级提示语" type="info">
        支持4个等级配置，1 - 4 默认4个等级名称分别为： 1. 弱不禁风 2. 平淡无奇 3. 出神入化 4.
        登峰造极
      </n-alert>
      <Password class="mt-3" :level="{ 1: '很Low', 2: '一般Low', 3: '没那么Low', 4: '不Low了' }" />

      <n-alert title="再次确认密码" type="info" />
      <Password :repeat="true" class="mt-3" />
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { Password } from '@/components/Password';
</script>

<style lang="less"></style>
