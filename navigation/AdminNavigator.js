import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import HeaderButton from '../components/UI/HeaderButton';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

const Admin = createNativeStackNavigator();

const AdminNavigator = () => {
  return (
    <Admin.Navigator
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
      <Admin.Screen
        name="orders"
        component={UserProductsScreen}
        options={({ navigation }) => ({
          title: 'Your Products',
          headerLeft: () => (
            <HeaderButton
              onPress={() => navigation.toggleDrawer()}
              iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            />
          ),
          headerRight: () => (
            <HeaderButton
              onPress={() => navigation.navigate('editProduct')}
              iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            />
          ),
        })}
      />
      <Admin.Screen
        name="editProduct"
        component={EditProductScreen}
        options={(props) => ({
          title: props.route.params?.productId ? 'Edit Product' : 'New Product',
        })}
      />
    </Admin.Navigator>
  );
};

export default AdminNavigator;
