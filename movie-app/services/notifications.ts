import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

export const registerPushNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission not granted");
    return;
  }
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldPlaySound: true,
      shouldShowList: true,
      shouldSetBadge: false,
    }),
  });
};

export const scheduleNotificationReminder = async (movieTitle: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Movie Reminder",
      body: `Don't forget to watch ${movieTitle} tonight!`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 60,
      repeats: false,
    },
  });
};
