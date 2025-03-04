import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Surface, Text, IconButton } from 'react-native-paper';
import Icon5 from 'react-native-vector-icons/MaterialIcons';


const menuForm = [
  {
    name: "标记合格",
    icon: "smart-toy",
    path: "Qualified"
  },
  {
    name: "标记不合格",
    icon: "smart-toy",
    path: "Unqualified"
  },
  {
    name: "重置产品",
    icon: "smart-toy",
    path: "ResetQualified"
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
            icon={props => <Icon5 name={item.icon} {...props} />}
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

