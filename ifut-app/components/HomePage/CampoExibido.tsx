import { CampoType } from "@/types/Campo"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "expo-router"
import React from "react"
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native"

const CampoExibido = (props: CampoType) => {
    const navigator = useNavigation()

    const handlePress = () => {
        navigator.navigate('modal', {
            nome: props.name, localizacao: props.address, 'preco': props.price, 'imagem': props.image,
            'dias_disponiveis': props.avaiable_days, 'rating': props.rating, 'dias_funcionamento': props.working_days,
            'horario_funcionamento': props.working_hour_days
        })
    }

    return (
        <TouchableOpacity 
            onPress={handlePress}
            activeOpacity={0.85} style={{marginBottom: 20, alignItems: 'center', elevation: 5, backgroundColor: '#fff', padding: 10, shadowColor: '#171717'}}>
            <Image 
                style={styles.campo} 
                source={{uri: props.image ? props.image : "https://www.google.com.br/google.jpg"}} 
                alt="Campo"  
                resizeMode="cover"
            />
            <View style={{marginTop: -20}}>
                <Text style={styles.nomeCampo}>{props.name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.localizacao}><FontAwesome name="map-marker" size={18} color="#169C89" />  {props.address}</Text>
                </View>
                <Text style={styles.preco}>R${props.price} por hora</Text>
            </View>
        </TouchableOpacity>
    )
}       

const styles = StyleSheet.create({
    campo: {
        width: '80%',
        height: 80,
        marginVertical: 40,
    },
    nomeCampo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    localizacao: {
        fontSize: 14,
        color: '#BBB',
        fontWeight: 'bold',
        paddingLeft: 5,
        width: '90%'
    },
    localizacaoLogo: {
        width: 30,
        height: 30,
        paddingTop: 6
    },
    preco: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green'
    }
})

export default CampoExibido