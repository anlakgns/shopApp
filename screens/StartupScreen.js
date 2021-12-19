import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const tryLogin = async () => {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
          dispatch(authActions.loginCheckFail());
          return;
        }
        const { token, userId, expiryDate } = JSON.parse(userData);
        const expirationDate = new Date(expiryDate);
        if (expirationDate <= new Date() || !token || !userId) {
          dispatch(authActions.loginCheckFail());
        }

        dispatch(authActions.loginCheckSuccess(token, userId));
      };
      tryLogin();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
