import { http } from '@/utils/http/axios';

//列表
export function makeList(params) {
  return http.request({
    url: 'https://api.naiveadmin.com/api/web/make/list',
    method: 'get',
    params,
  });
}

//新增
export function makeAdd(data) {
  return http.request({
    url: 'https://api.naiveadmin.com/api/web/make/add',
    method: 'post',
    data,
  });
}

//编辑
export function makeEdit(data) {
  return http.request({
    url: 'https://api.naiveadmin.com/api/web/make/edit',
    method: 'post',
    data,
  });
}

//删除
export function makeDelete(data) {
  return http.request({
    url: 'https://api.naiveadmin.com/api/web/make/delete',
    method: 'post',
    data,
  });
}
