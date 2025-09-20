import { useState, useEffect } from "react";
import Axios from 'axios';
import './App.css';

function App() {
  // Estado para el menú activo
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
    Axios.post('http://localhost:3001/api/insertCliente', {IDCliente, NombreCliente, TelefonoCliente, EmailCliente})
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

    // ==========================
  // CLIENTES VISTAS
  // ==========================

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

  //Vistas empleados
  const [vistaEmpleadosSalarios, setVistaEmpleadosSalarios] = useState([]);


  const submitEmpleado = () => {
    Axios.post('http://localhost:3001/api/insertEmpleado', {IDEmpleado, NombreEmpleado, CargoEmpleado, SalarioEmpleado})
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
    Axios.post('http://localhost:3001/api/insertProducto', {IDProducto, NombreProducto, PrecioProducto, CategoriaProducto})
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
    Axios.post('http://localhost:3001/api/insertPago', {IDPago, TipoPago})
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

  //Vistas detalles y pedidos
  const [vistaPedidosDetalle, setVistaPedidosDetalle] = useState([]);



  const submitPedido = () => {
    Axios.post('http://localhost:3001/api/insertPedido', {IDPedido, IDClientePedido, IDEmpleadoPedido, FechaPedido, IDPagoPedido})
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
    Axios.post('http://localhost:3001/api/insertDetalle', {IDDetalle, IDPedidoDetalle, IDProductoDetalle, CantidadDetalle, SubtotalDetalle})
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
  // useEffect para cargar datos cuando cambias de menú
  // ==========================
  useEffect(() => {
    switch(menuActivo) {
      case 'Clientes':
        getClientes();
        break;
      case 'Empleados':
        getEmpleados();
        break;
      case 'Productos':
        getProductos();
        break;
      case 'Pagos':
        getPagos();
        break;
      case 'Pedidos':
        getPedidos();
        break;
      case 'Detalle':
        getDetallePedidos();
        break;
      default:
        break;
      case 'Vistas':
      getVistaClientePedidos();      // vista clientes
      getVistaPedidosDetalle();      // vista pedidos
      getVistaEmpleadosSalarios();   // vista empleados
      break;
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
    </nav>

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
            <li key={e.id_empleado}>
              {e.id_empleado} - {e.nombre} - {e.cargo} - {e.salario}
              <button onClick={() => deleteEmpleado(e.id_empleado)}>Eliminar 🗑️</button>
            </li>
          )}
        </ul>
      </div>
    )}

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
            <li key={p.id_producto}>
              {p.id_producto} - {p.nombre} - {p.precio} - {p.categoria}
              <button onClick={() => deleteProducto(p.id_producto)}>Eliminar 🗑️</button>
            </li>
          )}
        </ul>
      </div>
    )}

    {menuActivo === 'Pagos' && (
      <div className='form-pagos'>
        <h2>Métodos de Pago 💳</h2>
        <input placeholder="ID" value={IDPago} onChange={e => setIDPago(e.target.value)} />
        <input placeholder="Tipo" value={TipoPago} onChange={e => setTipoPago(e.target.value)} />
        <button onClick={submitPago}>Guardar ➕</button>
        <button onClick={getPagos}>Ver</button>
        <ul>
          {pagos.map(p =>
            <li key={p.id_pago}>
              {p.id_pago} - {p.tipo}
              <button onClick={() => deletePago(p.id_pago)}>Eliminar 🗑️</button>
            </li>
          )}
        </ul>
      </div>
    )}

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
            <li key={p.id_pedido}>
              {p.id_pedido} - {p.id_cliente} - {p.id_empleado} - {p.fecha} - {p.id_pago}
              <button onClick={() => deletePedido(p.id_pedido)}>Eliminar 🗑️</button>
            </li>
          )}
        </ul>
      </div>
    )}

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

    {menuActivo === 'Vistas' && (
      <div className='form-vistas'>
        <h2>Vistas Generales 📊</h2>

        <section>
          <h3>Clientes y sus Pedidos</h3>
          <ul>
            {vistaClientePedidos.map((item, idx) => (
              <li key={idx}>
                Cliente: {item.nombre_cliente} - Pedido ID: {item.id_pedido} - Fecha: {item.fecha_pedido}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Pedidos y Detalle</h3>
          <ul>
            {vistaPedidosDetalle.map((item, idx) => (
              <li key={idx}>
                Pedido ID: {item.id_pedido} - Producto: {item.nombre_producto} - Cantidad: {item.cantidad} - Subtotal: ${item.subtotal}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Empleados y Salarios</h3>
          <ul>
            {vistaEmpleadosSalarios.map((item, idx) => (
              <li key={idx}>
                Empleado: {item.nombre_empleado} - Cargo: {item.cargo} - Salario: ${item.salario}
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
