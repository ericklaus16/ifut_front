import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native"
import InputCampo from "./InputCampo"
import CampoExibido from "./CampoExibido"
import { useEffect, useState } from "react"
import axios from "axios"
import { CampoType } from "@/types/Campo"

const filteredArray: CampoType[] = []

const Campos = () => {
    const [campos, setCampos] = useState<CampoType[]>([])
    useEffect(() => {
        axios.get("http://192.168.0.19:8080/fields").then((res) => {
            if(res.status === 200){
                setCampos(res.data)
            }
        }).catch((err) => {
            console.log(err)
        })
        // console.log(campos)
    }, [])

    return (
        <View style={{marginTop: 20}}>
            {campos && (
                <InputCampo key={0} dataToFilter={campos} dadosFiltrados={filteredArray}/>
            )}
        </View>
    )
}

export default Campos