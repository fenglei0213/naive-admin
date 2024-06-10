<template>
  <PageWrapper title="上传" content="用于向用户收集图片/文件等信息">
    <n-card :bordered="false" class="mt-3 proCard" title="多图上传" content-style="padding-top: 0;">
      <ImageUpload
        :action="`${uploadUrl}/v1.0/upload`"
        :headers="uploadHeaders"
        :data="{ type: '0' }"
        helpText="图片支持 jpg / png / gif / bmp 格式，大小不超过 2M"
        v-model:value="imageFiles"
        @uploadChange="uploadChange"
      />
    </n-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { ImageUpload } from '@/components/Upload';
  import { useGlobSetting } from '@/hooks/setting';

  const globSetting = useGlobSetting();

  const imageFiles = ref<string[]>([
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  ]);

  const { uploadUrl } = globSetting;

  const uploadHeaders: any = reactive({
    platform: 'miniPrograms',
    timestamp: new Date().getTime(),
    token: '56vqtCMih/jw1g4n4CsYHwc6mQsI/SiZYtQUXxVr9uI=',
  });

  function uploadChange(values) {
    console.log(values);
    imageFiles.value = values;
  }
</script>
