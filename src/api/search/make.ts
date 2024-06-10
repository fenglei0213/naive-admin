import { http } from '@/utils/http/axios';

//获取文章
export function makeList(params?) {
  return http.request({
    url: '/make/list',
    method: 'get',
    params,
  });
}
