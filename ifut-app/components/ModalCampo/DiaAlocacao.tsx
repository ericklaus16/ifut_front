import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

type Dia = {
    dia: string,
    diaInteiro: number,
    selecionado : boolean,
}

const DiaAlocacao = (props: Dia) => {
    const [selecionadoBackground, setSelecionadoBackground] = useState('#fff')
    const [selecionadoDiaInteiro, setSelecionadoDiaInteiro] = useState('#000')
    const [selecionadoDia, setSelecionadoDia] = useState('#080c2f')

    return (
        <View style={[styles.container, {backgroundColor: selecionadoBackground}]}>
        <Text style={[styles.diaInteiro, {color: selecionadoDiaInteiro}]}>{props.diaInteiro}</Text>
            <Text style={{color: selecionadoDia, opacity: 0.65}}>{props.dia}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 60,
        height: 60,
        shadowColor: '#171717',
        elevation: 10,
        marginRight: 110,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    diaInteiro: {
        fontSize: 16,
        fontWeight: '500',
    }
})

export default DiaAlocacao