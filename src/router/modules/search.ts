import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/base';
import { CubeOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils';
import { t } from '@/hooks/web/useI18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/search',
    name: 'Search',
    component: Layout,
    redirect: '/search/article',
    meta: {
      title: t('routes.search.search'),
      icon: renderIcon(CubeOutline),
      sort: 4,
    },
    children: [
      {
        path: 'article',
        name: 'SearchArticle',
        meta: {
          title: t('routes.search.article'),
        },
        component: () => import('@/views/search/search-article/search-article.vue'),
      },
      {
        path: 'video',
        name: 'SearchVideo',
        meta: {
          title: t('routes.search.video'),
        },
        component: () => import('@/views/search/search-video/search-video.vue'),
      },
      {
        path: 'make',
        name: 'SearchMake',
        meta: {
          title: t('routes.search.make'),
        },
        component: () => import('@/views/search/search-make/search-make.vue'),
      },
    ],
  },
];

export default routes;
