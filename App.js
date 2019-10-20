/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./src/screens/Login";
import LoggedOut from "./src/screens/LoggedOut";
import ForgotPassword from "./src/screens/ForgotPassword";

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    LoggedOut: {
      screen: LoggedOut
    },
    ForgotPassword: {
      screen: ForgotPassword
    }
  },
  {
    initialRouteName: "ForgotPassword"
  }
);
export default createAppContainer(AppNavigator);
