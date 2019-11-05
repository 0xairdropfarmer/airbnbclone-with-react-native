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
import Home from "./src/screens/Home";
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
    },
    Home: {
      screen: Home
    }
  },
  {
    initialRouteName: "LoggedOut",
    headerMode: "none"
  }
);
export default createAppContainer(AppNavigator);
