import { http } from '@/utils/http/axios';

// 图片上传
export function upload(data) {
  return http.request({
    url: '/upload',
    method: 'post',
    data,
  });
}

// 状态列表
export function stateList(params?) {
  return http.request({
    url: '/state_list',
    method: 'get',
    params,
  });
}
