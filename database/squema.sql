-- ============================
-- CREAR BASE DE DATOS
-- ============================
CREATE DATABASE data_ingestion_db;


-- Conectarse a la base de datos creada
\c data_ingestion_db;

-- ============================
-- TABLA CLIENTES
-- ============================
CREATE TABLE IF NOT EXISTS clientes(
    id_cliente SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

-- ============================
-- TABLA PRODUCTOS
-- ============================
CREATE TABLE IF NOT EXISTS productos(
    id_producto SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    categoria TEXT
);

-- ============================
-- TABLA VENTAS 
-- ============================
CREATE TABLE IF NOT EXISTS ventas(
    id_venta SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES clientes(id_cliente),
    id_producto INT REFERENCES productos(id_producto),
    fecha DATE NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario NUMERIC(10,2) NOT NULL,
    total NUMERIC(12,2) NOT NULL
);
