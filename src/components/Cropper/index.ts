import { withInstall } from '@/utils';

export { default as Cropper } from './src/Cropper.vue';
import cropperImage from './src/CropperImage.vue';

export * from './src/typing';
export const CropperImage = withInstall(cropperImage);
