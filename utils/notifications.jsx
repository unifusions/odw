// import { getApp } from '@react-native-firebase/app';
// import { getMessaging, requestPermission, getToken, onMessage } from '@react-native-firebase/messaging';

// export async function setupFCM() {
//   const app = getApp();
//   const messaging = getMessaging(app);

//   console.log('🚀 Setting up FCM for app:', app);
//   try {
//     const token= await getToken(messaging);
//     const authStatus = await requestPermission(messaging);
//     const enabled = authStatus === 1 || authStatus === 2;

//     if (enabled) {
//       const token = await getToken(messaging);

//       return token;
//     } else {
//       console.log('🚫 Notification permission not granted');
//       return null;
//     }
//   } catch (e) {
//     console.error('🔥 Error getting FCM token:', e);
//     return null;
//   }

//   // Handle foreground notifications
//   onMessage(messaging, async remoteMessage => {
//     console.log('📩 New message:', remoteMessage);
//   });
// }


// import messaging from '@react-native-firebase/messaging';

// export async function setupFCM() {
//   console.log('🚀 Setting up FCM');

//   try {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (!enabled) {
//       console.log('🚫 Notification permission not granted');
//       return null;
//     }

//     const token = await messaging().getToken();
//     console.log('🔥 FCM Token:', token);

//     // Foreground message handler
//     messaging().onMessage(async remoteMessage => {
//       console.log('📩 Foreground message:', remoteMessage);
//     });

//     return token;
//   } catch (e) {
//     console.error('🔥 Error getting FCM token:', e);
//     return null;
//   }
// }


import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import { Alert, Platform } from 'react-native';

export async function requestNotificationPermission() {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
}



export async function registerForPushNotifications() {

  const { status } = await Notifications.requestPermissionsAsync();


  let deviceId;

  try{
  if (Platform.OS === 'android') {
    deviceId = Application.androidId;
  } else {
    // You MUST await the function call here
    deviceId = await Application.getIosIdForVendorAsync();
  }
  if (!Device.isDevice) return null;

  
  const token = await Notifications.getDevicePushTokenAsync();
 

  return {

    token: token.data,
    device_id: deviceId,
    platform: token.type // 'fcm' | 'apns'
  };}
  catch(error){
   
    Alert.alert('Error',"Something went wrong");
  }
}