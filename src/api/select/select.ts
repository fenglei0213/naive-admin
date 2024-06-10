import { http } from '@/utils/http/axios';

//获取分类
export function getClassifyList(params?) {
  return http.request({
    url: '/classifyList',
    method: 'get',
    params,
  });
}
