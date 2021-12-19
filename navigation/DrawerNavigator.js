import ShopNavigator from './ShopNavigator';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Button } from 'react-native';
import OrderNavigator from '../navigation/OrderNavigator';
import { View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import AdminNavigator from './AdminNavigator';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
        <Button
          title="Logout"
          color={Colors.primary}
          onPress={() => {
            dispatch(authActions.logout());
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
      <Drawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerLabel: 'User Products',
          drawerIcon: (config) => {
            return (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
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
