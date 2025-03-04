import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Button } from "react-native-paper";
import { Picker } from 'react-native-wheel-pick';


export default function CustomScrollPicker({ visible, labels, onChildEvent, value }) {
  const [selectedValue, setSelectedValue] = useState(value ? value : labels[0]);
  const [selectVisible, setSelectVisible] = useState(visible);
  const sendDataToParent = () => {
    onChildEvent(selectedValue); // 调用父组件的回调函数并传递数据 
  };
  const hideDialog = () => setSelectVisible(false);

  return (
    <Dialog visible={selectVisible} onDismiss={hideDialog}>
      <Dialog.Content>
        <Picker
          style={{ backgroundColor: 'white' }}
          selectBackgroundColor='#2cacec1A'
          selectedValue={selectedValue}
          pickerData={labels}
          onValueChange={(value: any) => { setSelectedValue(value), sendDataToParent() }}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => setSelectVisible(false)}>取消</Button>
        <Button onPress={() => { setSelectedValue(value), sendDataToParent(), setSelectVisible(false) }}>确定</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

const styles = StyleSheet.create({});