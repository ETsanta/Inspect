import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import { TextInput, Button } from 'react-native-paper';




export default function SecondScreen() {
    const [formData, setFormData]: any = useState({ field1: '', field2: '', field3: '', field4: '', field5: '', field6: '' })

    const fields = [
        {
            titele: "字段1",
            field: 'field1',
        },
        {
            titele: "字段2",
            field: 'field2',
        },
        {
            titele: "字段3",
            field: 'field3',
        },
        {
            titele: "字段4",
            field: 'field4',
        },
        {
            titele: "字段5",
            field: 'field5',
        },
        {
            titele: "字段226",
            field: 'field6',
        }
    ]
    return (
        
        <View>
            <ScrollView >
                {
                    fields.map((item, index) => {
                        return <TextInput key={index} label={item.titele} value={formData[item.field]} onChangeText={(text) => setFormData({ ...formData, [item.field]: text })} />;
                    })
                }
            </ScrollView>

            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                提交
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({});

