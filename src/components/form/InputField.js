import React, { Component } from "react";
import colors from "../../styles/color";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureInput: !(props.inputType === "text" || props.inputType === "email")
    };
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
  }
  toggleShowPassword() {
    this.setState({ secureInput: !this.state.secureInput });
  }
  onChangeText = (name, event) => {
    // for a regular input field, read field name and value from the event
    console.log(name);
    console.log(event);
    // const fieldName = event.target.name;
    // const fieldValue = event.target.value;
    // this.props.onChangeText(fieldName, fieldValue);
  };
  render() {
    const {
      labelText,
      labelTextSize,
      labelColor,
      textColor,
      borderBottomColor,
      inputType,
      customStyle,
      onChangeText
    } = this.props;
    const { secureInput } = this.state;
    const color = labelColor || colors.white;
    const fontSize = labelTextSize || 14;
    const inputColor = textColor || colors.white;
    const borderBottom = borderBottomColor || "transparent";
    return (
      <View style={[customStyle, styles.wrapper]}>
        <Text style={[{ color, fontSize }, styles.label]}>{labelText}</Text>
        {inputType === "password" ? (
          <TouchableOpacity
            style={styles.showButton}
            onPress={this.toggleShowPassword}
          >
            <Text style={styles.showButtonText}>
              {secureInput ? "Show" : "Hide"}
            </Text>
          </TouchableOpacity>
        ) : null}
        <TextInput
          autoCorrect={false}
          style={[
            { color: inputColor, borderBottomColor: borderBottom },
            styles.inputFiled
          ]}
          secureTextEntry={secureInput}
          onChangeText={onChangeText}
          autoCapitalize="none"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    display: "flex"
  },
  label: { fontWeight: "700", marginBottom: 10 },
  inputFiled: {
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5
  },
  showButton: {
    position: "absolute",
    right: 0
  },
  showButtonText: {
    color: colors.white,
    fontWeight: "700"
  }
});
export default InputField;
