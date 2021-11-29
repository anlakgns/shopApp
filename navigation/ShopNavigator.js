import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsOverview from '../screens/shop/ProductsOverviewScreen';
import ProductDetail from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

const Shop = createNativeStackNavigator();

const ShopNavigator = () => {
  return (
    <Shop.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.secondary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      }}
    >
      <Shop.Screen
        name="allProducts"
        component={ProductsOverview}
        options={{
          title: 'All Products',
        }}
      />
      <Shop.Screen
        name="productDetail"
        component={ProductDetail}
        options={({ route }) => ({ title: route.params.productTitle })}
      />
    </Shop.Navigator>
  );
};

export default ShopNavigator;
