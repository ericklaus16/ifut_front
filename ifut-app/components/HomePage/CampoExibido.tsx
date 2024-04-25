import { StyleSheet, View, Image, Text } from "react-native"

type CampoProps = {
    nome: string,
    localizacao: string,
    preco: number,
    imagem?: string
}

const CampoExibido = (props: CampoProps) => {
    return (
        <View style={{marginBottom: 25, alignItems: 'center'}}>
            <Image 
                style={styles.campo} 
                source={{uri: "https://www.google.com.br/google.jpg"}} 
                alt="Campo"  
                resizeMode="contain"
            />
            <View style={{marginTop: -20}}>
                <Text style={styles.nomeCampo}>{props.nome}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={styles.localizacaoLogo} source={{uri: "https://www.google.com.br/google.jpg"}} resizeMode="contain"/>
                    <Text style={styles.localizacao}>{props.localizacao}</Text>
                </View>
                <Text style={styles.preco}>R${props.preco} por hora</Text>
            </View>
        </View>
    )
}       

const styles = StyleSheet.create({
    campo: {
        width: '100%',
        height: 120,
        marginVertical: 40
    },
    nomeCampo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    localizacao: {
        fontSize: 14,
        color: '#BBB',
        fontWeight: 'bold'
    },
    localizacaoLogo: {
        width: 30,
        height: 30,
        marginRight: 5
    },
    preco: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green'
    }
})

export default CampoExibido