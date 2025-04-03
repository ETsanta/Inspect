import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../layouts/HomeScreen";
import SettingScreen from "../layouts/SettingScreen";
import SelfScreen from "../layouts/SelfScreen";
import { StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import TodayTask from "../app/TodayTask/index";
import ReportScreen from "../layouts/ReportScreen"
import RecordScreen from "../layouts/RecordScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="TodayTask"
      screenOptions={{ tabBarActiveTintColor: '#22a33b', }} >
      <Tab.Screen name="TodayTask" component={TodayTask} options={{
        headerShown: false,
        tabBarLabel: '今日任务',
        title: '今日任务',
        tabBarIcon: ({ color, size }) => (
          <Icon name="check-square-o" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="ReportScreen" component={ReportScreen} options={{
        tabBarLabel: '汇报问题',
        headerShown: false,
        title: "汇报问题",
        tabBarIcon: ({ color, size }) => (
          <Icon name="window-maximize" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="RecordScreen" component={RecordScreen} options={{
        tabBarLabel: '任务记录',
        headerShown: false,
        title: "任务记录",
        tabBarIcon: ({ color, size }) => (
          <Icon name="calendar" size={size} color={color} />
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