import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsOverview from '../screens/shop/ProductsOverviewScreen';
import ProductDetail from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import HeaderButton from '../components/UI/HeaderButton';
import CartScreen from '../screens/shop/CartScreen';

const Shop = createNativeStackNavigator();

const ShopNavigator = () => {
  return (
    <Shop.Navigator
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
      <Shop.Screen
        name="allProducts"
        component={ProductsOverview}
        options={({ navigation }) => ({
          title: 'All Products',
          headerLeft: () => (
            <HeaderButton
              onPress={() => navigation.toggleDrawer()}
              iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            />
          ),
          headerRight: () => (
            <HeaderButton
              onPress={() => navigation.navigate('cart')}
              iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            />
          ),
        })}
      />
      <Shop.Screen
        name="productDetail"
        component={ProductDetail}
        options={({ route }) => ({
          title: route.params.productTitle,
        })}
      />
      <Shop.Screen
        name="cart"
        component={CartScreen}
        options={({ route }) => ({
          title: 'Cart Summary',
        })}
      />
    </Shop.Navigator>
  );
};

export default ShopNavigator;
