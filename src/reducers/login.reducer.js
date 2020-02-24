import {
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from "../constants";

const initialState = {
  isFetching: false,
  result: null,
  isError: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_FETCHING:
      return { ...state, isFetching: true, result: null, isError: false };

    case LOGIN_SUCCESS:
      return { ...state, isFetching: false, result: payload, isError: false };

    case LOGIN_FAILED:
      return { ...state, isFetching: false, result: null, isError: true };

    case LOGOUT:
      return { ...initialState, result: "" };

    default:
      return state;
  }
};
