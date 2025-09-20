const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// 🔹 Middlewares
app.use(cors()); // Permite requests desde otro puerto
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 🔹 Conexión a MySQL
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "cruddb"
});

app.get("/", (req, res) => {
  res.send("API de Cafetería funcionando correctamente 🚀");
});

// ==========================
// INSERTAR DATOS
// ==========================

app.post('/api/insertCliente', (req, res) => {
    const { IDCliente, NombreCliente, TelefonoCliente, EmailCliente } = req.body;
    const sql = "INSERT INTO Clientes (id_cliente, nombre, telefono, email) VALUES (?,?,?,?)";
    db.query(sql, [IDCliente, NombreCliente, TelefonoCliente, EmailCliente], (err, result) => {
        if(err) res.status(500).send(err);
        else res.send('Cliente insertado con éxito');
    });
});

app.post('/api/insertEmpleado', (req, res) => {
    const { IDEmpleado, NombreEmpleado, CargoEmpleado, SalarioEmpleado } = req.body;
    const sql = "INSERT INTO Empleados (id_empleado, nombre, cargo, salario) VALUES (?,?,?,?)";
    db.query(sql, [IDEmpleado, NombreEmpleado, CargoEmpleado, SalarioEmpleado], (err, result) => {
        if(err) res.status(500).send(err);
        else res.send('Empleado insertado con éxito');
    });
});

app.post('/api/insertProducto', (req, res) => {
    const { IDProducto, NombreProducto, PrecioProducto, CategoriaProducto } = req.body;
    const sql = "INSERT INTO Productos (id_producto, nombre, precio, categoria) VALUES (?,?,?,?)";
    db.query(sql, [IDProducto, NombreProducto, PrecioProducto, CategoriaProducto], (err, result) => {
        if(err) res.status(500).send(err);
        else res.send('Producto insertado con éxito');
    });
});

app.post('/api/insertPago', (req, res) => {
    const { IDPago, TipoPago } = req.body;
    const sql = "INSERT INTO MetodosPago (id_pago, tipo) VALUES (?,?)";
    db.query(sql, [IDPago, TipoPago], (err, result) => {
        if(err) res.status(500).send(err);
        else res.send('Método de pago insertado con éxito');
    });
});

app.post('/api/insertPedido', (req, res) => {
    const { IDPedido, IDClientePedido, IDEmpleadoPedido, FechaPedido, IDPagoPedido } = req.body;
    const sql = "INSERT INTO Pedidos (id_pedido, id_cliente, id_empleado, fecha, id_pago) VALUES (?,?,?,?,?)";
    db.query(sql, [IDPedido, IDClientePedido, IDEmpleadoPedido, FechaPedido, IDPagoPedido], (err, result) => {
        if(err) res.status(500).send(err);
        else res.send('Pedido insertado con éxito');
    });
});

app.post('/api/insertDetalle', (req, res) => {
    const { IDDetalle, IDPedidoDetalle, IDProductoDetalle, CantidadDetalle, SubtotalDetalle } = req.body;
    const sql = "INSERT INTO DetallePedido (id_detalle, id_pedido, id_producto, cantidad, subtotal) VALUES (?,?,?,?,?)";
    db.query(sql, [IDDetalle, IDPedidoDetalle, IDProductoDetalle, CantidadDetalle, SubtotalDetalle], (err, result) => {
        if(err) res.status(500).send(err);
        else res.send('Detalle de pedido insertado con éxito');
    });
});

// ==========================
// CONSULTAR DATOS
// ==========================

const tablas = [
    { name: "Clientes", route: "Clientes", key: "id_cliente" },
    { name: "Empleados", route: "Empleados", key: "id_empleado" },
    { name: "Productos", route: "Productos", key: "id_producto" },
    { name: "MetodosPago", route: "MetodosPago", key: "id_pago" },
    { name: "Pedidos", route: "Pedidos", key: "id_pedido" },
    { name: "DetallePedido", route: "DetallePedido", key: "id_detalle" },
];

tablas.forEach(tabla => {
    // GET
    app.get(`/api/get${tabla.route}`, (req,res) => {
        const sql = `SELECT * FROM ${tabla.name}`;
        db.query(sql, (err,result) => {
            if(err) res.status(500).send(err);
            else res.json(result);
        });
    });

    // DELETE
    app.delete(`/api/delete${tabla.route}/:id`, (req,res) => {
        const id = req.params.id;
        const sql = `DELETE FROM ${tabla.name} WHERE ${tabla.key} = ?`;
        db.query(sql,[id], (err,result) => {
            if(err) res.status(500).send(err);
            else res.send(`${tabla.name} eliminado con éxito`);
        });
    });
});

 // ==========================
  // VISTAS
  // ==========================

// Endpoint para  vista VistaClientePedidos
app.get('/api/getVistaClientePedidos', (req, res) => {
  const sql = 'SELECT * FROM VistaClientePedidos';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

//CREAR VISTA EN MI SQL WORKBENCH !!!!!
//CREATE OR REPLACE VIEW VistaClientePedidos AS
//SELECT c.id_cliente, c.nombre AS nombre_cliente, p.id_pedido, p.fecha
//FROM Clientes c
//INNER JOIN Pedidos p ON c.id_cliente = p.id_cliente;

//----------------

// Endpoint para vistaPedidosDetalle
app.get('/api/getVistaPedidosDetalle', (req, res) => {
  const sqlQuery = "SELECT * FROM vistaPedidosDetalle";
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener vistaPedidosDetalle");
    } else {
      res.json(results);
    }
  });
});

//CREAR VISTA EN MI SQL WORKBENCH !!!!!
//CREATE OR REPLACE VIEW vistaPedidosDetalle AS
//SELECT 
  //p.id_pedido,
  //p.id_cliente,
  //p.id_empleado,
  //p.fecha,
  //p.id_pago,
  //d.id_detalle,
  //d.id_producto,
  //d.cantidad,
  //d.subtotal
//FROM pedidos p
//JOIN detalle_pedido d ON p.id_pedido = d.id_pedido;


// -------------------------------------

// Endpoint para vistaEmpleadosSalarios
app.get('/api/getVistaEmpleadosSalarios', (req, res) => {
  const sqlQuery = "SELECT * FROM vistaEmpleadosSalarios";
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener vistaEmpleadosSalarios");
    } else {
      res.json(results);
    }
  });
});

//CREAR VISTA EN MI SQL WORKBENCH !!!!!

//CREATE OR REPLACE VIEW vistaEmpleadosSalarios AS
//SELECT 
//  id_empleado,
//  nombre,
//  cargo,
//  salario
//FROM empleados;


// -------------------------------------------


// ==========================
// LEVANTAR SERVIDOR
// ==========================
app.listen(3001, () => console.log("Servidor corriendo en puerto 3001"));
