import { useEffect, useState } from "react"
import { Alert, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Text} from "react-native"
import CampoExibido from "./CampoExibido"
import { CampoType } from "@/types/Campo"

type InputCampoProps = {
    dataToFilter: CampoType[]
    dadosFiltrados: CampoType[]
}

const InputCampo = (props: InputCampoProps) => {
    const [valorInput, setValorInput] = useState('')
    const [filteredArray, setFilteredArray] = useState<CampoType[]>(props.dataToFilter)
    
    useEffect(() => {
        setFilteredArray(props.dataToFilter)
    }, [props.dataToFilter, valorInput])

    return (
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <View style={styles.inputAndIconHolder}>
                    <Image source={require('../../assets/img/icons/search.png')} style={{width: 20, height: 20}}/>
                    <TextInput style={styles.input} 
                        onChangeText={(text) => {
                            setValorInput(text.valueOf().toString())
                            // filtrar os dados pelo valor do input
                            setFilteredArray(props.dataToFilter.filter(campo => campo.name.includes(text.valueOf().toString())))
                            
                        }}/>
                </View>
                <TouchableOpacity onPress={() => Alert.alert('essa porra ainda vai filtrar')} >
                    <Image source={require('../../assets/img/icons/filter.png')} style={{width: 30, height: 30}}/>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollViewCampos} showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                {filteredArray.map((campo, index) => (
                    <CampoExibido 
                    key={index} 
                    id={campo.id}
                    name={campo.name} 
                    address={campo.address} 
                    price={campo.price} 
                    image={campo.image}
                    avaiable_days={campo.avaiable_days}
                    rating={campo.rating}
                    working_days={campo.working_days}
                    working_hour_days={campo.working_hour_days}
                    />
                ))} 
            </ScrollView>
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
    },
    scrollViewCampos: {
        height: undefined,
        aspectRatio: 0.9,
    },

})

export default InputCampo