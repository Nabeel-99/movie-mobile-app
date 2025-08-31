import MovieCard from "@/components/cards/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";

import useFetch from "@/services/useFetch";

import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
const search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInput(searchQuery);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    const renderMovies = async () => {
      if (debouncedInput.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    };
    renderMovies();
  }, [debouncedInput]);
  return (
    <View className="flex-1 bg-primary w-full">
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        className="px-4 "
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => <MovieCard {...item} />}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20">
              <Image source={icons.logo} className="" />
            </View>
            <View className="mt-5">
              <SearchBar
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
                placeholder="Search through 300+ movies"
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator
                size={"large"}
                color={"0000ff"}
                className="my-3"
              />
            )}
            {moviesError && (
              <Text className="text-red-500">Error: {moviesError.message}</Text>
            )}
            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-white text-2xl font-bold mt-5">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View>
              <Text className="text-white text-center mt-20 ">
                {searchQuery.trim() && "No movies found"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default search;
