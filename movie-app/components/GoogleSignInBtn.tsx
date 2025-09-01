import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as WebBroswer from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import { useTheme } from "@/components/ThemeContext";

type ExpoExtra = {
  webGoogleClientId: string;
  iosGoogleClientId: string;
  androidGoogleClientId: string;
};

WebBroswer.maybeCompleteAuthSession();
const GoogleSignIn = () => {
  const { theme } = useTheme();
  const { webGoogleClientId, iosGoogleClientId } = Constants.expoConfig
    ?.extra as ExpoExtra;

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: webGoogleClientId,
    iosClientId: iosGoogleClientId,
  });
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
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
        <Text style={{ color: theme.colors.onSurface }}>Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignIn;
