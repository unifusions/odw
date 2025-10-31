import { getApp } from '@react-native-firebase/app';
import { getMessaging, requestPermission, getToken, onMessage } from '@react-native-firebase/messaging';

export async function setupFCM() {
  const app = getApp();
  const messaging = getMessaging(app);

  try {
    const authStatus = await requestPermission(messaging);
    const enabled = authStatus === 1 || authStatus === 2;

    if (enabled) {
      const token = await getToken(messaging);
      
      return token;
    } else {
      console.log('🚫 Notification permission not granted');
      return null;
    }
  } catch (e) {
    console.error('🔥 Error getting FCM token:', e);
    return null;
  }

  // Handle foreground notifications
  onMessage(messaging, async remoteMessage => {
    console.log('📩 New message:', remoteMessage);
  });
}
