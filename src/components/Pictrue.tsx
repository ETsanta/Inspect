import React, { useState } from 'react';
import { View, Button, Image, Alert, Platform, PermissionsAndroid, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import Modal from 'react-native-modal';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 请求必要权限
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        return (
          granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // 处理图片选择
  const handleImagePicker = async (type) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('本应用暂未授予图库权限', '请在设置中赋予图库权限后再试');
      return;
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxWidth: 2000,
      maxHeight: 2000,
      quality: 0.8,
    };

    try {
      const response = type === 'camera'
        ? await launchCamera(options)
        : await launchImageLibrary(options);

      if (response.didCancel) {
        console.log('User cancelled');
      } else if (response.errorCode) {
        console.log('Error: ', response.errorMessage);
      } else {
        const source = response.assets[0];
        setSelectedImage(source);
      }
    } catch (error) {
      console.log('Image picker error: ', error);
    }
  };

  // 上传图片到服务器
  const uploadImage = async () => {
    if (!selectedImage) return;

    setUploading(true);

    // const formData = new FormData();
    // formData.append('file', {
    //   uri: selectedImage.uri,
    //   type: selectedImage.type || 'image/jpeg',
    //   name: selectedImage.fileName || `photo_${Date.now()}.jpg`,
    // });

    // try {
    //   const response = await axios.post('YOUR_UPLOAD_URL', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     onUploadProgress: (progressEvent) => {
    //       const progress = Math.round(
    //         (progressEvent.loaded / progressEvent.total) * 100
    //       );
    //       console.log(`Upload Progress: ${progress}%`);
    //     },
    //   });

    //   Alert.alert('Success', 'Image uploaded successfully');
    //   console.log('Response:', response.data);
    // } catch (error) {
    //   Alert.alert('Error', 'Upload failed');
    //   console.error('Upload error:', error);
    // } finally {
    //   setUploading(false);
    // }
  };

  return (

    <View style={{ justifyContent: 'center', padding: 20 }}>
      <Text>选择图片</Text>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={{ width: 300, height: 300, alignSelf: 'center', marginBottom: 20 }}
        />
      )}
      <Modal>
        <Button
          title="图库"
          onPress={() => handleImagePicker('library')}
          disabled={uploading}
        />

        <View style={{ marginVertical: 10 }}>
          <Button
            title="拍照"
            onPress={() => handleImagePicker('camera')}
            disabled={uploading}
          />
        </View>

        <Button
          title="上传"
          onPress={uploadImage}
          disabled={!selectedImage || uploading}
        />
      </Modal>
    </View>
  );
};

export default App;