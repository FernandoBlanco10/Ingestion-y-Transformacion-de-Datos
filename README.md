# 📊 Data Ingestion & Analytics Pipeline (Data Engineering Project)

**Autor:** Fernando Blanco

Una colección completa de APIs REST para gestionar colecciones de canciones, implementadas en diferentes tecnologías y niveles de complejidad.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.0-orange.svg)](https://flask.palletsprojects.com)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-black.svg)](https://expressjs.com)

## 📌 Descripción general

Este proyecto implementa un **pipeline básico de ingeniería de datos** que permite:

- Ingestar datos mediante una **API REST en Node.js**
- Limpiar y normalizar los datos usando **Python**
- Persistir los datos estructurados en **PostgreSQL**
- Analizar la información mediante **Jupyter Notebooks**

El enfoque principal es simular un **flujo real de datos** desde la ingestión hasta el análisis, aplicando buenas prácticas comunes en proyectos de Data Engineering.

---

## 🧱 Arquitectura del proyecto
```bash
data-ingestion-project/
│
├── api-node/ # API REST para ingestión de datos
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── app.js
│
├── service/ # Limpieza y normalización de datos
│ └── app.py
│
├── database/
│ └── schema.sql # Script SQL para crear la base de datos
│
├── notebooks/
│ └── ventas_analysis.ipynb # Análisis de datos con Jupyter
│
└── README.md
```
---

## 🔄 Flujo de datos

1. **Ingesta**
   - Los datos se envían mediante un endpoint REST (`/ingest`) usando Postman.
   - La API está construida con **Node.js + Express**.

2. **Validación**
   - Se valida la estructura básica del payload antes de procesarlo.
   - Se evita insertar datos incompletos o mal formados.

3. **Limpieza y normalización**
   - Los datos crudos son enviados a un servicio en **Python**.
   - Se aplican reglas de limpieza:
     - Eliminación de valores nulos
     - Normalización de texto
     - Conversión de tipos
   - Este paso simula un **data processing layer** independiente.

4. **Persistencia**
   - Los datos limpios se almacenan en **PostgreSQL**.
   - El modelo está **normalizado** (clientes, productos, ventas).
   - Se usan claves primarias y foráneas.

5. **Análisis**
   - Se consulta PostgreSQL desde **Jupyter Notebook** usando `pandas` y `SQLAlchemy`.
   - Se realizan JOINs y análisis exploratorio (EDA).
   - No se modifica la base de datos desde el notebook.

---

## 🗄️ Base de datos

La base de datos se crea a partir de un archivo SQL versionado en el repositorio:

```bash
psql -U postgres -f database/schema.sql
```
**Decisiones de diseño**

- Uso de SERIAL para claves primarias.
- Separación de entidades para evitar duplicidad.
- La base actúa como fuente de verdad (source of truth).

📓 **Análisis de datos**

- El análisis se realiza en Jupyter:
- Conexión directa a PostgreSQL
 - Lectura de datos con SQL
- Transformaciones ligeras con pandas
- Visualización básica
- Esto simula un entorno donde:
- La base es OLTP
- Jupyter se usa solo para análisis (OLAP)

🧠 **Decisiones técnicas relevantes**

Separación de responsabilidades

- API → ingestión

- Python → limpieza

- PostgreSQL → persistencia

- Jupyter → análisis
---
- No se limpian datos en la API
- La limpieza se delega a un servicio especializado.
- Esto facilita escalabilidad y mantenimiento.
- Normalización de datos.
- Permite análisis correctos y JOINs eficientes.
- Uso de scripts SQL versionados
- Reproducibilidad del entorno.

## ▶️ Cómo ejecutar y probar el proyecto

Este proyecto está diseñado para ejecutarse **localmente** y consta de **tres componentes principales**:

1. Base de datos en PostgreSQL
2. API de ingestión en Node.js
3. API de limpieza de datos en Python

Cada componente debe levantarse manualmente.

---

## 🧩 Requisitos previos

Asegúrate de tener instalado:

- Git
- Node.js (v18 o superior recomendado)
- Python (3.9 o superior)
- PostgreSQL
- Postman (para pruebas)

---

 📥 **1. Clonar el repositorio**

```bash
git clone https://github.com/FernandoBlanco10/Ingestion-y-Transformacion-de-Datos.git
cd data-ingestion-project
```
🗄️ **2. Crear la base de datos**

Desde la terminal de PostgreSQL (psql):

```bash
psql -U postgres -f database/schema.sql
```
Esto creará:

- La base de datos
- Las tablas normalizadas necesarias para el proyecto

Verificación
```sql
\c data_ingestion_db
\dt
```

**🧼 3. Levantar la API de limpieza (Python)**

Este servicio se encarga de limpiar y normalizar los datos antes de insertarlos en la base de datos.

3.1 Instalar dependencias
Desde la carpeta service-python/:

```bash
cd service-python
pip install -r requirements.txt
```

3.2 Levantar la API de Python
```bash
python app.py
```
La API quedará escuchando en un puerto local (por ejemplo):

```arduino
http://localhost:5002
```

⚠️ Este servicio debe permanecer activo mientras se use la API de ingestión.

Verificación
En el navegador o Postman:

```bash
GET http://localhost:5000/health
```
Respuesta esperada:

```json
{ "status": "ok" }
```

**🚀 4. Levantar la API de ingestión (Node.js)**
Esta API recibe los datos crudos y los envía a la API de Python para su limpieza.

4.1 Instalar dependencias
Desde api-node/:

```bash
cd api-node
npm install
```
4.2 Levantar la API
```bash
npm start
```
La API quedará escuchando en:

```arduino
http://localhost:3000
```
**📤 5. Probar la ingesta de datos (Postman)**

Endpoint
```bash
POST http://localhost:3000/ingest
```
Body (JSON)
```json
{
  "cliente": "Juan Perez",
  "email": "juan@mail.com",
  "producto": "Laptop",
  "categoria": "Tecnologia",
  "cantidad": 2,
  "precio_unitario": 15000
}
```
Flujo interno

* Node.js recibe el payload
* Node envía los datos a la API de Python
* Python limpia y normaliza
* Node inserta los datos en PostgreSQL

🧪 6. Verificar datos en PostgreSQL
Desde psql:

```sql
SELECT * FROM clientes;
SELECT * FROM productos;
SELECT * FROM ventas;
```
Los registros deben aparecer normalizados y sin duplicados.

**📊 7. Análisis de datos en Jupyter**

Desde la carpeta notebooks/:

```bash
jupyter notebook
```
Abrir:
```bash
ventas_analysis.ipynb
```
El notebook:

* Se conecta a PostgreSQL
* Realiza JOINs
* Ejecuta análisis exploratorio
* No modifica datos

⚠️ Orden correcto de ejecución

* PostgreSQL activo
* API de Python (limpieza)
* API de Node.js (ingestión)
* Postman / Jupyter

Si la API de Python y Node no está levantada, la ingestión fallará.

**🧠 Notas importantes**
* Cada servicio corre de forma independiente
* La comunicación entre Node y Python simula un entorno de microservicios
* Todo el flujo es síncrono y local

