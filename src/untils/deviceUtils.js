import DeviceInfo from 'react-native-device-info';

// 获取设备信息
export const getDeviceInfo = async () => {
  try {
    return {
      deviceId: DeviceInfo.getUniqueId(),
      brand: DeviceInfo.getBrand(),
      model: DeviceInfo.getModel(),
      osVersion: DeviceInfo.getSystemVersion(),
      appVersion: DeviceInfo.getVersion(),
    };
  } catch (error) {
    console.error('获取设备信息失败:', error);
    return {
      deviceId: 'unknown',
      brand: 'unknown',
      model: 'unknown',
      osVersion: 'unknown',
      appVersion: 'unknown',
    };
  }
};