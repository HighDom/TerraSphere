import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

type TrendingProps = {
  posts: Array<any>;
};

const Trending = ({posts}: TrendingProps) => {
  return (
    <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
            <View>
                <Text className='font-pmedium text-sm text-gray-100'>{item.id}</Text>
            </View>
        )} 
        horizontal
    />
  )
}

export default Trending