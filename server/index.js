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
  res.send("✅ API de Cafetería funcionando correctamente 🚀");
});

// ==========================
// INSERTAR DATOS
// ==========================

// CLIENTES
app.post('/api/insertCliente', (req, res) => {
  const { id_cliente, nombre, telefono, email } = req.body;
  const sql = "INSERT INTO Clientes (id_cliente, nombre, telefono, email) VALUES (?,?,?,?)";
  db.query(sql, [id_cliente, nombre, telefono, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('✅ Cliente insertado con éxito');
  });
});

// EMPLEADOS
app.post('/api/insertEmpleado', (req, res) => {
  const { idEmpleados, nombre, cargo, salario } = req.body;
  const sql = "INSERT INTO Empleados (idEmpleados, nombre, cargo, salario) VALUES (?,?,?,?)";
  db.query(sql, [idEmpleados, nombre, cargo, salario], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('✅ Empleado insertado con éxito');
  });
});

// PRODUCTOS
app.post('/api/insertProducto', (req, res) => {
  const { idProductos, nombre, precio, categoria } = req.body;
  const sql = "INSERT INTO Productos (idProductos, nombre, precio, categoria) VALUES (?,?,?,?)";
  db.query(sql, [idProductos, nombre, precio, categoria], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('✅ Producto insertado con éxito');
  });
});

// MÉTODOS DE PAGO
app.post('/api/insertPago', (req, res) => {
  const { idPago, tipo } = req.body;
  const sql = "INSERT INTO MetodosPago (idPago, tipo) VALUES (?,?)";
  db.query(sql, [idPago, tipo], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('✅ Método de pago insertado con éxito');
  });
});

// PEDIDOS
app.post('/api/insertPedido', (req, res) => {
  const { idPedidos, idCliente, id_empleado, fecha, idPago } = req.body;
  const sql = "INSERT INTO Pedidos (idPedidos, idCliente, id_empleado, fecha, id_pago) VALUES (?,?,?,?,?)";
  db.query(sql, [idPedidos, idCliente, id_empleado, fecha, idPago], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('✅ Pedido insertado con éxito');
  });
});

// DETALLE PEDIDO
app.post('/api/insertDetalle', (req, res) => {
  const { id_detalle, id_pedido, id_producto, cantidad, subtotal } = req.body;
  const sql = "INSERT INTO DetallePedido (id_detalle, id_pedido, id_producto, cantidad, subtotal) VALUES (?,?,?,?,?)";
  db.query(sql, [id_detalle, id_pedido, id_producto, cantidad, subtotal], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('✅ Detalle de pedido insertado con éxito');
  });
});

// ==========================
// TABLAS GENERALES (GET y DELETE)
// ==========================
const tablas = [
  { name: "Clientes", route: "Clientes", key: "id_cliente" },
  { name: "Empleados", route: "Empleados", key: "idEmpleados" },
  { name: "Productos", route: "Productos", key: "idProductos" },
  { name: "MetodosPago", route: "MetodosPago", key: "idPago" },
  { name: "Pedidos", route: "Pedidos", key: "idPedidos" },
  { name: "DetallePedido", route: "DetallePedido", key: "id_detalle" },
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

  // DELETE con manejo de FK
  app.delete(`/api/delete${tabla.route}/:id`, (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM ${tabla.name} WHERE ${tabla.key} = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.errno === 1451) {
          return res.status(400).send(`No se puede eliminar ${tabla.name} porque tiene registros dependientes.`);
        }
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) return res.status(404).send(`No se encontró ${tabla.name} con ID ${id}`);
      res.send(`✅ ${tabla.name} eliminado con éxito`);
    });
  });
});

// ==========================
// VISTAS SQL
// ==========================

// Clientes y pedidos
app.get('/api/getVistaClientePedidos', (req, res) => {
  const sql = `
    SELECT c.id_cliente, c.nombre AS nombre_cliente, p.idPedidos AS id_pedido, p.fecha AS fecha_pedido, p.id_pago
    FROM Clientes c
    JOIN Pedidos p ON c.id_cliente = p.idCliente
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Pedidos y detalle
app.get('/api/getVistaPedidosDetalle', (req, res) => {
  const sql = `
    SELECT p.idPedidos AS id_pedido, p.fecha AS fecha_pedido, dp.id_producto, dp.cantidad, dp.subtotal, pr.nombre AS nombre_producto
    FROM Pedidos p
    JOIN DetallePedido dp ON p.idPedidos = dp.id_pedido
    JOIN Productos pr ON dp.id_producto = pr.idProductos
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Empleados y salarios
app.get('/api/getVistaEmpleadosSalarios', (req, res) => {
  const sql = "SELECT idEmpleados, nombre AS nombre_empleado, cargo, salario FROM Empleados";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// ==========================
// LEVANTAR SERVIDOR
// ==========================
app.listen(3001, () => console.log("🚀 Servidor corriendo en puerto 3001"));
