import { Alocacao } from "./Alocacao";

export type UserType = {
    id: number;
    username: string;
    email: string;
    pass: string;
    cpf: string;
    phone: string;
    alocacoes: Alocacao[];
}