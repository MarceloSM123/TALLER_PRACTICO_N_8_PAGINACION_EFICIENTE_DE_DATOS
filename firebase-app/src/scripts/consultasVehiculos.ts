import { db } from '../fireBase'
import { collection, where, query, orderBy, limit, startAfter, getDocs, QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore'

export interface VehiculoConId {
  id: string
  marca: string
  modelo: string
  precio: number
  stock: number
  anio: number
  tipo: string
}

export const consulta1 = async():Promise<VehiculoConId[]>=>{
  const consulta =query(
    collection(db, 'vehiculos'),
    where('stock', '>', 0),
    orderBy('precio', 'asc')
  );

  const querySnapshot = await getDocs(consulta);
  const vehiculos=querySnapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as VehiculoConId[]

  return vehiculos;
}

export const consulta2 = async():Promise<VehiculoConId[]>=>{
  const consulta =query(
    collection(db, 'vehiculos'),
    where('tipo', '==', "SUV"),
    where('stock', '>', 0),
    orderBy('precio', 'asc')
  );

  const querySnapshot = await getDocs(consulta);
  const vehiculos=querySnapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as VehiculoConId[]

  return vehiculos;
}

export const consulta3 = async():Promise<VehiculoConId[]>=>{
  const consulta =query(
    collection(db, 'vehiculos'),
    where('stock', '>', 0),
    where('precio', '>=', 20000),
    where('precio', '<=', 40000),
    orderBy('precio', 'asc')
  );

  const querySnapshot = await getDocs(consulta);
  const vehiculos=querySnapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as VehiculoConId[]

  return vehiculos;
}

export const consulta4  = async():Promise<VehiculoConId[]>=>{
  const consulta =query(
    collection(db, 'vehiculos'),
    where('tipo', '==', "Sedan"),
    where('stock', '>', 0),
    where('anio', '>=', 2023),
    orderBy('anio', 'desc')
  );
  const querySnapshot = await getDocs(consulta);
  const vehiculos=querySnapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as VehiculoConId[]

  return vehiculos;
}

  export const consulta5  = async():Promise<VehiculoConId[]>=>{
  const consulta =query(
    collection(db, 'vehiculos'),
    where('tipo', '==', "Deportivo"),
    where('stock', '>', 0),
    orderBy('precio', 'desc')
  );

  const querySnapshot = await getDocs(consulta);
  const vehiculos=querySnapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as VehiculoConId[]

  return vehiculos;
}

export const consulta6  = async():Promise<VehiculoConId[]>=>{
  const consulta =query(
    collection(db, 'vehiculos'),
    where('precio', '>=', 25000),
    where('precio', '<=', 45000),
    orderBy('precio', 'desc')
  );

  const querySnapshot = await getDocs(consulta);
  const vehiculos=querySnapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as VehiculoConId[]

  return vehiculos;
}

export const consulta7  = async():Promise<VehiculoConId[]>=>{
  const consulta =query(
    collection(db, 'vehiculos'),
    where('tipo', '==', "Pickup"),
    where('anio', '>=', 2024),
    where('stock', '>', 0),
    orderBy('anio', 'desc')
  );

  const querySnapshot = await getDocs(consulta);
  const vehiculos=querySnapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as VehiculoConId[]

  return vehiculos;
}
// --- NUEVA CONSULTA PARA EL TALLER 8 ---
export const obtenerVehiculosPaginados = async (ultimoDocumento?: QueryDocumentSnapshot<DocumentData>) => {
  let consulta;

  if (ultimoDocumento) {
    consulta = query(
      collection(db, 'vehiculos'),
      orderBy('precio', 'asc'),
      startAfter(ultimoDocumento),
      limit(10)
    );
  } else {
    consulta = query(
      collection(db, 'vehiculos'),
      orderBy('precio', 'asc'),
      limit(10)
    );
  }

  const snapshot = await getDocs(consulta);
  const vehiculos = snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as VehiculoConId[];

  // Guardamos el último documento (cursor) si hay resultados
  const nuevoUltimoDoc = snapshot.docs.length > 0 
    ? snapshot.docs[snapshot.docs.length - 1] 
    : undefined;

  return {
    vehiculos,
    ultimoDocumento: nuevoUltimoDoc,
  };
};