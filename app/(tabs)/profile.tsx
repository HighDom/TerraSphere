import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, searchPosts, singOut } from "../../lib/appwrite";
import VideoCard from "@/components/VideoCard";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import {router } from "expo-router";

interface Post {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  creator: {
    username: string;
    avatar: string;
  };
}





const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data } = useAppwrite(() => getUserPosts(user.$id));
  // Type assertion for posts
  const posts = data as Post[] | undefined;

  const logout = async () => {
    await singOut();
    setUser(null);
    setIsLoggedIn(false);
  
    router.replace('/sign-in');
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <VideoCard
            video={{
              title: item.title,
              thumbnail: item.thumbnail,
              video: item.video,
              creator: {
                username: item.creator.username,
                avatar: item.creator.avatar
              }
            }}
            />
          )}
          ListHeaderComponent={() => (
            <View className="w-full justify-center items-center  mt-6 mb-12 px-4">
              <TouchableOpacity
                className="w-full items-end mb-10"
                onPress={logout}
              >
                <Image 
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-8 h-8"
                  />
              </TouchableOpacity>

              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                <Image 
                  source={{uri: user?.avatar}} 
                  className="w-[90%] h-[90%]" 
                  resizeMode="cover"


                />
              </View>
              <InfoBox 
                title={user.username}
                subtitle=""
                containerStyle="mt-4"
                titleStyle="text-lg"
              />

              <View className="flex-row  mt-5">
                <InfoBox 
                  title={posts?.length?.toString() ?? "5"}
                  subtitle="Videos"
                  containerStyle="mr-10"
                  titleStyle="text-lg"
                />
                <InfoBox 
                  title="1.2k"
                  subtitle="Followers"
                  containerStyle=""
                  titleStyle="text-lg"
                />
              </View>            
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos found for this search query" 
              buttonTitle={"Upload your own Videos"}          
            />
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
    
  );
};

export default Profile;