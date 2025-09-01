import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";
import { useTheme } from "@/components/ThemeContext";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}
const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  const { theme } = useTheme();
  return (
    <View
      style={{ backgroundColor: theme.colors.surface }}
      className="w-full flex gap-4 flex-row items-center rounded-full py-4 px-5"
    >
      <Ionicons
        name="search-outline"
        size={20}
        color={theme.colors.onSurface}
      />
      <TextInput
        placeholder={placeholder}
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.onSurfaceVariant}
        style={{ color: theme.colors.onSurface }}
        className="flex-1"
      />
    </View>
  );
};

export default SearchBar;
