import {
  calcularLineas,
  calcularTotal,
  obtenerTotalPorTipoIva,
  mapearAtotalPorTipoDeIva,
} from "./ticket.helpers";

describe("calcularLineas", () => {
  it("debería calcular correctamente las líneas del ticket", () => {
    const lineasTicket: LineaTicket[] = [
      {
        producto: { nombre: "Producto 1", precio: 100, tipoIva: "general" },
        cantidad: 2,
      },
      {
        producto: { nombre: "Producto 2", precio: 50, tipoIva: "reducido" },
        cantidad: 1,
      },
    ];

    const resultadoEsperado: ResultadoLineaTicket[] = [
      {
        nombre: "Producto 1",
        cantidad: 2,
        precioSinIva: 200,
        tipoIva: "general",
        precioConIva: 242,
      },
      {
        nombre: "Producto 2",
        cantidad: 1,
        precioSinIva: 50,
        tipoIva: "reducido",
        precioConIva: 55,
      },
    ];

    expect(calcularLineas(lineasTicket)).toEqual(resultadoEsperado);
  });
});

describe("calcularTotal", () => {
  it("debería calcular correctamente el total sin IVA, con IVA y el IVA total", () => {
    const productos: LineaTicket[] = [
      {
        producto: { nombre: "Producto 1", precio: 100, tipoIva: "general" },
        cantidad: 2,
      },
      {
        producto: { nombre: "Producto 2", precio: 50, tipoIva: "reducido" },
        cantidad: 1,
      },
    ];

    const resultadoEsperado: ResultadoTotalTicket = {
      totalSinIva: 250,
      totalConIva: 297,
      totalIva: 47,
    };

    expect(calcularTotal(productos)).toEqual(resultadoEsperado);
  });
});

describe("obtenerTotalPorTipoIva", () => {
  it("debería calcular correctamente el total por tipo de IVA", () => {
    const lineasTicket: LineaTicket[] = [
      {
        producto: { nombre: "Producto 1", precio: 100, tipoIva: "general" },
        cantidad: 2,
      },
      {
        producto: { nombre: "Producto 2", precio: 50, tipoIva: "reducido" },
        cantidad: 1,
      },
      {
        producto: {
          nombre: "Producto 3",
          precio: 30,
          tipoIva: "superreducidoA",
        },
        cantidad: 3,
      },
    ];

    const resultadoEsperado: TotalPorTipoIva[] = [
      {
        tipoIva: "general",
        cuantia: 42,
      },
      {
        tipoIva: "reducido",
        cuantia: 5,
      },
      {
        tipoIva: "superreducidoA",
        cuantia: 4.5,
      },
    ];

    expect(obtenerTotalPorTipoIva(lineasTicket)).toEqual(resultadoEsperado);
  });
});

describe("mapearAtotalPorTipoDeIva", () => {
  it("debería calcular correctamente el total por tipo de IVA", () => {
    const lineasTicket: LineaTicket[] = [
      {
        producto: { nombre: "Producto 1", precio: 100, tipoIva: "general" },
        cantidad: 2,
      },
      {
        producto: { nombre: "Producto 2", precio: 50, tipoIva: "reducido" },
        cantidad: 1,
      },
      {
        producto: {
          nombre: "Producto 3",
          precio: 30,
          tipoIva: "superreducidoA",
        },
        cantidad: 3,
      },
    ];
    const tipoDeIva: TipoIva = "general";
    const resultadoEsperado: TotalPorTipoIva = {
      tipoIva: "general",
      cuantia: 42,
    };
    expect(mapearAtotalPorTipoDeIva(tipoDeIva, lineasTicket)).toEqual(
      resultadoEsperado
    );
  });
});
