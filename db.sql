-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.19 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para nuevol
DROP DATABASE IF EXISTS `nuevol`;
CREATE DATABASE IF NOT EXISTS `nuevol` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `nuevol`;

-- Volcando estructura para tabla nuevol.alumnos
DROP TABLE IF EXISTS `alumnos`;
CREATE TABLE IF NOT EXISTS `alumnos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tipo_de_curso` int(10) unsigned DEFAULT NULL,
  `horario` int(10) unsigned DEFAULT NULL,
  `definir_horas` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_de_inicio` date DEFAULT NULL,
  `frecuencia_otros` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `frecuencia` int(10) unsigned DEFAULT NULL,
  `modalidad` int(10) unsigned DEFAULT NULL,
  `apellidos` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `departamento` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `dni` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lugar_de_nacimiento` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telf_fijo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `celular_p` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `padre_apoderado` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dni_apo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telf_fijo_apo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `celular_apo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_envio_material` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `persona_de_contacto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lugar_de_estudio` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `carrera_estudio` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `centro_laboral` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion_laboral` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `formas_de_pago` int(10) unsigned DEFAULT NULL,
  `totalidad_fp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `por_cuotas_m_fp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `matricula` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_de_pago_cronocrama` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publicidad` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publicidad_otros` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `razon_social_fac` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dni_fac` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telf_fac` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion_fac` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atentido` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alumnos_tipo_de_curso_foreign` (`tipo_de_curso`),
  KEY `alumnos_horario_foreign` (`horario`),
  KEY `alumnos_frecuencia_foreign` (`frecuencia`),
  KEY `alumnos_modalidad_foreign` (`modalidad`),
  KEY `alumnos_formas_de_pago_foreign` (`formas_de_pago`),
  CONSTRAINT `alumnos_formas_de_pago_foreign` FOREIGN KEY (`formas_de_pago`) REFERENCES `pagos` (`id`),
  CONSTRAINT `alumnos_frecuencia_foreign` FOREIGN KEY (`frecuencia`) REFERENCES `frecuencias` (`id`),
  CONSTRAINT `alumnos_horario_foreign` FOREIGN KEY (`horario`) REFERENCES `horarios` (`id`),
  CONSTRAINT `alumnos_modalidad_foreign` FOREIGN KEY (`modalidad`) REFERENCES `modalidads` (`id`),
  CONSTRAINT `alumnos_tipo_de_curso_foreign` FOREIGN KEY (`tipo_de_curso`) REFERENCES `tipodecursos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.alumnos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.frecuencias
DROP TABLE IF EXISTS `frecuencias`;
CREATE TABLE IF NOT EXISTS `frecuencias` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.frecuencias: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `frecuencias` DISABLE KEYS */;
INSERT INTO `frecuencias` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
	(1, 'Intensivo (L - V)', '2018-06-14 10:07:27', '2018-06-14 10:07:27'),
	(2, 'Interdiario (L - M - V)', '2018-06-14 10:07:27', '2018-06-14 10:07:27'),
	(3, 'Sabados', '2018-06-14 10:07:27', '2018-06-14 10:07:27'),
	(4, 'Otros (Especificar)', '2018-06-14 10:07:27', '2018-06-14 10:07:27');
/*!40000 ALTER TABLE `frecuencias` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.horarios
DROP TABLE IF EXISTS `horarios`;
CREATE TABLE IF NOT EXISTS `horarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.horarios: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `horarios` DISABLE KEYS */;
INSERT INTO `horarios` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
	(1, 'Mañana', '2018-06-14 10:07:27', '2018-06-14 10:07:27'),
	(2, 'Tarde', '2018-06-14 10:07:27', '2018-06-14 10:07:27'),
	(3, 'Sabados', '2018-06-14 10:07:27', '2018-06-14 10:07:27'),
	(4, 'Otros (Especificar)', '2018-06-14 10:07:27', '2018-06-14 10:07:27');
