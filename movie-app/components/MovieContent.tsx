import { formatCurrency, formatDuration } from "@/constants/utils";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const MovieContent = ({
  movie,
  saveMovieDetails,
}: {
  movie: MovieDetails | null;
  saveMovieDetails: () => void;
}) => {
  return (
    <View className="flex-1 gap-5 px-5">
      {/* title */}
      <Text className="text-white text-xl font-bold">{movie?.title}</Text>
      {/* release date, duration */}
      <View className="flex-1 flex-row items-center justify-start gap-3">
        <Text className="text-white">{movie?.release_date.split("-")[0]}</Text>
        <Text className="text-white">{"\u2022"}</Text>
        <Text className="text-white">
          {formatDuration(Number(movie?.runtime))}
        </Text>
      </View>
      {/* movie rating, popularity */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center gap-2">
          <View className="bg-dark-100 p-3 flex-row gap-2 items-center rounded-lg">
            <Ionicons name="star" color={"#FFD700"} size={20} />
            <Text className="text-white">
              {movie?.vote_average.toFixed(1)}/10 ({movie?.vote_count})
            </Text>
          </View>
          <View className="bg-dark-100 p-3  flex-row gap-2  items-center rounded-lg">
            <FontAwesome name="line-chart" color={"#a8b5db"} size={20} />
            <Text className="text-white">
              {Math.round(Number(movie?.popularity))}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={saveMovieDetails}>
          <Ionicons name="bookmark-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* movie summary */}
      <View className="flex-1 gap-2">
        <Text className="text-light-200">Overview</Text>
        <Text className="text-white leading-relaxed">{movie?.overview}</Text>
      </View>
      {/* Relase data and status */}
      <View className="flex-1 flex-row justify-between w-full  gap-2">
        <View className="gap-2">
          <Text className="text-light-200">Release</Text>
          <Text className="text-light-100">{movie?.release_date}</Text>
        </View>
        <View className="gap-2">
          <Text className="text-light-200">Status</Text>
          <Text className="text-light-100">{movie?.status}</Text>
        </View>
      </View>
      {/* Genres */}
      <View className="flex-1 gap-2">
        <Text className="text-light-200">Genres</Text>
        <View className="flex-1 flex-row items-center gap-2">
          {movie?.genres.map((item) => (
            <Text
              key={item.id}
              className="bg-dark-200 p-2 text-light-100 rounded-lg"
            >
              {item.name}
            </Text>
          ))}
        </View>
      </View>
      {/* Countries */}
      <View className="flex-1 gap-2">
        <Text className="text-light-200">Countries</Text>
        <View className="flex-1 flex-row items-center gap-2">
          {movie?.production_countries.map((item) => (
            <Text
              key={item.iso_3166_1}
              className="bg-dark-200 p-2 text-light-100 rounded-lg"
            >
              {item.name}
            </Text>
          ))}
        </View>
      </View>
      {/* Budget */}
      <View className="flex-row items-start justify-start gap-10">
        <View className=" gap-2">
          <Text className="text-light-200"> Budget</Text>
          <Text className="text-light-100">
            {formatCurrency(Number(movie?.budget))}
          </Text>
        </View>
        <View className=" gap-2">
          <Text className="text-light-200"> Revenue</Text>
          <Text className="text-light-100">
            {formatCurrency(Number(movie?.revenue))}
          </Text>
        </View>
      </View>

      {/* Tagline */}
      <View className="flex-1 gap-2">
        <Text className="text-light-200">Tagline</Text>
        <Text className="text-light-100 font-bold">{movie?.tagline}</Text>
      </View>

      {/* Production Company */}
      <View className="flex-1 gap-2">
        <Text className="text-light-200">Production Company</Text>
        <View className="flex-row flex-wrap items-center gap-2">
          {movie?.production_companies.map((item) => (
            <Text key={item.id} className=" text-light-100 rounded-lg">
              {item.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Visit Home page */}
      {movie?.homepage && (
        <Link href={movie?.homepage as any} asChild>
          <TouchableOpacity className="bg-accent mt-5 p-3 flex-row gap-2 items-center justify-center rounded-lg">
            <Text className="text-dark-200 font-bold">Visit Homepage</Text>
            <Ionicons name="arrow-forward" color={"black"} size={20} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
};

export default MovieContent;
