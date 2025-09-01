import React from "react";
import { FlatList, Text } from "react-native";
import TrendingCard from "./cards/TrendingCard";
import { useTheme } from "@/components/ThemeContext";

const TrendingMovies = ({ trendingMovies }: { trendingMovies: Movie[] }) => {
  const { theme } = useTheme();
  return (
    <>
      <Text
        style={{ color: theme.colors.onBackground }}
        className="font-bold text-lg"
      >
        Trending Movies
      </Text>
      <FlatList
        data={trendingMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TrendingCard {...item} index={index} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      />
    </>
  );
};

export default TrendingMovies;
