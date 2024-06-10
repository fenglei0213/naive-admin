<script lang="tsx">
  import { defineComponent, ref, watch, computed } from 'vue';
  import { NSpace, NUpload, NIcon, NAlert, useMessage, useDialog } from 'naive-ui';
  import type { UploadFileInfo } from 'naive-ui';
  import { basicProps } from './props';
  import { PlusOutlined, BulbOutlined, EyeOutlined, DeleteOutlined } from '@vicons/antd';
  import { useUpload } from './hooks/useUpload';
  import componentSetting from '@/settings/componentSetting';
  import { ResultEnum } from '@/enums/httpEnum';
  import ImagePreview from './ImagePreview.vue';
  import Draggable from 'vuedraggable';
  import { Eval } from '@/utils';

  export default defineComponent({
    name: 'ImageUpload',
    props: basicProps,
    emits: ['uploadChange', 'delete'],
    setup(props, { emit }) {
      const imagePreviewRef = ref();
      const previewUrl = ref<string>('');
      const message = useMessage();
      const dialog = useDialog();
      const fileList = ref<string[]>([]);

      const { getHelpText, getFlieUrl, getCSSProperties, beforeUpload } = useUpload(props);

      watch(
        () => props.value,
        () => {
          fileList.value = props.value;
        },
        {
          immediate: true,
        },
      );

      const getMaxNumber = computed(() => {
        return props.maxNumber;
      });

      //预览
      function preview(url: string) {
        imagePreviewRef.value.openModal();
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
            fileList.value.splice(index, 1);
            emit('uploadChange', fileList.value);
            emit('delete', fileList.value);
          },
          onNegativeClick: () => {},
        });
      }

      function finish({ event: Event }: { file: UploadFileInfo; event?: ProgressEvent }) {
        try {
          const response = (Event?.target as XMLHttpRequest).response;
          const res = Eval('(' + response + ')');
          const { infoField, imgField } = componentSetting.upload.apiSetting;
          const { code } = res;
          const msg = res.msg || res.message || '上传失败';
          const result = res[infoField];
          //成功
          if (code === ResultEnum.SUCCESS) {
            fileList.value.push(result[imgField] as never);
            emit('uploadChange', fileList.value);
          } else message.error(msg);
        } catch (error) {
          console.error(error);
        }
      }

      return () => {
        return (
          <div class="w-full">
            <div class="upload">
              <div class="upload-card">
                <Draggable
                  class="flex flex-wrap w-full"
                  itemKey="element"
                  v-model={fileList.value}
                  animation="300"
                >
                  {{
                    item: (element, index) => (
                      <div
                        class="cursor-move upload-card-item"
                        style={getCSSProperties.value}
                        key={element.element}
                      >
                        <div class="upload-card-item-info" key={element.element}>
                          <div class="img-box">
                            <img src={getFlieUrl(element)} />
                          </div>
                          <div class="img-box-actions">
                            <n-icon
                              size="18"
                              class="mx-2 action-icon"
                              onClick={preview.bind(this, getFlieUrl(element))}
                            >
                              <EyeOutlined />
                            </n-icon>
                            <n-icon
                              size="18"
                              class="mx-2 action-icon"
                              onClick={remove.bind(this, index)}
                            >
                              <DeleteOutlined />
                            </n-icon>
                          </div>
                        </div>
                      </div>
                    ),
                    footer: () => {
                      return fileList.value.length < getMaxNumber.value ? (
                        <div
                          class="upload-card-item upload-card-item-select-picture"
                          style={getCSSProperties.value}
                        >
                          <NUpload
                            ref="uploadRef"
                            {...props}
                            max={getMaxNumber.value}
                            listType="image-card"
                            onBeforeUpload={beforeUpload}
                            onFinish={finish}
                            trigger-style={getCSSProperties.value}
                          >
                            <NIcon
                              component={PlusOutlined}
                              size={26}
                              class="upload-icon-btn"
                            ></NIcon>
                          </NUpload>
                        </div>
                      ) : null;
                    },
                  }}
                </Draggable>
              </div>
            </div>

            {getHelpText.value ? (
              <div class="mt-3 upload-alert">
                <div class="inline-block">
                  <NAlert type="info" show-icon={false} closable={true}>
                    <NSpace align="center">
                      <NIcon component={BulbOutlined} size={22} class="upload-icon-btn"></NIcon>
                      <div class="pr-6">{getHelpText.value}</div>
                    </NSpace>
                  </NAlert>
                </div>
              </div>
            ) : null}
            <ImagePreview ref={imagePreviewRef} url={previewUrl.value} />
          </div>
        );
      };
    },
  });
</script>

<style lang="less" scoped>
  // .upload {
  //   overflow: hidden;
  //   &-alert {
  //     width: auto;
  //     .n-alert {
  //       width: auto;
  //     }
  //   }
  //   &-icon-btn {
  //     color: var(--n-item-icon-color);
  //   }
  // }

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
        padding: 6px;
        border: 1px solid var(--n-border-color);
        border-radius: 2px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        border-radius: 4px;

        .n-upload-trigger {
          width: 100%;
          text-align: center;
        }

        :deep(.n-upload-file-list .n-upload-file) {
          display: none;
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
            border-radius: 4px;
          }

          .img-box {
            position: relative;
            //padding: 8px;
            //border: 1px solid #d9d9d9;
            border-radius: 2px;

            img {
              width: 100%;
              border-radius: 4px;
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
            justify-content: space-around;

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
        color: #666;
        padding: 0;
        border: none;
        .upload-icon-btn {
          color: var(--n-item-icon-color);
        }
      }
    }
  }
</style>
