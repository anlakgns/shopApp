import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/user/AuthScreen';
import DrawerNavigator from './DrawerNavigator';
import Colors from '../constants/Colors';

const Auth = createNativeStackNavigator();

const AuthNavigator = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
      }}
    >
      {isLogged ? (
        <Auth.Screen name="Main" component={DrawerNavigator} />
      ) : (
        <Auth.Screen
          name="Login"
          component={AuthScreen}
          options={(props) => ({
            title: 'Authenticate',
          })}
        />
      )}
    </Auth.Navigator>
  );
};

export default AuthNavigator;
