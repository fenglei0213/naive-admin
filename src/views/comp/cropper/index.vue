<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="图片裁剪示例">
        适用于，头像上传，图片上传之前需要进行裁剪，简单说就是，需要图片上传并且需要裁剪，就可以用这个组件快速实现，需要真实接口才能进行上传测试！
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-3 proCard" title="圆形裁剪">
      <!--圆形裁剪-->
      <Cropper
        ref="cropperCircled"
        :circled="true"
        :src="src"
        :uploadApi="upload"
        title="圆形头像上传"
      />
      <n-space>
        <n-button class="mt-3 ml-12" @click="cropperCircledImg">选择图片</n-button>
      </n-space>
    </n-card>

    <n-card :bordered="false" class="mt-3 proCard" title="矩形裁剪">
      <!--矩形裁剪-->
      <Cropper ref="cropperRectangle" :src="src" title="矩形头像上传" />
      <n-space>
        <n-button class="mt-3 ml-12" @click="cropperRectangleImg">选择图片</n-button>
      </n-space>
    </n-card>

    <n-card :bordered="false" class="mt-3 proCard" title="自定义内容，选择权交给您">
      <!--圆形裁剪-->
      <Cropper
        ref="cropperCircled"
        :circled="true"
        :src="src"
        :uploadApi="upload"
        title="圆形头像上传"
      >
        <n-button class="mt-3 ml-12" @click="cropperCircledImg">自定义裁剪图片</n-button>
      </Cropper>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Cropper } from '@/components/Cropper';
  import { upload } from '@/api/common/';

  const src = ref('https://img.naiveadmin.com/assets/avatar/avatar-2.jpg');

  const cropperCircled = ref();

  const cropperRectangle = ref();

  function cropperCircledImg() {
    cropperCircled.value.openCropper();
  }

  function cropperRectangleImg() {
    cropperRectangle.value.openCropper();
  }
</script>

<style lang="less"></style>
