import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Alert
} from "react-native";
import firebase from "react-native-firebase";
import colors from "../styles/color";
import InputField from "../components/form/InputField";
import Notification from "../components/Notification";
import NextArrowButton from "../components/buttons/NextArrowButton";
export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: "",
      loadingVisible: true,
      formValid: true
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      borderBottomWidth: 0,
      elevation: 0
    },
    headerTransparent: true,
    headerTintColor: colors.white
  });
  submitEmail = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function() {
        Alert.alert("email sent");

        this.props.navigation.navigate("Login");
      })
      .catch(function(error) {
        Alert.alert(error.message);
      });
  };

  handleEmailChange = email => {
    this.setState({ email: email });
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <View style={styles.form}>
          <Text style={styles.ForgotPasswordHeading}>
            Forgot your password?
          </Text>
          <Text style={styles.ForgotPasswordSubHeading}>
            Enter your email to find account.
          </Text>
          <InputField
            customStyle={{ marginTop: 100 }}
            textColor={colors.white}
            labelText="EMAIL ADDRESS"
            labelTextSize={14}
            labelColor={colors.white}
            borderBottomColor={colors.white}
            inputType="email"
            onChangeText={email => this.handleEmailChange(email)}
          />
        </View>
        <NextArrowButton handelPress={this.submitEmail} disabled={false} />
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
  form: {
    marginTop: 90,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1
  },
  ForgotPasswordHeading: {
    fontSize: 28,
    color: colors.white,
    fontWeight: "300"
  },
  ForgotPasswordSubHeading: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 15
  }
});
