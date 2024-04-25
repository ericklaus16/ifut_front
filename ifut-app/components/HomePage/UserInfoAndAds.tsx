import { StyleSheet, Text, View } from "react-native";
import UserProfilePhoto from "../UserProfilePhoto";
import AdHolder from "./AdHolder";

const UserInfoAndAds = () => {
    return (
        <View style={styles.userInfoAndAdsContainer}>
            <View style={styles.userInfoContainer}>
                <View>
                    <Text style={styles.welcomeUser}>Olá, Daniel Alves</Text>
                    <Text>de Banheiro!</Text>
                </View>
                <UserProfilePhoto />
            </View>
            <View>
                <AdHolder />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    userInfoAndAdsContainer: {
        width: '100%',
        height: 325,
        marginTop: 35,
        alignItems: 'center'
    },
    userInfoContainer: {
        backgroundColor: 'white',
        flexDirection: "row",
        justifyContent: "space-between",
        width: '90%',
        alignItems: "center",
    },
    welcomeUser: {
        fontSize: 17,
        fontWeight: "bold"
    }
})

export default UserInfoAndAds