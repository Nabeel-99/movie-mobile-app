import { useAuth } from "@/components/AuthContext";
import MovieCard from "@/components/cards/MovieCard";
import { BACKEND_URL } from "@/constants/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const saved = () => {
  const [data, setData] = useState<Movie[]>([]);
  const { token } = useAuth();

  const [fetching, setFetching] = useState(false);
  const fetchSavedMovies = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/movies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSavedMovies();
  }, []);
  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="bg-primary flex-1 gap-8 mt-8 px-5">
        <Text className="text-white text-3xl font-bold">Saved Movies</Text>
        {fetching ? (
          <ActivityIndicator size={"large"} color={"0000ff"} />
        ) : (
          <FlatList
            data={data}
            refreshing={fetching}
            onRefresh={fetchSavedMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard {...item} />}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 30,
            }}
            ListEmptyComponent={() => (
              <View className="flex-1 items-center justify-center">
                <Text className="text-white text-lg font-bold">
                  No saved movies
                </Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={fetching}
                onRefresh={fetchSavedMovies}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default saved;
