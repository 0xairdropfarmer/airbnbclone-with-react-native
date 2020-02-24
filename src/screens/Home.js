import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from "react-native";
import firebase from "react-native-firebase";
export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: "Home"
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
      } else {
        alert("Your need to login first");
        this.props.navigation.navigate("LoggedOut");
      }
    });
  }
  render() {
    return (
      <ScrollView scrollEventThrottle={16}>
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: 50 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              paddingHorizontal: 20
            }}
          >
            What can we help you find, Kris?
          </Text>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
