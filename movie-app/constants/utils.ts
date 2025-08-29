import * as SecureStore from "expo-secure-store";

export const BACKEND_URL = "http://localhost:3000";

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

export const saveToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync("token", token);
    console.log("token saved");
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
