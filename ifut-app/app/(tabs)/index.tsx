import { StyleSheet, SafeAreaView } from 'react-native';

import { Text } from '@/components/Themed';
import UserInfoAndAds from '@/components/HomePage/UserInfoAndAds';
import Campos from '@/components/HomePage/Campos';

export default function TabOneScreen() {
  return (
    <SafeAreaView style={{backgroundColor: '#FFF'}}>
      <UserInfoAndAds />
      <Campos />
    </SafeAreaView>
  );
}