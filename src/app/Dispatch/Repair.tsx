import React, { useRef, useState, useEffect } from 'react';
import { FlatList, View, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PDAInput, { PDAInputRef } from "../../components/Form"
import { Button } from "react-native-paper"
import { Repair } from '../../api';


export default function Repairs() {
    const [formData, setFormData]: any = React.useState({
        workStation: '',
        shelvesCode: "",
        count: ""
    });


    const inputRefs = {
        workStation: useRef<PDAInputRef>(null),
        shelvesCode: useRef<PDAInputRef>(null),
        count: useRef<PDAInputRef>(null),
        product: useRef<PDAInputRef>(null),
    };
    const [productList, setProductList]: any = useState([])
    const menu = [
        { label: "维修工位", placeholder: "扫描维修工位", feild: "workStation", Ref: inputRefs.workStation },
        { label: "货架编码", placeholder: "扫描货架编码", feild: "shelvesCode", Ref: inputRefs.shelvesCode },
        { label: "产品数量", placeholder: "请扫描产品", feild: "count", Ref: inputRefs.count },
        { label: "扫入产品", placeholder: "扫入产品", feild: "product", Ref: inputRefs.product },
    ]
    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <View key={item} style={styles.itemContainer}>
            <View style={styles.content}>
                <Text style={styles.itemText}>产品ID:<Text >{item}</Text></Text>
            </View>
            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => confirmDelete(item, index)}
            >
                <Text style={styles.buttonText} >删除</Text>
            </TouchableOpacity>
        </View>
    );
    const handleSubmit = () => {
        // 手动校验所有输入框
        const isWorkStation = inputRefs.workStation.current?.validate();
        const isShelvesCode = inputRefs.shelvesCode.current?.validate();
        const isCount = inputRefs.count.current?.getValue() == productList.length;

        if (!isShelvesCode || !isWorkStation || !isCount || !productList.length) {
            Alert.alert('错误', '请填写所有必填字段');
            return;
        }

        // 获取值
        const workStation = inputRefs.workStation.current?.getValue();
        const shelvesCode = inputRefs.shelvesCode.current?.getValue();
        const param = {
            "workStationCode": workStation,
            "shelvesCode": shelvesCode,
            "productCodes": productList
        }
        Repair(param).then((res) => {
            console.log("接受信息：", res);
            Alert.alert(res.msg);

            inputRefs.workStation.current?.clear();
            inputRefs.shelvesCode.current?.clear();
            inputRefs.product.current?.clear();
            inputRefs.count.current?.clear();
            setProductList([]);
        })


    };
    function addCount(val: any) {
        const result = productList.find((item) => {
            return item == val
        })
        if (!result && val) {
            setProductList([...productList, val])
        }
    }

    useEffect(() => {
        inputRefs.count.current?.setValue(productList.length)
        console.log(productList.length);

    }, [productList]);
    const confirmDelete = (item: any, index: any) => {
        Alert.alert(
            '删除确认',
            `确定要删除 ${item} 吗？`,
            [
                { text: '取消', style: 'cancel' },
                { text: '删除', onPress: () => delProduct(item, index) }
            ]
        );
    };

    const delProduct = (e, i) => {
        setProductList((prevData: any) => prevData.filter((item, index) => index !== i));
    }
    return (
        <FlatList
            style={styles.container}
            data={productList}
            renderItem={renderItem}
            ListHeaderComponent={
                <>
                    {menu.map((item: any, index: number) => (item.feild != "product" && <PDAInput
                        key={item.feild}
                        ref={item.Ref}
                        label={item.label}
                        placeholder={item.placeholder}
                        required={true}
                        errorMessage={item.label + "不能为空"}
                        containerStyle={{ marginBottom: 20 }}
                    />) ||
                        <PDAInput
                            ref={item.Ref}
                            key={item.feild}
                            label={item.label}
                            placeholder={item.placeholder}
                            errorMessage={item.label + "不能为空"}
                            onChangeText={addCount}
                            containerStyle={{ marginBottom: 20 }}
                        />)}
                </>
            }
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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    actionButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6
    },
    buttonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '500'
    },
    content: {
        flex: 1,
        marginRight: 16
    },
    itemText: {
        fontSize: 16,
        color: '#333'
    },
});