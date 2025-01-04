import TicketRepository from "../repository/ticket.repository.js";
import CartRepository from "../repository/cart.repository.js";
import CartModel from "../dao/models/cart.model.js";

class TicketService {

    async createTicket(amount, purchaser, cartId) {
        // 1. Obtenemos el carrito
        const cart = await CartRepository.getCartById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        // 2. Calculamos el monto total 
        let totalAmount = 0;
        cart.products.forEach(item => {

            totalAmount += item.product.price * item.quantity;
        });


        if (!amount) {
            amount = totalAmount;
        }

        // 3. Creamos el ticket con los datos
        const ticketData = {
            amount: amount,
            purchaser: purchaser,
            cart: cartId
        };

        const ticket = await TicketRepository.createTicket(ticketData);

        // 4. Devolvemos el ticket creado
        return ticket;
    }
    
    async getTicketById(ticketId) {
        return await TicketRepository.getTicketById(ticketId);
    }
}

export default new TicketService();
