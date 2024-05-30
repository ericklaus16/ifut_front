import { StyleSheet, TextInput, TouchableHighlight } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import UserProfilePhoto from '@/components/UserProfilePhoto';
import { useEffect, useState } from 'react';
import { UserType } from '@/types/User';
import { getUser } from '@/services/user';

import * as SecureStorage from 'expo-secure-store'
import { useFocusEffect, useNavigation } from 'expo-router';
import { useUserContext } from '@/context/UserProvider';

export default function TabThreeScreen() {
  const { user } = useUserContext()
  const navigator = useNavigation()
  const [logOut, setLogout] = useState(false)

  useEffect(() => {
  }, [user])

  const formatarCPF = (cpf: string | undefined) => {
    if(cpf){
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
      return ''
    }
  }

  const formatarTelefone = (telefone: string | undefined) => {
    if(telefone){
      return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
      return ''
    }
  }

  const handleLogout = async () => {
    await SecureStorage.deleteItemAsync('userData').then(() => {
      console.log("Usuário deslogou do sistema!")
      if(!SecureStorage.getItem('userData')){
        navigator.navigate('index')
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <UserProfilePhoto />
        <Text style={{color: '#000'}}>Detalhes da conta de {user?.classUser?.username}</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.formInput}>
            <Text style={styles.inputDataType}>Nome</Text>
            <TextInput style={styles.input} value={user?.classUser?.username} editable={false}/>
        </View>
        <View style={styles.formInput}>
            <Text style={styles.inputDataType}>CPF</Text>
            <TextInput style={styles.input} value={formatarCPF(user?.classUser?.cpf)} editable={false}/>
        </View>
        <View style={styles.formInput}>
            <Text style={styles.inputDataType}>Endereço de e-mail</Text>
            <TextInput style={styles.input} value={user?.classUser?.email} editable={false}/>
        </View>
        <View style={styles.formInput}>
            <Text style={styles.inputDataType}>Telefone</Text>
            <TextInput style={styles.input} value={formatarTelefone(user?.classUser?.phone)} editable={false}/>
        </View>
      </View>
      <TouchableHighlight style={styles.deleteAccountButton} onPress={handleLogout}>
        <Text style={{color: '#FFF'}}>Deslogar</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  form: {
    backgroundColor: '#fff',
    width: '100%',
    marginTop: '10%',
  },
  formInput: {
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  inputDataType:{
      // fontFamily: 'Inter',
      fontSize: 15,
      lineHeight: 18.15,
      fontWeight: '400',
      color: '#000'
  },
  input: {
    marginTop: 10,
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#171717',
    elevation: 10,
    padding: 10
  },
  deleteAccountButton: {
    backgroundColor: '#FF0000',
    width: '80%',
    height: 50,
    borderRadius: 15,
    shadowColor: '#171717',
    elevation: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  }
});
