import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Clipboard } from 'react-native';
import { getDeviceInfo } from '../../untils/deviceUtils';
import { generateDeviceCipher } from '../../untils/cryptoUtils';
import { verifyLicenseKey } from '../../untils/licenseUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
    const [cipherText, setCipherText] = useState('');
    const [licenseKey, setLicenseKey] = useState('');
    const [isGenerating, setIsGenerating] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    // 生成设备密文
    useEffect(() => {
        const generateCipher = async () => {
            try {
                setIsGenerating(true);
                const deviceInfo = await getDeviceInfo();
                const cipher = await generateDeviceCipher(deviceInfo);
                setCipherText(cipher);
            } catch (error) {
                console.log(error);
                Alert.alert('错误', '生成设备密文失败: ' + error.message);
            } finally {
                setIsGenerating(false);
            }
        };

        generateCipher();
    }, []);

    // 处理注册提交
    const handleRegister = async () => {
        try {
            if (!licenseKey.trim()) {
                setErrorMessage('请输入注册密钥');
                return;
            }

            setErrorMessage('');

            // 验证密钥
            await verifyLicenseKey(licenseKey);

            // 存储注册信息
            const registrationData = {
                licenseKey,
                registeredAt: Date.now(),
                expireTime: Date.now() + 365 * 24 * 60 * 60 * 1000 // 1年有效期
            };

            await AsyncStorage.setItem(
                '@app_registration',
                JSON.stringify(registrationData)
            );

            // 导航到主应用
            navigation.reset({
                index: 0,
                routes: [{ name: 'Appcation' }],
            });
        } catch (error) {
            setErrorMessage(error.message || '注册失败');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>应用注册</Text>

            {isGenerating ? (
                <Text style={styles.loadingText}>正在生成设备信息...</Text>
            ) : (
                <>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>设备密文</Text>
                        <Text style={styles.description}>
                            请复制以下设备密文，使用外部解码工具生成注册密钥：
                        </Text>
                        <View style={styles.cipherContainer}>
                            <Text selectable style={styles.cipherText}>{cipherText}</Text>
                        </View>
                        <Button
                            title="复制密文"
                            onPress={() => {
                                Clipboard.setString(cipherText);
                                Alert.alert('成功', '密文已复制到剪贴板');
                            }}
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>注册密钥</Text>
                        <Text style={styles.description}>
                            请输入从外部工具生成的注册密钥：
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={licenseKey}
                            onChangeText={setLicenseKey}
                            placeholder="粘贴注册密钥"
                            multiline
                            numberOfLines={3}
                        />

                        {errorMessage ? (
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        ) : null}

                        <Button
                            title="注册应用"
                            onPress={handleRegister}
                            color="#2ecc71"
                        />
                    </View>

                    <View style={styles.instructions}>
                        <Text style={styles.instructionsTitle}>使用说明：</Text>
                        <Text style={styles.instruction}>1. 复制上面的设备密文</Text>
                        <Text style={styles.instruction}>2. 使用外部解码工具处理密文</Text>
                        <Text style={styles.instruction}>3. 将生成的注册密钥粘贴到输入框</Text>
                        <Text style={styles.instruction}>4. 点击"注册应用"按钮完成注册</Text>
                    </View>
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f7fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#3498db',
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#2c3e50',
    },
    description: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 15,
    },
    cipherContainer: {
        backgroundColor: '#ecf0f1',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
    },
    cipherText: {
        fontFamily: 'Courier New',
        fontSize: 12,
        lineHeight: 18,
        color: '#2c3e50',
    },
    input: {
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        minHeight: 100,
        textAlignVertical: 'top',
        backgroundColor: '#f8f9fa',
    },
    errorText: {
        color: '#e74c3c',
        marginBottom: 15,
        textAlign: 'center',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#7f8c8d',
        marginVertical: 30,
    },
    instructions: {
        backgroundColor: '#e3f2fd',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
    },
    instructionsTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1976d2',
    },
    instruction: {
        marginBottom: 5,
        color: '#455a64',
    },
});