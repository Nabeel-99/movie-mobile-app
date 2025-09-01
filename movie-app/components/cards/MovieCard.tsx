import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/components/ThemeContext";

const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  const { theme } = useTheme();
  return (
    <Link
      href={{ pathname: "/movies/[id]", params: { id: id, title: title } }}
      className="flex flex-col gap-3 p rounded-md"
      asChild
    >
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/150",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text
          style={{ color: theme.colors.onBackground }}
          className="font-bold line-clamp-1"
        >
          {title}
        </Text>
        <View className="flex-1 flex-row items-center gap-1">
          <Ionicons name="star" color={"#FFD700"} size={15} />
          <Text style={{ color: theme.colors.onBackground }}>
            {vote_average.toFixed(1)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between gap-3">
          <Text
            style={{ color: theme.colors.onBackground }}
            className="text-sm"
          >
            {release_date.split("-")[0]}
          </Text>
          <Text
            style={{ color: theme.colors.onBackground }}
            className="text-sm"
          >
            MOVIE
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
