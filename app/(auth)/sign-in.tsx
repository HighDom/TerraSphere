import { View, Text, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'

import { images } from '../../constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'

const SignIn = () => {

 const [form, setForm] = React.useState({
    email: '',
    password: '', 
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const submit = () => {

  }


  return (
    <SafeAreaView className='bg-primary h-full'>
      <GestureHandlerRootView>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className='items-center w-full h-full px-4 my-4'>
            <Image 
              source={images.logo}
              className="w-[115px] h-[34px]"
              resizeMode='contain'
            />

            <Text className='text-2xl text-white text-semibold mt-10 font-psemibold text-center'> Log in to Aora</Text>

            <FormField 
              title='Email Address'
              value={form.email}
              handleChangeText={(e) => setForm({...form, email: e})}
              otherStyles='mt-5'
              placeHolder='Enter your email address'
            />
            <FormField 
              title='Password'
              value={form.password}
              handleChangeText={(e) => setForm({...form, password: e})}
              otherStyles='mt-5'
              placeHolder='Enter your Password'
            />

            <CustomButton
              title='Log in'
              handlePress={submit}
              containerStyles='mt-7 w-[200] h-[34px]'
              textStyles={''} 
              isLoading={isSubmitting}
            />

            <View className='flex flex-row justify-center items-center mt-5'>
              <Text className='text-white font-pmedium text-base'>Don't have an account?</Text>
              <Link href='/sign-up' className='text-secondary font-pmedium text-base ml-1'>Sign up</Link>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default SignIn