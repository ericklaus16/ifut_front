import { useNavigation } from "expo-router"
import { View, Image, StyleSheet, TouchableOpacity } from "react-native"

const UserProfilePhoto = () => {
    const navigator = useNavigation()

    return(
        <TouchableOpacity onPress={() => navigator.navigate('conta')}>
            <Image source={require('../assets/img/user_profile/bigblue.png')} style={styles.userProfilePhoto} alt="User Profile Photo" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    userProfilePhoto: {
        width: 65,
        height: 65,
        borderRadius: 50
    }
})

export default UserProfilePhoto