import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export async function requestUserPermissions() {
  const authStatus =await messaging().requestPermission();
  const enabled =
    authStatus == messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus == messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('authorization status', authStatus);
    GetFcmToken();
  }else{
    console.log('no authorization',authStatus);
  }
}
const GetFcmToken = async () => {
  try {
    await messaging.registerDeviceForRemoteMessages();
    const fcmToken = await messaging().getToken();
    console.log(fcmToken, 'token generated');
  } catch (error) {
    console.log(error,'error');
    Alert.alert('error', error);
  }
};
