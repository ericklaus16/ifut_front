import { View, Image, StyleSheet } from "react-native"

const UserProfilePhoto = () => {
    return(
        <View>
            <Image source={require('../assets/img/user_profile/bigblue.png')} style={styles.userProfilePhoto} alt="User Profile Photo" />
        </View>
    )
}

const styles = StyleSheet.create({
    userProfilePhoto: {
        width: 80,
        height: 80,
        borderRadius: 50
    }
})

export default UserProfilePhoto