import { View, Text, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'

import { images } from '../../constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'

const SignIn = () => {

 const [form, setForm] = React.useState({
    email: '',
    password: '', 
  });


  return (
    <SafeAreaView className='bg-primary h-full'>
      <GestureHandlerRootView>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className='items-center justify-center w-full h-full px-4 my-4'>
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
              handlePress={() => {}}
              containerStyles='mt-5 w-full'
              textStyles=''
              isLoading={false}
            />

            <Text className='text-white text-center mt-5 font-pregular'>
              Don't have an account? 
              <Text className='text-secondary-200'> Sign up</Text>
            </Text>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default SignIn