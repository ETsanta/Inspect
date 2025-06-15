import React, { useRef } from 'react';
import { View, Button, Alert, FlatList, Text, StyleSheet } from 'react-native';
import PDAInput, { PDAInputRef } from '../../components/Form';
import { detection } from '../../api';

const App = () => {
    const workStationRef = useRef<PDAInputRef>(null);
    const workorderCodeRef = useRef<PDAInputRef>(null);

    const menu = [
        { label: "工位", placeholder: "扫描工位编码", field: "workStation", Ref: workStationRef },
        { label: "工单编号", placeholder: "扫描工单编号", field: "workCode", Ref: workorderCodeRef }
    ]

    const handleSubmit = () => {
        const isWorkStation = workStationRef.current?.validate();
        const isWorkorderCode = workorderCodeRef.current?.validate();

        if (!isWorkorderCode || !isWorkStation) {
            Alert.alert('错误', '请填写所有必填字段');
            return;
        }

        // 获取值
        const workStation = workStationRef.current?.getValue();
        const workorderCode = workorderCodeRef.current?.getValue();
        const param = {
            "workStationCode": workStation,
            "workorderCode": workorderCode
        }
        detection(param).then((res) => {
            console.log("接受信息：", res);
            Alert.alert(res.msg);
            
            workStationRef.current?.clear();
            workorderCodeRef.current?.clear();
        })

    };

    const handleClearAll = () => {
    };

    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <PDAInput
            ref={item.Ref}
            label={item.label}
            placeholder={item.placeholder}
            required={true}
            errorMessage={item.label + "不能为空"}
            containerStyle={{ marginBottom: 20 }}
        />
    );

    return (

        <FlatList
            style={styles.container}
            data={menu}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.emptyText}>没有数据</Text>}
            ListFooterComponent={
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button title="提交" onPress={handleSubmit} />
                    <Button title="清空" onPress={handleClearAll} color="#999" />
                </View>
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
    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 40,
        fontSize: 16
    }
});

export default App;