import { useAuth } from "@/components/AuthContext";
import ProfileCard from "@/components/cards/ProfileCard";
import SignupCard from "@/components/cards/SignupCard";
import { icons } from "@/constants/icons";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/components/ThemeContext";
import { useRouter } from "expo-router";

const profile = () => {
  const { user, loading, signOut, token, fetchUser } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <>
      <View
        style={{ backgroundColor: theme.colors.background }}
        className="flex-1 relative justify-center h-full"
      >
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: 100,
            paddingBottom: 100,
            backgroundColor: theme.colors.background,
          }}
        >
          <TouchableOpacity
            className="absolute top-20 right-0"
            onPress={() => router.push("/editprofile")}
          >
            <Text
              style={{ color: theme.colors.onSurface }}
              className="text-xl mr-10"
            >
              Edit
            </Text>
          </TouchableOpacity>
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
    </>
  );
};

export default profile;
