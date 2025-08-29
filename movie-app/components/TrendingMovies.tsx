import React from "react";
import { FlatList, Text } from "react-native";
import TrendingCard from "./TrendingCard";

const TrendingMovies = ({ trendingMovies }: { trendingMovies: Movie[] }) => {
  return (
    <>
      <Text className="text-white font-bold text-lg">Trending Movies</Text>
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
