import React, { useRef, useState } from 'react';
import { FlatList, View, Alert, StyleSheet } from 'react-native';
import { Text, Button } from "react-native-paper"
import PDAInput, { PDAInputRef } from '../../components/Form';
import { CallNull } from '../../api';
import Dropdown, { DropdownRef, DropdownOption } from "../../components/CustomSelect"


export default function CallNulls() {
    const inputRefs = {
        wbCodeRef: useRef<PDAInputRef>(null),
        podTypRef: useRef<DropdownRef>(null)
    };

    const menu = [
        { label: "呼叫工位", placeholder: "扫描呼叫工位", field: "wbCode", Ref: inputRefs.wbCodeRef },
        { label: "货架类型", placeholder: "选择货架类型", field: "podTyp", Ref: inputRefs.podTypRef }
    ]

    const [Options, setOptions] = useState([
        {
            label: "三层货架",
            value: "ZG"
        },
        {
            label: "两层货架",
            value: "GZ"
        }
    ])
    const renderItem = ({ item, index }: { item: any, index: number }) => (
        (item.field == "wbCode" && <PDAInput
            ref={item.Ref}
            label={item.label}
            placeholder={item.placeholder}
            required={true}
            errorMessage={item.label + "不能为空"}
            containerStyle={{ marginBottom: 20 }}
        ></PDAInput>)
        ||
        <View>
            <Text style={styles.label}>工单选择</Text>
            <Dropdown
                ref={inputRefs.podTypRef}
                options={Options}
                placeholder="请选择工单"
                required={true}
                onSelect={(item) => console.log('选中工单:', item)}
            />
        </View>
    );
    const handleSubmit = () => {
        const isWbCode = inputRefs.wbCodeRef.current?.validate();
        const isPodTyp = inputRefs.podTypRef.current?.validate();

        if (!isWbCode && !isPodTyp) {
            Alert.alert('错误', '请填写所有必填字段');
            return;
        }

        // 获取值
        const wbCode = inputRefs.wbCodeRef.current?.getValue();
        const podTyp = inputRefs.podTypRef.current?.getValue();

        const param = {
            "wbCode": wbCode,
            "podTyp": podTyp
        }
        CallNull(param).then((res) => {
            console.log("接受信息：", res);
            Alert.alert(res.msg);

            inputRefs.wbCodeRef.current?.clear();
            inputRefs.podTypRef.current?.reset();
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
    },
    label: {
        fontSize: 16,
        marginBottom: 12,
        color: '#34495e',
        fontWeight: '500',
    },
});