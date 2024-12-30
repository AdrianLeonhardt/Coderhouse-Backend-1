import TicketModel from "./models/ticket.model.js";

class TicketDao {
    async findById(id) {
        return await TicketModel.findById(id).populate("purchaser").populate("cart");
    }

    async save(ticketData) {
        const ticket = new TicketModel(ticketData);
        return await ticket.save();
    }

}

export default new TicketDao();