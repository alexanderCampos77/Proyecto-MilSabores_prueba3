-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 05-12-2025 a las 03:04:54
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pasteleria_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `boleta`
--

CREATE TABLE `boleta` (
  `total` double DEFAULT NULL,
  `fecha` datetime(6) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `usuario_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`) VALUES
(3, 'Postres Individuales'),
(4, 'Sin Azúcar'),
(2, 'Tortas Circulares'),
(1, 'Tortas Cuadradas'),
(5, 'Tradicional');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_boleta`
--

CREATE TABLE `detalle_boleta` (
  `cantidad` int(11) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `boleta_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `producto_id` bigint(20) DEFAULT NULL,
  `precio_unitario` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `precio` double DEFAULT NULL,
  `categoria_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`precio`, `categoria_id`, `id`, `descripcion`, `imagen`, `nombre`) VALUES
(45000, 1, 1, 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.', '/images/Chocolate_Hazelnut_Cube_Cake_to_order_London_Surrey_2_1200x.webp', 'Torta Cuadrada de Chocolate'),
(50000, 1, 2, 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho.', '/images/54040c9a1a1c4b979d88d22977ef6aa126.jpg', 'Torta Cuadrada de Frutas'),
(40000, 2, 3, 'Bizcocho de vainilla clásico relleno con crema pastelera.', '/images/Gluten-Free-Vanilla-Cake-image--500x500.webp', 'Torta Circular de Vainilla'),
(42000, 2, 4, 'Torta tradicional chilena con manjar y nueces.', '/images/imagesmannjar.jpg', 'Torta Circular de Manjar'),
(5000, 3, 5, 'Postre individual cremoso y suave, hecho con chocolate de alta calidad.', '/images/c170cfd080dcaa23853a390b8343b021.jpg', 'Mousse de Chocolate'),
(5500, 3, 6, 'Un postre italiano individual con capas de café, mascarpone y cacao.', '/images/11d636dc683222b2d4e9b3dcb248ccb5.jpg', 'Tiramisú Clásico'),
(48000, 4, 7, 'Torta ligera y deliciosa, endulzada naturalmente.', '/images/88_MIF_2420_Torta_de_Naranja_Sin_Azucar_Anadida_1080x1080.webp', 'Torta Sin Azúcar de Naranja'),
(60000, 5, 8, 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.', '/images/boda.jpg', 'Torta Especial de Boda');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `email`, `nombre`, `password`, `rol`) VALUES
(11, 'alexandermanuelvnunez24@gmail.com', 'Alexander', '$2a$10$vbArd5tK9fwyCWIPCOnJrOmbuV7sQ1ZAppmz4lI0ipM3sqb2QwWlq', 'CLIENTE');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `boleta`
--
ALTER TABLE `boleta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK62vn7tni2jyc0y0xv0ewyb6sj` (`usuario_id`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK35t4wyxqrevf09uwx9e9p6o75` (`nombre`);

--
-- Indices de la tabla `detalle_boleta`
--
ALTER TABLE `detalle_boleta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6ao8lmippvqnncrgwnfjjch18` (`boleta_id`),
  ADD KEY `FKht1rfy8yukwexahhcscksj5ri` (`producto_id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKodqr7965ok9rwquj1utiamt0m` (`categoria_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK5171l57faosmj8myawaucatdw` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `boleta`
--
ALTER TABLE `boleta`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detalle_boleta`
--
ALTER TABLE `detalle_boleta`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `boleta`
--
ALTER TABLE `boleta`
  ADD CONSTRAINT `FK62vn7tni2jyc0y0xv0ewyb6sj` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `detalle_boleta`
--
ALTER TABLE `detalle_boleta`
  ADD CONSTRAINT `FK6ao8lmippvqnncrgwnfjjch18` FOREIGN KEY (`boleta_id`) REFERENCES `boleta` (`id`),
  ADD CONSTRAINT `FKht1rfy8yukwexahhcscksj5ri` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `FKodqr7965ok9rwquj1utiamt0m` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
