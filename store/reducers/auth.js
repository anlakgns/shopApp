import {
  LOGIN,
  LOGIN_CHECK_FAIL,
  SIGNUP,
  LOGIN_CHECK_SUCCESS,
  LOGOUT,
} from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  isLogged: 'checking',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
        isLogged: true,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.token,
        isLogged: true,
      };
    case LOGIN_CHECK_FAIL:
      return {
        ...state,
        isLogged: false,
      };
    case LOGIN_CHECK_SUCCESS:
      return {
        ...state,
        isLogged: true,
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return {
        ...state,
        isLogged: false,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};
