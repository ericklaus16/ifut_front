import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "expo-router";

import * as SecureStore from 'expo-secure-store'

import UserData from "@/classes/UserData";
import { useUserContext } from "@/context/UserProvider";
import { UserType } from "@/types/User";
import { passwordToHash } from "@/services/password";

export default function Register(){
    const { ChangeUser } = useUserContext()

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [cpf, setCpf] = useState("")
    const [phone, setPhone] = useState("")
    const navigator = useNavigation()

    const handleRegister = async () => {
        const userData = new UserData()
        const passwordHash = passwordToHash(pass as string).then((hash) => {
            let passwordConverted: string = hash as string
            console.log(passwordConverted)
            const id = userData.registerUser(userName, email, passwordConverted, cpf, phone)
            if(id != -1){
                ChangeUser(userData)
                SecureStore.setItemAsync('userData', JSON.stringify(userData))
                navigator.navigate('index')
            }
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.sloganAndLogo}>
                <Text style={[styles.marca, {fontFamily: 'LilyScript'}]}>Ifut</Text>
                <Text style={[styles.slogan, {fontFamily: 'Inter'}]}>QUER JOGAR? ABRE O IFUT</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.formInput}>
                    <Text style={styles.inputDataType}>Nome de Usuário</Text>
                    <TextInput style={styles.input} onChangeText={(text) => setUserName(text.valueOf().toString())}/>
                </View>
                <View style={styles.formInput}>
                    <Text style={styles.inputDataType}>Endereço de E-mail</Text>
                    <TextInput 
                        inputMode="email"
                        style={styles.input} 
                        onChangeText={(text) => setEmail(text.valueOf().toString())}/>
                </View>
                <View style={styles.formInput}>
                    <Text style={styles.inputDataType}>Senha</Text>
                    <TextInput 
                        style={styles.input} 
                        secureTextEntry={true} 
                        onChangeText={(text) => setPass(text.valueOf().toString())}/>
                </View>
                <View style={styles.formInput}>
                    <Text style={styles.inputDataType}>Telefone</Text>
                    <TextInput 
                        style={styles.input} 
                        inputMode='numeric'
                        onChangeText={(text) => setPhone(text.valueOf().toString())}/>
                </View>
                <View style={styles.formInput}>
                    <Text style={styles.inputDataType}>CPF</Text>
                    <TextInput 
                        style={styles.input} 
                        inputMode="numeric"
                        onChangeText={(text) => setCpf(text.valueOf().toString())}/>
                </View>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
                <Text style={styles.loginButtonText}>Registrar-se</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    sloganAndLogo: {
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slogan:{
        fontWeight: "700",
        lineHeight: 14.52,
        marginTop: 30,
        color: '#000'
    },
    marca: {
        fontSize: 50,
        color: '#18ae54',
        lineHeight: 68.5,
    },
    form: {
        width: '80%',
        marginTop: 30,
        backgroundColor: '#fff',
    },
    formInput: {
        backgroundColor: '#fff',
        marginBottom: 20
    },
    inputDataType:{
        fontFamily: 'Inter',
        fontSize: 15,
        lineHeight: 18.15,
        fontWeight: '400',
        color: '#000'
    },
    input: {
        marginTop: 10,
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#171717',
        elevation: 10,
        padding: 10
    },
    loginButton:{
        marginBottom: 20,
    },
    loginButtonText:{
        color: '#18ae54',
        width: '100%',
        fontSize: 18,
    },
    registerLink: {
        fontFamily: 'Inter',
        fontSize: 15,
        lineHeight: 14.52,
        fontWeight: '400',
        textDecorationLine: 'underline',
    },
    loginsSecundarios: {
        backgroundColor: '#fff',
        marginTop: 30
    }
})