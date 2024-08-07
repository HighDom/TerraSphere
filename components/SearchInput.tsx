import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'
import { router, usePathname } from 'expo-router'



const SearchInput = ({ initialQuery }: { initialQuery: any }) => {
    
    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery || '');
    
    return (
        <View className='flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary'>
            <TextInput 
                className='text-base mt-0.5 text-white flex-1 font-pregular'
                value={query}
                placeholder="Search for videos"
                placeholderTextColor="#CDCDE0"
                onChangeText={(e) => setQuery(e)}
                style={{ 
                    textAlignVertical: 'center' 
                }}

                
            />
            <TouchableOpacity
                onPress={() => {
                    if(query === '') {
                        return Alert.alert('Please enter a search query')
                    }
                    if(pathname.startsWith("./search")) {
                        router.setParams({query})
                    }
                    else {
                        router.push(`/search/${query}`);
                    }
                }}    
            >
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