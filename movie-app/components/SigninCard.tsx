import { View, Text, TextInput, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Portal, Snackbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "./AuthContext";

const SigninCard = () => {
  const { signIn, loading } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const handleSignin = async () => {
    if (!userData.email || !userData.password) {
      setIsVisible(true);
      setSnackbarMessage("Please fill all the fields");
      return;
    }
    try {
      const res = await signIn(userData.email, userData.password);
      if (res.success) {
        setSnackbarMessage("Signin successful");
        setIsVisible(true);
      } else {
        setSnackbarMessage(res.message || "Something went wrong");
        setIsVisible(true);
      }
    } catch (error: any) {
      console.log("error", error);
    }
  };
  return (
    <View className="bg-primary flex-1 mt-10  gap-6 p-4 px-6 rounded-lg">
      <TextInput
        placeholderTextColor={"white"}
        className="text-white border p-4 rounded-lg border-dark-100"
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={userData.email}
        autoCorrect={false}
        onChangeText={(text) => setUserData({ ...userData, email: text })}
      />
      <TextInput
        placeholderTextColor={"white"}
        className="text-white border p-4 rounded-lg border-dark-100"
        placeholder="Password"
        secureTextEntry={true}
        autoCorrect={false}
        value={userData.password}
        onChangeText={(text) => setUserData({ ...userData, password: text })}
      />
      <TouchableOpacity
        onPress={handleSignin}
        disabled={loading}
        className="bg-accent rounded-xl p-4 text-center items-center"
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-white text-xl">Sign in</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row items-center gap-1 mt-8">
        <View className="w-full flex-1 h-[1px] bg-white"></View>
        <Text className="text-white ">Or continue with</Text>
        <View className="w-full flex-1 h-[1px] bg-white"></View>
      </View>

      <View className="flex-row items-center  gap-2 justify-center w-ful">
        <TouchableOpacity className="bg-dark-200 w-full justify-center p-4 rounded-lg flex-row gap-2 items-center">
          <Ionicons name="logo-google" size={20} color="white" />
          <Text className="text-white">Google</Text>
        </TouchableOpacity>
      </View>

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

export default SigninCard;
