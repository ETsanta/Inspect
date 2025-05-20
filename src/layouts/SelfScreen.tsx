import React, { useState, useRef } from 'react';
import {
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  View,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Vcolor from "../app/second/color"

const ClickableView = ({ children, onPress }) => (
  <Pressable
    onPress={onPress}
    android_ripple={{ color: '#eee' }}
    style={({ pressed }) => [
      pressed && styles.pressedState
    ]}
  >
    {children}
  </Pressable>
);

export default function HomeScreen({ navigation }) {
  const [productList, setProductList] = useState([{ title: "设置", path: "SetConfig" }, { title: "关于", path: "About" }, { title: "帮助", path: "Help" }])
  const renderItem = ({ item, index }) => (
    <ClickableView onPress={() => navigation.navigate(item.path)}>
      <View style={styles.itemContainer} >
        <View style={styles.content} >
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="arrow-right" size={20} color="#666"></Icon>
        </TouchableOpacity>
      </View>
    </ClickableView>
  );
  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={<>
        <View style={styles.userTitle}>
          <Vcolor>
            <View style={styles.userTitleContent}>
              <Avatar.Image size={64} source={require('../asset/img/user.png')} />
              <Text style={styles.userName}>Tanzs</Text>
              <Text style={styles.userPosition}>React-Native</Text>
            </View>
          </Vcolor>
        </View>
      </>}
      contentContainerStyle={{
        flexGrow: 1 // 允许内容区域扩展
      }}
      data={productList}
      renderItem={renderItem}
      ListEmptyComponent={<Text style={styles.emptyText}>没有数据</Text>} />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  content: {
    flex: 1,
    marginRight: 16
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 40,
    fontSize: 16
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  itemText: {
    fontSize: 16,
    color: '#333'
  },
  userTitleContent:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -32,
    marginTop: -52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    color: '#FFF',
    padding: 5,
    fontSize: 16,
  },
  userPosition: {
    color: '#919192',
    fontSize: 14,
  },
  userTitle: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressedState: {
    transform: [{ scale: 0.98 }], // 按压缩放
    shadowOpacity: 0.5 // 阴影变化
  },
});