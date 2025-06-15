import React, { useRef } from 'react';
import { FlatList, View, Alert, StyleSheet, Button } from 'react-native';
import { Text } from "react-native-paper"
import PDAInput, { PDAInputRef } from "../../components/Form"
import { Maintenance } from '../../api';


export default function Maintenances() {
    const inputRefs = {
        workStation: useRef<PDAInputRef>(null),
        shelvesCode: useRef<PDAInputRef>(null)
    };

    const menu = [
        { label: "工位", placeholder: "扫描工位编码", field: "workStation", Ref: inputRefs.workStation },
        { label: "货架编码", placeholder: "扫描货架编码", field: "shelvesCode", Ref: inputRefs.shelvesCode }
    ]

    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <PDAInput
            ref={item.Ref}
            label={item.label}
            placeholder={item.placeholder}
            required={true}
            errorMessage={item.label + "不能为空"}
            containerStyle={{ marginBottom: 20 }} />
    )

    const handleSubmit = () => {
        // 手动校验所有输入框
        const isWorkStation = inputRefs.workStation.current?.validate();
        const isShelvesCode = inputRefs.shelvesCode.current?.validate();

        if (!isShelvesCode || !isWorkStation) {
            Alert.alert('错误', '请填写所有必填字段');
            return;
        }

        // 获取值
        const workStation = inputRefs.workStation.current?.getValue();
        const shelvesCode = inputRefs.shelvesCode.current?.getValue();
        const param = {
            "workStationCode": workStation,
            "shelvesCode": shelvesCode
        }
        Maintenance(param).then((res) => {
            console.log("接受信息：", res);
            Alert.alert(res.msg);

            inputRefs.workStation.current?.clear();
            inputRefs.shelvesCode.current?.clear();
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
                    <Button title="提交" onPress={handleSubmit} />
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