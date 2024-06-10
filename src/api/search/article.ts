import { http } from '@/utils/http/axios';

//获取文章
export function articleList(params?) {
  return http.request({
    url: '/article/list',
    method: 'get',
    params,
  });
}
