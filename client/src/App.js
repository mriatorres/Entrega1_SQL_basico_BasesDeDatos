import { useState, useEffect } from "react";
import Axios from 'axios';
import './App.css';

function App() {
  const [menuActivo, setMenuActivo] = useState('Clientes');

  // ==========================
  // CLIENTES
  // ==========================
  const [IDCliente, setIDCliente] = useState('');
  const [NombreCliente, setNombreCliente] = useState('');
  const [TelefonoCliente, setTelefonoCliente] = useState('');
  const [EmailCliente, setEmailCliente] = useState('');
  const [clientes, setClientes] = useState([]);
  const [vistaClientePedidos, setVistaClientePedidos] = useState([]);

  const submitCliente = () => {
    Axios.post('http://localhost:3001/api/insertCliente', { id_cliente: IDCliente, nombre: NombreCliente, telefono: TelefonoCliente, email: EmailCliente })
      .then(() => getClientes())
      .catch(err => console.log(err));
  };

  const getClientes = () => {
    Axios.get('http://localhost:3001/api/getClientes')
      .then(res => setClientes(res.data))
      .catch(err => console.log(err));
  };

  const deleteCliente = (id) => {
    Axios.delete(`http://localhost:3001/api/deleteClientes/${id}`)
      .then(() => getClientes())
      .catch(err => console.log(err));
  };

  const getVistaClientePedidos = () => {
    Axios.get('http://localhost:3001/api/getVistaClientePedidos')
      .then(res => setVistaClientePedidos(res.data))
      .catch(err => console.log(err));
  };

  // ==========================
  // EMPLEADOS
  // ==========================
  const [IDEmpleado, setIDEmpleado] = useState('');
  const [NombreEmpleado, setNombreEmpleado] = useState('');
  const [CargoEmpleado, setCargoEmpleado] = useState('');
  const [SalarioEmpleado, setSalarioEmpleado] = useState('');
  const [empleados, setEmpleados] = useState([]);
  const [vistaEmpleadosSalarios, setVistaEmpleadosSalarios] = useState([]);

  const submitEmpleado = () => {
    Axios.post('http://localhost:3001/api/insertEmpleado', { idEmpleados: IDEmpleado, nombre: NombreEmpleado, cargo: CargoEmpleado, salario: SalarioEmpleado })
      .then(() => getEmpleados())
      .catch(err => console.log(err));
  };

  const getEmpleados = () => {
    Axios.get('http://localhost:3001/api/getEmpleados')
      .then(res => setEmpleados(res.data))
      .catch(err => console.log(err));
  };

  const deleteEmpleado = (id) => {
    Axios.delete(`http://localhost:3001/api/deleteEmpleados/${id}`)
      .then(() => getEmpleados())
      .catch(err => console.log(err));
  };

  const getVistaEmpleadosSalarios = () => {
    Axios.get('http://localhost:3001/api/getVistaEmpleadosSalarios')
      .then(res => setVistaEmpleadosSalarios(res.data))
      .catch(err => console.log(err));
  };

  // ==========================
  // PRODUCTOS
  // ==========================
  const [IDProducto, setIDProducto] = useState('');
  const [NombreProducto, setNombreProducto] = useState('');
  const [PrecioProducto, setPrecioProducto] = useState('');
  const [CategoriaProducto, setCategoriaProducto] = useState('');
  const [productos, setProductos] = useState([]);

  const submitProducto = () => {
    Axios.post('http://localhost:3001/api/insertProducto', { idProductos: IDProducto, nombre: NombreProducto, precio: PrecioProducto, categoria: CategoriaProducto })
      .then(() => getProductos())
      .catch(err => console.log(err));
  };

  const getProductos = () => {
    Axios.get('http://localhost:3001/api/getProductos')
      .then(res => setProductos(res.data))
      .catch(err => console.log(err));
  };

  const deleteProducto = (id) => {
    Axios.delete(`http://localhost:3001/api/deleteProductos/${id}`)
      .then(() => getProductos())
      .catch(err => console.log(err));
  };

  // ==========================
  // METODOS DE PAGO
  // ==========================
  const [IDPago, setIDPago] = useState('');
  const [TipoPago, setTipoPago] = useState('');
  const [pagos, setPagos] = useState([]);

  const submitPago = () => {
    Axios.post('http://localhost:3001/api/insertPago', { idPago: IDPago, tipo: TipoPago })
      .then(() => getPagos())
      .catch(err => console.log(err));
  };

  const getPagos = () => {
    Axios.get('http://localhost:3001/api/getMetodosPago')
      .then(res => setPagos(res.data))
      .catch(err => console.log(err));
  };

  const deletePago = (id) => {
    Axios.delete(`http://localhost:3001/api/deleteMetodosPago/${id}`)
      .then(() => getPagos())
      .catch(err => console.log(err));
  };

  // ==========================
  // PEDIDOS
  // ==========================
  const [IDPedido, setIDPedido] = useState('');
  const [IDClientePedido, setIDClientePedido] = useState('');
  const [IDEmpleadoPedido, setIDEmpleadoPedido] = useState('');
  const [FechaPedido, setFechaPedido] = useState('');
  const [IDPagoPedido, setIDPagoPedido] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [vistaPedidosDetalle, setVistaPedidosDetalle] = useState([]);

  const submitPedido = () => {
    Axios.post('http://localhost:3001/api/insertPedido', { idPedidos: IDPedido, idCliente: IDClientePedido, id_empleado: IDEmpleadoPedido, fecha: FechaPedido, idPago: IDPagoPedido })
      .then(() => getPedidos())
      .catch(err => console.log(err));
  };

  const getPedidos = () => {
    Axios.get('http://localhost:3001/api/getPedidos')
      .then(res => setPedidos(res.data))
      .catch(err => console.log(err));
  };

  const deletePedido = (id) => {
    Axios.delete(`http://localhost:3001/api/deletePedidos/${id}`)
      .then(() => getPedidos())
      .catch(err => console.log(err));
  };

  const getVistaPedidosDetalle = () => {
    Axios.get('http://localhost:3001/api/getVistaPedidosDetalle')
      .then(res => setVistaPedidosDetalle(res.data))
      .catch(err => console.log(err));
  };

  // ==========================
  // DETALLE PEDIDO
  // ==========================
  const [IDDetalle, setIDDetalle] = useState('');
  const [IDPedidoDetalle, setIDPedidoDetalle] = useState('');
  const [IDProductoDetalle, setIDProductoDetalle] = useState('');
  const [CantidadDetalle, setCantidadDetalle] = useState('');
  const [SubtotalDetalle, setSubtotalDetalle] = useState('');
  const [detallePedidos, setDetallePedidos] = useState([]);

  const submitDetalle = () => {
    Axios.post('http://localhost:3001/api/insertDetalle', { id_detalle: IDDetalle, id_pedido: IDPedidoDetalle, id_producto: IDProductoDetalle, cantidad: CantidadDetalle, subtotal: SubtotalDetalle })
      .then(() => getDetallePedidos())
      .catch(err => console.log(err));
  };

  const getDetallePedidos = () => {
    Axios.get('http://localhost:3001/api/getDetallePedido')
      .then(res => setDetallePedidos(res.data))
      .catch(err => console.log(err));
  };

  const deleteDetalle = (id) => {
    Axios.delete(`http://localhost:3001/api/deleteDetallePedido/${id}`)
      .then(() => getDetallePedidos())
      .catch(err => console.log(err));
  };

  // ==========================
// CATEGORIAS
// ==========================
const [IDCategoria, setIDCategoria] = useState('');
const [NombreCategoria, setNombreCategoria] = useState('');
const [DescripcionCategoria, setDescripcionCategoria] = useState('');
const [categorias, setCategorias] = useState([]);

const submitCategoria = () => {
  if (!NombreCategoria) {
    alert("El nombre de la categoría es obligatorio.");
    return;
  }

  Axios.post('http://localhost:3001/api/insertCategoria', {
    nombre: NombreCategoria,
    descripcion: DescripcionCategoria
  })
  .then(() => {
    alert("Categoría insertada con éxito.");
    getCategorias();
    setNombreCategoria('');
    setDescripcionCategoria('');
  })
  .catch(err => {
    console.error(err);
    alert("Error al insertar categoría.");
  });
};

const getCategorias = () => {
  Axios.get('http://localhost:3001/api/getCategorias')
    .then(res => setCategorias(res.data))
    .catch(err => console.log(err));
};

const deleteCategoria = (id) => {
  Axios.delete(`http://localhost:3001/api/deleteCategorias/${id}`)
    .then(() => getCategorias())
    .catch(err => console.log(err));
};

// ==========================
// PROVEEDORES
// ==========================
const [IDProveedor, setIDProveedor] = useState('');
const [NombreProveedor, setNombreProveedor] = useState('');
const [TelefonoProveedor, setTelefonoProveedor] = useState('');
const [CorreoProveedor, setCorreoProveedor] = useState('');
const [DireccionProveedor, setDireccionProveedor] = useState('');
const [proveedores, setProveedores] = useState([]);

const submitProveedor = () => {
  if (!NombreProveedor) {
    alert("El nombre del proveedor es obligatorio.");
    return;
  }

  Axios.post('http://localhost:3001/api/insertProveedor', {
    nombre: NombreProveedor,
    telefono: TelefonoProveedor,
    correo: CorreoProveedor,
    direccion: DireccionProveedor
  })
  .then(() => {
    alert("Proveedor insertado con éxito.");
    getProveedores();
    setNombreProveedor(''); setTelefonoProveedor(''); setCorreoProveedor(''); setDireccionProveedor('');
  })
  .catch(err => {
    console.error(err);
    alert("Error al insertar proveedor.");
  });
};

const getProveedores = () => {
  Axios.get('http://localhost:3001/api/getProveedores')
    .then(res => setProveedores(res.data))
    .catch(err => console.log(err));
};

const deleteProveedor = (id) => {
  Axios.delete(`http://localhost:3001/api/deleteProveedores/${id}`)
    .then(() => getProveedores())
    .catch(err => console.log(err));
};

// ==========================
// PRODUCTOS-PROVEEDORES
// ==========================
const [IDProductoPP, setIDProductoPP] = useState('');
const [IDProveedorPP, setIDProveedorPP] = useState('');
const [PrecioCompraPP, setPrecioCompraPP] = useState('');
const [productosProveedores, setProductosProveedores] = useState([]);

const submitProductoProveedor = () => {
  if (!IDProductoPP || !IDProveedorPP || !PrecioCompraPP) {
    alert("Todos los campos de Producto-Proveedor son obligatorios.");
    return;
  }

  Axios.post('http://localhost:3001/api/insertProductoProveedor', {
    idProducto: IDProductoPP,
    idProveedor: IDProveedorPP,
    precioCompra: PrecioCompraPP
  })
  .then(() => {
    alert("Producto-Proveedor insertado con éxito.");
    getProductosProveedores();
    setIDProductoPP(''); setIDProveedorPP(''); setPrecioCompraPP('');
  })
  .catch(err => {
    console.error(err);
    alert("Error al insertar Producto-Proveedor.");
  });
};

const getProductosProveedores = () => {
  Axios.get('http://localhost:3001/api/getProductosProveedores')
    .then(res => setProductosProveedores(res.data))
    .catch(err => console.log(err));
};


  // ==========================
  // useEffect para cargar datos cuando cambias de menú
  // ==========================
  useEffect(() => {
    switch(menuActivo) {
      case 'Clientes': getClientes(); break;
      case 'Empleados': getEmpleados(); break;
      case 'Productos': getProductos(); break;
      case 'Pagos': getPagos(); break;
      case 'Pedidos': getPedidos(); break;
      case 'Detalle': getDetallePedidos(); break;
      case 'Vistas':
        getVistaClientePedidos();
        getVistaPedidosDetalle();
        getVistaEmpleadosSalarios();
        break;
      default: break;
    }
  }, [menuActivo]);

  // ==========================
  // RENDER
  // ==========================
  return (
    <div className="App">
      <h1>☕ Cafetería Sistema De Gestión</h1>

      <nav>
        <button onClick={() => setMenuActivo('Clientes')}>Clientes</button>
        <button onClick={() => setMenuActivo('Empleados')}>Empleados</button>
        <button onClick={() => setMenuActivo('Productos')}>Productos</button>
        <button onClick={() => setMenuActivo('Pagos')}>Métodos de Pago</button>
        <button onClick={() => setMenuActivo('Pedidos')}>Pedidos</button>
        <button onClick={() => setMenuActivo('Detalle')}>Detalle Pedido</button>
        <button onClick={() => setMenuActivo('Vistas')}>Vistas Generales</button>
        <button onClick={() => setMenuActivo("Categorias")}>Categorías</button>

      </nav>

      {/* ========================== CLIENTES ========================== */}
      {menuActivo === 'Clientes' && (
        <div className='form-clientes'>
          <h2>Clientes 🧑‍🤝‍🧑</h2>
          <input placeholder="ID" value={IDCliente} onChange={e => setIDCliente(e.target.value)} />
          <input placeholder="Nombre" value={NombreCliente} onChange={e => setNombreCliente(e.target.value)} />
          <input placeholder="Teléfono" value={TelefonoCliente} onChange={e => setTelefonoCliente(e.target.value)} />
          <input placeholder="Email" value={EmailCliente} onChange={e => setEmailCliente(e.target.value)} />
          <button onClick={submitCliente}>Guardar ➕</button>
          <button onClick={getClientes}>Ver</button>
          <ul>
            {clientes.map(c =>
              <li key={c.id_cliente}>
                {c.id_cliente} - {c.nombre} - {c.telefono} - {c.email}
                <button onClick={() => deleteCliente(c.id_cliente)}>Eliminar 🗑️</button>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* ========================== EMPLEADOS ========================== */}
      {menuActivo === 'Empleados' && (
        <div className='form-empleados'>
          <h2>Empleados 👨‍💼</h2>
          <input placeholder="ID" value={IDEmpleado} onChange={e => setIDEmpleado(e.target.value)} />
          <input placeholder="Nombre" value={NombreEmpleado} onChange={e => setNombreEmpleado(e.target.value)} />
          <input placeholder="Cargo" value={CargoEmpleado} onChange={e => setCargoEmpleado(e.target.value)} />
          <input placeholder="Salario" type="number" step="0.01" value={SalarioEmpleado} onChange={e => setSalarioEmpleado(e.target.value)} />
          <button onClick={submitEmpleado}>Guardar ➕</button>
          <button onClick={getEmpleados}>Ver</button>
          <ul>
            {empleados.map(e =>
              <li key={e.idEmpleados}>
                {e.idEmpleados} - {e.nombre} - {e.cargo} - {e.salario}
                <button onClick={() => deleteEmpleado(e.idEmpleados)}>Eliminar 🗑️</button>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* ========================== PRODUCTOS ========================== */}
      {menuActivo === 'Productos' && (
        <div className='form-productos'>
          <h2>Productos 📦</h2>
          <input placeholder="ID" value={IDProducto} onChange={e => setIDProducto(e.target.value)} />
          <input placeholder="Nombre" value={NombreProducto} onChange={e => setNombreProducto(e.target.value)} />
          <input placeholder="Precio" type="number" step="0.01" value={PrecioProducto} onChange={e => setPrecioProducto(e.target.value)} />
          <input placeholder="Categoria" value={CategoriaProducto} onChange={e => setCategoriaProducto(e.target.value)} />
          <button onClick={submitProducto}>Guardar ➕</button>
          <button onClick={getProductos}>Ver</button>
          <ul>
            {productos.map(p =>
              <li key={p.idProductos}>
                {p.idProductos} - {p.nombre} - {p.precio} - {p.categoria}
                <button onClick={() => deleteProducto(p.idProductos)}>Eliminar 🗑️</button>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* ========================== METODOS DE PAGO ========================== */}
      {menuActivo === 'Pagos' && (
        <div className='form-pagos'>
          <h2>Métodos de Pago 💳</h2>
          <input placeholder="ID" value={IDPago} onChange={e => setIDPago(e.target.value)} />
          <input placeholder="Tipo" value={TipoPago} onChange={e => setTipoPago(e.target.value)} />
          <button onClick={submitPago}>Guardar ➕</button>
          <button onClick={getPagos}>Ver</button>
          <ul>
            {pagos.map(p =>
              <li key={p.idPago}>
                {p.idPago} - {p.tipo}
                <button onClick={() => deletePago(p.idPago)}>Eliminar 🗑️</button>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* ========================== PEDIDOS ========================== */}
      {menuActivo === 'Pedidos' && (
        <div className='form-pedidos'>
          <h2>Pedidos 🧾</h2>
          <input placeholder="ID" value={IDPedido} onChange={e => setIDPedido(e.target.value)} />
          <input placeholder="ID Cliente" value={IDClientePedido} onChange={e => setIDClientePedido(e.target.value)} />
          <input placeholder="ID Empleado" value={IDEmpleadoPedido} onChange={e => setIDEmpleadoPedido(e.target.value)} />
          <input placeholder="Fecha" type="date" value={FechaPedido} onChange={e => setFechaPedido(e.target.value)} />
          <input placeholder="ID Pago" value={IDPagoPedido} onChange={e => setIDPagoPedido(e.target.value)} />
          <button onClick={submitPedido}>Guardar ➕</button>
          <button onClick={getPedidos}>Ver</button>
          <ul>
            {pedidos.map(p =>
              <li key={p.idPedidos}>
                {p.idPedidos} - {p.idCliente} - {p.id_empleado} - {p.fecha} - {p.id_pago}
                <button onClick={() => deletePedido(p.idPedidos)}>Eliminar 🗑️</button>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* ========================== DETALLE PEDIDO ========================== */}
      {menuActivo === 'Detalle' && (
        <div className='form-detalle'>
          <h2>Detalle Pedido 📋</h2>
          <input placeholder="ID" value={IDDetalle} onChange={e => setIDDetalle(e.target.value)} />
          <input placeholder="ID Pedido" value={IDPedidoDetalle} onChange={e => setIDPedidoDetalle(e.target.value)} />
          <input placeholder="ID Producto" value={IDProductoDetalle} onChange={e => setIDProductoDetalle(e.target.value)} />
          <input placeholder="Cantidad" type="number" value={CantidadDetalle} onChange={e => setCantidadDetalle(e.target.value)} />
          <input placeholder="Subtotal" type="number" step="0.01" value={SubtotalDetalle} onChange={e => setSubtotalDetalle(e.target.value)} />
          <button onClick={submitDetalle}>Guardar ➕</button>
          <button onClick={getDetallePedidos}>Ver</button>
          <ul>
            {detallePedidos.map(d =>
              <li key={d.id_detalle}>
                {d.id_detalle} - {d.id_pedido} - {d.id_producto} - {d.cantidad} - {d.subtotal}
                <button onClick={() => deleteDetalle(d.id_detalle)}>Eliminar 🗑️</button>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* ========================== CATEGORIAS ========================== */}


      {menuActivo === 'Categorias' && (
        <div className='form-detalle'>
        <section>
          <h2>Categorías</h2>
          <input placeholder="Nombre" value={NombreCategoria} onChange={e => setNombreCategoria(e.target.value)} />
          <input placeholder="Descripción" value={DescripcionCategoria} onChange={e => setDescripcionCategoria(e.target.value)} />
          <button onClick={submitCategoria}>Guardar ➕</button>
          <button onClick={getCategorias}>Ver</button>
          <ul>
            {categorias.map(c => (
              <li key={c.idCategoria}>
                {c.idCategoria} - {c.nombre} - {c.descripcion}
                <button onClick={() => deleteCategoria(c.idCategoria)}>Eliminar</button>
              </li>
            ))}
          </ul>
      </section>
    </div>
)}


      {/* ========================== VISTAS ========================== */}
      {menuActivo === 'Vistas' && (
        <div className='form-vistas'>
          <h2>Vistas Generales 📊</h2>

          <section>
            <h3>Clientes y sus Pedidos</h3>
            <ul>
              {vistaClientePedidos.map(item => (
                <li key={`${item.id_cliente}-${item.idPedidos}`}>
                  Cliente: {item.nombre} - Pedido ID: {item.idPedidos} - Fecha: {item.fecha}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Pedidos y Detalle</h3>
            <ul>
              {vistaPedidosDetalle.map(item => (
                <li key={`${item.idPedidos}-${item.id_producto}`}>
                  Pedido ID: {item.idPedidos} - Producto: {item.id_producto} - Cantidad: {item.cantidad} - Subtotal: ${item.subtotal}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Empleados y Salarios</h3>
            <ul>
              {vistaEmpleadosSalarios.map(item => (
                <li key={item.idEmpleados}>
                  Empleado: {item.nombre} - Cargo: {item.cargo} - Salario: ${item.salario}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
