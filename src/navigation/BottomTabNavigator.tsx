import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../layouts/HomeScreen";
import SettingScreen from "../layouts/SettingScreen";
import SelfScreen from "../layouts/SelfScreen";
import { StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import Dispatch from "../layouts/Dispatch/Dispatch"



const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Dispatch"
      screenOptions={{ tabBarActiveTintColor: '#36b8fe', }} >
      <Tab.Screen name="Dispatch" component={Dispatch} options={{
        headerShown: false,
        tabBarLabel: '调度任务',
        title: '调度任务',
        tabBarIcon: ({ color, size }) => (
          <Icon name="check-square-o" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="self" component={SelfScreen} options={{
        tabBarLabel: '我的',
        headerShown: false,
        title: '我的',
        tabBarIcon: ({ color, size }) => (
          <Icon name="github-alt" size={size} color={color} />
        ),
      }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarIconStyle: {
    width: 30,
    height: 30,
  },
});