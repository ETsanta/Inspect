import React, { useState } from 'react';
import { View, Button, Image, Alert, Platform, PermissionsAndroid, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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
  const handleImagePicker = async (type: string) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('本应用暂未授予图库权限', '请在设置中赋予图库权限后再试');
      return;
    }

    console.log("asdas");
    const options: any = {
      mediaType: 'photo',
      includeBase64: false,
      maxWidth: 2000,
      maxHeight: 2000,
      quality: 0.8,
    };
    try {
      const response: any = type === 'camera'
        ? await launchCamera(options)
        : await launchImageLibrary(options);
      console.log("12312");
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
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <View style={styles.container}>
        {!selectedImage && <TouchableOpacity
          style={styles.pictrue}
          onPress={() => {
            setIsVisible(true)
          }}
        >
          <View>
            <Icon name="insert-photo" size={50} color="#666" />
          </View>
        </TouchableOpacity>}
        {selectedImage && (
          <TouchableOpacity onPress={() => {
            setIsVisible(true)
          }}>
            <Image
              source={{ uri: selectedImage.uri }}
              style={{ width: 100, height: 100, marginBottom: 20 }}
            />
          </TouchableOpacity>

        )}
      </View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        onSwipeComplete={() => setIsVisible(false)}
        swipeDirection="down"
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.handle} />
          <Text style={styles.title}>选择来源</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
              onPress={() => handleImagePicker('library')}
              disabled={uploading}
            >
              <Image
                source={require('../asset/img/gallery.png')}
                style={{ width: 35, height: 35, alignSelf: 'center' }}
              />
              <Text>图库</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleImagePicker('camera')}
              disabled={uploading}
            >
              <Image
                source={require('../asset/img/camera.png')}
                style={{ width: 35, height: 35, alignSelf: 'center' }}
              />
              <Text>拍照</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', justifyContent: 'space-around'
  },
  button: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    minHeight: SCREEN_HEIGHT * 0.1,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-end',
    borderRadius: 6,
  },
  pictrue: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a9a9a9',
    marginBottom: 20,
    borderRadius: 10,
    borderStyle: 'dashed',
    backgroundColor: '#e5e5e5'
  }
});

export default App;