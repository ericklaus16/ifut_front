import { Alert, Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"

const InputCampo = () => {
    return (
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <View style={styles.inputAndIconHolder}>
                    <Image source={require('../../assets/img/icons/search.png')} style={{width: 20, height: 20}}/>
                    <TextInput style={styles.input}/>
                </View>
                <TouchableOpacity onPress={() => Alert.alert('essa porra ainda vai filtrar')} >
                    <Image source={require('../../assets/img/icons/filter.png')} style={{width: 30, height: 30}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputAndIconHolder: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#DDD',
        borderRadius: 50,
        width: '85%',
    },
    input: {
        width: '70%',
        height: 45,
        fontSize: 20,
        margin: 7,
    }
})

export default InputCampo