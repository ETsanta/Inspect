import React, { useState, useRef, Children } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, FlatList, Alert } from 'react-native';
import { Button, Dialog } from "react-native-paper"
import Icon from 'react-native-vector-icons/MaterialIcons';
import BarcodeScanner from '../../components/Analyst';
import Select from "../../components/Select";


const FormRow: any = ({ children, label }) => {
    return (
        <View style={styles.rowContainer}>
            <Text style={styles.label}>{label}</Text>
            {children}
        </View>
    );
};
const FormButton: any = ({ children, label }) => {
    return (
        <View style={styles.rowContainer}>
            <Text style={styles.label}>{label}</Text>
            {children}
        </View>
    );
};
const Unqualified = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState('');
    const handleScanResult = (result: any) => {
        setIsScanning(false);
        const param = productList.filter((item) => item == result);
        if (param.length) {
            Alert.alert('请勿重复扫描', result)
            setVisible(false)
            return;
        }
        setScanResult(result);
        setVisible(true);
    };
    const [formData, setFormData] = useState({
        workStationCode: '',
    });
    const [productList, setProductList] = useState<string[]>([])

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
        setProductList(prevData => prevData.filter((item, index) => index !== i));
    }
    const renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            {/* 主要内容区域 */}
            <View style={styles.content}>
                <Text style={styles.itemText}>产品ID:<Text >{item}</Text></Text>
            </View>

            {/* 右侧操作按钮 */}
            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => confirmDelete(item, index)}
            >
                <Text style={styles.buttonText} >删除</Text>
            </TouchableOpacity>
        </View>
    );
    function productScreen() {
        setIsScanning(true)
    }
    const [visible, setVisible] = useState(false)
    const hideDialog = () => setVisible(false)
    const setList = () => {
        setProductList([...productList, scanResult])
        setVisible(false)
    }
    const [selectVisible, setSelectVisible] = useState(false)
    const onChangeText = (text: string) => {
        setFormData(prevState => ({ ...prevState, workStationCode: text }));
    }
    function getSelectValue(params: any) {
        setFormData(prevState => ({ ...prevState, workStationCode: params }))
    }
    const [labels, setLabels] = useState<string[]>(['10001', '10002', '10003'])

    return (
        <View style={{ flex: 1 }}>
            {isScanning ? (
                <BarcodeScanner
                    getScanResult={handleScanResult}
                />
            ) : (
                <View>
                    <FlatList
                        style={styles.container}
                        ListHeaderComponent={<>
                            <FormRow
                                label="工位条码"
                            >
                                <Text
                                    onPress={() => setSelectVisible(!selectVisible)}
                                    style={styles.input}
                                >{formData.workStationCode}</Text>
                            </FormRow>
                            <FormButton
                                label="产品列表"
                            ><TouchableOpacity style={styles.flashButton} onPress={productScreen}>
                                    <Text style={{ alignItems: 'center', width: '100%', textAlign: 'center' }}>
                                        <Icon name={"add"} size={24} color='#f194ff' />
                                    </Text>
                                </TouchableOpacity></FormButton>
                        </>}
                        data={productList}
                        renderItem={renderItem}
                        ListEmptyComponent={<Text style={styles.emptyText}>没有数据</Text>}
                        ListFooterComponent={
                            <View>
                                <Button
                                    style={styles.lastButton}
                                    buttonColor="#f194ff"
                                    textColor='white'
                                    onPress={() => Alert.alert('到此为止了。')}
                                >确认</Button>
                            </View>
                        } />
                </View>

            )}
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>扫码结果</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">产品编号：{scanResult}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setVisible(false)}>取消</Button>
                    <Button onPress={setList}>确认</Button>
                </Dialog.Actions>
            </Dialog>
            {selectVisible && <Select visible={selectVisible} labels={labels} onChildEvent={getSelectValue} value={formData.workStationCode}></Select>}
        </View>
    );
};
const styles = StyleSheet.create({
    flashButton: {
        width: '65%',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#f194ff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
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
        width: '30%',
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

export default Unqualified;