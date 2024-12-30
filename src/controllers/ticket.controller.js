class TicketController {

    async createTicket(request, response){
        const {amount, purchaser, cart} = request.body;

        try {//Ver si aca mando los datos destructurados o el body entero
            const newTicket = await ticketService.createTicket( amount, purchaser, cart );

            response.status(201).json(newTicket);

        } catch (error) {
            console.error("Error al crear el ticket:", error);
            response.status(500).send("Problema al crear el ticket");
        }
    }

    async getTicketById(request, response){
        const ticketId = request.params.id;

        try {
            const ticket = await ticketService.getTicketById(ticketId);

            if (!ticket) {
                return response.status(404).send("Ticket no encontrado");
            }

            res.status(200).json(ticket);

        } catch (error) {
            console.error("Error al obtener el ticket:", error);
            response.status(500).send("Problema al obtener el ticket");
        }
    }
}

export default TicketController;