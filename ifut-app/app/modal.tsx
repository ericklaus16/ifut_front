import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import DiaAlocacao from '@/components/ModalCampo/DiaAlocacao';
import HoraAlocacao from '@/components/ModalCampo/HoraAlocacao';

import axios from 'axios';
import { UserType } from '@/types/User';

import * as SecureStore from 'expo-secure-store';
import { getUser } from '@/services/user';
import UserData from '@/classes/UserData';
import { useUserContext } from '@/context/UserProvider';

export default function ModalScreen() {
  const params = useLocalSearchParams()
  const navigator = useNavigation()

  const { nome, localizacao, preco, imagem, dias_disponiveis, rating, dias_funcionamento, horario_funcionamento } = params
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState<string>("")
  const [precisaDeColete, setPrecisaDeColete] = useState(false)

  const { user } = useUserContext()

  const calcularDiasFuncionamento = (diasFuncionamento: string[], numDias: number) => {
    const diasSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    const hoje = new Date();
    const diaSemanaAtual = hoje.getDay();

    // Encontrar o próximo dia de funcionamento disponível após hoje
    let proximoDiaFuncionamento = null;
    for (let i = 1; i <= 7; i++) {
      const diaIndex = (diaSemanaAtual + i) % 7; // Calcula o índice do dia na semana
      const diaAtual = diasSemana[diaIndex].toLowerCase(); // Converte para minúsculas para comparação
      if (diasFuncionamento.includes(diaAtual) && diaIndex >= 1 && diaIndex <= 5) {
        proximoDiaFuncionamento = i;
        break;
      }
    }
  
    const datasFuncionamento = [];
    if (proximoDiaFuncionamento !== null) {
      for (let i = 0; i < numDias; i++) {
        const novaData = new Date();
        novaData.setDate(hoje.getDate() + proximoDiaFuncionamento + i);
        const diaSemana = novaData.getDay();
        const diaNome = diasSemana[diaSemana].substring(0, 3) + '.';
        const captalized = diaNome.charAt(0).toUpperCase() + diaNome.slice(1);
  
        if(diasFuncionamento.includes(diasSemana[diaSemana].toLowerCase())){
          datasFuncionamento.push({
            id: i,
            dia: captalized,
            diaInteiro: novaData.getDate(),
            horariosDisponiveis: [], // Preencher com os horários disponíveis se necessário
            selecionado: false,
            mes: novaData.getMonth(),
            ano: novaData.getFullYear(),
          });
        }
      }
    }
  
    return datasFuncionamento;
  };

  const handleBooking = () => {
    console.log('Reservando horário...')
    console.log('Campo:', nome)
    console.log('Data:', bookingDate)
    console.log('Horário:', bookingTime)

    if(!bookingDate || !bookingTime) {
      Alert.alert('Erro', 'Selecione uma data e um horário para reservar.')
      return
    }
    // Enviar requisição para a API
    user?.bookField(1, user?.classUser as UserType, bookingDate, bookingTime, nome as string).then(() => {
      console.log('Horário reservado com sucesso!')
      Alert.alert('Horário reservado com sucesso!', `Parabéns! Seu horário está marcado para as ${bookingTime} do dia ${bookingDate}.`, [
          { text: 'OK', onPress: () => navigator.navigate('home') }
      ])
      }).catch((error) => {
      console.error('Erro ao reservar horário:', error)
      alert('Erro ao reservar horário. Tente novamente.')
    })
  }

  useEffect(() => {
    axios.get('http://192.168.0.19:8080/procurarhorario').then(() => {
      
    })
  })

  return (
    <View style={styles.container}>
      <View style={styles.empresa}>
        <Image source={{uri: "https://static.wikia.nocookie.net/enfuturama/images/1/13/Planet_express.png/revision/latest?cb=20130716185556"}} style={{width: 100, height: 100}} resizeMode='contain'/>
        <View style={styles.nome}>
          <Text style={styles.title}>{nome}</Text>
          <Text style={styles.subtitle}><FontAwesome name="star" color="gold"/> {rating}</Text>
          <Text style={styles.preco}>R$ {preco}</Text>
        </View> 
      </View>
      <View style={styles.commonArea}>
        <Text style={styles.descriptionTitle}>Sobre o Campo</Text>
        <Text style={styles.description}>Sim, este campo é de fato um dos campos. Isso aqui tem detalhes sobre o campo.</Text>
      </View>
      <View style={styles.commonArea}>
        <Text style={styles.descriptionTitle}>PRECISA DE COLETE?</Text>
        <View style={[styles.commonArea, {flexDirection: 'row'}]}>
          <TouchableOpacity onPress={() => setPrecisaDeColete(true)} style={[styles.botaoColete, {backgroundColor: precisaDeColete ? '#169C89' : '#FFFFFF'}]}><Text style={[styles.textoBotao, {color: precisaDeColete ? '#080C2F' : '#080C2F'}]}>SIM</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setPrecisaDeColete(false)} style={[styles.botaoColete, {marginLeft: '10%', backgroundColor: precisaDeColete ? '#FFFFFF' : '#169C89'}]}><Text style={[styles.textoBotao, {color: precisaDeColete ? '#080C2F' : '#FFFFFF'}]}>NÃO</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.commonArea}>
        <View style={styles.allocationHeader}>
          <Text style={styles.allocationHeaderTitle}>Data</Text>
          <TouchableOpacity><Text style={styles.allocationMonthText}>Set. <FontAwesome name="chevron-right"/></Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: '5%', height: 62}}>
          {calcularDiasFuncionamento((dias_funcionamento as string[]), 15).map((dia, index) => (
            <TouchableOpacity onPress={() => {
                setBookingDate(dia.diaInteiro + '/' + (dia.mes + 1) + '/' + dia.ano)
                console.log(dia.diaInteiro + '/' + (dia.mes + 1) + '/' + dia.ano)
              }}
              key={index}
            >
              <DiaAlocacao 
                key={dia.id}
                dia={dia.dia} 
                diaInteiro={dia.diaInteiro} 
                selecionado={dia.selecionado}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.commonArea}>
        <Text style={styles.allocationHeaderTitle}>Horário</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: '5%', height: 62}}>
          {(horario_funcionamento as string[]).map((horario: string, index: number) => (
            <TouchableOpacity
              onPress={() => {
                console.log(horario)
                setBookingTime(horario)
              }}
              key={index}
            >
              <HoraAlocacao 
                key={horario}
                horariosDeInicio={horario} 
                selecionado={false}
                corDeFundo={'#fff'}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity 
        onPress={handleBooking}
        style={{width: '80%', backgroundColor: '#169C89', borderRadius: 30, paddingVertical: '5%', marginTop: '5%', elevation: 10}}>
        <Text style={{fontSize: 16, fontWeight: '600', color: '#fff', textAlign: 'center'}}>Reservar Horário</Text>
      </TouchableOpacity>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'SpaceMono',	
  },
  empresa: {
    width: '80%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  nome: {
    backgroundColor: '#fff',
    marginLeft: '10%',
  },
  nomeEmpresa: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  preco:{
    fontSize: 16,
    fontWeight: '600',
    color: '#169C89',
    marginTop: '5%',
  },
  commonArea: {
    width: '80%',
    backgroundColor: '#fff',
  },
  descriptionTitle: {
    fontSize: 16,
    color: '#080c2f',
    opacity: 0.5,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
  },
  description: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    fontFamily: 'SpaceMono',
  },
  botaoColete: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: '5%',
    paddingVertical: '5%',
    paddingHorizontal: '10%',
    elevation: 10,
  },
  textoBotao:{
    fontSize: 14,
    fontWeight: '800',
    color: '#080C2F',
    opacity: 0.75,
  },
  allocationHeader: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  allocationHeaderTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
  },
  allocationMonthText: {
    fontSize: 16,
    color: '#080c2f',
    opacity: 0.5,
    fontFamily: 'SpaceMono',
  },
});
