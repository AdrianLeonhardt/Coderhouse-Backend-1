import ticketRepository from "../repository/ticket.repository.js";

class TicketService {

    async createTicket(ticketData){
        return await ticketRepository.createTicket(ticketData);
    }

    async getTicketById(id){
        return await ticketRepository.getTicketById(id);
    }
}

export default new TicketService();