import ticketService from '../services/ticket.service.js';

class TicketController {
    async create(request, response) {
        console.log("Datos recibidos en la solicitud para crear el ticket:", request.body);
        const { amount, purchaser, cartId } = request.body;

        try {
            // Crear el ticket
            const ticket = await ticketService.createTicket(amount, purchaser, cartId);
            response.status(201).json(ticket);
        } catch (error) {
            console.error("Error creando el ticket:", error);
            response.status(500).send("Error al crear el ticket");
        }
    }

    async getTicketById(request, response) {
        const { ticketId } = request.params;
        try {
            const ticket = await ticketService.getTicketById(ticketId);
            if (!ticket) {
                return response.status(404).send("Ticket no encontrado");
            }
            response.json(ticket);
        } catch (error) {
            console.error("Error al obtener el ticket:", error);
            response.status(500).send("Error al obtener el ticket");
        }
    }
}


export default new TicketController();