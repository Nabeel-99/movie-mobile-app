import MovieContent from "@/components/MovieContent";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/hooks/useFetch";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import axios from "axios";
import { BACKEND_URL } from "@/constants/utils";
import { Portal, Snackbar } from "react-native-paper";
import { useAuth } from "@/components/AuthContext";
import { scheduleNotificationReminder } from "@/services/notifications";
import { useTheme } from "@/components/ThemeContext";

const Details = () => {
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  const { data: movie } = useFetch(() => fetchMovieDetails(id as string));
  const [isVisible, setIsVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { theme } = useTheme();
  const saveMovieDetails = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/movies/save`,
        {
          data: movie,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        setIsVisible(true);
        setSnackbarMessage("Movie saved successfully");
        await scheduleNotificationReminder(movie?.title || "");
      }
    } catch (error: any) {
      console.log("error", error);
      if (error.status === 400) {
        setIsVisible(true);
        setSnackbarMessage("Movie already exists");
      }
    }
  };
  return (
    <View
      style={{ backgroundColor: theme.colors.background }}
      className="flex-1 "
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="flex-1 gap-6">
          {/* poster */}
          <Image
            source={{
              uri: movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                : "https://via.placeholder.com/150",
            }}
            className="w-full min-h-[550px] rounded-lg"
            resizeMode="cover"
          />
          {/* content */}
          <MovieContent movie={movie} saveMovieDetails={saveMovieDetails} />
          <Portal>
            <Snackbar
              visible={isVisible}
              onDismiss={() => setIsVisible(false)}
              duration={3000}
              style={{ backgroundColor: "#0f0d23" }}
            >
              {snackbarMessage}
            </Snackbar>
          </Portal>
        </View>
      </ScrollView>
    </View>
  );
};

export default Details;
