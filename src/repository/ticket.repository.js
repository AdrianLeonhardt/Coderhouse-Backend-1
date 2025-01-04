import ticketDao from "../dao/ticket.dao.js";

class TicketRepository {

    async createTicket(ticketData) {
        return await ticketDao.create(ticketData);
    }

    async getTicketById(ticketId) {
        return await ticketDao.getById(ticketId);
    }
}

export default new TicketRepository();