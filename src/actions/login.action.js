import {
    LOGIN_FETCHING,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    server,
    LOGOUT
  } from "../constants";
  import { httpClient } from "./../utils/HttpClient";
  
  export const setLoginStateToFetching = () => ({
    type: LOGIN_FETCHING
  });
  
  export const setLoginStateToSuccess = payload => ({
    type: LOGIN_SUCCESS,
    payload
  });
  
  export const setLoginStateToFailed = () => ({
    type: LOGIN_FAILED
  });
  
  export const setLoginStateToLogout = () => ({
    type: LOGOUT,
  })
  
  export const logout = (history)=>{
      return dispatch=>{
          localStorage.removeItem(server.TOKEN_KEY)
          dispatch(setLoginStateToLogout())
          history.push("/login")
      }
  }
  
  
  export const login = (value,history) => {
    return async dispatch => {
      // Prepare for connecting...
      dispatch(setLoginStateToFetching());
      let result = await httpClient.post(server.LOGIN_URL, value);
      if (result.data.result == "ok") {
        localStorage.setItem(server.TOKEN_KEY, result.data.token);
        dispatch(setLoginStateToSuccess(result));
        history.push("/stock")
      } else {
        dispatch(setLoginStateToFailed());    
      }
    };
  };
  