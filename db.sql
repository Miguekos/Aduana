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

USE `fitseven_aduanademo`;

-- Volcando estructura para tabla nuevol.alumnos
DROP TABLE IF EXISTS `alumnos`;
CREATE TABLE IF NOT EXISTS `alumnos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tipo_de_curso` int(10) unsigned DEFAULT NULL,
  `horario` int(10) unsigned DEFAULT NULL,
  `definir_horas` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_de_inicio` date DEFAULT NULL,
  `frecuencia_otros` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `frecuencia` int(10) unsigned DEFAULT NULL,
  `modalidad` int(10) unsigned DEFAULT NULL,
  `apellidos` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `departamento` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `dni` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lugar_de_nacimiento` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telf_fijo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `celular_p` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `padre_apoderado` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dni_apo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telf_fijo_apo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `celular_apo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_envio_material` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `persona_de_contacto` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lugar_de_estudio` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `carrera_estudio` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `centro_laboral` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion_laboral` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `formas_de_pago` int(10) unsigned DEFAULT NULL,
  `totalidad_fp` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `por_cuotas_m_fp` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `matricula` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_de_pago_cronocrama` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publicidad` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publicidad_otros` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `razon_social_fac` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dni_fac` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telf_fac` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion_fac` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atentido` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
INSERT INTO `alumnos` (`id`, `tipo_de_curso`, `horario`, `definir_horas`, `fecha_de_inicio`, `frecuencia_otros`, `frecuencia`, `modalidad`, `apellidos`, `nombre`, `direccion`, `departamento`, `edad`, `dni`, `lugar_de_nacimiento`, `telf_fijo`, `celular_p`, `email`, `facebook`, `padre_apoderado`, `dni_apo`, `telf_fijo_apo`, `celular_apo`, `email_envio_material`, `persona_de_contacto`, `lugar_de_estudio`, `carrera_estudio`, `centro_laboral`, `direccion_laboral`, `formas_de_pago`, `totalidad_fp`, `por_cuotas_m_fp`, `matricula`, `fecha_de_pago_cronocrama`, `publicidad`, `publicidad_otros`, `razon_social_fac`, `dni_fac`, `telf_fac`, `direccion_fac`, `atentido`, `created_at`, `updated_at`) VALUES
	(1, 3, 2, NULL, '2018-06-16', NULL, 2, 2, 'Rodriguez', 'Miguel', NULL, NULL, NULL, '1234', NULL, NULL, NULL, 'miguekos1233@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, '1', NULL, 'Miguel Angel Rodriguez Rodriguez', '1234', '987654321', 'Los Olivos, Av Cebtral, Usb. San Elias Mz p Lt 6', 'Miguel Rodriguez', '2018-06-16 13:10:58', '2018-06-16 13:10:58'),
	(2, 4, 2, NULL, '2018-06-18', NULL, 3, 2, 'Jenni', 'Juan', NULL, NULL, NULL, '4321', NULL, NULL, NULL, 'admin@tektonlabs.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, '1', NULL, 'Jenni', '1234', '443345', 'Canta Callao', 'Miguel Rodriguez', '2018-06-18 06:14:54', '2018-06-18 06:14:54');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.assistance
DROP TABLE IF EXISTS `assistance`;
CREATE TABLE IF NOT EXISTS `assistance` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `kind_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_at` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_asis` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.assistance: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `assistance` DISABLE KEYS */;
/*!40000 ALTER TABLE `assistance` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.controls
DROP TABLE IF EXISTS `controls`;
CREATE TABLE IF NOT EXISTS `controls` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_alumno` int(11) NOT NULL,
  `materia` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.controls: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `controls` DISABLE KEYS */;
INSERT INTO `controls` (`id`, `id_alumno`, `materia`, `created_at`, `updated_at`) VALUES
	(1, 1, 'Matematica', '2018-06-16 13:12:02', '2018-06-16 13:12:02'),
	(2, 1, 'Ingles', '2018-06-16 13:14:25', '2018-06-16 13:14:25'),
	(9, 2, 'Matematica', '2018-06-18 16:03:32', '2018-06-18 16:03:32');
