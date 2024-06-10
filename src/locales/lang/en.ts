import { genMessage } from '../helper';

const modules: any = import.meta.glob('./en/**/*.ts', { eager: true });
export default {
  message: {
    ...genMessage(modules, 'en'),
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
