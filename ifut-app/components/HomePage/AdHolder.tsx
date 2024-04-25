import { View, Image, FlatList } from "react-native"
import Ad from "./Ad"

const ads = [
    {id: 1, url: "https://www.google.com.br/google.jpg"},
    {id: 2, url: "https://www.google.com.br/google.jpg"},
    {id: 3, url: "https://www.google.com.br/google.jpg"},
]



const AdHolder = () => {
    return (
        <View style={{height: 10, flexDirection: 'row'}}>
            <Ad />
            <Ad />
            <Ad />
        </View>
    )
}

export default AdHolder