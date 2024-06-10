import { withInstall } from '@/utils';
import impExcel from './src/ImportExcel.vue';

export const ImpExcel = withInstall(impExcel);
export * from './src/typing';
export { jsonToSheetXlsx, aoaToSheetXlsx } from './src/Export2Excel';
