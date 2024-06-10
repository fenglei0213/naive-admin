<template>
  <basicModal ref="modalRef" class="cropperModal" @register="modalRegister" @on-ok="handleOk">
    <template #default>
      <div class="cropper-box">
        <div class="cropper-box-left">
          <div class="cropper-box-left-cropper">
            <CropperImage
              v-if="src"
              :circled="circled"
              :src="src"
              height="300px"
              @cropend="handleCropend"
              @ready="handleReady"
            />
          </div>
          <div class="cropper-box-left-toolbar">
            <n-upload
              :show-file-list="false"
              accept="image/*"
              action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
              @before-upload="beforeUpload"
              style="width: auto"
            >
              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <n-button size="small" type="primary">
                    <template #icon>
                      <n-icon>
                        <UploadOutlined />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                上传图片
              </n-tooltip>
            </n-upload>
            <n-space>
              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <n-button
                    :disabled="!src"
                    size="small"
                    type="primary"
                    @click="handlerToolbar('reset')"
                  >
                    <template #icon>
                      <n-icon>
                        <ReloadOutlined />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                重置
              </n-tooltip>
              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <n-button
                    :disabled="!src"
                    size="small"
                    type="primary"
                    @click="handlerToolbar('rotate', -45)"
                  >
                    <template #icon>
                      <n-icon>
                        <RotateLeftOutlined />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                逆时针旋转
              </n-tooltip>
              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <n-button
                    :disabled="!src"
                    size="small"
                    type="primary"
                    @click="handlerToolbar('rotate', 45)"
                  >
                    <template #icon>
                      <n-icon>
                        <RotateRightOutlined />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                顺时针旋转
              </n-tooltip>
              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <n-button
                    :disabled="!src"
                    size="small"
                    type="primary"
                    @click="handlerToolbar('scaleX')"
                  >
                    <template #icon>
                      <n-icon>
                        <SwapOutlined />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                水平翻转
              </n-tooltip>
              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <n-button
                    :disabled="!src"
                    size="small"
                    type="primary"
                    @click="handlerToolbar('scaleY')"
                  >
                    <template #icon>
                      <n-icon>
                        <VerticalAlignMiddleOutlined />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                垂直翻转
              </n-tooltip>
              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <n-button
                    :disabled="!src"
                    size="small"
                    type="primary"
                    @click="handlerToolbar('zoom', 0.1)"
                  >
                    <template #icon>
                      <n-icon>
                        <ZoomInOutlined />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                放大
              </n-tooltip>
              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <n-button
                    :disabled="!src"
                    size="small"
                    type="primary"
                    @click="handlerToolbar('zoom', -0.1)"
                  >
                    <template #icon>
                      <n-icon>
                        <ZoomOutOutlined />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                缩小
              </n-tooltip>
            </n-space>
          </div>
        </div>
        <div class="cropper-box-right">
          <div
            :class="{ 'cropper-box-right-preview-radius': circled }"
            class="cropper-box-right-preview"
          >
            <img v-if="previewSource" :src="previewSource" />
          </div>
          <template v-if="previewSource">
            <div class="cropper-box-right-group">
              <n-avatar :src="previewSource" size="large" />
              <n-avatar :size="48" :src="previewSource" />
              <n-avatar :size="64" :src="previewSource" />
              <n-avatar :size="80" :src="previewSource" />
            </div>
          </template>
        </div>
      </div>
    </template>
  </basicModal>
</template>

<script lang="ts" setup>
  import type { CropendResult, Cropper } from './typing';
  import { ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { basicModal, useModal } from '@/components/Modal';
  import CropperImage from './CropperImage.vue';
  import { dataURLtoBlob } from '@/utils/file/base64Conver';
  import { isFunction } from '@/utils/is';
  import {
    UploadOutlined,
    ReloadOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    VerticalAlignMiddleOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
  } from '@vicons/antd';

  const props = defineProps({
    title: { type: String, default: '图片上传' },
    circled: { type: Boolean, default: false },
    uploadApi: {
      type: Function as PropType<(params) => Promise<any>>,
    },
  });

  const emit = defineEmits(['uploadSuccess', 'register']);

  const modalRef = ref(null);
  const message = useMessage();
  let filename = '';
  const src = ref('');
  const previewSource = ref('');
  const cropper = ref<Cropper>();
  let scaleX = 1;
  let scaleY = 1;

  const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
    title: props.title,
  });

  function showModal() {
    openModal();
  }

  // 上传图片
  function beforeUpload({ file: fileInfo }) {
    const reader = new FileReader();
    reader.readAsDataURL(fileInfo.file);
    src.value = '';
    previewSource.value = '';
    reader.onload = function (e) {
      src.value = (e.target?.result as string) ?? '';
      filename = fileInfo.file.name;
    };
    return false;
  }

  function handleCropend({ imgBase64 }: CropendResult) {
    previewSource.value = imgBase64;
  }

  function handleReady(cropperInstance: Cropper) {
    cropper.value = cropperInstance;
  }

  function handlerToolbar(event: string, arg?: number) {
    if (event === 'scaleX') {
      scaleX = arg = scaleX === -1 ? 1 : -1;
    }
    if (event === 'scaleY') {
      scaleY = arg = scaleY === -1 ? 1 : -1;
    }
    cropper?.value?.[event]?.(arg);
  }

  async function handleOk() {
    if (!src.value) {
      setSubLoading(false);
      return message.error('请先上传图片');
    }
    const uploadApi = props.uploadApi;
    if (uploadApi && isFunction(uploadApi)) {
      const blob = dataURLtoBlob(previewSource.value);
      try {
        setSubLoading(true);
        const result = await uploadApi({ name: 'file', file: blob, filename });
        emit('uploadSuccess', { source: previewSource.value, data: result.data });
        closeModal();
      } finally {
        setSubLoading(false);
      }
    }
  }

  defineExpose({
    showModal,
    beforeUpload,
    handleReady,
    handleOk,
  });
</script>

<style lang="less">
  .n-dialog.cropperModal {
    width: 800px !important;
  }
</style>

<style lang="less" scoped>
  .cropper-box {
    display: flex;

    &-left,
    &-right {
      height: 340px;
    }

    &-left {
      width: 55%;

      &-cropper {
        height: 300px;
        background: #eee;
        background-image: linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.25) 25%,
            transparent 0,
            transparent 75%,
            rgba(0, 0, 0, 0.25) 0
          ),
          linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.25) 25%,
            transparent 0,
            transparent 75%,
            rgba(0, 0, 0, 0.25) 0
          );
        background-position: 0 0, 12px 12px;
        background-size: 25px 25px;
      }

      &-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
      }
    }

    &-right {
      width: 45%;

      &-preview {
        width: 220px;
        height: 220px;
        margin: 0 auto;
        overflow: hidden;
        border: 1px solid #ddd;

        img {
          width: 100%;
          height: 100%;
        }
      }

      &-preview-radius {
        border-radius: 50%;
      }

      &-group {
        display: flex;
        padding-top: 8px;
        margin-top: 8px;
        border-top: 1px solid #d9d9d9;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
</style>
