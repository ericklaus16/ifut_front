import { StyleSheet, SafeAreaView } from 'react-native';

import { Text } from '@/components/Themed';
import UserInfoAndAds from '@/components/HomePage/UserInfoAndAds';
import Campos from '@/components/HomePage/Campos';

import * as SecureStorage from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { UserType } from '@/types/User';
import { useFocusEffect, useNavigation } from 'expo-router';
import { useUserContext } from '@/context/UserProvider';
import UserData from '@/classes/UserData';

export default function TabOneScreen() {
  const navigator = useNavigation()
  const { user, ChangeUser } = useUserContext()

  useEffect(() => {
    if(!SecureStorage.getItemAsync('userData')){
      navigator.navigate('index')
    } else {
      SecureStorage.getItemAsync('userData').then((response) => {
        if(response){
          const user = JSON.parse(response)
          ChangeUser(user)
        }
      })
    }
  }, [])

  return (
    <SafeAreaView style={{backgroundColor: '#FFF'}}>
      <UserInfoAndAds userData={user} />
      <Campos />
    </SafeAreaView>
  );
}