<template>
  <div class="w-full">
    <div class="upload">
      <div class="upload-card">
        <!--图片列表-->
        <div
          class="upload-card-item"
          :style="getCSSProperties"
          v-for="(item, index) in imgList"
          :key="`img_${index}`"
        >
          <div class="upload-card-item-info">
            <div class="img-box">
              <img :src="item" />
            </div>
            <div class="img-box-actions">
              <n-icon size="18" class="mx-2 action-icon" @click="preview(item)">
                <EyeOutlined />
              </n-icon>
              <n-icon size="18" class="mx-2 action-icon" @click="remove(index)">
                <DeleteOutlined />
              </n-icon>
            </div>
          </div>
        </div>

        <!--上传图片-->
        <div
          class="upload-card-item upload-card-item-select-picture"
          :style="getCSSProperties"
          v-if="imgList.length < getMaxNumber"
        >
          <n-upload
            v-bind="$props"
            :file-list-style="{ display: 'none' }"
            @before-upload="beforeUpload"
            @finish="finish"
          >
            <div class="flex flex-col justify-center">
              <n-icon size="18" class="m-auto">
                <PlusOutlined />
              </n-icon>
              <span class="upload-title">上传图片</span>
            </div>
          </n-upload>
        </div>
      </div>
    </div>

    <!--规则提示-->
    <n-space v-if="getHelpText">
      <n-alert title="提示" type="info" v-if="getHelpText" class="flex w-full">
        {{ getHelpText }}
      </n-alert>
    </n-space>
  </div>

  <!--预览图片-->
  <n-modal
    v-model:show="showModal"
    preset="card"
    title="预览"
    :bordered="false"
    :style="{ width: '520px' }"
  >
    <img :src="previewUrl" class="m-auto" />
  </n-modal>
</template>

<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@vicons/antd';
  import { basicProps } from './props';
  import { useMessage, useDialog } from 'naive-ui';
  import { ResultEnum } from '@/enums/httpEnum';
  import componentSetting from '@/settings/componentSetting';
  import { useGlobSetting } from '@/hooks/setting';
  import { isString } from '@/utils/is';
  import { Eval } from '@/utils';

  const globSetting = useGlobSetting();

  const props = defineProps({ ...basicProps });

  const getMaxNumber = computed(() => {
    return props.maxNumber;
  });

  const getHelpText = computed(() => {
    return props.helpText;
  });

  const emit = defineEmits(['uploadChange', 'delete']);

  const getCSSProperties = computed(() => {
    return {
      width: `${props.width}px`,
      height: `${props.height}px`,
    };
  });

  const message = useMessage();
  const dialog = useDialog();

  const showModal = ref(false);
  const previewUrl = ref('');
  const originalImgList = ref([]);
  const imgList = ref<string[]>([]);

  //赋值默认图片显示
  watch(
    () => props.value,
    () => {
      imgList.value = props.value.map((item) => {
        return getImgUrl(item);
      });
    },
    {
      immediate: true,
    },
  );

  //预览
  function preview(url: string) {
    showModal.value = true;
    previewUrl.value = url;
  }

  //删除
  function remove(index: number) {
    dialog.info({
      title: '提示',
      content: '你确定要删除吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        imgList.value.splice(index, 1);
        originalImgList.value.splice(index, 1);
        emit('uploadChange', originalImgList.value);
        emit('delete', originalImgList.value);
      },
      onNegativeClick: () => {},
    });
  }

  //组装完整图片地址
  function getImgUrl(url: string): string {
    const { imgUrl } = globSetting;
    return /(^http|https:\/\/)/g.test(url) ? url : `${imgUrl}${url}`;
  }

  function checkFileType(fileType: string) {
    return componentSetting.upload.fileType.includes(fileType);
  }

  //上传之前
  function beforeUpload({ file }) {
    const fileInfo = file.file;
    const { maxSize, accept } = props;
    const acceptRef = (isString(accept) && accept.split(',')) || [];

    // 设置最大值，则判断
    if (maxSize && fileInfo.size / 1024 / 1024 >= maxSize) {
      message.error(`上传文件最大值不能超过${maxSize}M`);
      return false;
    }

    // 设置类型,则判断
    const fileType = componentSetting.upload.fileType;
    if (acceptRef.length > 0 && !checkFileType(fileInfo.type)) {
      message.error(`只能上传文件类型为${fileType.join(',')}`);
      return false;
    }

    return true;
  }

  //上传结束
  function finish({ event: Event }) {
    try {
      const res = Eval('(' + Event.target.response + ')');
      const { infoField, imgField } = componentSetting.upload.apiSetting;
      const { code } = res;
      const msg = res.msg || res.message || '上传失败';
      const result = res[infoField];
      //成功
      if (code === ResultEnum.SUCCESS) {
        let imgUrl: string = getImgUrl(result[imgField]);
        imgList.value.push(imgUrl as never);
        originalImgList.value.push(result[imgField] as never);
        emit('uploadChange', originalImgList.value);
      } else message.error(msg);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<style lang="less" scoped>
  .upload {
    width: 100%;
    overflow: hidden;

    &-card {
      width: auto;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      &-item {
        margin: 0 8px 8px 0;
        position: relative;
        padding: 8px;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        :deep(.n-upload-trigger) {
          width: 100%;
          text-align: center;
        }

        &:hover {
          background: 0 0;

          .upload-card-item-info::before {
            opacity: 1;
          }

          &-info::before {
            opacity: 1;
          }
        }

        &-info {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 0;
          overflow: hidden;

          &:hover {
            .img-box-actions {
              opacity: 1;
            }
          }

          &::before {
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: all 0.3s;
            content: ' ';
          }

          .img-box {
            position: relative;
            //padding: 8px;
            //border: 1px solid #d9d9d9;
            border-radius: 2px;

            img {
              width: 100%;
            }
          }

          .img-box-actions {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 10;
            white-space: nowrap;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &:hover {
              background: 0 0;
            }

            .action-icon {
              color: rgba(255, 255, 255, 0.85);

              &:hover {
                cursor: pointer;
                color: #fff;
              }
            }
          }
        }
      }

      &-item-select-picture {
        border: 1px dashed #d9d9d9;
        border-radius: 2px;
        cursor: pointer;
        background: #fafafa;
        color: #666;

        .upload-title {
          color: #666;
        }
      }
    }
  }
</style>
