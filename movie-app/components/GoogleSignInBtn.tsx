import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as WebBroswer from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";

type ExpoExtra = {
  webGoogleClientId: string;
  iosGoogleClientId: string;
  androidGoogleClientId: string;
};

WebBroswer.maybeCompleteAuthSession();
const GoogleSignIn = () => {
  const { webGoogleClientId, iosGoogleClientId } = Constants.expoConfig
    ?.extra as ExpoExtra;

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: webGoogleClientId,
    iosClientId: iosGoogleClientId,
  });
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("auth", authentication);
    }
  }, [response]);
  return (
    <View className="flex-row items-center  gap-2 justify-center w-ful">
      <TouchableOpacity
        onPress={() => promptAsync()}
        disabled={!request}
        className="bg-dark-200 w-full justify-center p-4 rounded-lg flex-row gap-2 items-center"
      >
        <Ionicons name="logo-google" size={20} color="white" />
        <Text className="text-white">Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignIn;
