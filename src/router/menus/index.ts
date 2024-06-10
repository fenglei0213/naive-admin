import { generatorMenu } from '@/utils/index';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { Menu } from '../types';

export const getMenus = async (): Promise<Menu[]> => {
  const asyncRouteStore = useAsyncRouteStore();
  return generatorMenu(asyncRouteStore.getMenus);
};
