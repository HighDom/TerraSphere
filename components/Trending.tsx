import { View, Text, TouchableOpacity, ImageBackground, Image} from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable'
import { icons } from '@/constants';
import { Video, ResizeMode, AVPlaybackStatus} from 'expo-av';

const zoomIn = {
  0: {
    opacity: 0.7,
    scale: 0.7,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};

const zoomOut = {
  0: {
    opacity: 1,
    scale: 1,
  },
  1: {
    opacity: 0.7,
    scale: 0.7,
  },
};

const TrendingItem = ({activeItem, item}: {activeItem: any, item: any}) => {
  const [play, setPlay] = useState(false);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) setPlay(false);
  }

  return (
    <Animatable.View 
      className='mr-5'
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={200}
    >
      {play ? 
      (
        <Video 
          source={{uri : item.video}}
          className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />

      ) 
        : 
      (
        <TouchableOpacity 
          className='justify-center items-center' 
          activeOpacity={0.7}
          onPress={() => setPlay(!play)}
        >
          <ImageBackground
            source={{uri: item.thumbnail}}
            className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
          />

          <Image 
            source={icons.play}
            className='absolute w-12 h-12'
            resizeMode='contain'
            />
        </TouchableOpacity>
    )}

    </Animatable.View>
  );
}


type TrendingProps = {
  activeItem: any;
  posts: Array<any>;
};

const Trending = ({posts}: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[1])

  const viewableItemsChanged = ({viewableItems}: {viewableItems: any}) => {
    if (viewableItems.length > 0) setActiveItem(viewableItems[0].key);
  }

  return (
    <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <TrendingItem activeItem={activeItem} item={item}/>
        )} 
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold: 70}}
        contentOffset={{x: 70, y: 0 }}
        horizontal
    />
  )
}

export default Trending