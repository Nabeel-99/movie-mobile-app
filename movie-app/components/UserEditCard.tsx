import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { useTheme } from "./ThemeContext";

type UserEditProps = {
  updatingImage: boolean;
  updatingName: boolean;
  user: User | null;
  openSheet: () => void;
  name: string;
  setName: (name: string) => void;
  isNameChanged: boolean;
  saveChanges: (
    formData: FormData,
    options: { name?: boolean; image?: boolean }
  ) => void;
};
const UserEditCard = ({
  updatingImage,
  updatingName,
  user,
  openSheet,
  name,
  setName,
  isNameChanged,
  saveChanges,
}: UserEditProps) => {
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
          {updatingImage ? (
            <View className="bg-white h-[150px] w-[150px] rounded-full flex items-center justify-center">
              <ActivityIndicator size={"large"} color={"0000ff"} />
            </View>
          ) : user?.profilePic ? (
            <Avatar.Image
              size={150}
              source={{ uri: user?.profilePic }}
              style={{ backgroundColor: "#AB8BFF" }}
            />
          ) : (
            <Avatar.Text
              size={150}
              label={user?.firstname[0]!}
              style={{ backgroundColor: "#AB8BFF" }}
              color="white"
            />
          )}

          <TouchableOpacity onPress={openSheet}>
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
              autoCorrect={false}
              autoComplete="off"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (!isNameChanged) return;
            const formData = new FormData();
            formData.append("name", name);
            saveChanges(formData, { name: true });
          }}
          disabled={!isNameChanged || updatingName || updatingImage}
          className={`${
            isNameChanged && !updatingName ? "bg-accent" : "bg-dark-100"
          } w-full p-4 rounded-lg flex items-center justify-center`}
        >
          {updatingName ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text
              style={{ color: "white", fontWeight: "bold" }}
              className="text-center"
            >
              Save changes
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default UserEditCard;
