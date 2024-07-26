import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import icons from '../../constants/icons';

interface TabIconProps {
    icon: any; // Replace 'any' with the appropriate type if you have it
    color: string;
    name: string;
    focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
    return (
        <View className='items-centered justify-center gap-2'>
            <Image 
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-6 h-6' 
            />
            <Text className={`${focused ? 'font-semibold' : 'font-pregular'} text-xs`}>
                {name}
            </Text>
        </View>
    );
};

const TabsLayout: React.FC = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                name="Home"
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;
