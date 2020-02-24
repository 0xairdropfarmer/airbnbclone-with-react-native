import React, { Component } from "react";
import Navigator from "./src/components/Navigator";
import SplashScreen from "react-native-splash-screen";
import OneSignal from 'react-native-onesignal';
import messaging from '@react-native-firebase/messaging';
class App extends Component {
  constructor(props) {
    super(props);
    OneSignal.init("ecf162da-83c8-495f-b331-0539ccf6dcd8");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
  componentDidMount() {
    SplashScreen.hide();

  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }
  componentDidMount() {
    this.requestPermission()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM Message Data:', remoteMessage.data);

      // Update a users messages list using AsyncStorage
      const currentMessages = await AsyncStorage.getItem('messages');
      const messageArray = JSON.parse(currentMessages);
      messageArray.push(remoteMessage.data);
      await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
    });
  }
  componentWillUnmount() {
    unsubscribe()
  }
  registerAppWithFCM = async () => {
    await messaging().registerForRemoteNotifications().then(res => {
      console.log('res')
    });
  }
  requestPermission = async () => {
    const granted = messaging().requestPermission();

    if (granted) {
      console.log('User granted messaging permissions!');
    } else {
      console.log('User declined messaging permissions :(');
    }
  }
  render() {
    return <Navigator />;
  }
}
export default App;
