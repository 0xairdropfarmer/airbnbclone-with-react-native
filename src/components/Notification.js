import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing
} from "react-native";
import colors from "../styles/color";
import Icon from "react-native-vector-icons/FontAwesome";
export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.positionValue = new Animated.Value(-80);
  }
  animateNotification = value => {
    Animated.timing(this.positionValue, {
      toValue: value,
      duration: 300,
      velocity: 3,
      tension: 2,
      friction: 8,
      easing: Easing.easeOutBack
    }).start();
  };
  closeNotification = () => {
    this.props.handleCloseNotification();
  };
  render() {
    const { title, message, showNotification } = this.props;
    showNotification
      ? this.animateNotification(0)
      : this.animateNotification(-80);
    return (
      <Animated.View
        style={[{ marginBottom: this.positionValue }, styles.wrapper]}
      >
        <View style={styles.notificationContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.messsage}>{message}</Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.closeNotification}
        >
          <Icon name="times" size={20} color={colors.lightGray} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    // marginBottom: -80,
    backgroundColor: "white",
    height: 80,
    width: "100%",
    padding: 10
  },
  notificationContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  title: {
    color: colors.darkOrange,
    marginRight: 5,
    fontSize: 14,
    marginBottom: 2
  },
  messsage: {
    marginBottom: 2,
    fontSize: 14
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10
  }
});
