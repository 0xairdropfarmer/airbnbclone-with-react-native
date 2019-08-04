import React, { Component } from "react";
import firebase from "react-native-firebase";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import colors from "../styles/color";
import InputField from "../components/form/InputField";
import NextArrowButton from "../components/buttons/NextArrowButton";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      email: "",
      password: ""
    };
  }
  static navigationOptions = {
    headerTintColor: colors.green01,
    headerStyle: {
      backgroundColor: colors.green01
    }
  };
  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  Login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.setState({ user });
        console.log(user);
      })
      .catch(error => console.log(error));
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
  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
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
            />
          </ScrollView>
          <NextArrowButton handleLogin={this.Login} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.green01
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
  }
});
