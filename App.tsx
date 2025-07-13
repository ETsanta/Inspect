import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import Window from './src/app/home/Window';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { PortalProvider } from '@gorhom/portal';
import { store, persistor } from './src/store/index'
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import Qualified from "./src/app/Dispatch/Qualified";
import Remove from "./src/app/Dispatch/Remove";
import SetConfig from "./src/app/three/SetConfig";
import About from "./src/app/three/About";
import Help from "./src/app/three/Help";
import Detection from "./src/app/Dispatch/Detection"
import Maintenance from "./src/app/Dispatch/Maintenance"
import Repair from "./src/app/Dispatch/Repair"
import Shipment from "./src/app/Dispatch/Shipment"
import Outbound from "./src/app/Dispatch/Outbound"
import CallNull from "./src/app/Dispatch/CallNull"
import RegisterScreen from './src/app/Keygen/RegisterScreen';
import { checkRegistration } from './src/untils/licenseUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const Appcation = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Window />} persistor={persistor}>
        <PortalProvider>
          <NavigationContainer>
            <Stack.Navigator mode="modal">
              <Stack.Screen name="Home" options={{ title: 'body', headerShown: false }} component={BottomTabNavigator} />
              <Stack.Screen name="Detection" options={{ title: '检测转运' }} component={Detection} />
              <Stack.Screen name="Qualified" options={{ title: '合格产品转运' }} component={Qualified} />
              <Stack.Screen name="Maintenance" options={{ title: '维修转运' }} component={Maintenance} />
              <Stack.Screen name="Repair" options={{ title: '修复转运' }} component={Repair} />
              <Stack.Screen name="Shipment" options={{ title: '出货转运' }} component={Shipment} />
              <Stack.Screen name="Outbound" options={{ title: '产品出库' }} component={Outbound} />
              <Stack.Screen name="Remove" options={{ title: '归还货架' }} component={Remove} />
              <Stack.Screen name="CallNull" options={{ title: '传呼空货架' }} component={CallNull} />
              <Stack.Screen name="SetConfig" options={{ title: '设置' }} component={SetConfig} />
              <Stack.Screen name="About" options={{ title: '关于' }} component={About} />
              <Stack.Screen name="Help" options={{ title: '帮助' }} component={Help} />
            </Stack.Navigator>
          </NavigationContainer>
        </PortalProvider>
      </PersistGate>
    </Provider>
  );
};

const AuthApp = () => (
  <Provider store={store}>
    <PersistGate loading={<Window />} persistor={persistor}>
      <PortalProvider>
        <NavigationContainer>
          <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Register" component={RegisterScreen} />
          </AuthStack.Navigator>
        </NavigationContainer>
      </PortalProvider>
    </PersistGate>
  </Provider>
);
export default function App() {
  const [isRegistered, setIsRegistered] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 检查注册状态
  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const registered = await checkRegistration();
        setIsRegistered(registered);
      } catch (error) {
        console.error('注册检查失败:', error);
        setIsRegistered(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkRegistrationStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>检查许可证状态...</Text>
      </View>
    );
  }

  return isRegistered ? <Appcation /> : <AuthApp />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#7f8c8d',
  },
});