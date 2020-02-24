import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableHighlight
} from "react-native";
import colors from "../styles/color";
import firebase from "react-native-firebase";
import AsyncStorage from "@react-native-community/async-storage";
class RequestSendNotification extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      pressNotifyBtn: false,
      pressSkipBtn: false
    };
  }
  componentDidMount() {
    this.checkPermission();
  }

  async checkPermission() {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // user has permissions
          console.log("permissions accept");
          this.getToken();
          // forward to Home screen
          return this.props.navigation.navigate("Home");
        } else {
          // user doesn't have permission
          console.log("permissions reject");
          /// stay on screen
        }
      });
  }
  async requestPermission() {
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        // User has authorised
        console.log("permissions accept in requestPermission");
        this.getToken();
        return this.props.navigation.navigate("Home");
      })
      .catch(error => {
        // User has rejected permissions
        console.log("permission rejected");
        return this.props.navigation.navigate("Home");
      });
  }
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("airbnbclone_token");
    console.log("before fcmToken: ", fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        try {
          await firebase
            .database()
            .ref("devices_token/")
            .push({ fcmToken: fcmToken, platforms: Platform.OS })
            .then(res => res.json())
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
          await AsyncStorage.setItem("airbnbclone_token");
        } catch (error) {
          // User has rejected permissions
          console.log(error);
        }
        console.log("after fcmToken: ", fcmToken);
        await AsyncStorage.setItem("airbnbclone_token", fcmToken);
      }
    }
  }

  handleNotifyBtnHideUnderlay = () => {
    this.setState({ pressNotifyBtn: false });
  };

  handleNotifyBtnShowUnderlay = () => {
    this.setState({ pressNotifyBtn: true });
  };

  handleSkipBtnHideUnderlay = () => {
    this.setState({ pressSkipBtn: false });
  };

  handleSkipBtnShowUnderlay = () => {
    this.setState({ pressSkipBtn: true });
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Image
            style={styles.notificaion_logo}
            source={require("../img/message.png")}
          />
          <Text style={styles.title}>Turn on notifications?</Text>
          <Text style={styles.description}>
            We can let you know when someone messages you, or notify you about
            other important account activity.
          </Text>
          <TouchableHighlight
            onPress={() => this.requestPermission()}
            style={styles.notifyButton}
            underlayColor={colors.green02}
            onShowUnderlay={this.handleNotifyBtnShowUnderlay}
            onHideUnderlay={this.handleNotifyBtnHideUnderlay}
          >
            <Text style={[{ color: colors.white }, styles.buttonText]}>
              Yes, notify me
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.skipButton}
            onPress={() => this.props.navigation.navigate("Home")}
            onShowUnderlay={this.handleSkipBtnShowUnderlay}
            onHideUnderlay={this.handleSkipBtnHideUnderlay}
            underlayColor={colors.gray03}
          >
            <Text style={[{ color: colors.green01 }, styles.buttonText]}>
              Skip
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white
  },
  content: {
    marginTop: 100,
    paddingLeft: 20,
    paddingRight: 20
  },
  notifyButton: {
    backgroundColor: colors.green01,
    width: Platform.OS == "ios" ? 200 : 160,
    height: Platform.OS == "ios" ? 60 : 50,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 3,
    marginTop: Platform.OS == "ios" ? 60 : 30
  },

  notificaion_logo: {
    width: 70,
    height: 70
  },
  title: {
    marginTop: 30,
    fontSize: Platform.OS == "ios" ? 35 : 32,
    color: colors.black,
    fontWeight: "normal"
  },
  description: {
    fontSize: Platform.OS == "ios" ? 22 : 18,
    paddingRight: 30,
    marginTop: 15,
    lineHeight: 22
  },
  buttonText: {
    fontSize: Platform.OS == "ios" ? 25 : 18,
    fontWeight: "600",
    alignSelf: "center"
  },
  skipButton: {
    borderColor: colors.green01,
    width: Platform.OS == "ios" ? 130 : 100,
    borderWidth: 2,
    padding: Platform.OS == "ios" ? 20 : 15,
    paddingBottom: 12,
    borderRadius: 3,
    marginTop: 15
  }
});
export default RequestSendNotification;
