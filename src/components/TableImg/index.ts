import { useGlobSetting } from '@/hooks/setting';
export { default as TableImg } from './src/TableImg.vue';

const globSetting = useGlobSetting();
//组装完整图片地址
export function fullImgUrl(url: string): string {
  const { imgUrl } = globSetting;
  return /(^http|https:\/\/)/g.test(url) ? url : `${imgUrl}${url}`;
}
