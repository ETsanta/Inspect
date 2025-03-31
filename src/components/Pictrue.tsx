import React, { useState } from 'react';
import { View, Button, Image, Alert, Platform, PermissionsAndroid, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Portal } from '@gorhom/portal'

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
type Props = {
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  width?: number;
  height?: number;
};

const App: React.FC<Props> = ({ width = 100, height = 100, resizeMode = 'cover' }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
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

  const handleImagePicker = async (type: string) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('本应用暂未授予图库权限', '请在设置中赋予图库权限后再试');
      return;
    }
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
      if (response.didCancel) {
        console.log('User cancelled');
      } else if (response.errorCode) {
        console.log('Error: ', response.errorMessage);
      } else {
        setIsVisible(false)
        const source = response.assets[0];
        setSelectedImage(source);
        setIsPressed(false)
      }
    } catch (error) {
      console.log('Image picker error: ', error);
    }
  };

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
  const [isPressed, setIsPressed] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  return (
    <View>
      <View style={styles.container}>
        {!selectedImage && <TouchableOpacity
          style={[styles.pictrue, { width: width > 1 ? width : 1, height: height > 1 ? height : 1 }]}
          onPress={() => {
            setIsVisible(true)
          }}
        >
          <View>
            <Icon name="insert-photo" size={width > height ? height / 2 : width / 2} color="#666" />
          </View>
        </TouchableOpacity>}
        {selectedImage && (
          <TouchableOpacity
            style={{ width: width, height: height }}
            onLongPress={() => { setIsPressed(true) }}
          >
            <Image
              source={{ uri: selectedImage.uri }}
              style={{ width: width, height: height }}
              resizeMode={resizeMode}
            />
            {isPressed && <View style={styles.mask}>
              <View style={styles.maskContent}>
                <View style={styles.maskIcon}>
                  setViewVisible
                  <TouchableOpacity
                    style={styles.maskContentIcon}
                    onPress={() => {
                      setViewVisible(true)
                    }}
                  >
                    <Icon name="visibility" size={25} color="#fff" ></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.maskContentIcon}
                    onPress={() => {
                      setIsVisible(true)
                    }}
                  >
                    <Icon name="build" size={25} color="#fff" ></Icon>
                  </TouchableOpacity>
                </View>
                <View style={styles.maskIcon}>
                  <TouchableOpacity
                    style={styles.maskContentIcon}
                    onPress={() => {
                      setSelectedImage(null)
                    }}
                  >
                    <Icon name="clear" size={25} color="#fff" ></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.maskContentIcon}
                    onPress={() => {
                      setIsPressed(false)
                    }}
                  >
                    <Icon name="disabled-by-default" size={25} color="#fff" ></Icon>
                  </TouchableOpacity>
                </View>
              </View>
            </View>}
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
      {viewVisible && <Portal style={styles.maskContentIcon}>
        <TouchableOpacity
          style={styles.maskContentIcon}
          onPress={() => {
            setViewVisible(false)
          }}
        ></TouchableOpacity>
        <Image
          source={{ uri: selectedImage.uri }}
          style={{ width: width, height: height }}
        />
      </Portal>}
    </View>
  );
};

const styles = StyleSheet.create({
  mask: {
    ...StyleSheet.absoluteFillObject, // 覆盖整个容器
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  container: {
    margin: 5,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a9a9a9',
    marginBottom: 20,
    borderRadius: 10,
    borderStyle: 'dashed',
    backgroundColor: '#e5e5e5'
  },
  maskContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskContentIcon: {
    flex: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    height: "100%",
    borderColor: '#fff',
    justifyContent: "space-around",
    alignItems: 'center',
    flexDirection: "row",
  },
  maskIcon: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: 'center',
    flexDirection: "row",
  }
});

export default App;