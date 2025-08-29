import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "@/components/AuthContext";
export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <StatusBar barStyle={"light-content"} />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="movies/[id]"
                options={({ route }) => {
                  const params = route.params as { title?: string };
                  return {
                    headerBackTitle: "Back",
                    headerStyle: { backgroundColor: "#0f0d23" },
                    headerTintColor: "#a8b5db",
                    headerTitle: params?.title || "Movie Details",
                  };
                }}
              />

              <Stack.Screen
                name="(auth)/signin"
                options={{
                  headerBackTitle: "Back",
                  headerStyle: { backgroundColor: "#0f0d23" },
                  headerTintColor: "#a8b5db",
                  headerTitle: "Sign In",
                }}
              />
            </Stack>
          </SafeAreaProvider>
        </PaperProvider>
      </AuthProvider>
    </>
  );
}
