// utils/request.js
import axios from 'axios';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import errorCode from './errorCode';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {eventBus} from '../untils/login';

class HttpClient {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL: Config.API_URL + (Config.API_PORT ? Config.API_PORT : ''),
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'X-Platform': Platform.OS,
      },
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      config => {
        console.log(`发送请求: ${config.method.toUpperCase()} ${config.url}`);
        // 添加认证令牌
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      response => {
        console.log(response);
        const code = response.data.code || 200;
        // 获取错误信息
        const msg =
          errorCode[code] || response.data.msg || errorCode['default'];
        if (
          response.request.responseType === 'blob' ||
          response.request.responseType === 'arraybuffer'
        ) {
          return response.data;
        }
        if (code == 401) {
          Toast.show({
            type: 'success',
            text1: '登陆状态失效，请重新登陆',
            position: 'bottom',
            visibilityTime: 2000,
          });
          console.log(eventBus,"eventBus");

          //TODO 处理登陆状态 和 清空token
          eventBus.emit('UNAUTHORIZED', {
            message: '未授权，请重新登录',
          });

          return Promise.reject('error');
        } else if (code == 500) {
          Toast.show({
            type: 'error',
            text1: msg,
            position: 'bottom',
            visibilityTime: 2000,
          });
          return Promise.reject(response.data);
        } else if (code !== 200) {
          Toast.show({
            type: 'info',
            text1: msg,
            position: 'bottom',
            visibilityTime: 2000,
          });
          return Promise.reject('error');
        } else {
          if (code === 200 && response.data.success) {
            Toast.show({
              type: 'success',
              text1: response.data.msg,
              position: 'bottom',
              visibilityTime: 2000,
            });
          }
          return response.data;
        }
      },
      error => {
        console.log(error);
        
        return Promise.reject(this.handleError(error));
      },
    );
  }

  getToken() {
    return 'your-auth-token';
  }

  handleError(error) {
    let errorMessage = '网络错误';

    if (error.response) {
      const {status, data} = error.response;

      switch (status) {
        case 401:
          errorMessage = '未授权，请重新登录';
          break;
        case 403:
          errorMessage = '拒绝访问';
          break;
        case 404:
          errorMessage = '请求资源不存在';
          break;
        case 500:
          errorMessage = '服务器内部错误';
          break;
        default:
          errorMessage = data?.message || `连接错误${status}`;
      }
    } else if (error.request) {
      errorMessage = '网络异常，请检查网络连接';
    } else {
      errorMessage = error.message;
    }

    return new Error(errorMessage);
  }

  // 所有方法都返回标准的Promise
  get(url, params = {}, config = {}) {
    return this.instance.get(url, {...config, params});
  }

  post(url, data = {}, config = {}) {
    return this.instance.post(url, data, config);
  }

  put(url, data = {}, config = {}) {
    return this.instance.put(url, data, config);
  }

  delete(url, params = {}, config = {}) {
    return this.instance.delete(url, {...config, params});
  }

  patch(url, data = {}, config = {}) {
    return this.instance.patch(url, data, config);
  }
}

// 创建默认实例
export default new HttpClient();
