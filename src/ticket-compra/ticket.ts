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

  let totalSinIva = 0;
  let totalConIva = 0;
  let totalIva = 0;
  let TotalPorTipoIva: TotalPorTipoIva[] = []
  let desgloseIva: TotalPorTipoIva[] = []
  
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
    TotalPorTipoIva.push({
      tipoIva: producto.tipoIva,
      cuantia: iva,
    });
    desgloseIva = TotalPorTipoIva
    
  });
    
    

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
