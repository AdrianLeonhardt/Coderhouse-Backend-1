import TicketDao from "../dao/ticket.dao.js";

class TicketRepository {

    async createTicket (ticketData){
        return await TicketDao.save(ticketData);
    }

    async getTicketById(id){
        return await TicketDao.findById(id);
    }
}

export default new TicketRepository();