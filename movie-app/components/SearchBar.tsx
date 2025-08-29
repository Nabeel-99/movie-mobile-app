import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}
const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View className=" w-full flex gap-4 flex-row items-center bg-dark-200 rounded-full py-4 px-5">
      <Ionicons name="search-outline" size={20} color="white" />
      <TextInput
        placeholder={placeholder}
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#a8b5db"}
        className="  text-white"
      />
    </View>
  );
};

export default SearchBar;
