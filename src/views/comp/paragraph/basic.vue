<template>
  <PageWrapper title="排印组件增强" content="可复制功能" showFooter>
    <n-card :bordered="false" class="mt-3 proCard" title="基础使用" content-style="padding-top: 0;">
      <Paragraph type="info"> Info </Paragraph>
      <Paragraph type="success"> Success </Paragraph>
      <Paragraph type="warning"> Warning </Paragraph>
      <Paragraph type="error"> Error </Paragraph> <Paragraph strong> Strong </Paragraph>
      <Paragraph italic> Italic </Paragraph> <Paragraph underline> Underline </Paragraph>
      <Paragraph delete> Delete </Paragraph> <Paragraph code> Code </Paragraph>
      <Paragraph code delete> Code </Paragraph>
      <Paragraph depth="1"> Primary Depth </Paragraph>
      <Paragraph depth="2"> Secondary Depth </Paragraph>
      <Paragraph depth="3"> Tertiary Depth </Paragraph>
      <Paragraph tag="div"> 作为 Div </Paragraph>
    </n-card>
    <n-card :bordered="false" class="mt-3 proCard" title="扩展复制" content-style="padding-top: 0;">
      <div class="mb-2">
        <Paragraph copyable> 这是一个可以复制的文本 </Paragraph>
      </div>
      <div class="mb-2">
        <Paragraph class="mb-2" copyable :copy-config="{ showTip: true }">
          显示复制成功的通知
        </Paragraph>
      </div>
      <div class="mb-2">
        <Paragraph class="mb-2" copyable :copy-config="{ tooltips: false }">隐藏 Tooltip</Paragraph>
      </div>
      <div class="mb-2">
        <Paragraph
          copyable
          :copy-config="{ tooltips: ['复制单号', '单号复制成功啦！'] }"
          @copy-success="copySuccess"
        >
          M086611 自定义提示文字
        </Paragraph>
      </div>
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { Paragraph } from '@/components/Paragraph/index';

  function copySuccess() {
    console.log('不错哦！');
  }
</script>
