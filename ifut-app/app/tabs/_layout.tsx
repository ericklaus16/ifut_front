import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, useNavigation } from 'expo-router';
import * as SecureStore from 'expo-secure-store'

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Login from '..';
import { UserType } from '@/types/User';
import { UserProvider, useUserContext } from '@/context/UserProvider';

export default function TabLayout() {
  const navigator = useNavigation()

  const {user} = useUserContext()

  useEffect(() => {
    if(!user){
      navigator.navigate('index')
    }
  }, [])
  
  function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  } 

  return (
    <Tabs
    initialRouteName='home' 
    screenOptions={{
        tabBarActiveTintColor: '#656f80', 
        headerShown: false,
        tabBarIconStyle: {
          width: 40,
          height: 40,
        },
        tabBarItemStyle: {
          height: 60,
        }
      }}>
        <Tabs.Screen name="home" options={{title: '', tabBarIcon: ({color}) => <TabBarIcon name="home" color={color}/>}} initialParams={user}/>
        <Tabs.Screen name="comunidade" options={{title: '', tabBarIcon: ({color}) => <TabBarIcon name="globe" color={color}/>}} initialParams={user}/>
        <Tabs.Screen name="conta" options = {{title: '', tabBarIcon: ({color}) => <TabBarIcon name="user" color={color}/>}} initialParams={user}/>
    </Tabs>
  );
}
