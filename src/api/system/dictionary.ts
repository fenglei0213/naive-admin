import { http } from '@/utils/http/axios';

/**
 * @description: 获取字典列表
 */
export function getDictionary(params?) {
  return http.request({
    url: '/dictionary/list',
    method: 'get',
    params,
  });
}

/**
 * @description: 获取字典详情
 */
export function getDictionaryInfo(params) {
  return http.request({
    url: '/dictionary/info',
    method: 'get',
    params,
  });
}
