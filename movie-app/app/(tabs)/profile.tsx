import { useAuth } from "@/components/AuthContext";
import ProfileCard from "@/components/cards/ProfileCard";
import SignupCard from "@/components/cards/SignupCard";
import { icons } from "@/constants/icons";
import React from "react";
import { Image, ScrollView, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@/components/ThemeContext";

const profile = () => {
  const { user, loading, signOut } = useAuth();
  const { theme } = useTheme();

  return (
    <View
      style={{ backgroundColor: theme.colors.background }}
      className="flex-1 justify-center h-full"
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 100,
          paddingBottom: 100,
        }}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"0000ff"} />
        ) : user ? (
          <>
            <ProfileCard user={user} signOut={signOut} />
          </>
        ) : (
          <>
            <View className="items-center">
              <Image source={icons.logo} resizeMode="cover" className="" />
            </View>

            <SignupCard />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default profile;
