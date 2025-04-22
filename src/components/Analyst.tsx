import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, NativeModules } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import DeviceInfo from 'react-native-device-info';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { FlashModule } = NativeModules;

const App = ({ getScanResult, isScanning, onClose }) => {
    const [isFlashOn, setIsFlashOn] = useState(false);
    const [hasFlash, setHasFlash] = useState(false);
    const [scanBarcode, setScanBarcode] = useState(true);

    // 在组件加载时检查设备是否支持闪光灯
    useEffect(() => {
        checkFlashSupport();
    }, []);



    // 检查设备是否支持闪光灯
    const checkFlashSupport = async () => {
        const hasFlash = await FlashModule.hasFlash();

        if (hasFlash) {
            setHasFlash(true);
        } else {
            setHasFlash(false);
        }
        // const model = await DeviceInfo.getModel();
        // const unsupportedDevices = ['iPhone SE', 'iPhone 5s', 'iPhone 5c']; // 不支持闪光灯的设备列表
        // setHasFlash(!unsupportedDevices.includes(model));
    };
    const openResult = () => {
        setScanBarcode(false);
    };
    // 切换闪光灯状态
    const toggleFlash = () => {
        if (hasFlash) {
            setIsFlashOn(!isFlashOn);
        }
    };
    const crameRef = React.useRef(CameraType);
    // 处理扫码结果
    const onBarcodeScan = (event: any) => {
        const barcodeValue = event.nativeEvent.codeStringValue;
        getScanResult(barcodeValue);
        openResult()
    };

    return (
        (isScanning && <View style={styles.container}>
            <Button icon="camera-off" style={{ position: 'absolute', zIndex: 12, top: 20, right: 20 }}
                textColor='#fff' buttonColor="#2e95d3" mode="elevated" onPress={
                    onClose}>
                关闭
            </Button>
            <Camera
                ref={crameRef}
                style={styles.camera}
                cameraType={CameraType.Back} // 使用后置摄像头
                scanBarcode={scanBarcode}
                onReadCode={onBarcodeScan}
                torchMode={isFlashOn ? 'on' : 'off'} // 通过属性控制闪光灯
            />
            {hasFlash && (
                <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
                    <Text style={styles.flashButtonText}>
                        <Icon name={isFlashOn ? 'flashlight-off' : 'flashlight-on'} size={36} color={isFlashOn ? '#00dd27' : 'white'} />
                    </Text>
                </TouchableOpacity>
            )}
        </View>)
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 10,
        position: 'absolute', width: '100%', height: '100%'
    },
    camera: {
        flex: 1,
    },
    flashButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        padding: 15,
        borderRadius: 10,
    },
    flashButtonText: {
        color: 'white',
        fontSize: 24,
    },
});

export default App;