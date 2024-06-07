import { productos } from "./infoticket"
import { total,calcularLineas, obtenerTotalPorTipoIva } from "./ticket.helpers"
export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  return {
    lineas: calcularLineas(lineasTicket),
    total: total,
    desgloseIva:obtenerTotalPorTipoIva(lineasTicket)

  }


}
console.log(calculaTicket(productos))