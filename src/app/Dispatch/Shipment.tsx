import React, { useRef, useState } from 'react';
import { FlatList, View, Alert, StyleSheet, Button } from 'react-native';
import { Text } from "react-native-paper"
import PDAInput, { PDAInputRef } from "../../components/Form"
import Dropdown, { DropdownRef, DropdownOption } from "../../components/CustomSelect"
import { Shipment } from '../../api';


export default function Shipments() {
    const inputRefs = {
        workStation: useRef<PDAInputRef>(null),
        workOrderCode: useRef<DropdownRef>(null)
    };
    const cityOptions: DropdownOption[] = [
        { label: '北京', value: 'bj' },
        { label: '上海', value: 'sh' },
    ];
    const menu = [
        { label: "出货工位", placeholder: "扫描出货工位", feild: "workStation", Ref: inputRefs.workStation },
        { label: "工单编码", placeholder: "扫描工单编码", feild: "workOrderCode", Ref: inputRefs.workOrderCode }
    ]

    const [country, setCountry] = useState("");

    const renderItem = ({ item, index }: { item: any, index: number }) => (
        (item.feild == "workStation" && (<PDAInput
            ref={item.Ref}
            label={item.label}
            placeholder={item.placeholder}
            required={true}
            errorMessage={item.label + "不能为空"}
            containerStyle={{ marginBottom: 20 }} />))
        ||
        <View>
            <Text style={styles.label}>工单选择</Text>
            <Dropdown
                ref={inputRefs.workOrderCode}
                options={cityOptions}
                placeholder="请选择国家"
                required={true}
                onSelect={(item) => console.log('选中国家:', item)}
            />
        </View>
    )

    const handleSubmit = () => {
        if (!cityOptions.length) {
            Alert.alert("未找到有效的工单列表，请尝试换个出货工位")
            return false
        };
        const isWorkStation = inputRefs.workStation.current?.validate();
        const isShelvesCode = inputRefs.workOrderCode.current?.validate();

        if (!isShelvesCode || !isWorkStation) {
            Alert.alert('错误', '请填写所有必填字段');
            return;
        }

        // 获取值
        const workStation = inputRefs.workStation.current?.getValue();
        const shelvesCode = inputRefs.workOrderCode.current?.getValue();
        const param = {
            "workStationCode": workStation,
            "workOrderCode": shelvesCode
        }
        Shipment(param).then((res) => {
            console.log("接受信息：", res);
            Alert.alert(res.msg);
        })

        inputRefs.workStation.current?.clear();
        inputRefs.workOrderCode.current?.clear();
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
    },
    label: {
        fontSize: 16,
        marginBottom: 12,
        color: '#34495e',
        fontWeight: '500',
    },
});