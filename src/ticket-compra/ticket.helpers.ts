// Definir los porcentajes de IVA
const ivaPorcentajes = {
  general: 0.21,
  reducido: 0.1,
  superreducidoA: 0.05,
  superreducidoB: 0.04,
  superreducidoC: 0.0,
  sinIva: 0.0,
};
export const calcularLineas = (
  lineasTicket: LineaTicket[]
): ResultadoLineaTicket[] => {
  const resultadoLineas = lineasTicket.map((lineaTicket) => {
    const { producto, cantidad } = lineaTicket;
    const { nombre, precio, tipoIva } = producto;
    return {
      nombre,
      cantidad,
      precioSinIva: precio * cantidad,
      tipoIva,
      precioConIva:
        precio * cantidad + precio * cantidad * ivaPorcentajes[tipoIva],
    };
  });
  return resultadoLineas;
};

const listadoTiposDeIVa: TipoIva[] = [
  "general",
  "reducido",
  "superreducidoA",
  "superreducidoB",
  "superreducidoC",
  "sinIva",
];

export const calcularPrecioTotalSinIva = (productos: LineaTicket[]): number =>
  productos.reduce(
    (acc, producto):number => acc + producto.cantidad * producto.producto.precio,
    0
  );
export const calcularIvaProducto = (productos: LineaTicket[]): number => {
  return productos.reduce(
    (acc, producto):number =>
      acc +
      producto.cantidad *
        producto.producto.precio *
        ivaPorcentajes[producto.producto.tipoIva],
    0
  );
};

export const calcularTotal = (
  productos: LineaTicket[]
): ResultadoTotalTicket => {
  const ivas = {
    totalSinIva: calcularPrecioTotalSinIva(productos),
    totalConIva:
      calcularPrecioTotalSinIva(productos) + calcularIvaProducto(productos),
    totalIva: calcularIvaProducto(productos),
  };
  return ivas;
};
export const mapearAtotalPorTipoDeIva = (
  tipoDeIva: TipoIva,
  lineasTicket: LineaTicket[]
): TotalPorTipoIva => {
  const productosAgrupadosPorTipoDeIva = lineasTicket.filter((lineaTicket):boolean=> {
    return lineaTicket.producto.tipoIva === tipoDeIva;
  });
  return {
    tipoIva: tipoDeIva,
    cuantia: calcularIvaProducto(productosAgrupadosPorTipoDeIva),
  };
};
export const obtenerTotalPorTipoIva = (
  lineasTicket: LineaTicket[]
): TotalPorTipoIva[] => {
  const listaDeTotalPorTipoDeIva = listadoTiposDeIVa.map((tipoDeIva):TotalPorTipoIva=>
    mapearAtotalPorTipoDeIva(tipoDeIva, lineasTicket)
  );
  const listaDeTotalPorTipoDeIvaFiltrado = listaDeTotalPorTipoDeIva.filter(
    (totalPorTipoDeIva):boolean => totalPorTipoDeIva.cuantia > 0
  );
  return listaDeTotalPorTipoDeIvaFiltrado;
};
