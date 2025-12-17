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

export async function requestNotificationPermission() {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
}

 

export async function registerForPushNotifications() {
  if (!Device.isDevice) return null;

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return null;

  const token = (await Notifications.getDevicePushTokenAsync()).data;
  return token; // FCM token
}