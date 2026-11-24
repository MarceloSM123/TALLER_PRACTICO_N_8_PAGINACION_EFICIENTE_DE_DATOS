// import ProductoForm from './components/ProductoForm'
// import{ProductoLista} from './components/ProductoLista'
import { ProductoListaPaginada } from './components/ProductoListaPaginada'
//import {obtenerProductosDisponibles} from './services/productoService'
//import {useState} from 'react'

/* function App() {
  const [productoEditar, setProductoEditar] = useState<ProductoConId | null>(null);
  return (
    <div>
      <h1>Registro de productos</h1>
      <ProductoForm
  key={productoEditar?.id ?? 'nuevo'}
  productoEditar={productoEditar}
  onEditarChange={setProductoEditar}
/>
      <ProductoLista onEditar={setProductoEditar}/>
    </div>
  )
}

export default App */
function App() {
  return (
/* <button onClick={async() => {
const productosDeConsulta= await obtenerProductosDisponibles();
console.log("Productos de consulta: ", productosDeConsulta);

}}>Consulta</button>*/
<>
<h1>Productos paginados</h1>
  <ProductoListaPaginada/>
</>
  )
}

export default App