import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../layouts/HomeScreen";
import SettingScreen from "../layouts/SettingScreen";
import SelfScreen from "../layouts/SelfScreen";
import { StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
    initialRouteName="check"
    screenOptions={{ tabBarActiveTintColor: '#22a33b', }} >
      <Tab.Screen name="check" component={HomeScreen}  options={{
          headerShown: false,
          tabBarLabel:'主页',
          title:'主页',
          tabBarIcon: ({ color, size }) => (
            <Icon name="check-square-o" size={size} color={color} />
           ),}}/>
      <Tab.Screen name="out-off" component={SettingScreen} options={{
          tabBarLabel:'移出/补货',
          headerShown: false,
          title:"移出/补货",
          tabBarIcon: ({ color, size }) => (
          <Icon name="road" size={size} color={color} />
          ),}}/>
      <Tab.Screen name="self" component={SelfScreen} options={{
          tabBarLabel:'我的',
          headerShown: false,
          title:'我的',
          tabBarIcon: ({ color, size }) => (
          <Icon name="github-alt" size={size} color={color} />
      ),}}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({

   tabBarIconStyle: {
      width: 30,
      height: 30,
   },
});