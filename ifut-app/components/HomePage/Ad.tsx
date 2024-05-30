import { Image, StyleSheet } from "react-native"

const Ad = () => {
    return (
        <Image 
            style={styles.ad} 
            source={{uri: "https://www.google.com.br/google.jpg"}} 
            alt="Ads"  
            resizeMode="contain"    
        />
    )
}

const styles = StyleSheet.create({
    ad: {
        width: '30%',
        height: 100,
    }
})

export default Ad