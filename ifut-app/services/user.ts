import { UserType } from '@/types/User';
import axios from 'axios';
import * as SecureStorage from 'expo-secure-store';

export const getUser = async () => {

    const storedUser = await SecureStorage.getItemAsync('user')
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user
}