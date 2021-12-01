import ShopNavigator from './ShopNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import OrderNavigator from '../navigation/OrderNavigator';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={ShopNavigator}
        options={{
          drawerLabel: 'Products',
          drawerIcon: (config) => {
            return (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={config.color}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrderNavigator}
        options={{
          drawerLabel: 'Orders',
          drawerIcon: (config) => {
            return (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={config.color}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
