import { View, Text, SafeAreaView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import useAppwrite from '@/lib/useAppwrite'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import VideoCard from '@/components/VideoCard'

const Home = () => {

  const {data: posts = [] as any[], refetch } = useAppwrite(getAllPosts);
  const {data: latestPosts = [] as any[]} = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }



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
              <View className='justify-between items-start flex-row mb-6'>
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    Dominique Buob
                  </Text>
                </View>
                <View>
                  <Image
                    source={images.logoSmall}
                    className="w-9 h-10"
                    resizeMode='contain'
                  />
                </View>
                
              </View>

              <SearchInput 
                initialQuery={''}
                title={''} 
                value={''} 
                handleChangeText={function (text: string): void {
                  throw new Error('Function not implemented.')
                } } 
                otherStyles={''} 
                 placeHolder={''}
                />
              
              <View className='w-full flex-1 pt-5 pb-8'>
                <Text className='text-gray-100 text-lg font-pregular mb-3'>
                  Latest Videos
                </Text>
                
                <Trending posts={latestPosts ?? []} activeItem={undefined} />

              </View>
            </View>
          )}

          ListEmptyComponent={() => (
            <View className='flex-1 justify-center items-center'>
              <EmptyState 
                title='No Videos Found' 
                subTitle='Be the first one to Upload a video'              />
            </View>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
          

      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Home
