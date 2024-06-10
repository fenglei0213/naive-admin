import { http } from '@/utils/http/axios';

//获取
export function allProvinces(params?) {
  return http.request({
    url: '/area/getParent',
    method: 'get',
    params,
  });
}

export function regionParent(params) {
  return http.request({
    url: '/area/findByParentId',
    method: 'get',
    params,
  });
}
