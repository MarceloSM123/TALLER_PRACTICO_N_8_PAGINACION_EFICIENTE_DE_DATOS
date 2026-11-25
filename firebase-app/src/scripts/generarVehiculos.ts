import { db } from '../fireBase'
import { collection, addDoc } from 'firebase/firestore'

interface Vehiculo {
  marca: string
  modelo: string
  precio: number
  stock: number
  anio: number
  tipo: string
}

// Lista fija de 25 vehículos (determinista, ideal para evidencias)
const VEHICULOS: Vehiculo[] = [
 // --- Deportivos Eléctricos (9) ---
  { marca: 'Tesla', modelo: 'Model S Plaid', precio: 108000, stock: 3, anio: 2025, tipo: 'Deportivo Eléctrico' },
  { marca: 'Porsche', modelo: 'Taycan Turbo S', precio: 195000, stock: 1, anio: 2024, tipo: 'Deportivo Eléctrico' },
  { marca: 'Lucid', modelo: 'Air Sapphire', precio: 249000, stock: 1, anio: 2025, tipo: 'Deportivo Eléctrico' },
  { marca: 'Audi', modelo: 'RS e-tron GT', precio: 148000, stock: 2, anio: 2025, tipo: 'Deportivo Eléctrico' },
  { marca: 'Rimac', modelo: 'Nevera', precio: 2200000, stock: 1, anio: 2024, tipo: 'Deportivo Eléctrico' },
  { marca: 'Lotus', modelo: 'Evija', precio: 2300000, stock: 1, anio: 2025, tipo: 'Deportivo Eléctrico' },
  { marca: 'Ford', modelo: 'Mustang Mach-E GT', precio: 65000, stock: 4, anio: 2024, tipo: 'Deportivo Eléctrico' },
  { marca: 'Hyundai', modelo: 'Ioniq 5 N', precio: 67000, stock: 3, anio: 2025, tipo: 'Deportivo Eléctrico' },
  { marca: 'Kia', modelo: 'EV6 GT', precio: 63000, stock: 2, anio: 2024, tipo: 'Deportivo Eléctrico' },
  
  // --- Relleno para llegar a 40+ (SUVs, Sedanes, Pickups) ---
  { marca: 'Toyota', modelo: 'RAV4', precio: 32000, stock: 10, anio: 2024, tipo: 'SUV' },
  { marca: 'Honda', modelo: 'CR-V', precio: 34000, stock: 8, anio: 2025, tipo: 'SUV' },
  { marca: 'Mazda', modelo: 'CX-5', precio: 29000, stock: 6, anio: 2024, tipo: 'SUV' },
  { marca: 'Ford', modelo: 'Explorer', precio: 41000, stock: 5, anio: 2023, tipo: 'SUV' },
  { marca: 'Jeep', modelo: 'Grand Cherokee', precio: 48000, stock: 4, anio: 2025, tipo: 'SUV' },
  { marca: 'Hyundai', modelo: 'Tucson', precio: 28000, stock: 12, anio: 2024, tipo: 'SUV' },
  { marca: 'Kia', modelo: 'Sportage', precio: 27000, stock: 9, anio: 2023, tipo: 'SUV' },
  { marca: 'Chevrolet', modelo: 'Equinox', precio: 26000, stock: 7, anio: 2024, tipo: 'SUV' },
  { marca: 'Nissan', modelo: 'Rogue', precio: 30000, stock: 11, anio: 2025, tipo: 'SUV' },
  { marca: 'Volkswagen', modelo: 'Tiguan', precio: 33000, stock: 5, anio: 2024, tipo: 'SUV' },
  
  { marca: 'Toyota', modelo: 'Camry', precio: 28000, stock: 15, anio: 2025, tipo: 'Sedan' },
  { marca: 'Honda', modelo: 'Civic', precio: 25000, stock: 20, anio: 2024, tipo: 'Sedan' },
  { marca: 'Mazda', modelo: 'Mazda3', precio: 24000, stock: 8, anio: 2023, tipo: 'Sedan' },
  { marca: 'Hyundai', modelo: 'Elantra', precio: 22000, stock: 14, anio: 2025, tipo: 'Sedan' },
  { marca: 'Kia', modelo: 'K5', precio: 26000, stock: 6, anio: 2024, tipo: 'Sedan' },
  { marca: 'Nissan', modelo: 'Altima', precio: 27000, stock: 10, anio: 2023, tipo: 'Sedan' },
  { marca: 'Chevrolet', modelo: 'Malibu', precio: 25000, stock: 7, anio: 2025, tipo: 'Sedan' },
  { marca: 'Volkswagen', modelo: 'Jetta', precio: 23000, stock: 9, anio: 2024, tipo: 'Sedan' },
  { marca: 'Subaru', modelo: 'Legacy', precio: 26000, stock: 5, anio: 2025, tipo: 'Sedan' },
  { marca: 'Tesla', modelo: 'Model 3', precio: 42000, stock: 12, anio: 2024, tipo: 'Sedan' },
  
  { marca: 'Ford', modelo: 'F-150', precio: 45000, stock: 8, anio: 2024, tipo: 'Pickup' },
  { marca: 'Chevrolet', modelo: 'Silverado', precio: 46000, stock: 6, anio: 2025, tipo: 'Pickup' },
  { marca: 'Ram', modelo: '1500', precio: 44000, stock: 7, anio: 2024, tipo: 'Pickup' },
  { marca: 'Toyota', modelo: 'Tacoma', precio: 38000, stock: 10, anio: 2025, tipo: 'Pickup' },
  { marca: 'Nissan', modelo: 'Frontier', precio: 35000, stock: 5, anio: 2023, tipo: 'Pickup' },
  { marca: 'GMC', modelo: 'Sierra', precio: 47000, stock: 4, anio: 2024, tipo: 'Pickup' },
  { marca: 'Jeep', modelo: 'Gladiator', precio: 42000, stock: 3, anio: 2025, tipo: 'Pickup' },
  { marca: 'Ford', modelo: 'Ranger', precio: 34000, stock: 8, anio: 2024, tipo: 'Pickup' },
  { marca: 'Chevrolet', modelo: 'Colorado', precio: 36000, stock: 6, anio: 2023, tipo: 'Pickup' },
  { marca: 'Honda', modelo: 'Ridgeline', precio: 40000, stock: 5, anio: 2025, tipo: 'Pickup' }
]

async function poblarVehiculos() {
  const ref = collection(db, 'vehiculos')
  const creados: string[] = []

  for (let i = 0; i < VEHICULOS.length; i++) {
    const vehiculo = VEHICULOS[i]
    const docRef = await addDoc(ref, vehiculo)
    creados.push(docRef.id)
  }

  console.log(`\n🎉 ${creados.length} vehículos insertados en la colección "vehiculos".`)
}
export { poblarVehiculos }