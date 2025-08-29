import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
const TrendingCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
  index,
}: Movie & { index: number }) => {
  return (
    <Link
      href={{ pathname: "/movies/[id]", params: { id: id, title: title } }}
      className=" flex flex-col gap-3 w-32 p rounded-md text-white"
      asChild
    >
      <TouchableOpacity className="">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/150",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white font-bold line-clamp-1">{title}</Text>
        <View className="flex-1 flex-row items-center gap-1">
          <Ionicons name="star" color={"#FFD700"} size={15} />
          <Text className="text-white">{vote_average.toFixed(1)}</Text>
        </View>
        <View className="flex-row items-center justify-between gap-3">
          <Text className="text-white text-sm">
            {release_date.split("-")[0]}
          </Text>
          <Text className="text-white text-sm">MOVIE</Text>
        </View>
        <View className="absolute bottom-[3.5rem] -left-1 ">
          <MaskedView
            maskElement={
              <Text className="text-white text-6xl font-bold">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-20"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
