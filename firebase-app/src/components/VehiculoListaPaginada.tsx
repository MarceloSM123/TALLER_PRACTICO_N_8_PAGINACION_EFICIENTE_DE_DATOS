import { useState } from 'react';
import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { obtenerVehiculosPaginados, type VehiculoConId } from '../scripts/consultasVehiculos';

export const VehiculoListaPaginada = () => {
  const [vehiculos, setVehiculos] = useState<VehiculoConId[]>([]);
  const [pagina, setPagina] = useState<number>(0); // 0 = no ha cargado nada
  const [ultimoDocumento, setUltimoDocumento] = useState<QueryDocumentSnapshot<DocumentData> | undefined>();
  
  // Historial para poder retroceder páginas
  const [historialCursores, setHistorialCursores] = useState<(QueryDocumentSnapshot<DocumentData> | undefined)[]>([]);
  const [cargando, setCargando] = useState(false);

  // Función general para cargar datos
  const cargarPagina = async ( nuevaPagina: number, cursor?: QueryDocumentSnapshot<DocumentData>) => {
    setCargando(true);
    try {
      const resultado = await obtenerVehiculosPaginados(cursor);
      
      // Si no hay resultados y estamos intentando avanzar, no hacemos nada
      if (resultado.vehiculos.length === 0 && nuevaPagina > pagina) {
        alert("No hay más vehículos para mostrar.");
        return;
      }

      setVehiculos(resultado.vehiculos);
      setUltimoDocumento(resultado.ultimoDocumento);
      setPagina(nuevaPagina);

      // Guardar el cursor actual en el historial para poder volver atrás
      if (nuevaPagina > pagina) {
        setHistorialCursores([...historialCursores, cursor]);
      }
    } catch (error) {
      console.error("Error al cargar página:", error);
    } finally {
      setCargando(false);
    }
  };

  // Al darle a "Cargar Primera Página" (inicia desde cero)
  const iniciarPaginacion = () => {
    setHistorialCursores([]);
    cargarPagina(1, undefined);
  };

  // Al darle a "Siguiente"
  const siguientePagina = () => {
    if (!ultimoDocumento) return;
    cargarPagina(pagina + 1, ultimoDocumento);
  };

  // Al darle a "Anterior"
  const paginaAnterior = () => {
    if (pagina <= 1 || historialCursores.length === 0) return;
    
    // Obtener el cursor de la página anterior
    const cursorAnterior = historialCursores[historialCursores.length - 1];
    // Eliminar ese cursor del historial
    const nuevoHistorial = historialCursores.slice(0, -1);
    setHistorialCursores(nuevoHistorial);
    
    cargarPagina(pagina - 1, cursorAnterior);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Taller 8: Vehículos Paginados</h2>
      
      {pagina === 0 && (
        <button onClick={iniciarPaginacion} disabled={cargando}>
          {cargando ? 'Cargando...' : 'Cargar Primera Página'}
        </button>
      )}

      {pagina > 0 && (
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={paginaAnterior} disabled={pagina <= 1 || cargando}>
            Anterior
          </button>
          <span><strong>Página {pagina}</strong></span>
          <button onClick={siguientePagina} disabled={!ultimoDocumento || cargando}>
            Siguiente
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gap: '10px' }}>
        {vehiculos.map((vehiculo) => (
          <div key={vehiculo.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <p><strong>Marca:</strong> {vehiculo.marca} | <strong>Modelo:</strong> {vehiculo.modelo}</p>
            <p><strong>Tipo:</strong> {vehiculo.tipo} | <strong>Año:</strong> {vehiculo.anio}</p>
            <p><strong>Precio:</strong> ${vehiculo.precio.toFixed(2)} | <strong>Stock:</strong> {vehiculo.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};