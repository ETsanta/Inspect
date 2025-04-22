import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Surface, Text, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/MaterialIcons';


const menuForm = [
  {
    name: "空货架返空",
    icon: "devices",
    path: "Remove"
  },
  {
    name: "呼叫空货架",
    icon: "devices",
    path: "Replenish"
  }
]

export default function SecondScreen({ navigation }) {
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
    flex: 1
  },
});

