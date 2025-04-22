import React from 'react';
import Window from './src/app/home/Window';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { PortalProvider } from '@gorhom/portal';
import { store, persistor } from './src/store/index'
import SelfScreen from "./src/layouts/SelfScreen";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import Qualified from "./src/app/home/Qualified";
import unQualified from "./src/app/home/Unqualified";
import resetQualified from "./src/app/home/ResetQualified";
import Replenish from "./src/app/second/Replenish";
import Remove from "./src/app/second/Remove";
import SetConfig from "./src/app/three/SetConfig";
import About from "./src/app/three/About";
import Help from "./src/app/three/Help";

//初始化基础路由
const Stack = createStackNavigator(); //基础路由

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<Window />} persistor={persistor}>
        <PortalProvider>
          <NavigationContainer>
            <Stack.Navigator mode="modal">
              <Stack.Screen name="Home" options={{ title: '主体', headerShown: false }} component={BottomTabNavigator} />
              <Stack.Screen name="SelfScreen" options={{ title: '用户列表' }} component={SelfScreen} />
              <Stack.Screen name="AllBill" options={{ title: '所有订单' }} component={SelfScreen} />
              <Stack.Screen name="Replenish" options={{ title: '补充空货架' }} component={Replenish} />
              <Stack.Screen name="Remove" options={{ title: '移出空货架' }} component={Remove} />
              <Stack.Screen name="Qualified" options={{ title: '合格产品登记' }} component={Qualified} />
              <Stack.Screen name="ResetQualified" options={{ title: '重登记合格' }} component={resetQualified} />
              <Stack.Screen name="Unqualified" options={{ title: '不合格产品登记' }} component={unQualified} />
              <Stack.Screen name="SetConfig" options={{ title: '设置' }} component={SetConfig} />
              <Stack.Screen name="About" options={{ title: '关于' }} component={About} />
              <Stack.Screen name="Help" options={{ title: '帮助' }} component={Help} />
            </Stack.Navigator>
          </NavigationContainer>
        </PortalProvider>
      </PersistGate>
    </Provider>
  );
}
