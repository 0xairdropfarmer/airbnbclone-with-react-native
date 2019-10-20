import React, { Component } from "react";
import firebase from "react-native-firebase";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Dimensions
} from "react-native";
import Loader from "../components/Loader";
import colors from "../styles/color";
import InputField from "../components/form/InputField";
import NextArrowButton from "../components/buttons/NextArrowButton";
import Notification from "../components/Notification";
export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      email: "",
      password: "",
      formValid: true,
      error: "",
      loadingVisible: false
    };
  }

  handleCloseNotification = () => {
    this.setState({ formValid: true });
  };

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  Login = () => {
    this.setState({ loadingVisible: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.setState({ user });
        this.setState({ loadingVisible: false });
      })
      .catch(error =>
        this.setState({
          error: error.message,
          formValid: false
          // loadingVisible: false
        })
      );
  };
  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }
  handleEmailChange = email => {
    // parent class change handler is always called with field name and value
    this.setState({ email: email });
  };
  handlePasswordChange = password => {
    // parent class change handler is always called with field name and value
    this.setState({ password: password });
  };
  static navigationOptions = {
    header: null
  };
  render() {
    const { formValid, loadingVisible } = this.state;
    const showNotification = formValid ? false : true;
    const bgColor = formValid ? colors.green01 : colors.darkOrange;
    return (
      <KeyboardAvoidingView
        style={[{ backgroundColor: bgColor }, styles.wrapper]}
        behavior="padding"
      >
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.loginHeader}>Login</Text>
            <InputField
              labelText="EMAIL ADDRESS"
              onChangeText={this.handleEmailChange}
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="email"
              customStyle={{ marginBottom: 30 }}
              showCheckmark={email === "test@gmail.com"}
            />
            <InputField
              labelText="PASSWORD"
              onChangeText={this.handlePasswordChange}
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="password"
              customStyle={{ marginBottom: 30 }}
              showCheckmark={password === "12345"}
            />
          </ScrollView>
          <View style={styles.nextButtonWrapper}>
            <NextArrowButton handelPress={this.Login} />
          </View>
        </View>
        <View>
          <Notification
            showNotification={showNotification}
            handleCloseNotification={this.handleCloseNotification}
            title="Error"
            message={this.state.error}
          />
          <Loader modalVisible={loadingVisible} animationType="fade" />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flex: 1
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1
  },
  loginHeader: {
    fontSize: 28,
    color: colors.white,
    fontWeight: "300",
    marginBottom: 40
  },
  notificationWrapper: {
    position: "absolute",
    bottom: -20,
    left: 0,
    right: 0
  },
  nextButtonWrapper: {
    alignItems: "flex-end",
    right: 20,
    bottom: 50
  }
});
