import React from "react";
import { FlatList, Text } from "react-native";
import MovieCard from "./cards/MovieCard";

const LatestMovies = ({ movies }: { movies: Movie[] }) => {
  return (
    <>
      <Text className="text-lg font-bold text-white">Latest movies</Text>
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
