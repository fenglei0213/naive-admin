import { computed, unref } from 'vue';
import type { DynamicProps } from '/#/utils';
import type { BasicProps } from '../type/index';
import { useMessage } from 'naive-ui';
import { isString } from '@/utils/is';
import componentSetting from '@/settings/componentSetting';
import { useGlobSetting } from '@/hooks/setting';
import { uniqueId } from 'lodash-es';
import { isObject } from '@/utils/is/index';

type Props = Partial<DynamicProps<BasicProps>>;

export function useUpload(props?: Props) {
  const message = useMessage();
  const globSetting = useGlobSetting();

  const getHelpText = computed(() => {
    return props?.helpText;
  });

  function checkFileType(fileType: string) {
    return componentSetting.upload.fileType.includes(fileType);
  }

  //上传之前
  function beforeUpload({ file }) {
    const fileInfo = file.file;
    if (!props) return;
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

  function getUrl(item) {
    return isObject(item) ? item.element : item;
  }

  function getFlieId(key?: 'flie_') {
    return uniqueId(key);
  }

  function packFiles(list) {
    const { imgUrl } = globSetting;
    return unref(list).map((item) => {
      const url = getFlieUrl(item);
      return {
        id: getFlieId(),
        name: 'img',
        status: 'finished',
        url: /(^http|https:\/\/)/g.test(url as string) ? url : `${imgUrl}${url}`,
      };
    });
  }

  function takeFiles(list) {
    return unref(list).map((item) => {
      return item.url;
    });
  }

  //组装完整文件地址
  function getFlieUrl(url: string): string {
    const { imgUrl } = globSetting;
    const value = getUrl(url);
    return /(^http|https:\/\/)/g.test(value) ? value : `${imgUrl}${value}`;
  }

  const getCSSProperties = computed(() => {
    return {
      width: `${props?.width}px`,
      height: `${props?.height}px`,
    };
  });

  return {
    getHelpText,
    getFlieUrl,
    getCSSProperties,
    getFlieId,
    packFiles,
    takeFiles,
    checkFileType,
    beforeUpload,
  };
}
