import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, FlatList, Alert } from 'react-native';
import { List, Button } from "react-native-paper"
import PDAInput, { PDAInputRef } from '../../components/Form';
import { getShelvesInfoByCode, Qualified } from '../../api';


const Qualifieds = () => {
    const [shelveForm, setShelveForm] = useState({ workorderCode: '', loadItemCode: '', itemState: '', loadItemNumber: '' }); // 初始化表单数据
    const workStationRef = useRef<PDAInputRef>(null);
    const shelvesRef = useRef<PDAInputRef>(null);
    const productRef = useRef<PDAInputRef>(null);

    const menu = [
        { label: "工位", placeholder: "扫描工位编码", feild: "workStation", Ref: workStationRef },
        { label: "货架编码", placeholder: "扫描工单编号", feild: "workCode", Ref: shelvesRef },
        { label: "产品编码", placeholder: "扫描货架编码", feild: "workCode", Ref: productRef }
    ]
    const [productList, setProductList]: any = useState([])

    const [AccordionFlag, setAccordionFlag] = useState(true);
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
    const renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
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
    function sumbitQualified() {
        const isWorkStation = workStationRef.current?.validate();
        const isShelvese = shelvesRef.current?.validate();
        const length = productList.length;
        if (!isWorkStation || !isShelvese || !length) {
            Alert.alert('错误', '请检查上传信息');
            return;
        }
        let param = {
            "workStationCode": workStationRef.current?.getValue(),
            "shelvesCode": shelvesRef.current?.getValue(),
            "loadItemCount": length,
            "loadItemCode": shelveForm.loadItemCode,
            "workorderCode": shelveForm.workorderCode,
            "scanItemCount": length,
            "scanProductCodes": productList,
            "productState": 1
        }
        Qualified(param).then((data) => {
            Alert.alert(data.msg);
            workStationRef.current?.clear()
            shelvesRef.current?.clear()
            productRef.current?.clear()
            setShelveForm({ workorderCode: '', loadItemCode: '', itemState: '', loadItemNumber: '' })
            setProductList([])
        })

    }
    function addProduct(val: any) {
        const result = productList.find((item) => {
            return item == val
        })
        if (!result && val) {
            setProductList([...productList, val])
        }
    }
    function getShelvesInfo(val: any) {
        if (!val) return;
        let param = {
            shelvesCode: val
        }
        console.log(val);

        getShelvesInfoByCode(param).then((data) => {
            console.log(data.data);
            setShelveForm(data.data)
        }).catch(() => {
            shelvesRef.current?.clear();
        })
    }

    return (
        <FlatList
            style={styles.container}
            ListHeaderComponent={<>
                <PDAInput
                    ref={menu[0].Ref}
                    label={menu[0].label}
                    placeholder={menu[0].placeholder}
                    required={true}
                    errorMessage={menu[0].label + "不能为空"}
                    containerStyle={{ marginBottom: 20 }}
                />
                <PDAInput
                    ref={menu[1].Ref}
                    label={menu[1].label}
                    placeholder={menu[1].placeholder}
                    required={true}
                    errorMessage={menu[1].label + "不能为空"}
                    containerStyle={{ marginBottom: 20 }}
                    onChangeText={getShelvesInfo}
                />
                <PDAInput
                    ref={menu[2].Ref}
                    label={menu[2].label}
                    placeholder={menu[2].placeholder}
                    errorMessage={menu[2].label + "不能为空"}
                    containerStyle={{ marginBottom: 20 }}
                    onChangeText={addProduct}
                />
                <List.Section>
                    <List.Accordion title="货架信息" expanded={AccordionFlag} onPress={() => setAccordionFlag(!AccordionFlag)}>
                        <List.Item title="工单编码" description={shelveForm.workorderCode} left={() => <List.Icon icon="clipboard-text" />} />
                        <List.Item title="物料编码" description={shelveForm.loadItemCode} left={() => <List.Icon icon="ballot" />} />
                        <List.Item title="产品数量" description={shelveForm.loadItemNumber} left={() => <List.Icon icon="counter" />} />
                        <List.Item title="产品状态" description={shelveForm.itemState == '1' ? '合格' : shelveForm.itemState == '2' ? '不合格' : shelveForm.itemState == '3' ? '待检测' : '记录异常'} left={() => <List.Icon icon="help-circle" />} />
                    </List.Accordion>
                </List.Section>
            </>}
            data={productList}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.emptyText}>没有数据</Text>}
            ListFooterComponent={
                <Button
                    style={styles.lastButton}
                    buttonColor="#f194ff"
                    textColor='white'
                    onPress={sumbitQualified}
                >确认</Button>
            } />
    );
};
const styles = StyleSheet.create({
    lastButton: {
        marginBottom: 20,
    },
    container: {
        padding: 16,
        backgroundColor: '#fff'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 12,
    },
    label: {
        width: 80,
        fontSize: 16,
        color: '#333',
        marginRight: 8
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 8,
        paddingRight: 8
    },
    button: {
        padding: 8,
        marginLeft: 8
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
    content: {
        flex: 1,
        marginRight: 16
    },
    itemText: {
        fontSize: 16,
        color: '#333'
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
    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 40,
        fontSize: 16
    }
});

export default Qualifieds;