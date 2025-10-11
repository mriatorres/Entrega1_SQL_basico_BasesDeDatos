# ☕ Cafetería App

Aplicación CRUD completa para gestionar una cafetería, desarrollada con **React** en el frontend, **Express + Node.js** en el backend, y **MySQL** como base de datos relacional.

---

## 📦 Tecnologías Utilizadas

- ⚛️ React (Frontend)
- 🟩 Node.js + Express (Backend)
- 🐬 MySQL (Base de datos)
- 🔁 Axios (HTTP requests)
- 🌐 CORS, Body-Parser (middlewares)
- 🗃️ MySQL Workbench (gestión de base de datos)

---

# 🫖 Modelo ER Base de Datos Cafetería

## Entidades y Atributos

### CLIENTES
- **id_cliente** (PK)
- nombre
- teléfono
- email

### EMPLEADOS
- **id_empleado** (PK)
- nombre
- cargo
- salario

### PRODUCTOS
- **id_producto** (PK)
- nombre
- precio
- categoría

### MÉTODOS_PAGO
- **id_pago** (PK)
- tipo

### PEDIDOS
- **id_pedido** (PK)
- fecha
- **id_cliente** (FK)
- **id_empleado** (FK)
- **id_pago** (FK)

### DETALLE_PEDIDO
- **id_detalle** (PK)
- **id_pedido** (FK)
- **id_producto** (FK)
- cantidad
- subtotal

---

## Relaciones

| Entidad Origen | Cardinalidad | Entidad Destino | Descripción                                                                 |
|----------------|--------------|-----------------|-----------------------------------------------------------------------------|
| CLIENTES       | 1 : N        | PEDIDOS         | Un cliente puede realizar muchos pedidos; un pedido pertenece a un solo cliente. |
| EMPLEADOS      | 1 : N        | PEDIDOS         | Un empleado atiende muchos pedidos; un pedido es atendido por un solo empleado. |
| MÉTODOS_PAGO   | 1 : N        | PEDIDOS         | Un método de pago puede usarse en muchos pedidos; cada pedido usa un solo método. |
| PEDIDOS        | 1 : N        | DETALLE_PEDIDO  | Un pedido está compuesto por uno o varios detalles (composición fuerte).     |
| PRODUCTOS      | 1 : N        | DETALLE_PEDIDO  | Un producto puede aparecer en muchos detalles de pedidos.                    |

---

## Notas

- La relación muchos a muchos entre **PEDIDOS** y **PRODUCTOS** se resuelve mediante la tabla **DETALLE_PEDIDO**.
- La composición fuerte entre **PEDIDOS** y **DETALLE_PEDIDO** implica que al eliminar un pedido, se eliminan sus detalles asociados.


---

# 📊 Consultas SQL de la Cafetería

A continuación algunas consultas de ejemplo sobre la base de datos:

---

### 🔹 Todos los pedidos con cliente y empleado
```sql
SELECT p.id_pedido, c.nombre AS cliente, e.nombre AS empleado, p.fecha
FROM Pedidos p
JOIN Clientes c ON p.id_cliente = c.id_cliente
JOIN Empleados e ON p.id_empleado = e.id_empleado;

```

### 🔹 Total gastado por cada cliente
```sql

SELECT c.nombre, SUM(d.subtotal) AS total_gastado
FROM Clientes c
JOIN Pedidos p ON c.id_cliente = p.id_cliente
JOIN DetallePedido d ON p.id_pedido = d.id_pedido
GROUP BY c.nombre;


```

### 🔹 Producto más vendido

```sql

SELECT pr.nombre, SUM(d.cantidad) AS total_vendido
FROM Productos pr
JOIN DetallePedido d ON pr.id_producto = d.id_producto
GROUP BY pr.nombre
ORDER BY total_vendido DESC
LIMIT 1;


```
---

# Esquema de Vistas y Ventanas Avanzadas

## Vistas Generales

- vista_totales_clientes
  - id_cliente
  - nombre
  - total_compras

- vista_empleados_salarios
  - idEmpleados
  - nombre
  - cargo
  - salario

- vista_pedidos_detalle
  - idPedidos
  - fecha
  - id_producto
  - cantidad
  - subtotal

- vista_cliente_pedidos
  - id_cliente
  - nombre
  - idPedidos
  - fecha
  - id_pago

## Ventanas Avanzadas

- Ranking de Empleados
  - idEmpleados
  - nombre
  - cargo
  - salario
  - ranking (RANK() OVER PARTITION BY cargo ORDER BY salario DESC)

- Ventas Acumuladas de Clientes
  - id_cliente
  - cliente (nombre)
  - pedido_id
  - fecha_pedido
  - total_acumulado (SUM() OVER PARTITION BY id_cliente ORDER BY fecha)
    
---

## 🚀 Instrucciones de Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/cafeteria-app.git
cd cafeteria-app
```

2️⃣ Configurar la Base de Datos

Abre MySQL Workbench u otra herramienta.

Ejecuta el script SQL ubicado en db/schema.sql:
```bash
SOURCE db/schema.sql;
```
Esto creará la base de datos cruddb con las tablas necesarias (Clientes, Empleados, Productos, etc.).


3️⃣ Iniciar el servidor (Backend)

```bash
cd server
npm install
node index.js
```
El backend corre en http://localhost:3001


4️⃣ Iniciar la app (Frontend)
cd ../client
npm install
npm start

```bash
La app se abre automáticamente en http://localhost:3000
```
