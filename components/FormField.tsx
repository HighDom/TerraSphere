import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import icons from '../constants/icons'

type FormFieldProps = {
    title: string,
    value: string,
    handleChangeText: (text: string) => void,
    otherStyles: string,
    placeHolder: string,
}


const FormField = ({title, value, handleChangeText, otherStyles, placeHolder, ...props}: FormFieldProps) => {
    const [showPassword, setShowPassword] = React.useState(false)
    
    return (
        <View className={`spacy-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-100 font-pmedium'>
                {title}
            </Text>
            <View className='w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center'>
                <TextInput 
                    value={value}
                    onChangeText={handleChangeText}
                    placeholder={placeHolder}
                    placeholderTextColor="#7B7B8B"
                    secureTextEntry={title === "Password" && !showPassword}
                    className='flex-1 text-white font-psemibold text-base'
                    {...props}
                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image 
                            source={showPassword ? icons.eye : icons.eyeHide}
                            className='w-6 h-6'
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField