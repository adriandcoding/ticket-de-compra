import { procesarLineaTicket } from "./ticket.helpers";
import { productos } from "./ticketdata";
const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  const resultadoLineas: ResultadoLineaTicket[] = [];
  const TotalPorTipoIva: TotalPorTipoIva[] = [];

  let totalSinIva = 0;
  let totalConIva = 0;
  let totalIva = 0;

  lineasTicket.forEach((linea) => {
    const resultadoLinea = procesarLineaTicket(linea);
    resultadoLineas.push({
      nombre: resultadoLinea.nombre,
      cantidad: resultadoLinea.cantidad,
      precioSinIva: resultadoLinea.precioSinIva,
      tipoIva: resultadoLinea.tipoIva,
      precioConIva: resultadoLinea.precioConIva,
    });

    totalSinIva += resultadoLinea.precioSinIva;
    totalConIva += resultadoLinea.precioConIva;
    totalIva += resultadoLinea.iva;

    TotalPorTipoIva.push({
      tipoIva: resultadoLinea.tipoIva,
      cuantia: resultadoLinea.iva,
    });
  });

  const desgloseIva = TotalPorTipoIva;

  return {
    lineas: resultadoLineas,
    total: {
      totalSinIva,
      totalConIva,
      totalIva,
    },
    desgloseIva,
  };
};

const ticketFinal = calculaTicket(productos);

console.log(ticketFinal);
