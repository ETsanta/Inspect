import React, { useState, useRef, useEffect } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    FlatList,
    View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toPath, toClean, toPda } from "../../store/slices/setSlice";
import { Button, Switch } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';


const FormRow: any = ({ children, label, onButtonPress, }) => {
    return (
        <View style={styles.rowContainer}>
            <Text style={styles.label}>{label}</Text>
            {children}
        </View>
    );
};

let Clear = false;
let Pda = false;

AsyncStorage.getItem('clear')
    .then(value => {
        console.log("clear", value);
        Clear = (value == "1" ? true : false);
        console.log("Clear", Clear);
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });
AsyncStorage.getItem('pda')
    .then(value => {
        console.log("pda", value);
        Pda = (value == "1" ? true : false);
        console.log("Pda", Pda);
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });


export default function Config() {
    const clean = useSelector(state => state.counter.set.clean)
    const pda = useSelector(state => state.counter.set.pda)

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const [formData, setFormData] = useState({
        clear: Clear,
        show: Pda,
    });
    const dispatch = useDispatch()

    const onClearSwitch = () => {
        setFormData(prev => {
            const newData = { ...prev, clear: !prev.clear };
            return newData;
        });
    };
    const onShowSwitch = () => {
        setFormData(prev => {
            const newData = { ...prev, show: !prev.show };
            return newData;
        });
    };
    const [configData, setProductList] = useState([
        {
            title: '自动清除',
            label: (prev: any) => { return prev.clear },
            func: onClearSwitch,
        },
        {
            title: '是否为PDA',
            label: (prev: any) => { return prev.show },
            func: onShowSwitch,
        }
    ])
    const renderItem = ({ item, index }) => (
        <FormRow
            label={item.title}
        ><Switch value={item.label(formData)} onValueChange={item.func}></Switch></FormRow>
    );
    function setSave() {
        // dispatch(toClean({ 'clean': formData.clear }))
        // dispatch(toPda({ 'pda': formData.show }))
        console.log("clean", formData.clear, formData.show);
        AsyncStorage.setItem('clear', formData.clear ? "1" : "0");
        AsyncStorage.setItem('pda', formData.show ? "1" : "0");
        Clear = formData.clear;
        Pda = formData.show;
    }
    return (
        <FlatList
            style={styles.container}
            data={configData}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.emptyText}>没有数据</Text>}
            ListFooterComponent={
                <View>
                    <Button style={styles.lastButton} buttonColor="#f194ff" onPress={setSave} >保存</Button>
                </ View>
            }
        />
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff'
    },
    lastButton: {
        marginBottom: 20,
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
        padding: 15,
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    pressedState: {
        transform: [{ scale: 0.98 }], // 按压缩放
        shadowOpacity: 0.5 // 阴影变化
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 12,
    },
    label: {
        width: 150,
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
});