/*!40000 ALTER TABLE `controls` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.frecuencias
DROP TABLE IF EXISTS `frecuencias`;
CREATE TABLE IF NOT EXISTS `frecuencias` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.frecuencias: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `frecuencias` DISABLE KEYS */;
INSERT INTO `frecuencias` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
	(1, 'Intensivo (L - V)', '2018-06-16 13:10:07', '2018-06-16 13:10:07'),
	(2, 'Interdiario (L - M - V)', '2018-06-16 13:10:07', '2018-06-16 13:10:07'),
	(3, 'Sabados', '2018-06-16 13:10:07', '2018-06-16 13:10:07'),
	(4, 'Otros (Especificar)', '2018-06-16 13:10:07', '2018-06-16 13:10:07');
/*!40000 ALTER TABLE `frecuencias` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.grafica
DROP TABLE IF EXISTS `grafica`;
CREATE TABLE IF NOT EXISTS `grafica` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `valor` int(11) DEFAULT NULL,
  `tiempo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dia` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.grafica: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `grafica` DISABLE KEYS */;
INSERT INTO `grafica` (`id`, `valor`, `tiempo`, `dia`, `created_at`, `updated_at`) VALUES
	(1, 0, '2018-06-17', 'Dom', NULL, NULL),
	(2, 0, '2018-06-18', 'Lun', NULL, NULL);
/*!40000 ALTER TABLE `grafica` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.horarios
DROP TABLE IF EXISTS `horarios`;
CREATE TABLE IF NOT EXISTS `horarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.horarios: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `horarios` DISABLE KEYS */;
INSERT INTO `horarios` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
	(1, 'Mañana', '2018-06-16 13:10:07', '2018-06-16 13:10:07'),
	(2, 'Tarde', '2018-06-16 13:10:07', '2018-06-16 13:10:07'),
	(3, 'Sabados', '2018-06-16 13:10:07', '2018-06-16 13:10:07'),
	(4, 'Otros (Especificar)', '2018-06-16 13:10:07', '2018-06-16 13:10:07');
/*!40000 ALTER TABLE `horarios` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.materias
DROP TABLE IF EXISTS `materias`;
CREATE TABLE IF NOT EXISTS `materias` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_materia` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.materias: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT INTO `materias` (`id`, `nombre_materia`, `created_at`, `updated_at`) VALUES
	(1, 'Matematica', '2018-06-16 13:11:11', '2018-06-16 13:11:11'),
	(2, 'Ingles', '2018-06-16 13:11:21', '2018-06-16 13:11:21'),
	(3, 'Castellano', '2018-06-18 06:10:20', '2018-06-18 06:10:20');
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.membresias
DROP TABLE IF EXISTS `membresias`;
CREATE TABLE IF NOT EXISTS `membresias` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dni` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `migration` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.migrations: ~15 rows (aproximadamente)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2014_10_12_000000_create_users_table', 1),
	(2, '2014_10_12_100000_create_password_resets_table', 1),
	(3, '2018_06_06_010503_create_membresias_table', 1),
	(4, '2018_06_08_232916_create_teachers_table', 1),
	(5, '2018_06_10_063850_create_tipodecursos_table', 1),
	(6, '2018_06_10_081159_create_materias_table', 1),
	(7, '2018_06_11_041535_create_publicidads_table', 1),
	(8, '2018_06_11_083908_create_modalidads_table', 1),
	(9, '2018_06_11_084444_create_horarios_table', 1),
	(10, '2018_06_11_163535_create_frecuencias_table', 1),
	(11, '2018_06_11_163640_create_pagos_table', 1),
	(12, '2018_06_11_232842_create_alumnos_table', 1),
	(13, '2018_06_16_083349_create_assistance_table', 1),
	(14, '2018_06_16_083405_create_grafica_table', 1),
	(15, '2018_06_16_111122_create_controls_table', 1),
	(16, '2018_06_16_123229_create_notas_table', 1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.modalidads
DROP TABLE IF EXISTS `modalidads`;
CREATE TABLE IF NOT EXISTS `modalidads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.modalidads: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `modalidads` DISABLE KEYS */;
INSERT INTO `modalidads` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
	(1, 'Presencial', '2018-06-16 13:10:07', '2018-06-16 13:10:07'),
	(2, 'Virtual', '2018-06-16 13:10:08', '2018-06-16 13:10:08');
