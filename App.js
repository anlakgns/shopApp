import React from 'react';
 import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import ShopNavigator from './navigation/ShopNavigator';

import productsReducer from './store/reducers/products';
const combinedReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(combinedReducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ShopNavigator />
      </NavigationContainer>
    </Provider>
  );
}

