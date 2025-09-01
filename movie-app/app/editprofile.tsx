import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeContext";
import { Avatar } from "react-native-paper";
import { useAuth } from "@/components/AuthContext";

const editprofile = () => {
  const {user} = useAuth()
  const [name, setName] = useState("");

  useEffect(() => {
    if (user) {
      setName(`${user.firstname} ${user.lastname}`);
    }
  }, []);
  const { theme } = useTheme();
  return (
    <View
      style={{ backgroundColor: theme.colors.background }}
      className="flex-1  px-4   h-full w-full "
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
          gap: 20,
          paddingBottom: 100,
        }}
      >
        <View className="flex-1 w-full h-full items-center gap-6">
          <Avatar.Text
            size={150}
            label={user?.firstname[0]!}
            style={{ backgroundColor: "#AB8BFF" }}
            color="white"
          />
          <TouchableOpacity>
            <Text
              style={{ color: theme.colors.onSurface }}
              className="text-center"
            >
              Change photo
            </Text>
          </TouchableOpacity>
          <View className=" gap-2 flex-1 w-full">
            <Text style={{ color: theme.colors.onSurface }} className="ml-2">
              Name
            </Text>
            <TextInput
              style={{ color: theme.colors.onSurface }}
              className="border border-primary-200 rounded-lg bg-dark-100 p-4 w-full"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </View>

        <TouchableOpacity className="bg-accent w-full p-4 rounded-lg">
          <Text
            style={{ color: "white", fontWeight: "bold"}}
            className="text-center"
          >
            Save changes
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default editprofile;
