import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

type EmptyStateProps = {
  title: string;
  subTitle: string;
}

const EmptyState = ({title, subTitle}: EmptyStateProps) => {
  return (
    <View className='justify-center items-center px-4'>
        <Image
            source={images.empty}
            className='w-[270] h-[215]'
            resizeMode='contain'
        />
        <Text className='text-xl text-white font-pbold'>{title}</Text>
        <Text className='text-ml text-gray-100 text-center font-psemibold'>{subTitle}</Text>
        <CustomButton 
            title='Upload Video'
            handlePress={() => router.push('/create')}
            containerStyles='w-[250] my-5' 
            textStyles={''} 
            isLoading={false}        
        />
    </View>
  )
}

export default EmptyState