import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'NOTIFICATION_KEY'

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function createNotification() {
  return {
    title: "Thank you for coming back",
    body: "hope you learn something new today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      vibrate: true,
      sticky: false,
      priority: 'high'
    }
  }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then(data => {
        if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                if (status === 'granted'){
                    Notifications.cancelAllScheduledNotificationsAsync();

                    let tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    tomorrow.setHours(20);
                    tomorrow.setMinutes(0);

                    Notifications.scheduleLocalNotificationAsync(
                        createNotification(), {time: tomorrow, repeat: 'day'}
                    
                    )
                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                }
            })
        }
    })
}