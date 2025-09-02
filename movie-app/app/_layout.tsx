import { Stack } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Provider as PaperProvider,
  Portal,
  Snackbar,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { AuthProvider } from "@/components/AuthContext";
import { ThemeProvider, useTheme } from "@/components/ThemeContext";
import { useNetwork } from "@/hooks/useNetwork";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

function AppContent() {
  const { isConnected, setIsConnected } = useNetwork();
  const { theme } = useTheme();
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={theme.dark ? "light-content" : "dark-content"}
            backgroundColor={theme.colors.background}
          />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="movies/[id]"
              options={({ route }) => {
                const params = route.params as { title?: string };
                return {
                  headerBackTitle: "Back",
                  headerStyle: { backgroundColor: theme.colors.surface },
                  headerTintColor: theme.colors.onSurface,
                  headerTitle: params?.title || "Movie Details",
                };
              }}
            />

            <Stack.Screen
              name="(auth)/signin"
              options={{
                headerBackTitle: "Back",
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.onSurface,
                headerTitle: "Sign In",
              }}
            />
            <Stack.Screen
              name="appearance"
              options={{
                headerBackTitle: "Back",
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.onSurface,
                headerTitle: "Display",
              }}
            />
            <Stack.Screen
              name="editprofile"
              options={{
                headerBackTitle: "Profile",
                headerStyle: { backgroundColor: theme.colors.surface },
                headerTintColor: theme.colors.onSurface,
                headerTitle: "Edit Profile",
              }}
            />
          </Stack>
          {!isConnected && (
            <Portal>
              <Snackbar
                visible={!isConnected}
                onDismiss={() => setIsConnected(true)}
                action={{
                  label: "Retry",
                  onPress: () => setIsConnected(true),
                }}
                style={{ marginBottom: 50, marginHorizontal: 20 }}
              >
                No internet connection
              </Snackbar>
            </Portal>
          )}
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
