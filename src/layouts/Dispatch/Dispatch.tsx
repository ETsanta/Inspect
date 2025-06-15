import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Surface, Text, IconButton } from 'react-native-paper';
import Icon5 from 'react-native-vector-icons/MaterialIcons';


const menuForm = [
  {
    name: "检测转运",
    icon: "bug-report",
    path: "Detection"
  },
  {
    name: "合格产品转运",
    icon: "playlist-add-check",
    path: "Qualified"
  },
  {
    name: "维修转运",
    icon: "build-circle",
    path: "Maintenance"
  },
  {
    name: "修复转运",
    icon: "edit-attributes",
    path: "Repair"
  },
  {
    name: "出货转运",
    icon: "local-shipping",
    path: "Shipment"
  },
  {
    name: "产品出库",
    icon: "warehouse",
    path: "Outbound"
  },
  {
    name: "归还空货架",
    icon: "shelves",
    path: "Remove"
  },
  {
    name: "传呼空货架",
    icon: "emergency-share",
    path: "CallNull"
  }
]

export default function HomeScreen({ navigation }) {
  return (
    <FlatGrid
      itemDimension={80}
      data={menuForm}
      renderItem={({ item }) => (
        <View style={{ alignItems: 'center' }}>
          <IconButton
            icon={props => <Icon5 name={item.icon} {...props} color={"#35b8fe"} />}
            size={32}
            onPress={() => navigation.navigate(item.path)}
          />
          <Text variant="labelMedium">{item.name}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  body: {
    padding: 8,
    flexDirection: 'row',
    flex: 1,
    alignItems: ''
  },
});

