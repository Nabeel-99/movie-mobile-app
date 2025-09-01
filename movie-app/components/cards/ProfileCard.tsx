import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Divider, List, Switch } from "react-native-paper";
import { useRouter } from "expo-router";
import { registerPushNotifications } from "@/services/notifications";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../ThemeContext";
const ProfileCard = ({
  user,
  signOut,
}: {
  user: User;
  signOut: () => Promise<void>;
}) => {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    const loadPushNotificationsBool = async () => {
      try {
        const saved = await AsyncStorage.getItem("pushNotifications");
        if (saved) {
          setEnabled(JSON.parse(saved));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadPushNotificationsBool();
  }, []);
  const valueChange = async () => {
    try {
      const newValue = !enabled;
      setEnabled(newValue);
      if (newValue) {
        await registerPushNotifications();
      }
      await AsyncStorage.setItem("pushNotifications", JSON.stringify(newValue));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1 items-center justify-between gap-6 h-full w-full px-4">
      <View className="flex-1 items-center w-full gap-6">
        <Avatar.Text
          size={90}
          label={user?.firstname[0]}
          style={{ backgroundColor: "#AB8BFF" }}
          color="white"
        />
        <Text
          style={{ color: theme.colors.onBackground }}
          className="text-2xl font-bold"
        >
          {user?.firstname} {user?.lastname}
        </Text>
        <View className="flex-1 w-full">
          <List.Section
            style={{ backgroundColor: theme.colors.surface }}
            className="w-full rounded-lg"
          >
            <List.Item
              title="Notifications"
              titleStyle={{ color: theme.colors.onSurface }}
              className=""
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={"bell"}
                  color={theme.colors.onSurface}
                />
              )}
              right={() => (
                <Switch
                  value={enabled}
                  onValueChange={valueChange}
                  color={"#AB8BFF"}
                />
              )}
            />
            <Divider className="ml-16" />
            <List.Item
              title="Appearance"
              titleStyle={{ color: theme.colors.onSurface }}
              className=""
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={"palette"}
                  color={theme.colors.onSurface}
                />
              )}
              right={(props) => (
                <List.Icon
                  {...props}
                  icon={"chevron-right"}
                  color={theme.colors.onSurface}
                />
              )}
              onPress={() => router.push("/appearance")}
            />
            <Divider className="ml-16" />
            <List.Item
              title="Saved Movies"
              titleStyle={{ color: theme.colors.onSurface }}
              className=""
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={"bookmark"}
                  color={theme.colors.onSurface}
                />
              )}
              onPress={() => router.push("/saved")}
            />
          </List.Section>
        </View>
      </View>
      <TouchableOpacity
        onPress={signOut}
        className="bg-accent p-4 rounded-lg w-full"
      >
        <Text className="text-xl text-white text-center">Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;
