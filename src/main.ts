import './styles/tailwind.css';
import './styles/index.less';
import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from '@/store';
import { setupI18n } from '@/locales/index';
import {
  setupNaive,
  setupDirectives,
  setupCustomComponents,
  setupNaiveDiscreteApi,
} from '@/plugins';

async function bootstrap() {
  const app = createApp(App);

  // 动态的插入 meta 标签 会导致 ui框架样式 低于 tailwindcss 样式
  const meta = document.createElement('meta');
  meta.name = 'naive-ui-style';
  document.head.appendChild(meta);

  // 挂载状态管理
  setupStore(app);

  // 注册全局常用的 naive-ui 组件
  setupNaive(app);

  // 注册全局自定义组件
  setupCustomComponents(app);

  // 挂载 naive-ui 脱离上下文的 Api
  setupNaiveDiscreteApi();

  // 注册全局自定义指令，如：v-permission权限指令
  await setupDirectives(app);

  // 注册全局方法，如：app.config.globalProperties.$message = message
  //setupGlobalMethods(app);

  // 国际化
  await setupI18n(app);

  // 挂载路由
  await setupRouter(app);

  // 路由准备就绪后挂载APP实例
  await router.isReady();

  app.mount('#app');
}

void bootstrap();
