import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { FlatList, GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setRefreshing(false);
  }



  return (
    <GestureHandlerRootView>
      <SafeAreaView className='bg-primary h-full'>
        <FlatList 
          data={[{id: 1},{id:2}, {id:69}]} 
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <Text className='text-3xl text-white'>{item.id}</Text>
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
                
                <Trending posts={[{id: 1},{id:2}, {id:69}] ?? []}/>

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