import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as WebBroswer from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import { useTheme } from "@/components/ThemeContext";
import { makeRedirectUri } from "expo-auth-session";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useRouter } from "expo-router";

type ExpoExtra = {
  webGoogleClientId: string;
  iosGoogleClientId: string;
  androidGoogleClientId: string;
};

WebBroswer.maybeCompleteAuthSession();
const GoogleSignIn = () => {
  const { theme, themeMode } = useTheme();
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { webGoogleClientId, iosGoogleClientId } = Constants.expoConfig
    ?.extra as ExpoExtra;
  // const redirectUri = makeRedirectUri({
  //   native: "movieapp:/oauthredirect",
  // });
  const redirectUri = makeRedirectUri({
    native:
      "com.googleusercontent.apps.952889214145-2ll2tmakn8hl86bhpt8iha58n831ktd2:/oauthredirect",
  });

  console.log("redirect uri", redirectUri);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "952889214145-qgp6b9i0skrjcnl70l6o4v3isabflbv8.apps.googleusercontent.com",
    iosClientId:
      "952889214145-2ll2tmakn8hl86bhpt8iha58n831ktd2.apps.googleusercontent.com",
    redirectUri,
  });
  // console.log("redirect uri", redirectUri);

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("authentication", authentication);
      // get user data
      if (authentication?.accessToken) {
        setAccessToken(authentication.accessToken);
      }
    }
  }, [response]);

  useEffect(() => {
    if (accessToken) {
      (async () => {
        try {
          const res = await signInWithGoogle(accessToken!);
          if (res.success) {
            router.push("/profile");
          }
        } catch (error) {
          console.log("error", error);
        }
      })();
    }
  }, [accessToken]);
  return (
    <View className="flex-row items-center  gap-2 justify-center w-ful">
      <TouchableOpacity
        onPress={() => promptAsync({ showInRecents: true })}
        disabled={!request}
        className={` ${themeMode === "dark" ? "bg-dark-100 border border-dark-100" : "bg-white border border-black/10"} w-full justify-center p-4 rounded-lg flex-row gap-2 items-center`}
      >
        <Ionicons
          name="logo-google"
          size={20}
          color={`${theme.colors.onSurface}`}
        />
        <Text style={{ color: theme.colors.onSurface }}>Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignIn;
