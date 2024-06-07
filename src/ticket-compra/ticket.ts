import { productos } from "./infoticket"
import { calcularTotal,calcularLineas, obtenerTotalPorTipoIva } from "./ticket.helpers"
export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  return {
    lineas: calcularLineas(lineasTicket),
    total: calcularTotal(lineasTicket),
    desgloseIva:obtenerTotalPorTipoIva(lineasTicket)

  }


}
const ticketFinal= calculaTicket(productos)
console.log(ticketFinal)