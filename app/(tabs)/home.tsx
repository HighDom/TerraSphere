import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'

const Home = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <FlatList 
          data={[{id: 1}]} 
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <Text>{item.id}</Text>
          )}
        />
          

      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Home