/**
 * 全局注册自定义组件 待完善
 * @param app
 */
import { App } from 'vue';
import { PageWrapper, PageFooter } from '@/components/Page';
import { Authority } from '@/components/Authority';

export function setupCustomComponents(app: App) {
  app.component('PageWrapper', PageWrapper);
  app.component('PageFooter', PageFooter);
  app.component('Authority', Authority);
}
