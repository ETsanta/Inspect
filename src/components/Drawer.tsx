import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BottomSheetModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* 触发按钮 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisible(true)}
      >
        <Text>打开弹窗</Text>
      </TouchableOpacity>

      {/* 弹窗主体 */}
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
          {/* 拖动把手 */}
          <View style={styles.handle} />
          
          {/* 自定义内容 */}
          <Text style={styles.title}>底部弹窗标题</Text>
          <Text>弹窗内容区域...</Text>
          
          {/* 关闭按钮 */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsVisible(false)}
          >
            <Text>关闭</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    minHeight: SCREEN_HEIGHT * 0.3,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-end',
    borderRadius: 6,
  },
});

export default BottomSheetModal;