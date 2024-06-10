<template>
  <n-image-group>
    <n-space v-bind="props.spaceProps">
      <n-image
        v-bind="props.imageProps"
        v-for="(item, index) in getImgList"
        :key="index"
        :src="item"
      />
    </n-space>
  </n-image-group>
</template>

<script lang="ts" setup>
  import { computed, PropType } from 'vue';
  import type { SpaceProps } from 'naive-ui/lib/space/src/Space';
  import type { ImageProps } from 'naive-ui/lib/image/src/image';
  import { useGlobSetting } from '@/hooks/setting';
  const props = defineProps({
    imgList: {
      type: Array as PropType<String[]>,
      default: () => [],
    },
    imageProps: {
      type: Object as PropType<ImageProps>,
      default: () => ({
        width: 50,
      }),
    },
    spaceProps: {
      type: Object as PropType<SpaceProps>,
    },
  });

  const globSetting = useGlobSetting();

  const getImgList = computed(() => {
    return props.imgList.map((item: string) => {
      return fullImgUrl(item);
    });
  });

  //组装完整图片地址
  function fullImgUrl(url: string): string {
    const { imgUrl } = globSetting;
    return /(^http|https:\/\/)/g.test(url) ? url : `${imgUrl}${url}`;
  }

  defineExpose({
    fullImgUrl,
  });
</script>
