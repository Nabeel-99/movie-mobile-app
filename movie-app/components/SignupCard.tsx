import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import { BACKEND_URL } from "@/constants/utils";
import { Portal, Snackbar } from "react-native-paper";

const SignupCard = () => {
  const router = useRouter();
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
        router.push("/signin");
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
    <View className="bg-primary flex-1 mt-10  gap-6 p-4 px-6 rounded-lg">
      <TextInput
        placeholderTextColor={"white"}
        className="text-white border p-4 rounded-lg border-dark-100"
        placeholder="First name"
        value={userData.firstname}
        autoCorrect={false}
        onChangeText={(text) => setUserData({ ...userData, firstname: text })}
      />
      <TextInput
        placeholderTextColor={"white"}
        className="text-white border p-4 rounded-lg border-dark-100"
        placeholder="Last name"
        value={userData.lastname}
        autoCorrect={false}
        onChangeText={(text) => setUserData({ ...userData, lastname: text })}
      />
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
        onPress={handleSignup}
        disabled={loading}
        className="bg-accent rounded-xl p-4 text-center items-center"
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-white text-xl">Sign up</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row items-center mt-10   gap-2 justify-center w-ful">
        <Text className="text-white text-xl">Already have an account?</Text>
        <Link href={"/signin"} className="text-accent text-xl">
          Login
        </Link>
      </View>
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

export default SignupCard;
