import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Avatar, Divider, List, Switch } from "react-native-paper";
import { useRouter } from "expo-router";

const ProfileCard = ({
  user,
  signOut,
}: {
  user: User;
  signOut: () => Promise<void>;
}) => {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  return (
    <View className="flex-1 items-center justify-between gap-6 h-full w-full px-4">
      <View className="flex-1 items-center w-full gap-6">
        <Avatar.Text
          size={90}
          label={user?.firstname[0]}
          style={{ backgroundColor: "#AB8BFF" }}
          color="white"
        />
        <Text className="text-white text-2xl font-bold">
          {user?.firstname} {user?.lastname}
        </Text>
        <View className="flex-1 w-full">
          <List.Section className="bg-dark-200 text-white w-full rounded-lg">
            <List.Item
              title="Notifications"
              titleStyle={{ color: "#fff" }}
              className="text-white"
              left={(props) => (
                <List.Icon {...props} icon={"bell"} color="white" />
              )}
              right={() => (
                <Switch
                  value={enabled}
                  onValueChange={() => setEnabled((prev) => !prev)}
                  color={"#AB8BFF"}
                />
              )}
            />
            <Divider className="ml-16" />
            <List.Item
              title="Appearance"
              titleStyle={{ color: "#fff" }}
              className="text-white"
              left={(props) => (
                <List.Icon {...props} icon={"palette"} color="white" />
              )}
              right={(props) => (
                <List.Icon {...props} icon={"chevron-right"} color="white" />
              )}
            />
            <Divider className="ml-16" />
            <List.Item
              title="Saved Movies"
              titleStyle={{ color: "#fff" }}
              className="text-white"
              left={(props) => (
                <List.Icon {...props} icon={"bookmark"} color="white" />
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
        <Text className="text-white text-xl text-center">Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;
