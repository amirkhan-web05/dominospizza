import { TypeTicketItems } from './../types/index';
import { instance } from './api';

export const apiTicket = {
    getTicket(ticket:string) {
        return instance.get<TypeTicketItems[]>(`/tickets?q=${ticket}`)
    }
}