import {
    calcularIva,
    calcularPrecioConIva,
    calcularPrecioSinIva,
    obtenerPorcentajeIva,
    procesarLineaTicket,
  } from './ticket.helpers';

describe('Funciones de cálculo de precios', () => {
    it('calcularPrecioSinIva debería calcular el precio sin IVA correctamente', () => {
      const precio = 10;
      const cantidad = 5;
      const resultado = calcularPrecioSinIva(precio, cantidad);
      expect(resultado).toBe(50);
    });
  
    it('obtenerPorcentajeIva debería devolver el porcentaje correcto', () => {
      expect(obtenerPorcentajeIva('general')).toBe(21);
      expect(obtenerPorcentajeIva('reducido')).toBe(10);
      expect(obtenerPorcentajeIva('superreducidoA')).toBe(5);
      expect(obtenerPorcentajeIva('superreducidoB')).toBe(4);
      expect(obtenerPorcentajeIva('superreducidoC')).toBe(0);
      expect(obtenerPorcentajeIva('sinIva')).toBe(0);
    });
  
    it('calcularIva debería calcular el IVA correctamente', () => {
      const precioSinIva = 100;
      const porcentajeIva = 21;
      const resultado = calcularIva(precioSinIva, porcentajeIva);
      expect(resultado).toBe(21);
    });
  
    it('calcularPrecioConIva debería calcular el precio con IVA correctamente', () => {
      const precioSinIva = 100;
      const iva = 21;
      const resultado = calcularPrecioConIva(precioSinIva, iva);
      expect(resultado).toBe(121);
    });
  
    it('procesarLineaTicket debería procesar una línea de ticket correctamente', () => {
      const linea: LineaTicket = {
        producto: {
          nombre: 'Producto A',
          precio: 10,
          tipoIva: 'general'
        },
        cantidad: 2
      };
  
      const resultado = procesarLineaTicket(linea);
      
      expect(resultado).toEqual({
        nombre: 'Producto A',
        cantidad: 2,
        precioSinIva: 20,
        tipoIva: 'general',
        precioConIva: 24.2,
        iva: 4.2
      });
    });
  });