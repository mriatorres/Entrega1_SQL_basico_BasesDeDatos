-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=12346 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Ana PÃ©rez','3001234567','ana.perez@gmail.com'),(88,'alamm','45333333','gg@kkk.com');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallepedido`
--

DROP TABLE IF EXISTS `detallepedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallepedido` (
  `id_` int NOT NULL,
  `id_pedido` int NOT NULL,
  `id_producto` int NOT NULL,
  `id_detalle` int NOT NULL,
  `cantidad` int NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_`),
  KEY `fk_id_pedido_idx` (`id_pedido`),
  KEY `fk_id_producto_idx` (`id_producto`),
  CONSTRAINT `fk_id_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`idPedidos`),
  CONSTRAINT `fk_id_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`idProductos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallepedido`
--

LOCK TABLES `detallepedido` WRITE;
/*!40000 ALTER TABLE `detallepedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `detallepedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `idEmpleados` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `salario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idEmpleados`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodospago`
--

DROP TABLE IF EXISTS `metodospago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodospago` (
  `idPago` int NOT NULL,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`idPago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodospago`
--

LOCK TABLES `metodospago` WRITE;
/*!40000 ALTER TABLE `metodospago` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodospago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `idPedidos` int NOT NULL,
  `idCliente` int NOT NULL,
  `id_empleado` int NOT NULL,
  `fecha` date NOT NULL,
  `id_pago` int NOT NULL,
  PRIMARY KEY (`idPedidos`),
  KEY `fk_id_cliente_idx` (`idCliente`),
  KEY `fk_id_empleado_idx` (`id_empleado`),
  KEY `fk_id_pago_idx` (`id_pago`),
  CONSTRAINT `fk_id_cliente` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `fk_id_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`idEmpleados`),
  CONSTRAINT `fk_id_pago` FOREIGN KEY (`id_pago`) REFERENCES `metodospago` (`idPago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idProductos` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  PRIMARY KEY (`idProductos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vistaclientepedidos`
--

DROP TABLE IF EXISTS `vistaclientepedidos`;
/*!50001 DROP VIEW IF EXISTS `vistaclientepedidos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vistaclientepedidos` AS SELECT 
 1 AS `id_cliente`,
 1 AS `nombre_cliente`,
 1 AS `numero_pedido`,
 1 AS `fecha`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vistaempleadossalarios`
--

DROP TABLE IF EXISTS `vistaempleadossalarios`;
/*!50001 DROP VIEW IF EXISTS `vistaempleadossalarios`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vistaempleadossalarios` AS SELECT 
 1 AS `idEmpleados`,
 1 AS `nombre`,
 1 AS `cargo`,
 1 AS `salario`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vistapedidosdetalle`
--

DROP TABLE IF EXISTS `vistapedidosdetalle`;
/*!50001 DROP VIEW IF EXISTS `vistapedidosdetalle`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vistapedidosdetalle` AS SELECT 
 1 AS `id_pedido`,
 1 AS `id_cliente`,
 1 AS `id_empleado`,
 1 AS `fecha`,
 1 AS `id_pago`,
 1 AS `id_detalle`,
 1 AS `id_producto`,
 1 AS `cantidad`,
 1 AS `subtotal`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vistaclientepedidos`
--

/*!50001 DROP VIEW IF EXISTS `vistaclientepedidos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vistaclientepedidos` AS select `c`.`id_cliente` AS `id_cliente`,`c`.`nombre` AS `nombre_cliente`,`p`.`idPedidos` AS `numero_pedido`,`p`.`fecha` AS `fecha` from (`clientes` `c` join `pedidos` `p` on((`c`.`id_cliente` = `p`.`idCliente`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vistaempleadossalarios`
--

/*!50001 DROP VIEW IF EXISTS `vistaempleadossalarios`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vistaempleadossalarios` AS select `empleados`.`idEmpleados` AS `idEmpleados`,`empleados`.`nombre` AS `nombre`,`empleados`.`cargo` AS `cargo`,`empleados`.`salario` AS `salario` from `empleados` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vistapedidosdetalle`
--

/*!50001 DROP VIEW IF EXISTS `vistapedidosdetalle`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vistapedidosdetalle` AS select `p`.`idPedidos` AS `id_pedido`,`p`.`idCliente` AS `id_cliente`,`p`.`id_empleado` AS `id_empleado`,`p`.`fecha` AS `fecha`,`p`.`id_pago` AS `id_pago`,`d`.`id_detalle` AS `id_detalle`,`d`.`id_producto` AS `id_producto`,`d`.`cantidad` AS `cantidad`,`d`.`subtotal` AS `subtotal` from (`pedidos` `p` join `detallepedido` `d` on((`p`.`idPedidos` = `d`.`id_pedido`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-03 19:15:34
