import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

type Horario = {
    horariosDeInicio: string,
    selecionado : boolean,
    corDeFundo: string
}

const HoraAlocacao = (props: Horario) => {
    const [selecionadoBackground, setSelecionadoBackground] = useState('#fff')
    const [selecionadoHorario, setSelecionadoHorario] = useState('#080c2f')
    const [opacidade, setOpacidade] = useState(0.65)

    const selectData = () => {
        setSelecionadoBackground('#169C89')
        setSelecionadoHorario('#eee')
        setOpacidade(1)
    }

    return (
        <View style={[styles.container, {backgroundColor: props.corDeFundo}]}>
            <Text style={{color: selecionadoHorario, opacity: opacidade}}>{props.horariosDeInicio}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: '60%',
        shadowColor: '#171717',
        elevation: 10,
        marginRight: 110,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    diaInteiro: {
        fontSize: 16,
        fontWeight: '500',
    }
})

export default HoraAlocacao