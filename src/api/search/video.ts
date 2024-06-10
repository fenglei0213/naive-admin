import { http } from '@/utils/http/axios';

//获取文章
export function videoList(params?) {
  return http.request({
    url: '/video/list',
    method: 'get',
    params,
  });
}
