import pool from '../db/postgres.js';

export async function insertVenta(data) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // CLIENTE
        let result = await client.query(
            'SELECT id_cliente FROM clientes WHERE email = $1',
            [data.email]
        );

        let id_cliente;
        if (result.rows.length === 0) {
            result = await client.query(
                'INSERT INTO clientes (nombre, email) VALUES ($1, $2) RETURNING id_cliente',
                [data.cliente, data.email]
            );
        }
        id_cliente = result.rows[0].id_cliente;

        // PRODUCTO
        result = await client.query(
            'SELECT id_producto FROM productos WHERE nombre = $1 AND categoria = $2',
            [data.producto, data.categoria]
        );

        let id_producto;
        if (result.rows.length === 0) {
            result = await client.query(
                'INSERT INTO productos (nombre, categoria) VALUES ($1, $2) RETURNING id_producto',
                [data.producto, data.categoria]
            );
        }
        id_producto = result.rows[0].id_producto;

        // VENTA
        await client.query(
            `INSERT INTO ventas (id_cliente, id_producto, fecha, cantidad, precio_unitario, total)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
                id_cliente,
                id_producto,
                data.fecha,
                data.cantidad,
                data.precio_unitario,
                data.total
            ]
        );

        await client.query('COMMIT');

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}