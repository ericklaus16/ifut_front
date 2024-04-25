import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native"
import InputCampo from "./InputCampo"
import CampoExibido from "./CampoExibido"

const Campos = () => {
    return (
        <View>
            <InputCampo />
            <ScrollView style={styles.scrollViewCampos} showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                <CampoExibido nome="Santiago Bernabeu" localizacao="R. Carlos Bartolomeu Cancelli, 950 - Bairro Cancelli" preco={100}/>
                <CampoExibido nome="Maracanã" localizacao="R. Carlos Bartolomeu Cancelli, 950 - Bairro Cancelli" preco={200}/>
                <CampoExibido nome="Mineirão" localizacao="R. Carlos Bartolomeu Cancelli, 950 - Bairro Cancelli" preco={150}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollViewCampos: {
        height: 440,
    },
})

export default Campos