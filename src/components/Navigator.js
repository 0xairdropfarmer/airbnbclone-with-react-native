/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

import colors from "../styles/color/index";
import { Alert } from "react-native";
import Login from "../screens/Login";
import LoggedOut from "../screens/LoggedOut";
import ForgotPassword from "../screens/ForgotPassword";
import Home from "../screens/Home";
import RequestSendNotification from "../screens/RequestSendNotification";
import IonIcons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
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
    },
    RequestSendNotification: {
      screen: RequestSendNotification
    }
  },
  {
    initialRouteName: "RequestSendNotification",
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: colors.green01,
        elevation: 0,
        shadowOpacity: 0
      },
      headerLeft: (
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() => navigation.openDrawer()}
        >
          <IonIcons name="md-menu" size={30} />
        </TouchableOpacity>
      ),
      headerRight: firebase.auth().onAuthStateChanged(user => {
        if (user) {
          <TouchableOpacity
            style={{ marginRight: 30 }}
            onPress={() =>
              Alert.alert("Logout alert", "Do you really want to Logout...", [
                {
                  text: "NO",
                  onPress: () => console.warn("NO Pressed"),
                  style: "cancel"
                },
                {
                  text: "YES",
                  onPress: () =>
                    firebase
                      .auth()
                      .signOut()
                      .then(() => {
                        Alert.alert("Success fully LogOut");
                      })
                      .catch(function (error) {
                        // An error happened.
                      })
                }
              ])
            }
          >
            <IonIcons name="md-log-out" size={30} />
          </TouchableOpacity>;
        }
      }),
      headerTintColor: "#333333",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      }
    })
  }
);

const DrawerNavigator = createDrawerNavigator({
  AppNavigator: {
    screen: AppNavigator,
    navigationOptions: {
      drawerLabel: "Home"
    }
  }
});
export default createAppContainer(DrawerNavigator);
