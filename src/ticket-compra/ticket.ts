import { calcularPrecioConIva } from "./ticket.helpers";
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
  let totalSinIva = 0;
  let totalIva = 0;
  const lineas: ResultadoLineaTicket[] = [];

  lineasTicket.forEach((linea) => {
    const { producto, cantidad } = linea;
    const precioSinIva = producto.precio * cantidad;
    const precioConIva =
      calcularPrecioConIva(producto.precio, producto.tipoIva) * cantidad;
    const iva = precioConIva - precioSinIva;

    lineas.push({
      nombre: producto.nombre,
      cantidad,
      precioSinIva: +precioSinIva.toFixed(2),
      tipoIva: producto.tipoIva,
      precioConIva: +precioConIva.toFixed(2),
    });

    totalSinIva += precioSinIva;
    totalIva += iva;
  });
  const totalConIva = totalSinIva + totalIva;

  return {
    lineas,
    total: {
      totalSinIva: +totalSinIva.toFixed(2),
      totalConIva: +totalConIva.toFixed(2),
      totalIva: +totalIva.toFixed(2),
    },
    desgloseIva: lineas.map((linea) => ({
      tipoIva: linea.tipoIva,
      cuantia: linea.precioConIva,
    })),
  };
};
console.log(calculaTicket(productos));
