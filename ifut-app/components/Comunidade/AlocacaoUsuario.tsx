import { useUserContext } from "@/context/UserProvider"
import { Alocacao } from "@/types/Alocacao"
import { useNavigation } from "expo-router"
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const AlocacaoUsuario = (props: Alocacao) => {
    const {user} = useUserContext()
    const navigator = useNavigation()

    const handleCancelAllocation = () => {
        Alert.alert('Alerta', `Deseja mesmo cancelar a alocação no campo ${props.field_name} no dia ${props.date} às ${props.hour}?`, 
        [
            {text: 'Sim', onPress: () => {
                if(user?.classUser){
                    user.unbookField(props.id).then(() => {
                        Alert.alert('Alocação cancelada com sucesso!', "", [{text: 'Ok', onPress: () => {navigator.navigate('comunidade')}}])
                    })
                }
            }},
            {text: 'Não', onPress: () => {}}
    ])}

    return (
        <View style={styles.allocation}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image source={{uri: 'https://www.google.com.br/google.jpg'}} style={{width: '30%', height: undefined, aspectRatio: 1}} resizeMode="contain"/>
                <View>
                    <Text>{props.field_name}</Text>
                    <Text>{props.date} - {props.hour}</Text>
                </View>
                <TouchableOpacity onPress={handleCancelAllocation}><Text>Cancelar</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default AlocacaoUsuario

const styles = StyleSheet.create({
    allocation: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#fff',
        shadowColor: '#171717',
        elevation: 10,
        flexDirection: 'column'
    }
})