import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import icons from '../constants/icons'

type SearchInputProps = {
    title: string,
    value: string,
    handleChangeText: (text: string) => void,
    otherStyles: string,
    placeHolder: string,
}


const SearchInput = ({title, value, handleChangeText, otherStyles, placeHolder, ...props}: SearchInputProps) => {
    
    const [showPassword, setShowPassword] = React.useState(false)
    
    return (
        <View className='flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary'>
            <TextInput 
                className='text-base mt-0.5 text-white flex-1 font-pregular'
                value={value}
                placeholder="Search for videos"
                placeholderTextColor="#7B7B8B"
                onChangeText={handleChangeText}
                secureTextEntry={title === "Password" && !showPassword}
                {...props}
                style={{ 
                    textAlignVertical: 'center' 
                }}

                
            />
            <TouchableOpacity>
                <Image 
                    source={icons.search}
                    className='w-6 h-6'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput