import { StyleSheet, Text, View } from "react-native";
import UserProfilePhoto from "../UserProfilePhoto";
import AdHolder from "./AdHolder";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getUser } from "@/services/user";
import { UserType } from "@/types/User";
import { useFocusEffect } from "expo-router";
import UserData from "@/classes/UserData";

type UserProps = {
    userData? : UserData

}

const UserInfoAndAds = (props: UserProps) => {
    const {userData} = props

    useEffect(() => {
    }, [])

    return (
        <View style={styles.userInfoAndAdsContainer}>
            <View style={styles.userInfoContainer}>
                <View>
                    <Text style={styles.welcomeUser}>Olá, {userData?.classUser?.username}</Text>
                    <Text><FontAwesome name="map-marker" size={18} color="#169C89" />  de Cascavel!</Text>
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
        height: 315,
        alignItems: 'center',
        shadowColor: '#171717',
        elevation: 10,
        borderRadius: 25,
        backgroundColor: '#fff',
        paddingTop: '10%'
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