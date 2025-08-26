import request from '../untils/request';

const api = {
  getSafeCode: '/captchaImage',
  goLogin: '/login',
  getUserInfo: '/getInfo',
};

export const getSafeCode = () => {
  return request.get(api.getSafeCode);
};

export const goLogin = (body: any) => {
  return request.post(api.goLogin, body);
};

export const getUserInfo = () => {
  return request.get(api.getUserInfo);
};
