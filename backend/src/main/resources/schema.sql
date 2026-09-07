-- ===================================================
-- SCRIPT DE BASE DE DATOS PARA MYSQL WORKBENCH
-- Proyecto: TalentoActivo
-- Base de Datos: talento_activo
-- ===================================================

CREATE DATABASE IF NOT EXISTS talento_activo
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE talento_activo;

-- 1. Tabla de Usuarios (Sincronizada con Auth0)
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    auth0_sub VARCHAR(255) NOT NULL UNIQUE,
    nombre VARCHAR(150) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(30),
    foto_url VARCHAR(255),
    rol VARCHAR(50) DEFAULT 'CANDIDATO',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Vacantes de Empleo
CREATE TABLE IF NOT EXISTS vacantes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    empresa VARCHAR(150),
    ubicacion VARCHAR(150),
    tipo_jornada VARCHAR(50) DEFAULT 'REMOTO',
    salario_estimado DECIMAL(10, 2),
    nivel_experiencia VARCHAR(50) DEFAULT 'MID',
    activa BOOLEAN DEFAULT TRUE,
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Postulaciones (Candidato <-> Vacante)
CREATE TABLE IF NOT EXISTS postulaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    vacante_id BIGINT NOT NULL,
    carta_presentacion TEXT,
    estado VARCHAR(50) DEFAULT 'POSTULADO',
    fecha_postulacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (vacante_id) REFERENCES vacantes(id) ON DELETE CASCADE
);

-- ===================================================
-- DATOS DE PRUEBA (OPCIONAL)
-- ===================================================

INSERT INTO vacantes (titulo, descripcion, empresa, ubicacion, tipo_jornada, salario_estimado, nivel_experiencia, activa)
VALUES 
('Senior Full Stack Engineer (Spring Boot + React)', 'Buscamos un Ingeniero Full Stack con experiencia en Java 17+, Spring Security 6 y React.', 'TechActive Solutions', 'Remoto', 'REMOTO', 4500.00, 'SENIOR', TRUE),
('Backend Developer (Java & AWS)', 'Construcción de APIs RESTful usando Spring Data JPA y AWS.', 'Fintech Enterprise', 'Bogotá, Colombia', 'HIBRIDO', 3800.00, 'MID', TRUE),
('Cybersecurity & Identity Specialist', 'Especialista en integración OAuth2/OIDC con Auth0.', 'CyberGuard Global', 'Remoto', 'REMOTO', 5200.00, 'LEAD', TRUE);
