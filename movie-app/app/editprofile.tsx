import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/AuthContext";
import BottomSheet from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BACKEND_URL, requestImagePickerPermission } from "@/constants/utils";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import UserEditCard from "@/components/UserEditCard";
const editprofile = () => {
  const { user, token, fetchUser } = useAuth();

  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [updatingName, setUpdatingName] = useState(false);
  const [updatingImage, setUpdatingImage] = useState(false);
  const isNameChanged = name.trim() !== originalName.trim();

  const sheetRef = useRef<BottomSheet>(null);
  const closeSheet = () => sheetRef.current?.close();
  const openSheet = () => sheetRef.current?.expand();

  useEffect(() => {
    if (user) {
      const fullname = `${user.firstname} ${user.lastname}`;
      setName(fullname);
      setOriginalName(fullname);
    }
  }, [user]);

  const saveChanges = async (
    formData: FormData,
    options: { name?: boolean; image?: boolean } = {}
  ) => {
    try {
      if (options.name) setUpdatingName(true);
      if (options.image) setUpdatingImage(true);
      if (options.image) closeSheet();
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/users/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        await fetchUser(token!);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      if (options.name) setUpdatingName(false);
      if (options.image) setUpdatingImage(false);
    }
  };
  const chooseFromLibrary = async () => {
    await requestImagePickerPermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    console.log("result", result);

    if (result.canceled) return;
    const asset = result.assets[0];
    const formData = new FormData();
    if (asset.uri) {
      formData.append("file", {
        uri: asset.uri,
        name: asset.fileName || `avatar_${Date.now()}.jpg`,
        type: asset.mimeType || "image/jpeg",
      } as any);
      await saveChanges(formData, { image: true });
    }
  };

  const takePhoto = async () => {
    await requestImagePickerPermission();
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (result.canceled) return;
    const asset = result.assets[0];
    const formData = new FormData();
    if (asset.uri) {
      formData.append("file", {
        uri: asset.uri,
        name: asset.fileName || `avatar_${Date.now()}.jpg`,
        type: asset.mimeType || "image/jpeg",
      } as any);
      await saveChanges(formData, { image: true });
    }
  };
  return (
    <>
      <UserEditCard
        name={name}
        setName={setName}
        isNameChanged={isNameChanged}
        updatingName={updatingName}
        updatingImage={updatingImage}
        openSheet={openSheet}
        saveChanges={saveChanges}
        user={user}
      />

      <CustomBottomSheet
        chooseFromLibrary={chooseFromLibrary}
        sheetRef={sheetRef}
        closeSheet={closeSheet}
        takePhoto={takePhoto}
      />
    </>
  );
};

export default editprofile;
