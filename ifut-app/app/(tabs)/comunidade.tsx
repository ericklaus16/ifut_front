import { ScrollView, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import UserProfilePhoto from '@/components/UserProfilePhoto';
import { useEffect, useState } from 'react';
import { UserType } from '@/types/User';
import { getUser } from '@/services/user';
import axios from 'axios';
import { useFocusEffect, useNavigation } from 'expo-router';
import { Alocacao } from '@/types/Alocacao';
import AlocacaoUsuario from '@/components/Comunidade/AlocacaoUsuario';
import { useUserContext } from '@/context/UserProvider';

export default function TabTwoScreen() {
  const { user, bookings } = useUserContext()

  useEffect(() => {
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.allocations}>
        <Text style={styles.title}>Suas alocações</Text>
        <ScrollView style={{width: '90%', height: '50%', backgroundColor: '#fff', marginTop: '5%'}} showsVerticalScrollIndicator={false}>
          {user?.classUser?.alocacoes && user.classUser.alocacoes.map((allocation: Alocacao, index) => (
            <AlocacaoUsuario 
            date={allocation.date} field_id={allocation.field_id} field_name={allocation.field_name} hour={allocation.hour}
            id={allocation.id} key={index} user_id={allocation.user_id}
            />
          ))}
          {user?.classUser?.alocacoes && user?.classUser?.alocacoes.length == 0 && (
            <Text style={{color: '#000'}}>Sem alocações no momento!</Text>
          )}
        </ScrollView>  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  welcome: {
    backgroundColor: '#fff',
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  allocations: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  }
});
