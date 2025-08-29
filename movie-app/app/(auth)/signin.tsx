import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import SigninCard from "@/components/SigninCard";

const signin = () => {
  return (
    <View className="bg-primary flex-1 justify-center    h-full ">
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          paddingTop: 100,
        }}
      >
        <View className="items-center">
          <Image source={icons.logo} resizeMode="cover" className="" />
        </View>

        <SigninCard />
      </ScrollView>
    </View>
  );
};

export default signin;
