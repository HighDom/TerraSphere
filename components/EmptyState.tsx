import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

type EmptyStateProps = {
  title: string;
  subtitle: string;
  buttonTitle: string;
}

const EmptyState = ({title, subtitle, buttonTitle}: EmptyStateProps) => {
  return (
    <View className='justify-center items-center px-4'>
        <Image
            source={images.empty}
            className='w-[270] h-[215]'
            resizeMode='contain'
        />
        <Text className='text-xl text-white font-pbold'>{title}</Text>
        <Text className='text-ml text-gray-100 text-center font-psemibold'>{subtitle}</Text>
        <CustomButton 
            title={`${buttonTitle}`}
            handlePress={() => router.push('/create')}
            containerStyles='w-[250] my-5' 
            textStyles={''} 
            isLoading={false}        
        />
    </View>
  )
}

export default EmptyState