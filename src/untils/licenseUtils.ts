import AsyncStorage from '@react-native-async-storage/async-storage';
import { extractDeviceInfoFromKey } from './cryptoUtils';
import { getDeviceInfo } from './deviceUtils';

// 检查设备是否已注册
export const checkRegistration = async (): Promise<boolean> => {
  try {
    const registrationData = await AsyncStorage.getItem('@app_registration');
    
    if (!registrationData) return false;
    
    const { licenseKey, expireTime } = JSON.parse(registrationData);
    
    // 检查是否过期
    if (Date.now() > expireTime) {
      await AsyncStorage.removeItem('@app_registration');
      return false;
    }
    
    // 验证密钥有效性
    await verifyLicenseKey(licenseKey);
    
    return true;
  } catch (error) {
    console.error('注册状态检查失败:', error);
    return false;
  }
};

// 验证注册密钥
export const verifyLicenseKey = async (licenseKey: string): Promise<void> => {
  try {
    // 1. 提取设备信息
    const licenseDeviceInfo = extractDeviceInfoFromKey(licenseKey);
    
    // 2. 获取当前设备信息
    const currentDeviceInfo:any = await getDeviceInfo();
    
    // 3. 比较设备信息
    const keysToMatch = ['deviceId', 'brand', 'model'];
    const isDeviceMatch = keysToMatch.every(key => 
      licenseDeviceInfo[key] === currentDeviceInfo[key]
    );
    
    if (!isDeviceMatch) {
      throw new Error('设备信息不匹配');
    }
    
    // 4. 检查有效期
    const currentTime = Date.now();
    if (currentTime > licenseDeviceInfo.expireTime) {
      throw new Error('注册密钥已过期');
    }
  } catch (error) {
    throw error;
  }
};