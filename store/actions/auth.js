import AsyncStorage from '@react-native-async-storage/async-storage';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_CHECK_FAIL = 'LOGIN_CHECK_FAIL';
export const LOGIN_CHECK_SUCCESS = 'LOGIN_CHECK_SUCCESS';



const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHdRiAsKsvC4ZEw7qae1HjfDEysxqYGeA',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      console.log(errorResData);
      let message = 'Something went wrong';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email is already exists!.';
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    // setLogoutTimer(expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHdRiAsKsvC4ZEw7qae1HjfDEysxqYGeA',

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      console.log(errorId);
      let message = 'Something went wrong';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      }
      if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid.';
      }
      if (errorId === 'INVALID_EMAIL') {
        message = 'This email is not valid.';
      }
      if (errorId === 'MISSING_PASSWORD') {
        message = 'Please write your password.';
      }

      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    // setLogoutTimer(3000);
  };
};

export const loginCheckFail = () => {
  return { type: LOGIN_CHECK_FAIL };
};

export const loginCheckSuccess = (token, userId) => {
  return { type: LOGIN_CHECK_SUCCESS, token: token, userId: userId };
};

export const logout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem('userData');
    dispatch({ type: LOGOUT });
  };
};


// let timer;
// const clearLogoutTimer = () => {
//   clearTimeout(timer);
// };
// const setLogoutTimer = (expirationTime) => {
//   console.log(expirationTime);
//   console.log(logout);
//   timer = setTimeout(logout, expirationTime);
// };