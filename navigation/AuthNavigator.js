import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/user/AuthScreen';
import DrawerNavigator from './DrawerNavigator';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';

const Auth = createNativeStackNavigator();

const AuthNavigator = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);

  const renderScreen = () => {
    switch (isLogged) {
      case 'checking':
        return <Auth.Screen name="Startup" component={StartupScreen} />;
      case false:
        return (
          <Auth.Screen
            name="Login"
            component={AuthScreen}
            options={(props) => ({
              title: 'Authenticate',
            })}
          />
        );
      case true:
        return <Auth.Screen name="Main" component={DrawerNavigator} />;
    }
  };

  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
      }}
    >
      {renderScreen()}
    </Auth.Navigator>
  );
};

export default AuthNavigator;
