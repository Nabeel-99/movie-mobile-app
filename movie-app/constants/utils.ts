import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import Constant from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import axios from "axios";

const { expoConfig } = Constant;
const localIP = (expoConfig?.hostUri || "").split(":").shift() || "localhost";
// backend url
export const BACKEND_URL = `http://${localIP}:3000`;
console.log("backend url", BACKEND_URL);
// utils
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};
export const formatCurrency = (num: number): string => {
  if (!num) return "N/A";

  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(1)}B`; // billions
  } else if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(1)}M`; // millions
  } else if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(1)}K`; // thousands
  }
  return `$${num}`;
};

// token

export const saveToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync("token", token);
  } catch (error) {
    console.log("error", error);
  }
};

export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");

    return token;
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync("token");
  } catch (error) {
    console.log("err ", error);
  }
};

// theme

const THEME_KEY = "app_theme";
const LAST_MANUAL_THEME_KEY = "last_manual_theme";
export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: "#ffffff",
    surface: "#f2f2f2",
    primary: "#AB8BFF",
  },
};

export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: "#0f0d23",
    surface: "#1a1a2e",
    primary: "#AB8BFF",
  },
};

export const saveThemePreference = async (
  theme: "light" | "dark" | "system"
) => {
  await AsyncStorage.setItem(THEME_KEY, theme);
};

export const getThemePreference = async (): Promise<
  "light" | "dark" | "system"
> => {
  const value = await AsyncStorage.getItem(THEME_KEY);
  return (value as any) || "system";
};

export const saveLastManualTheme = async (theme: "light" | "dark") => {
  await AsyncStorage.setItem(LAST_MANUAL_THEME_KEY, theme);
};

export const getLastManualTheme = async (): Promise<"light" | "dark"> => {
  const value = await AsyncStorage.getItem(LAST_MANUAL_THEME_KEY);
  return (value as any) || "dark";
};

export const requestImagePickerPermission = async () => {
  (async () => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus.status !== "granted" || mediaStatus.status !== "granted") {
      Alert.alert("Permission required", "Camera and gallery access needed");
    }
  })();
};


