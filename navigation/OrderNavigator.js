import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import HeaderButton from '../components/UI/HeaderButton';
import OrdersScreen from '../screens/shop/OrdersScreen';

const OrderStack = createNativeStackNavigator();

const OrderNavigator = () => {
  return (
    <OrderStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.secondary : '',
        },
        headerTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
          fontFamily: 'open-sans',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      }}
    >
      <OrderStack.Screen
        name="orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          title: 'Your Orders',
          headerLeft: () => (
            <HeaderButton
              onPress={() => navigation.toggleDrawer()}
              iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            />
          ),
        })}
      />
    </OrderStack.Navigator>
  );
};

export default OrderNavigator;
