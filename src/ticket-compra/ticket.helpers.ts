// Función para calcular el precio sin IVA
const calcularPrecioSinIva = (precio: number, cantidad: number): number => {
  return precio * cantidad;
};

// Función para obtener el porcentaje de IVA
const obtenerPorcentajeIva = (tipoIva: TipoIva): number => {
  switch (tipoIva) {
    case "general":
      return 21;
    case "reducido":
      return 10;
    case "superreducidoA":
      return 5;
    case "superreducidoB":
      return 4;
    case "superreducidoC":
      return 0;
    case "sinIva":
      return 0;
    default:
      return 0;
  }
};

// Función para calcular el IVA
const calcularIva = (precioSinIva: number, porcentajeIva: number): number => {
  return (precioSinIva * porcentajeIva) / 100;
};

// Función para calcular el precio con IVA
const calcularPrecioConIva = (precioSinIva: number, iva: number): number => {
  return precioSinIva + iva;
};

// Función para procesar una línea del ticket
export const procesarLineaTicket = (
  linea: LineaTicket
): ResultadoLineaTicket & { iva: number } => {
  const { producto, cantidad } = linea;
  const precioSinIva = calcularPrecioSinIva(producto.precio, cantidad);
  const porcentajeIva = obtenerPorcentajeIva(producto.tipoIva);
  const iva = calcularIva(precioSinIva, porcentajeIva);
  const precioConIva = calcularPrecioConIva(precioSinIva, iva);

  return {
    nombre: producto.nombre,
    cantidad,
    precioSinIva,
    tipoIva: producto.tipoIva,
    precioConIva,
    iva,
  };
};
