import { hashToPassword, passwordToHash } from "@/services/password";
import { Alocacao } from "@/types/Alocacao";
import { UserType } from "@/types/User";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { Alert } from "react-native";


export default class UserData {
    classUser: UserType | null = null;

    registerUser(userName: string, email: string, pass: string, cpf: string, phone: string): number {

        if(userName && email && pass && cpf){
            axios.post('http://192.168.0.19:8080/adduser', {
                username: userName,
                email: email,
                pass: pass,
                cpf: cpf,
                phone: phone
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if(response.status === 200){
                    console.log("Conta criada com sucesso!");
                    this.classUser = response.data
                    return response.data.id as number

                    // Saving that user is logged in
                } else {
                    return -1
                }
            })
            .catch(error => {
                console.log(error)
                return -1
            })
        } else {
            return -1
        }
    }

    async getUserBookings() {
        try {
            const response = await axios.get(`http://192.168.0.19:8080/allocations/user/${this.classUser?.id}`);
            const data = response.data as Alocacao[];
    
            if (this.classUser) {
                this.classUser.alocacoes = data;
            }
        } catch (error) {
            console.error('Erro ao buscar reservas:', error)
        }
    }

    async loginUser(email: string, pass: string): Promise<UserType | null> {
        try {
            const response = await axios.get('http://192.168.0.19:8080/users');
            const users = response.data;
            
            for (const user of users) {
                if (user.email === email) {
                    const password = await hashToPassword(user.pass);
                    if (password === pass) {
                        this.classUser = user
                        this.getUserBookings()
                        return user;
                    }
                }
            }
    
            return null; // Indicate user not found or incorrect password
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return null; // Return null in case of an error
        }
    }

    async bookField(fieldId: number, user: UserType, bookingDate: string, bookingTime: string, nome: string): Promise<number> {
        try {
            await axios.post('http://192.168.0.19:8080/bookfield', {
                field_id: fieldId,
                userId: user.id,
                date: bookingDate,
                hour: bookingTime,
                fieldName: nome,
                }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                user.alocacoes.push({date: bookingDate, field_id: fieldId, field_name: nome, hour: bookingTime, id: res.data.id, user_id: user.id})
                return res.data.id as number
            })
        } catch (error) {
            console.error('Erro ao reservar horário:', error)
        }
    }

    async unbookField(fieldId: number){
        try {
            const response = await axios.delete(`http://192.168.0.19:8080/unbook/${fieldId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const data = response.data
            if(data){
                if(this.classUser){
                    this.classUser.alocacoes = this.classUser.alocacoes.filter((allocation) => allocation.id !== fieldId)
                }
            }

        } catch (error){
            console.error('Erro ao cancelar reserva:', error)
        }
    }
}