import Config from 'react-native-config'

class Request {
  constructor(baseURL, timeout = 10000) {
    this.baseURL = baseURL; // 基础 URL
    this.timeout = timeout; // 超时时间
    this.interceptors = {
      request: [],
      response: [],
    };
  }

  // 添加请求拦截器
  useRequestInterceptor(onFulfilled, onRejected) {
    this.interceptors.request.push({ onFulfilled, onRejected });
  }

  // 添加响应拦截器
  useResponseInterceptor(onFulfilled, onRejected) {
    this.interceptors.response.push({ onFulfilled, onRejected });
  }

  // 执行拦截器
  async runInterceptors(type, config) {
    let result = config;
    for (const interceptor of this.interceptors[type]) {
      try {
        result = await interceptor.onFulfilled(result);
      } catch (error) {
        if (interceptor.onRejected) {
          interceptor.onRejected(error);
        }
        throw error;
      }
    }
    return result;
  }

  // 发送请求
  async request(url, options = {}) {
    const { method = 'GET', headers = {}, body, params } = options;
    // 处理 URL
    let fullURL = `${this.baseURL}${url}`;
    console.log('1请求URL:', fullURL)
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      fullURL += `?${queryString}`;
    }

    // 请求配置
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
        console.log('请求配置:', config)
      // 执行请求拦截器
      const requestConfig = await this.runInterceptors('request', config);

      // 超时处理
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('请求超时')), this.timeout
      ));

      // 发送请求
      const response = await Promise.race([
        fetch(fullURL, requestConfig),
        timeoutPromise,
      ]);

      // 检查响应状态
      if (!response.ok) {
        throw new Error(`请求失败: ${response.status}`);
      }

      // 解析响应数据
      const data = await response.json();

      // 执行响应拦截器
      return this.runInterceptors('response', data);
    } catch (error) {
      // 统一错误处理
      console.error('请求错误:', error);
      throw error;
    }
  }

  // 封装常用方法
  get(url, params) {
    return this.request(url, { method: 'GET', params });
  }

  post(url, body) {
    return this.request(url, { method: 'POST', body });
  }

  put(url, body) {
    return this.request(url, { method: 'PUT', body });
  }

  delete(url) {
    return this.request(url, { method: 'DELETE' });
  }
}

console.log("Config",Config);
// 创建默认实例
const api = new Request(Config.API_URL);

// 添加请求拦截器（如添加 Token）
api.useRequestInterceptor((config) => {
//   const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjNjM2M3YjcxLTJlOWYtNGI2ZC1hMmI0LTI2NTNmZGExYWVhMiJ9.7MJM8lkGUuxAfbUHJS0pAVB022WAhbb5ganXKCf37pJ-sQn03xYveDrz2Uy1YE1T2WCyM3z6wlKVSI4_wxFucg';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 添加响应拦截器（如统一处理错误）
api.useResponseInterceptor(
  (response) => response,
  (error) => {
    if (error.message === '请求超时') {
      alert('请求超时，请重试');
    } else {
      alert('请求失败，请检查网络');
    }
    throw error;
  }
);

export default api;