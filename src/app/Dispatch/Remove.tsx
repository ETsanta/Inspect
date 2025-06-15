import React, { useRef } from 'react';
import { FlatList, View, Alert, StyleSheet } from 'react-native';
import { Text, Button } from "react-native-paper"
import PDAInput, { PDAInputRef } from '../../components/Form';
import { Remove } from '../../api';


export default function Removes() {
    const inputRefs = {
        workStationRef: useRef<PDAInputRef>(null),
        shelvesCodeRef: useRef<PDAInputRef>(null)
    };

    const menu = [
        { label: "所在地码", placeholder: "扫描所在地码", field: "workStation", Ref: inputRefs.workStationRef },
        { label: "货架编码", placeholder: "扫描货架编码", field: "shelvesCode", Ref: inputRefs.shelvesCodeRef }
    ]
    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <PDAInput
            ref={item.Ref}
            label={item.label}
            placeholder={item.placeholder}
            required={true}
            errorMessage={item.label + "不能为空"}
            containerStyle={{ marginBottom: 20 }}
        ></PDAInput>
    );
    const handleSubmit = () => {
        const isShelvesCode = inputRefs.shelvesCodeRef.current?.validate();
        const isWorkStation = inputRefs.workStationRef.current?.validate();

        if (!isShelvesCode && !isWorkStation) {
            Alert.alert('错误', '请填写所有必填字段');
            return;
        }

        // 获取值
        const shelvesCode = inputRefs.shelvesCodeRef.current?.getValue();
        const workStation = inputRefs.workStationRef.current?.getValue();

        const param = {
            "shelvesCode": shelvesCode,
            "workStationCode": workStation
        }
        Remove(param).then((res) => {
            console.log("接受信息：", res);
            Alert.alert(res.msg);

            inputRefs.shelvesCodeRef.current?.clear();
            inputRefs.workStationRef.current?.clear();
        })

    };

    return (


        <FlatList
            style={styles.container}
            data={menu}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.emptyText}>没有数据</Text>}
            ListFooterComponent={
                <View>
                    <Button
                        style={styles.lastButton}
                        buttonColor="#f194ff"
                        textColor='white'
                        onPress={handleSubmit}
                    >确认</Button>
                </View>
            } />

    )
}

const styles = StyleSheet.create({
    lastButton: {
        marginBottom: 20,
    },
    container: {
        padding: 16,
        backgroundColor: '#fff'
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 40,
        fontSize: 16
    }
});