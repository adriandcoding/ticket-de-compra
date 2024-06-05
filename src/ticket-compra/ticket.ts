import { obtenerPorcentajeIva } from "./ticket.helpers";

const productos: LineaTicket[] = [
  {
    producto: {
      nombre: "Legumbres",
      precio: 2,
      tipoIva: "general",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Perfume",
      precio: 20,
      tipoIva: "general",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Leche",
      precio: 1,
      tipoIva: "superreducidoC",
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: "Lasaña",
      precio: 5,
      tipoIva: "superreducidoA",
    },
    cantidad: 1,
  },
];

const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  const resultadoLineas: ResultadoLineaTicket[] = [];
  const totalPorTipoIva = {
    general: 0,
    reducido: 0,
    superreducidoA: 0,
    superreducidoB: 0,
    superreducidoC: 0,
    sinIva: 0,
  };

  let totalSinIva = 0;
  let totalConIva = 0;
  let totalIva = 0;

  lineasTicket.forEach((linea) => {
    const { producto, cantidad } = linea;
    const precioSinIva = producto.precio * cantidad;
    const porcentajeIva = obtenerPorcentajeIva(producto.tipoIva);
    const iva = (precioSinIva * porcentajeIva) / 100;
    const precioConIva = precioSinIva + iva;

    resultadoLineas.push({
      nombre: producto.nombre,
      cantidad,
      precioSinIva,
      tipoIva: producto.tipoIva,
      precioConIva,
    });

    totalSinIva += precioSinIva;
    totalConIva += precioConIva;
    totalIva += iva;
    totalPorTipoIva[producto.tipoIva] += iva;
  });

  const desgloseIva: TotalPorTipoIva[] = Object.keys(totalPorTipoIva).map(
    (tipo) => ({
      tipoIva: tipo as TipoIva,
      cuantia: totalPorTipoIva[tipo as TipoIva],
    })
  );

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
