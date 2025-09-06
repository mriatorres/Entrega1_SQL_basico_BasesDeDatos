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
