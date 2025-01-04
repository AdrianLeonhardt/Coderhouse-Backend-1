import TicketModel from "./models/ticket.model.js";

class TicketDao {

    async create(ticketData) {
        const ticket = new TicketModel(ticketData);
        return await ticket.save();
    }

    async getById(ticketId) {
        return await TicketModel.findById(ticketId).populate('cart'); 
    }

}

export default new TicketDao();