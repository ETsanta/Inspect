import * as React from 'react';
import { FlatList, View, Alert, StyleSheet } from 'react-native';
import { Text, Button } from "react-native-paper"
import Form from "../../components/Form"


export default function Maintenance() {
    const [formData, setFormData]:any = React.useState({
        workStation: '',
        shelvesCode:""
    });
    const inputRefs = {
        workStation: React.useRef(null),
        shelvesCode: React.useRef(null)
    };

    const menu = [
        { label: "工位", placeholder: "扫描工位编码", feild: "workStation" },
        { label: "货架编码", placeholder: "扫描货架编码", feild: "shelvesCode" }
    ]
    const handleChange = (name: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [name]: value
        }));
    };
    const renderItem = ({ item, index }:{item:any,index:number}) => (
        <Form label={item.label}
            value={formData[item.feild]}
            onChangeText={(v: any) => handleChange(item.feild, v)}
            placeholder={item.placeholder}
        ></Form>
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
                        onPress={() => Alert.alert('到此为止了。')}
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