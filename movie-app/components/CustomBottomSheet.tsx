import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { Divider, List } from "react-native-paper";

type CustomBottomSheetProps = {
  chooseFromLibrary: () => void;
  closeSheet: () => void;
  sheetRef: any;
  takePhoto: () => void;
};

const CustomBottomSheet = ({
  chooseFromLibrary,
  closeSheet,
  sheetRef,
  takePhoto,
}: CustomBottomSheetProps) => {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const snapPoints = useMemo(() => ["50%"], []);
  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
      }}
    >
      <BottomSheetScrollView contentContainerStyle={{ padding: 20, gap: 10 }}>
        <View className="items-center flex-row justify-between">
          <Text className="text-xl">Edit profile picture</Text>
          <TouchableOpacity
            onPress={closeSheet}
            className="border rounded-full"
          >
            <Ionicons name="close" size={20} />
          </TouchableOpacity>
        </View>
        <List.Section className="border bg-black/10 border-black/10 rounded-xl">
          <TouchableOpacity onPress={takePhoto}>
            <List.Item
              title="Take Photo"
              titleStyle={{ color: "black" }}
              right={(props) => (
                <List.Icon {...props} icon={"camera-outline"} color="black" />
              )}
            />
          </TouchableOpacity>

          <Divider className="ml-2" />
          <TouchableOpacity onPress={chooseFromLibrary}>
            <List.Item
              title="Choose photo"
              titleStyle={{ color: "black" }}
              right={(props) => (
                <List.Icon {...props} icon={"image-outline"} color="black" />
              )}
            />
          </TouchableOpacity>
        </List.Section>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default CustomBottomSheet;
