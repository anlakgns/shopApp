export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

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
  };
};
