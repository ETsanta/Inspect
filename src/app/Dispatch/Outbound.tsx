import React, { useRef } from 'react';
import { FlatList, View, Alert, StyleSheet } from 'react-native';
import { Text, Button } from "react-native-paper"
import PDAInput, { PDAInputRef } from '../../components/Form';
import { Outbound } from '../../api';


export default function Outbounds() {
    const [formData, setFormData]: any = React.useState({
        shelvesCode: ''
    });
    const inputRefs = {
        shelvesCode: useRef<PDAInputRef>(null)
    };

    const menu = [
        { label: "货架编码", placeholder: "扫描货架编码", feild: "shelvesCode", Ref: inputRefs.shelvesCode },
    ]
    const handleChange = (name: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        const isShelvesCode = inputRefs.shelvesCode.current?.validate();

        if (!isShelvesCode) {
            Alert.alert('错误', '请填写所有必填字段');
            return;
        }

        // 获取值
        const shelvesCode = inputRefs.shelvesCode.current?.getValue();
        const param = {
            "shelvesCode": shelvesCode,
        }
        Outbound(param).then((res) => {
            console.log("接受信息：", res);
            Alert.alert(res.msg);

            inputRefs.shelvesCode.current?.clear();
        })

    };
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