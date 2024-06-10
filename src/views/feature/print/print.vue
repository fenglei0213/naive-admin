<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="打印场景"> json打印表格，图片打印 </n-card>
    </div>
    <n-card :bordered="false" class="mt-3 proCard">
      <n-space>
        <n-button type="primary" @click="jsonPrint">打印表格</n-button>
        <n-button type="primary" @click="imagePrint">打印图片</n-button>
      </n-space>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import printJS from 'print-js';

  function jsonPrint() {
    printJS({
      printable: [
        { name: '汪伟', email: '735869@gmail.com', phone: '186****5653' },
        { name: '雷秀英', email: '235656452@gmail.com', phone: '135****6536' },
        { name: '邹芳', email: '24586526@gmail.com', phone: '159****5869' },
      ],
      properties: ['name', 'email', 'phone'],
      type: 'json',
    });
  }

  function imagePrint() {
    printJS({
      printable: [
        'https://naive-ui-admin-docs.vercel.app/logo.png',
        'https://naive-ui-admin-docs.vercel.app/logo.png',
      ],
      type: 'image',
      header: 'Multiple Images',
      imageStyle: 'width:100%;',
    });
  }
</script>
