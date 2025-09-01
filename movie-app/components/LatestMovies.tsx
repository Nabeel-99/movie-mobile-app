import React from "react";
import { FlatList, Text } from "react-native";
import MovieCard from "./cards/MovieCard";
import { useTheme } from "@/components/ThemeContext";

const LatestMovies = ({ movies }: { movies: Movie[] }) => {
  const { theme } = useTheme();
  return (
    <>
      <Text
        style={{ color: theme.colors.onBackground }}
        className="text-lg font-bold"
      >
        Latest movies
      </Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 30,
        }}
        scrollEnabled={false}
        renderItem={({ item }) => <MovieCard {...item} />}
      />
    </>
  );
};

export default LatestMovies;