/*!40000 ALTER TABLE `modalidads` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.notas
DROP TABLE IF EXISTS `notas`;
CREATE TABLE IF NOT EXISTS `notas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_alumno` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_materia` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nota` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.notas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `notas` DISABLE KEYS */;
INSERT INTO `notas` (`id`, `id_alumno`, `id_materia`, `nota`, `created_at`, `updated_at`) VALUES
	(1, '1', '1', 12, '2018-06-18 05:03:01', '2018-06-18 05:03:01'),
	(2, '1', '2', 10, '2018-06-18 05:13:12', '2018-06-18 05:13:12'),
	(3, '1', '1', 23, '2018-06-18 05:15:10', '2018-06-18 05:15:10'),
	(4, '1', '3', 10, '2018-06-18 06:11:36', '2018-06-18 06:11:36'),
	(5, '1', '3', 15, '2018-06-18 06:12:11', '2018-06-18 06:12:11'),
	(6, '2', '8', 23, '2018-06-18 06:15:20', '2018-06-18 06:15:20'),
	(7, '2', '9', 10, '2018-06-18 16:03:45', '2018-06-18 16:03:45');
/*!40000 ALTER TABLE `notas` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.pagos
DROP TABLE IF EXISTS `pagos`;
CREATE TABLE IF NOT EXISTS `pagos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.pagos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
	(1, 'Pago Mensual', '2018-06-16 13:10:08', '2018-06-16 13:10:08'),
	(2, 'Pago Contado/Visa Net', '2018-06-16 13:10:08', '2018-06-16 13:10:08');
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.password_resets
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.publicidads: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `publicidads` DISABLE KEYS */;
INSERT INTO `publicidads` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
	(1, 'En el local', '2018-06-16 13:10:08', '2018-06-16 13:10:08'),
	(2, 'Via e-mail', '2018-06-16 13:10:08', '2018-06-16 13:10:08'),
	(3, 'Facebook', '2018-06-16 13:10:08', '2018-06-16 13:10:08'),
	(4, 'Amigos', '2018-06-16 13:10:08', '2018-06-16 13:10:08'),
	(5, 'Twitter', '2018-06-16 13:10:08', '2018-06-16 13:10:08'),
	(6, 'Otros', '2018-06-16 13:10:08', '2018-06-16 13:10:08');
/*!40000 ALTER TABLE `publicidads` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.teachers
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_teacher` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `materia` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aula` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `horario` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.teachers: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` (`id`, `nombre_teacher`, `materia`, `aula`, `horario`, `created_at`, `updated_at`) VALUES
	(1, 'Ron Damon', 'Matematica', 'A5', 'Lunes - Martes - Jueves', '2018-06-16 13:11:50', '2018-06-16 13:11:50');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.tipodecursos
DROP TABLE IF EXISTS `tipodecursos`;
CREATE TABLE IF NOT EXISTS `tipodecursos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.tipodecursos: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `tipodecursos` DISABLE KEYS */;
INSERT INTO `tipodecursos` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
	(1, 'Auxiliar de Despacho Aduanero (curso)', '2018-06-16 13:10:08', '2018-06-16 13:10:08'),
	(2, 'Sectorista Aduanero (curso)', '2018-06-16 13:10:08', '2018-06-16 13:10:08'),
	(3, 'Liquidador Aduanero (curso)', '2018-06-16 13:10:08', '2018-06-16 13:10:08'),
	(4, 'Gestor Aduanero(carrera)', '2018-06-16 13:10:08', '2018-06-16 13:10:08'),
	(5, 'Diplomado de Com. Intern. y Aduana', '2018-06-16 13:10:08', '2018-06-16 13:10:08'),
	(6, 'Otros', '2018-06-16 13:10:08', '2018-06-16 13:10:08');
/*!40000 ALTER TABLE `tipodecursos` ENABLE KEYS */;

-- Volcando estructura para tabla nuevol.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla nuevol.users: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Miguel Rodriguez', 'admin@admin.com', '$2y$10$mQAPJ5lnno3P7/VQjw/OLeUflC5PX8os8kZSB8Gi7RGvOGg/UlTgC', 'FlESoxtuexwcG6EPhZgA7HKDgUuJ7e1TfZ78oeCcPh136LhwB2jLNemcfSTu', '2018-06-16 13:10:07', '2018-06-16 13:10:07');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
