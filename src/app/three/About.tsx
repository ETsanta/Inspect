import React, { useState, useRef } from 'react';
import {
    Pressable,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    View,
    PermissionsAndroid,
    Button
} from 'react-native';


const ContextView = ({ children }) => (
    <Pressable
        android_ripple={{ color: '#eee' }}
        style={({ pressed }) => [
            pressed && styles.pressedState
        ]}
    >
        {children}
    </Pressable>
);

export default function Config() {
    const [configData, setProductList] = useState([])
    const renderItem = ({ item, index }) => (
        <ContextView><Text>{index}</Text></ContextView>
    );
    return (
        // <FlatList
        //     ListHeaderComponent={<>
        //         <View>
        //             <Button title='测试按钮' onPress={async () => {
        //                 const granted = await PermissionsAndroid.request(
        //                     PermissionsAndroid.PERMISSIONS.CAMERA,
        //                 );
        //                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //                     console.log('你现在已经有了摄像头的权限');
        //                 } else {
        //                     console.log('拒绝');
        //                     return
        //                 }
        //             }} />
        //             {/* <QR></QR> */}
        //         </View>
        //     </>}
        //     data={configData}
        //     renderItem={renderItem}
        //     ListEmptyComponent={<Text style={styles.emptyText}>没有数据</Text>} />
        <View></View>
    )
}


const styles = StyleSheet.create({
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
    pressedState: {
        transform: [{ scale: 0.98 }], // 按压缩放
        shadowOpacity: 0.5 // 阴影变化
    },
});