import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, FlatList, Alert } from 'react-native';
import { List, Button } from "react-native-paper"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux'

// 可复用的表单项组件
const FormRow: any = ({ label, value, onChangeText, onButtonPress, icon = 'center-focus-weak', showButton = true }) => {
    const inputRef: any = useRef(null);
    return (
        <View style={styles.rowContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                ref={inputRef}
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={`请输入${label}`}
            />
            {showButton && (
                <TouchableOpacity onPress={() => {
                    onButtonPress(); // 执行按钮逻辑
                    // inputRef.current.focus(); // 聚焦输入框
                }} style={styles.button}>
                    <Icon name={icon} size={20} color="#666" />
                </TouchableOpacity>
            )}
        </View>
    );
};
const Qualified = () => {
    const [shelveForm, setShelveForm] = useState({ workOrderCode: '1000050608', productCode: '200001506', productStatus: '3', materialCode: '3' }); // 初始化表单数据
    const [formData, setFormData] = useState({
        workStationCode: '',
        shelvesCode: '',
    });

    const IzClean = useSelector(state => state.counter.set.clean)
    const [productList, setProductList] = useState(['123', '234', '345'])

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
        Alert.alert('扫码正在开发中。。。')
    }
    function sumbitQualified() {
        clean()
    }
    function clean() {
        if (IzClean) {
            setShelveForm({ workOrderCode: '', productCode: '', productStatus: '', materialCode: '' })
            setFormData({
                workStationCode: '',
                shelvesCode: '',
            })
            setProductList([])
        }
    }
    return (
        <FlatList
            style={styles.container}
            ListHeaderComponent={<>
                <FormRow
                    label="工位条码"
                    value={formData.workStationCode}
                    onChangeText={(text: string) => setFormData({ ...formData, workStationCode: text })}
                    showButton={false}
                />
                <FormRow
                    label="货架条码"
                    value={formData.shelvesCode}
                    onChangeText={(text: string) => setFormData({ ...formData, shelvesCode: text })}
                    showButton={false}
                />
                <List.Section>
                    <List.Accordion title="货架携带信息" expanded={AccordionFlag} onPress={() => setAccordionFlag(!AccordionFlag)}>
                        <List.Item title="工单编码" description={shelveForm.workOrderCode} left={() => <List.Icon icon="clipboard-text" />} />
                        <List.Item title="物料编码" description={shelveForm.productCode} left={() => <List.Icon icon="ballot" />} />
                        <List.Item title="产品数量" description={shelveForm.materialCode} left={() => <List.Icon icon="counter" />} />
                        <List.Item title="产品状态" description={shelveForm.productStatus == '1' ? '合格' : shelveForm.productStatus == '2' ? '不合格' : shelveForm.productStatus == '3' ? '待检测' : '记录异常'} left={() => <List.Icon icon="help-circle" />} />
                    </List.Accordion>
                </List.Section>
                <FormRow
                    label="产品列表"
                    value={formData.shelvesCode}
                    onChangeText={(text: string) => setFormData({ ...formData, shelvesCode: text })}
                    icon="fit-screen"
                    onButtonPress={productScreen}
                />
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

export default Qualified;