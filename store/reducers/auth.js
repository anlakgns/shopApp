import { LOGIN, SIGNUP } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  isLogged: false,
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
    default:
      return state;
  }
};
