<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="文件下载">
        文件下载示例，用于各种场景下载文件或者图片
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-3 proCard">
      <n-alert :show-icon="false" title="后台接口文件流下载" type="info">
        <n-button class="mt-2" type="primary" @click="downloadFile">文件流下载</n-button>
      </n-alert>
      <n-divider />
      <n-alert :show-icon="false" title="文件地址下载" type="info">
        <n-button class="mt-2" type="primary" @click="downloadFileUrl">文件地址下载</n-button>
      </n-alert>
      <n-divider />
      <n-alert :show-icon="false" title="base64流下载" type="info">
        <n-button class="mt-2" type="primary" @click="downloadFileBase64">base64流下载</n-button>
      </n-alert>
      <n-divider />
      <n-alert
        :show-icon="false"
        title="图片Url下载，如果有跨域问题，需要先处理图片跨域，才能下载"
        type="info"
      >
        <n-button class="mt-2" type="primary" @click="downloadFileImgUrl">图片Url下载</n-button>
      </n-alert>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import {
    downloadByUrl,
    downloadByData,
    downloadByBase64,
    downloadByOnlineUrl,
  } from '@/utils/file/download';
  import imgBase64 from './imgBase64';

  const getName = new Date().valueOf();

  function downloadFile() {
    downloadByData('测试下载文件流', `${getName}-file.txt`);
  }

  function downloadFileUrl() {
    downloadByUrl({
      url: 'https://naive-ui-admin-docs.vercel.app/logo.png',
      target: '_self',
    });
  }

  function downloadFileBase64() {
    downloadByBase64(imgBase64, `${getName}.png`);
  }

  function downloadFileImgUrl() {
    downloadByOnlineUrl('https://naive-ui-admin-docs.vercel.app/logo.png', `${getName}.png`);
  }
</script>
