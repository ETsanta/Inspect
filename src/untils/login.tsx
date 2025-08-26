import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {goLogin, getUserInfo} from '../api/login';

// 创建全局事件总线
class EventBus {
  events: Record<string, Function[]>;
  constructor() {
    this.events = {};
  }

  on(event: any, callback: any) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event: any, callback: any) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(
      eventCallback => eventCallback !== callback,
    );
  }

  emit(event: any, data: any) {
    if (!this.events[event]) return;

    this.events[event].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }
}

// 创建全局事件总线实例
export const eventBus = new EventBus();

// 定义认证上下文类型
interface AuthContextType {
  isRegistered: boolean;
  setIsRegistered: (value: boolean) => void;
  login: (e: any) => void;
  logout: () => void;
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType>({
  isRegistered: false,
  setIsRegistered: () => {},
  login: (e: any) => {},
  logout: () => {},
});

// 认证提供者属性类型
interface AuthProviderProps {
  children: ReactNode;
}

// 认证提供者组件
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkRegistrationStatus();

    // 监听未授权事件
    const handleUnauthorized = () => {
      logout();
    };
    eventBus.on('UNAUTHORIZED', handleUnauthorized);

    // 清理函数;
    return () => {
      eventBus.off('UNAUTHORIZED', handleUnauthorized);
    };
  }, []);

  // 检查注册状态
  const checkRegistrationStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('app_token');
      setIsRegistered(!!token);
    } catch (error) {
      console.error('注册检查失败:', error);
      setIsRegistered(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 登录函数
  const login = async (params: any) => {
    await goLogin(params)
      .then(async (data: any) => {
        await AsyncStorage.setItem('app_token', data.token);
        setIsRegistered(true);
      })
      .catch(error => {
        throw error;
      });
  };

  // 退出登录函数
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('app_token');
      setIsRegistered(false);
    } catch (error) {
      console.error('退出登录失败:', error);
    }
  };

  const value = {
    isRegistered,
    setIsRegistered,
    login,
    logout,
  };

  // 显示加载状态
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>检查许可证状态...</Text>
      </View>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 使用认证上下文的hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider内部使用');
  }
  return context;
};

// 样式定义
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6c757d',
  },
});
