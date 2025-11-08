const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// ==========================
// MIDDLEWARES
// ==========================
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ==========================
// CONEXIÓN A MYSQL
// ==========================
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "cruddb"
});

// ==========================
// RUTA DE PRUEBA
// ==========================
app.get("/", (req, res) => {
  res.send("API de Cafetería funcionando correctamente");
});

// ==========================
// INSERTAR DATOS CON STORED PROCEDURES
// ==========================

// CLIENTES
app.post('/api/insertCliente', (req, res) => {
  const { nombre, telefono, correo, direccion } = req.body;
  const sql = "CALL sp_InsertarCliente(?,?,?,?)";
  db.query(sql, [nombre, telefono, correo, direccion], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Cliente insertado con éxito   ');
  });
});

// EMPLEADOS
app.post('/api/insertEmpleado', (req, res) => {
  const { nombre, cargo, telefono, correo } = req.body;
  const sql = "CALL sp_InsertarEmpleado(?,?,?,?)";
  db.query(sql, [nombre, cargo, telefono, correo], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Empleado insertado con éxito   ');
  });
});

// PRODUCTOS
app.post('/api/insertProducto', (req, res) => {
  const { nombre, descripcion, precio, stock, idCategoria } = req.body;
  const sql = "CALL sp_InsertarProducto(?,?,?,?,?)";
  db.query(sql, [nombre, descripcion, precio, stock, idCategoria], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Producto insertado con éxito   ');
  });
});

// METODOS DE PAGO
app.post('/api/insertPago', (req, res) => {
  const { tipoPago, descripcion } = req.body;
  const sql = "CALL sp_InsertarMetodoPago(?,?)";
  db.query(sql, [tipoPago, descripcion], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Método de pago insertado con éxito   ');
  });
});

// PEDIDOS
app.post('/api/insertPedido', (req, res) => {
  const { idCliente, idEmpleado, idMetodoPago, total } = req.body;
  const sql = "CALL sp_InsertarPedido(?,?,?,?)";
  db.query(sql, [idCliente, idEmpleado, idMetodoPago, total], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Pedido insertado con éxito   ');
  });
});

// DETALLE PEDIDO
app.post('/api/insertDetalle', (req, res) => {
  const { idPedido, idProducto, cantidad, precioUnitario } = req.body;
  const sql = "CALL sp_InsertarDetallePedido(?,?,?,?)";
  db.query(sql, [idPedido, idProducto, cantidad, precioUnitario], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Detalle de pedido insertado con éxito   ');
  });
});

// LOG AUDITORIA
app.post('/api/insertLog', (req, res) => {
  const { idPedido, accion, usuario, descripcion } = req.body;
  const sql = "CALL sp_InsertarLogAuditoria(?,?,?,?)";
  db.query(sql, [idPedido, accion, usuario, descripcion], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Log de auditoría insertado con éxito   ');
  });
});

// CATEGORIAS
app.post('/api/insertCategoria', (req, res) => {
  const { nombre, descripcion } = req.body;
  const sql = "CALL sp_InsertarCategoria(?,?)";
  db.query(sql, [nombre, descripcion], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Categoría insertada con éxito mediante SP');
  });
});

// PROVEEDORES
app.post('/api/insertProveedor', (req, res) => {
  const { nombre, telefono, correo, direccion } = req.body;
  const sql = "CALL sp_InsertarProveedor(?,?,?,?)";
  db.query(sql, [nombre, telefono, correo, direccion], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Proveedor insertado con éxito mediante SP');
  });
});

// PRODUCTOS-PROVEEDORES
app.post('/api/insertProductoProveedor', (req, res) => {
  const { idProducto, idProveedor, precioCompra } = req.body;
  const sql = "CALL sp_InsertarProductoProveedor(?,?,?)";
  db.query(sql, [idProducto, idProveedor, precioCompra], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Producto-Proveedor insertado con éxito mediante SP');
  });
});


// ==========================
// TABLAS GENERALES (GET y DELETE)
// ==========================

const tablas = [
  { name: "Clientes", route: "Clientes", key: "idCliente" },
  { name: "Empleados", route: "Empleados", key: "idEmpleado" },
  { name: "Productos", route: "Productos", key: "idProducto" },
  { name: "MetodosPago", route: "MetodosPago", key: "idMetodoPago" },
  { name: "Pedidos", route: "Pedidos", key: "idPedido" },
  { name: "DetallePedido", route: "DetallePedido", key: "idDetalle" },
  { name: "LogAuditoria", route: "LogAuditoria", key: "idLog" },
];

tablas.forEach(tabla => {
  // GET
  app.get(`/api/get${tabla.route}`, (req, res) => {
    const sql = `SELECT * FROM ${tabla.name}`;
    db.query(sql, (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    });
  });

  // DELETE
  app.delete(`/api/delete${tabla.route}/:id`, (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM ${tabla.name} WHERE ${tabla.key} = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(`${tabla.name} eliminado con éxito`);
    });
  });
});

// ==========================
// LEVANTAR SERVIDOR
// ==========================
app.listen(3001, () => console.log("Servidor corriendo en puerto 3001"));
