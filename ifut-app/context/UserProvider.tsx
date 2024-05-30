"use client";
import UserData from '@/classes/UserData';
import { Alocacao } from '@/types/Alocacao';
import { UserType } from '@/types/User';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PostContextProps {
    user: UserData | undefined;
    bookings: Alocacao[] | undefined;
    ChangeUser: (newUser: UserData) => void;
}

const UserContext = createContext<PostContextProps | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('usePostContext must be used within a PostProvider');
    }
    return context;
};

interface PostProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<PostProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserData>();
    const [bookings, setBookings] = useState<Alocacao[]>()

    const ChangeUser = (newUser: UserData) => {
        console.log('Atualizando o usuário no context!')
        if(newUser.classUser){
            console.log(newUser.classUser)
            setBookings(newUser.classUser?.alocacoes)
        }
        setUser(newUser);
    }

    const addBooking = (newBooking: Alocacao) => {
        user?.classUser?.alocacoes.push(newBooking)
    };

    return (
        <UserContext.Provider value={{ user, bookings, ChangeUser }}>
        {children}
        </UserContext.Provider>
    );
};