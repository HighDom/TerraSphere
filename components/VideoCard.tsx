import { View, Text, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { icons } from '@/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AV, AVPlaybackStatus } from 'expo-av/build/AV';
import { ResizeMode, Video } from 'expo-av';

type VideoCardProps = {
    video: {
      title: string;
      thumbnail: string;
      video: string;
      creator: {
        username: string;
        avatar: string;
      };
    };
};

const VideoCard = ({video: {title, thumbnail, video, creator: {username, avatar}}}: VideoCardProps) => {
    const [play, setPlay] = useState(false);
    const [avatarError, setAvatarError] = useState(false);
    const [thumbnailError, setThumbnailError] = useState(false);
    const { width } = Dimensions.get('window');

    useEffect(() => {
        console.log('Thumbnail URL:', thumbnail);
        console.log('Avatar URL:', avatar);
    }, [thumbnail, avatar]);
    
    return (
        <View className='flex-col items-center px-4 mb-14'>
            

            <TouchableOpacity
                className='w-full'
                onPress={() => {
                    setPlay(!play);
                }}
                activeOpacity={0.7}
            >
                {play ? (
                    <Video 
                    source={{uri : video}}
                    className='w-full h-60 rounded-xl mt-3'
                    resizeMode={ResizeMode.COVER}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status:AVPlaybackStatus) => {if (status.isLoaded && status.didJustFinish) setPlay(false);}}
                  />
                ) : thumbnailError ? (
                    <View className="bg-gray-700 rounded-xl w-full aspect-video justify-center items-center">
                    <Text className="text-white">Failed to load thumbnail</Text>
                    </View>
                ) : (
                    <View className="relative">
                        <Image 
                            source={{uri: thumbnail}} 
                            style={{
                            width: width - 32,
                            aspectRatio: 16 / 9,
                            }}
                            className='rounded-xl' 
                            resizeMode='cover'
                            onError={(e) => {
                            console.error('Thumbnail image failed to load:', e.nativeEvent.error);
                            setThumbnailError(true);
                            }}
                        />
                        <Image
                            source={icons.play}
                            className="w-12 h-12 absolute top-1/2 left-1/2 transform ml-[-24px] -mt-6"
                            resizeMode="contain"
                        />
                    </View>
                )}
            </TouchableOpacity>

            <View className='flex-row gap-3 items-start mt-1'>
                <View className='justify-center items-center flex-row flex-1'>
                    <View className='w-[46px] h-[46px] rounded-lg border-secondary justify-center items-center p-0.5'>
                        {avatarError ? (
                            <Text className="text-white text-xs">Error</Text>
                        ) : (
                            <Image 
                                source={{uri: avatar}} 
                                style={{width: 46, height: 46}}
                                className='rounded-lg' 
                                resizeMode='cover'
                                onError={(e) => {
                                    console.error('Avatar image failed to load:', e.nativeEvent.error);
                                    setAvatarError(true);
                                }}
                            />
                        )}
                    </View>
                    <View className='justify-center flex-1 ml-3 gap-y-1'>
                        <Text className='text-white font-semibold text-sm' numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className='text-gray-100 font-regular text-xs' numberOfLines={1}>
                            {username}
                        </Text>
                    </View>
                    <View className='pt-2'>
                        <Image 
                            source={icons.menu} 
                            style={{width: 20, height: 20}}
                            resizeMode='contain'
                        /> 
                    </View>
                </View>
            </View>
        </View>
    )
}

export default VideoCard