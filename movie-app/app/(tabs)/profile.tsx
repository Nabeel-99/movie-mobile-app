import { useAuth } from "@/components/AuthContext";
import ProfileCard from "@/components/ProfileCard";
import SignupCard from "@/components/SignupCard";
import { icons } from "@/constants/icons";
import { getToken } from "@/constants/utils";
import React, { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Divider,
  List,
  Switch,
} from "react-native-paper";

const profile = () => {
  const { user, loading, signOut } = useAuth();

  return (
    <View className="bg-primary flex-1 justify-center    h-full ">
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
