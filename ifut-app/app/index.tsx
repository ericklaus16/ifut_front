import { View } from "@/components/Themed";
import { Link, Tabs, useNavigation } from "expo-router";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, TouchableOpacityBase, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";

import { UserType } from "@/types/User";
import * as SecureStore from 'expo-secure-store'

import UserData from "@/classes/UserData";
import { useUserContext } from "@/context/UserProvider";

export default function StackTabOne(){
    const { ChangeUser } = useUserContext()

    const navigator = useNavigation();
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    useEffect(() => {
        SecureStore.getItemAsync('userData').then((response: any) => {
            if(response){
                console.log('Você fechou o app sem deslogar.')
                ChangeUser(JSON.parse(response))
                navigator.navigate('(tabs)')
            }
        })
    }, [])

    /*
    const [fontsLoaded] = useFonts({
        'LilyScript': require('../assets/fonts/LilyScriptOne-Regular.ttf'),
        'Inter': require('../assets/fonts/Inter-VariableFont_slnt,wght.ttf')
    });
    */

    const handleLogin = async () => {
        if(email && pass){
            const userData = new UserData()
            await userData.loginUser(email, pass).then((response) => {
                if(response){
                     SecureStore.setItemAsync('userData', JSON.stringify(userData)).then(() => {
                        ChangeUser(userData)
                        setEmail("")
                        setPass("")
                        navigator.navigate('(tabs)')
                    })
                } else {
                    Alert.alert('Erro', 'Usuário ou senha incorretos', [{text: 'Ok'}])
                }
            })
        } else {
            Alert.alert('Erro', 'Preencha todos os campos', [{text: 'Ok'}])
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.sloganAndLogo}>
                <Text style={[styles.marca]}>Ifut</Text>
                <Text style={[styles.slogan]}>QUER JOGAR? ABRE O IFUT</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.formInput}>
                    <Text style={styles.inputDataType}>Endereço de e-mail</Text>
                    <TextInput 
                        style={styles.input} 
                        inputMode="email" 
                        value={email} 
                        onChangeText={(text) => setEmail(text.valueOf().toString())}/>
                </View>
                <View style={styles.formInput}>
                    <Text style={styles.inputDataType}>Senha</Text>
                    <TextInput 
                        style={styles.input} 
                        secureTextEntry={true} 
                        value={pass}
                        onChangeText={(text) => setPass(text.valueOf().toString())}/>
                </View>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigate('register')} style={styles.registerLink}>
                <Text>Não tenho uma conta Ifut</Text>    
            </TouchableOpacity>
            <View style={styles.loginsSecundarios}>
                <Text>Continue com Apple</Text>
                <Text>Continue com Google</Text>
            </View>
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
        marginTop: 30
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
        // fontFamily: 'Inter',
        fontSize: 15,
        lineHeight: 18.15,
        fontWeight: '400'
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
        // fontFamily: 'Inter',
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