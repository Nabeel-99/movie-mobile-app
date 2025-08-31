import LatestMovies from "@/components/LatestMovies";
import SearchBar from "@/components/SearchBar";
import TrendingMovies from "@/components/TrendingMovies";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies, fetchTrendingMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(fetchTrendingMovies);

  return (
    <View className="flex-1  bg-primary text-white  w-full ">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        className=""
      >
        <Image source={icons.logo} className="mt-20 mx-auto" />
        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"0000ff"}
            className="mt-10 self-center"
          />
        ) : moviesError || trendingMoviesError ? (
          <Text>
            Error: {moviesError?.message || trendingMoviesError?.message}
          </Text>
        ) : (
          <View className="flex flex-col gap-5 mt-5 px-5  w-full">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search through 300+ movies"
            />
            <TrendingMovies trendingMovies={trendingMovies} />
            <LatestMovies movies={movies} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