/*!40000 ALTER TABLE `horarios` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.membresias
DROP TABLE IF EXISTS `membresias`;
CREATE TABLE IF NOT EXISTS `membresias` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dni` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `membresias_dni_unique` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.membresias: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `membresias` DISABLE KEYS */;
/*!40000 ALTER TABLE `membresias` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.migrations
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.migrations: ~11 rows (aproximadamente)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2014_10_12_000000_create_users_table', 1),
	(2, '2014_10_12_100000_create_password_resets_table', 1),
	(3, '2018_06_06_010503_create_membresias_table', 1),
	(4, '2018_06_08_232916_create_teachers_table', 1),
	(5, '2018_06_10_063850_create_tipodecursos_table', 1),
	(6, '2018_06_11_041535_create_publicidads_table', 1),
	(7, '2018_06_11_083908_create_modalidads_table', 1),
	(8, '2018_06_11_084444_create_horarios_table', 1),
	(9, '2018_06_11_163535_create_frecuencias_table', 1),
	(10, '2018_06_11_163640_create_pagos_table', 1),
	(11, '2018_06_11_232842_create_alumnos_table', 1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.modalidads
DROP TABLE IF EXISTS `modalidads`;
CREATE TABLE IF NOT EXISTS `modalidads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.modalidads: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `modalidads` DISABLE KEYS */;
INSERT INTO `modalidads` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
	(1, 'Presencial', '2018-06-14 10:07:27', '2018-06-14 10:07:27'),
	(2, 'Virtual', '2018-06-14 10:07:27', '2018-06-14 10:07:27');
/*!40000 ALTER TABLE `modalidads` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.pagos
DROP TABLE IF EXISTS `pagos`;
CREATE TABLE IF NOT EXISTS `pagos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.pagos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
	(1, 'Pago Mensual', '2018-06-14 10:07:27', '2018-06-14 10:07:27'),
	(2, 'Pago Contado/Visa Net', '2018-06-14 10:07:27', '2018-06-14 10:07:27');
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.password_resets
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.password_resets: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.publicidads
DROP TABLE IF EXISTS `publicidads`;
CREATE TABLE IF NOT EXISTS `publicidads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.publicidads: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `publicidads` DISABLE KEYS */;
INSERT INTO `publicidads` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
	(1, 'En el local', '2018-06-14 10:07:28', '2018-06-14 10:07:28'),
	(2, 'Via e-mail', '2018-06-14 10:07:28', '2018-06-14 10:07:28'),
	(3, 'Facebook', '2018-06-14 10:07:28', '2018-06-14 10:07:28'),
	(4, 'Amigos', '2018-06-14 10:07:28', '2018-06-14 10:07:28'),
	(5, 'Twitter', '2018-06-14 10:07:28', '2018-06-14 10:07:28'),
	(6, 'Otros', '2018-06-14 10:07:28', '2018-06-14 10:07:28');
/*!40000 ALTER TABLE `publicidads` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.teachers
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.teachers: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.tipodecursos
DROP TABLE IF EXISTS `tipodecursos`;
CREATE TABLE IF NOT EXISTS `tipodecursos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.tipodecursos: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `tipodecursos` DISABLE KEYS */;
INSERT INTO `tipodecursos` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
	(1, 'Auxiliar de Despacho Aduanero (curso)', '2018-06-14 10:07:27', '2018-06-14 10:07:27'),
	(2, 'Sectorista Aduanero (curso)', '2018-06-14 10:07:28', '2018-06-14 10:07:28'),
	(3, 'Liquidador Aduanero (curso)', '2018-06-14 10:07:28', '2018-06-14 10:07:28'),
	(4, 'Gestor Aduanero(carrera)', '2018-06-14 10:07:28', '2018-06-14 10:07:28'),
	(5, 'Diplomado de Com. Intern. y Aduana', '2018-06-14 10:07:28', '2018-06-14 10:07:28'),
	(6, 'Otros', '2018-06-14 10:07:28', '2018-06-14 10:07:28');
/*!40000 ALTER TABLE `tipodecursos` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.users: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Miguel Rodriguez', 'admin@admin.com', '$2y$10$zmBrS15haNbMsrkepK3jQeFA8yuqCIpFOTt3XI6XXYrbzCTyzjPFu', NULL, '2018-06-14 10:07:27', '2018-06-14 10:07:27');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
