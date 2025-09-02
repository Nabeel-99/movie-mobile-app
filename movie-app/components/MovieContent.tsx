import { formatCurrency, formatDuration } from "@/constants/utils";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/components/ThemeContext";

const MovieContent = ({
  movie,
  saveMovieDetails,
}: {
  movie: MovieDetails | null;
  saveMovieDetails: () => void;
}) => {
  const { theme } = useTheme();

  return (
    <View className="flex-1 gap-5 px-5">
      {/* title */}
      <Text
        style={{ color: theme.colors.onBackground }}
        className="text-xl font-bold"
      >
        {movie?.title}
      </Text>

      {/* release date, duration */}
      <View className="flex-1 flex-row items-center justify-start gap-3">
        <Text style={{ color: theme.colors.onBackground }}>
          {movie?.release_date.split("-")[0]}
        </Text>
        <Text style={{ color: theme.colors.onBackground }}>{"\u2022"}</Text>
        <Text style={{ color: theme.colors.onBackground }}>
          {formatDuration(Number(movie?.runtime))}
        </Text>
      </View>

      {/* movie rating, popularity */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center gap-2">
          <View
            style={{
              backgroundColor: theme.colors.surface,
            }}
            className="p-3 flex-row gap-2 items-center rounded-lg"
          >
            <Ionicons name="star" color={"#FFD700"} size={20} />
            <Text style={{ color: theme.colors.onSurface }}>
              {movie?.vote_average.toFixed(1)}/10 ({movie?.vote_count})
            </Text>
          </View>

          <View
            style={{
              backgroundColor: theme.colors.surface,
            }}
            className="p-3 flex-row gap-2 items-center rounded-lg"
          >
            <FontAwesome
              name="line-chart"
              color={theme.colors.onSurface}
              size={20}
            />
            <Text style={{ color: theme.colors.onSurface }}>
              {Math.round(Number(movie?.popularity))}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={saveMovieDetails}>
          <Ionicons
            name="bookmark-outline"
            size={30}
            color={theme.colors.onSurface}
          />
        </TouchableOpacity>
      </View>

      {/* movie summary */}
      <View className="flex-1 gap-2">
        <Text style={{ color: theme.colors.onSurface }}>Overview</Text>
        <Text
          style={{ color: theme.colors.onBackground }}
          className="leading-relaxed"
        >
          {movie?.overview}
        </Text>
      </View>

      {/* Release date and status */}
      <View className="flex-1 flex-row justify-between w-full gap-2">
        <View className="gap-2">
          <Text style={{ color: theme.colors.onSurface }}>Release</Text>
          <Text style={{ color: theme.colors.onBackground }}>
            {movie?.release_date}
          </Text>
        </View>
        <View className="gap-2">
          <Text style={{ color: theme.colors.onSurface }}>Status</Text>
          <Text style={{ color: theme.colors.onBackground }}>
            {movie?.status}
          </Text>
        </View>
      </View>

      {/* Genres */}
      <View className="flex-1 gap-2">
        <Text style={{ color: theme.colors.onSurface }}>Genres</Text>
        <View className="flex-1 flex-row items-center gap-2 flex-wrap">
          {movie?.genres.map((item) => (
            <Text
              key={item.id}
              style={{
                color: theme.colors.onSurface,
                backgroundColor: theme.colors.surface,
              }}
              className="p-2 rounded-lg"
            >
              {item.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Countries */}
      <View className="flex-1 gap-2">
        <Text style={{ color: theme.colors.onSurface }}>Countries</Text>
        <View className="flex-1 flex-row items-center gap-2 flex-wrap">
          {movie?.production_countries.map((item) => (
            <Text
              key={item.iso_3166_1}
              style={{
                color: theme.colors.onSurface,
                backgroundColor: theme.colors.surface,
              }}
              className="p-2 rounded-lg"
            >
              {item.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Budget & Revenue */}
      <View className="flex-row items-start justify-start gap-10">
        <View className="gap-2">
          <Text style={{ color: theme.colors.onSurface }}>Budget</Text>
          <Text style={{ color: theme.colors.onBackground }}>
            {formatCurrency(Number(movie?.budget))}
          </Text>
        </View>
        <View className="gap-2">
          <Text style={{ color: theme.colors.onSurface }}>Revenue</Text>
          <Text style={{ color: theme.colors.onBackground }}>
            {formatCurrency(Number(movie?.revenue))}
          </Text>
        </View>
      </View>

      {/* Tagline */}
      <View className="flex-1 gap-2">
        <Text style={{ color: theme.colors.onSurface }}>Tagline</Text>
        <Text
          style={{ color: theme.colors.onBackground }}
          className="font-bold"
        >
          {movie?.tagline}
        </Text>
      </View>

      {/* Production Company */}
      <View className="flex-1 gap-2">
        <Text style={{ color: theme.colors.onSurface }}>
          Production Company
        </Text>
        <View className="flex-row flex-wrap items-center gap-2">
          {movie?.production_companies.map((item) => (
            <Text key={item.id} style={{ color: theme.colors.onBackground }}>
              {item.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Visit Home page */}
      {movie?.homepage && (
        <Link href={movie?.homepage as any} asChild>
          <TouchableOpacity className="bg-accent mt-5 p-3 flex-row gap-2 items-center justify-center rounded-lg">
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Visit Homepage
            </Text>
            <Ionicons name="arrow-forward" color={"white"} size={20} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
};

export default MovieContent;
