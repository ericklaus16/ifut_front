import { Image, FlatList, SafeAreaView, Text, View, StyleSheet } from "react-native"
import { useEffect, useState } from "react"

const ads = [
    {id: 1, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaHNKkO39sc7j3AXMWSWMmmvi2B7HggPdZxw&s"},
    {id: 2, url: "https://logos-world.net/wp-content/uploads/2020/05/Facebook-Logo.jpg"},
    {id: 3, url: "https://www.google.com.br/google.jpg"},
]

const AdHolder = () => {
    const [currentAd, setCurrentAd] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentAd(prevAd => (prevAd + 1) % 3); // Incrementa o contador e faz o módulo 3 para voltar a 0 após 2
        }, 3000); // Intervalo de 3 segundos
    
        // Limpar o intervalo quando o componente for desmontado
        return () => clearInterval(intervalId);    
    }, [])

    return (
        <SafeAreaView style={{width: '80%', height: undefined, flexDirection: 'column', marginTop: '5%'}}>
            <View style={{alignItems: 'center'}}>
                <Image resizeMode="contain" style={{width: '100%', height: '80%', aspectRatio: 2}} source={{uri: ads[currentAd].url}}/>               
                <View style={{flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <View style={{backgroundColor: currentAd == 0 ? '#007' : '#CCC', width: 20, height: 20, borderRadius: 15}}></View>
                    <View style={{backgroundColor: currentAd == 1 ? '#007' : '#CCC', width: 20, height: 20, borderRadius: 15}}></View>
                    <View style={{backgroundColor: currentAd == 2 ? '#007' : '#CCC', width: 20, height: 20, borderRadius: 15}}></View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AdHolder 