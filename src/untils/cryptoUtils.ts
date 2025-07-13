import CryptoJS from 'crypto-js';

// 从注册密钥中提取设备信息
export const extractDeviceInfoFromKey = (licenseKey: string): any => {
    try {
        if (!licenseKey.includes('.')) {
            throw new Error('无效的密钥格式');
        }

        const [licenseInfoBase64, signature] = licenseKey.split('.');

        // 验证签名
        const calculatedSignature = CryptoJS.HmacSHA256(
            licenseInfoBase64,
            'PRIVATE_KEY_SECRET'
        ).toString();

        if (calculatedSignature !== signature) {
            throw new Error('签名验证失败');
        }

        // 解析许可证信息
        const licenseInfoStr = CryptoJS.enc.Base64.parse(licenseInfoBase64).toString(CryptoJS.enc.Utf8);
        return JSON.parse(licenseInfoStr);
    } catch (error) {
        console.error('解析密钥失败:', error);
        throw new Error('无效的注册密钥');
    }
};

// 生成设备密文
export const generateDeviceCipher = async (deviceInfo: any): Promise<string> => { 
    try {
        const cipherData = {
            ...deviceInfo,
            cipherTime: Date.now(),
            validDuration: 7 * 24 * 60 * 60 * 1000 // 7天有效期
        };

        // 使用AES加密
        const cipherText = CryptoJS.AES.encrypt(
            JSON.stringify(cipherData),
            'PUBLIC_KEY_SECRET'
        ).toString();

        return cipherText;
    } catch (error) {
        console.log('生成密文失败:', error);
        throw new Error('生成设备密文失败');
    }
};