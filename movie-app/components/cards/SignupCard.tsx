import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import { BACKEND_URL } from "@/constants/utils";
import { Portal, Snackbar } from "react-native-paper";
import GoogleSignInBtn from "../GoogleSignInBtn";
import { useTheme } from "@/components/ThemeContext";

const SignupCard = () => {
  const router = useRouter();
  const { theme, themeMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const handleSignup = async () => {
    if (
      !userData.email ||
      !userData.password ||
      !userData.firstname ||
      !userData.lastname
    ) {
      setIsVisible(true);
      setSnackbarMessage("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        password: userData.password,
      });

      if (res.status === 201) {
        setUserData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        });
        setSnackbarMessage("User created successfully");
        setIsVisible(true);
        router.push("/profile");
      }
    } catch (error: any) {
      console.log("error", error);
      if (error.response.status >= 400 && error.response.status <= 500) {
        setIsVisible(true);
        setSnackbarMessage(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{ backgroundColor: theme.colors.background }}
      className=" flex-1 mt-10  gap-6 p-4 px-6 rounded-lg"
    >
      <TextInput
        placeholderTextColor={`${themeMode === "dark" ? "white" : "black"}`}
        className="border p-4 rounded-lg border-dark-100"
        placeholder="First name"
        value={userData.firstname}
        autoCorrect={false}
        onChangeText={(text) => setUserData({ ...userData, firstname: text })}
      />
      <TextInput
        placeholderTextColor={`${themeMode === "dark" ? "white" : "black"}`}
        style={{ color: theme.colors.onSurface }}
        className="border p-4 rounded-lg border-dark-100"
        placeholder="Last name"
        value={userData.lastname}
        autoCorrect={false}
        onChangeText={(text) => setUserData({ ...userData, lastname: text })}
      />
      <TextInput
        placeholderTextColor={`${themeMode === "dark" ? "white" : "black"}`}
        style={{ color: theme.colors.onSurface }}
        className="border p-4 rounded-lg border-dark-100"
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={userData.email}
        autoCorrect={false}
        onChangeText={(text) => setUserData({ ...userData, email: text })}
      />
      <TextInput
        placeholderTextColor={`${themeMode === "dark" ? "white" : "black"}`}
        style={{ color: theme.colors.onSurface }}
        className="border p-4 rounded-lg border-dark-100"
        placeholder="Password"
        secureTextEntry={true}
        autoCorrect={false}
        value={userData.password}
        onChangeText={(text) => setUserData({ ...userData, password: text })}
      />
      <TouchableOpacity
        onPress={handleSignup}
        disabled={loading}
        className="bg-accent rounded-xl p-4 text-center items-center"
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={{ color: theme.colors.onPrimary }} className="text-xl">
            Sign up
          </Text>
        )}
      </TouchableOpacity>

      <View className="flex-row items-center mt-10   gap-2 justify-center w-ful">
        <Text style={{ color: theme.colors.onBackground }} className="text-xl">
          Already have an account?
        </Text>
        <Link href={"/signin"} className="text-accent text-xl">
          Login
        </Link>
      </View>
      <View className="flex-row items-center gap-1 mt-8">
        <View className="w-full flex-1 h-[1px] bg-white"></View>
        <Text style={{ color: theme.colors.onBackground }}>
          Or continue with
        </Text>
        <View className="w-full flex-1 h-[1px] bg-white"></View>
      </View>

      <GoogleSignInBtn />

      <Portal>
        <Snackbar
          visible={isVisible}
          onDismiss={() => setIsVisible(false)}
          duration={3000}
          style={{ backgroundColor: "#0f0d18" }}
        >
          {snackbarMessage}
        </Snackbar>
      </Portal>
    </View>
  );
};

export default SignupCard;
