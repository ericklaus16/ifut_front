import { StyleSheet, SafeAreaView } from 'react-native';

import { Text } from '@/components/Themed';
import UserInfoAndAds from '@/components/HomePage/UserInfoAndAds';
import Campos from '@/components/HomePage/Campos';

import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { UserType } from '@/types/User';
import { useFocusEffect, useNavigation } from 'expo-router';
import { useUserContext } from '@/context/UserProvider';
import UserData from '@/classes/UserData';

export default function TabOneScreen() {
  const navigator = useNavigation<any>()
  const { user, ChangeUser } = useUserContext()

  useEffect(() => {
    const checkUserData = async () => {
      const response = await SecureStore.getItemAsync('userData');
      if (!response) {
        navigator.navigate('index');
      } else {
        const user = JSON.parse(response);
        ChangeUser(user);
      }
    };
    checkUserData();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#FFF'}}>
      <UserInfoAndAds userData={user} />
      <Campos />
    </SafeAreaView>
  );
}