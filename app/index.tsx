import {Text, View, Image } from 'react-native';
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';


import { images } from '../constants';
import CustomButton from '@/components/CustomButton';

const index = () => {
    return (
        <SafeAreaView className='bg-primary h-full'>
            <GestureHandlerRootView>
                <ScrollView contentContainerStyle={{ height: '100%' }}>
                    <View className='items-center justify-center w-full min-h-[85vh] px-4'>
                        <Image 
                            source={images.logo}
                            className="w-[130px] h-[84px]"
                            resizeMode='contain'
                        />
                        <Image  
                            source={images.cards}
                            className="w-[380px] h-[300px]"
                            resizeMode='contain'
                        />
                        <View className='relative mt-5'>
                            <Text className='text-3xl text-white font-bold text-center'>Discover Endless Possibilities with 
                                <Text className='text-secondary-200'> Aora</Text>
                            </Text>
                            <Image
                                source={images.path}
                                className='w=[136px] h-[15px] absolute-bottom-1 -right-44'
                                resizeMode='contain'
                            />
                        </View>

                        <Text
                            className='text-sm text-gray-100 text-center mt-5 font-pregular'

                        >
                            Where creativity meets limitless possibilities. Aora is a platform that allows you to create, share and explore endless possibilities.
                        </Text>
                        <CustomButton 
                            title='Continue with Email'
                            handlePress={() => {router.push('./sign-in')} }
                            containerStyles="mt-5 w-full" 
                            textStyles={''} 
                            isLoading={false}                        
                        />
                        
                    </View>
                </ScrollView>
            </GestureHandlerRootView>
            <StatusBar backgroundColor='161622' style='light'/>
        </SafeAreaView>
    );
}

export default index