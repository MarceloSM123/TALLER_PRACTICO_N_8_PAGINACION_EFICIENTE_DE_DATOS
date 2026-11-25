import { poblarVehiculos } from './scripts/generarVehiculos'
import { VehiculoListaPaginada } from './components/VehiculoListaPaginada' // 👈 Importamos el nuevo componente

function App() {
  
  const generar = async () => {
    await poblarVehiculos()
    console.log('Vehículos generados.')
  }

  return (
    <div className="App">
      <h1>Taller Práctico N° 8 - Paginación Eficiente de Datos</h1>
      <button onClick={generar}>Generar Vehículos</button>
      {/* ====== SECCIÓN TALLER 8 ====== */}
      <VehiculoListaPaginada />
    </div>
  )
}

export default App