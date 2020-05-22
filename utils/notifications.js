import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'mobile-flash-cards:notifications';

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync());
}

export function setLocalNotifications() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(23);
              tomorrow.setMinutes(55);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(), {
                time: tomorrow,
                repeat: ' day'
              })

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }

          })
      }
    })
}

function createNotification() {
  return {
    title: 'Start the quiz',
    body: "Your flash cards want to see you today",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
} 