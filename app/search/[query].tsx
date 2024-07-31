import { View, Text, SafeAreaView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import useAppwrite from '@/lib/useAppwrite'
import { getAllPosts, getLatestPosts, searchPosts } from '@/lib/appwrite'
import VideoCard from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const {query} = useLocalSearchParams();
  const {data: posts = [] as any[], refetch } = useAppwrite(searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);


  return (
    <GestureHandlerRootView>
      <SafeAreaView className='bg-primary h-full'>
        <FlatList 
          data={posts} 
          keyExtractor={(item) => item.$id}
          renderItem={({item}) => (
            <VideoCard video={item} />
          )}
          ListHeaderComponent={() => (
            <View className='my-6 px-4 space-y-4'>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Search Results
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    {query}
                  </Text>
                  <SearchInput 
                    initialQuery={query}
                    title={''} 
                    value={''} 
                    handleChangeText={function (text: string): void {
                      throw new Error('Function not implemented.')
                  } } 
                otherStyles={''} 
                 placeHolder={''}
                />
            </View>
          )}

          ListEmptyComponent={() => (
            <View className='flex-1 justify-center items-center'>
              <EmptyState 
                title='No Videos Found' 
                subTitle='Be the first one to Upload a video'              />
            </View>
          )}
        />
          

      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Search
