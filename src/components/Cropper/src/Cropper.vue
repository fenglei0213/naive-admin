<template>
  <div class="img-cropper" :class="{ 'img-cropper-auto': $slots.default }">
    <slot name="default"></slot>
    <template v-if="!$slots.default">
      <div class="img-cropper-img" @click="openCropper">
        <img :src="src" :class="{ circled: circled }" />
        <div class="mask" :class="{ circled: circled }">
          <n-icon>
            <UploadOutlined />
          </n-icon>
        </div>
      </div>
    </template>
    <CropperModal
      ref="cropperRef"
      :title="title"
      subBtuText="确认上传"
      :uploadApi="uploadApi"
      :circled="circled"
      @upload-success="uploadSuccess"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import CropperModal from './CropperModal.vue';
  import { UploadOutlined } from '@vicons/antd';
  import { cssUnit } from '@/utils';

  const cropperRef = ref();

  const emit = defineEmits(['uploadSuccess']);

  const props = defineProps({
    title: { type: String, default: '图片上传' },
    src: { type: String, required: true },
    circled: { type: Boolean, default: false },
    width: { type: [String, Number], default: 200 },
    uploadApi: {
      type: Function as PropType<(params) => Promise<any>>,
    },
  });

  const getWidth = cssUnit(props.width);

  const iconSize = cssUnit(Math.ceil(parseInt(getWidth) / 4));

  function openCropper() {
    cropperRef.value.showModal();
  }

  function uploadSuccess(result) {
    emit('uploadSuccess', result);
  }

  defineExpose({
    openCropper,
  });
</script>

<style lang="less" scoped>
  .img-cropper {
    width: v-bind(getWidth);
    height: v-bind(getWidth);
    overflow: hidden;
    text-align: center;
    position: relative;

    &-img {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;

      .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        left: 0;
        top: 0;
        opacity: 0;
        transition: opacity 0.4s;

        .n-icon {
          color: #fff;
          font-size: v-bind(iconSize);
        }
      }

      &:hover {
        cursor: pointer;

        .mask {
          opacity: 1;
        }
      }
    }
  }

  .img-cropper-auto {
    width: auto;
    height: auto;
    display: inline-block;
  }

  .circled {
    border-radius: 50%;
  }
</style>
