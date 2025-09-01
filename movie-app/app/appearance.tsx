import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React from "react";
import { Divider, List, Surface, Switch } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/components/ThemeContext";

const appearance = () => {
  const { toggleTheme, theme, themeMode, lastManualTheme } = useTheme();
  const systemScheme = useColorScheme();
  return (
    <View
      style={{ backgroundColor: theme.colors.background }}
      className="flex-1 justify-center  h-full "
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "flex-start",
          paddingTop: 20,
          paddingBottom: 100,
        }}
      >
        <List.Subheader style={{ fontSize: 14 }}>APPEARANCE</List.Subheader>
        <Surface
          style={{
            borderRadius: 12,
            paddingVertical: 20,
            backgroundColor: theme.colors.surface,
            marginHorizontal: 10,
            padding: 10,
          }}
        >
          <View className="flex-row items-center  pb-10 gap-24 justify-center">
            <View className="   items-center gap-4">
              <View className="h-24 px-6 rounded-lg border border-white bg-white"></View>
              <Text style={{ color: theme.colors.onBackground }}>Light</Text>
              <TouchableOpacity onPress={() => toggleTheme("light")}>
                <View
                  className={`${(themeMode === "light" || (themeMode === "system" && !theme.dark)) && "bg-blue-500"} items-center justify-center h-5 w-5 rounded-full border border-white`}
                >
                  {(themeMode === "light" ||
                    (themeMode === "system" && !theme.dark)) && (
                    <Ionicons name="checkmark" color={"white"} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View className="  items-center gap-4">
              <View className="h-24 px-6 rounded-lg border border-dark-100 bg-primary"></View>
              <Text style={{ color: theme.colors.onBackground }}>Dark</Text>
              <TouchableOpacity onPress={() => toggleTheme("dark")}>
                <View
                  className={`${(themeMode === "dark" || (themeMode === "system" && theme.dark)) && "bg-blue-500"} items-center justify-center h-5 w-5 rounded-full border border-white`}
                >
                  {(themeMode === "dark" ||
                    (themeMode === "system" && theme.dark)) && (
                    <Ionicons name="checkmark" color={"white"} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Divider className="ml-2" />
          <List.Item
            title="Automatic"
            titleStyle={{ color: theme.colors.onSurface }}
            className=""
            right={() => (
              <Switch
                value={themeMode === "system"}
                onValueChange={(isSystem) => {
                  if (isSystem) {
                    toggleTheme("system");
                  } else {
                    // When turning off system mode, use the last manually selected theme
                    toggleTheme(lastManualTheme);
                  }
                }}
                color={"#AB8BFF"}
              />
            )}
          />
        </Surface>
      </ScrollView>
    </View>
  );
};

export default appearance;
