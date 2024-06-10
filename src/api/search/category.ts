import { http } from '@/utils/http/axios';

//获取分类
export function categoryList(params?) {
  return http.request({
    url: '/category/list',
    method: 'get',
    params,
  });
}
