import express from 'express';
import axios from 'axios';
import { insertVenta } from './services/ventas.service.js';
import { validateInput } from './utils/validator.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/ingest', async (req, res) => {
    try {
        const rawData = req.body;

        // VALIDACIÓN DE INPUT
        const validationError = validateInput(rawData);
        if (validationError) {
            return res.status(400).json({
                status: 'error',
                message: validationError
            });
        }

        const response = await axios.post('http://localhost:5002/clean', rawData);

        const cleanedData = response.data;

        await insertVenta(cleanedData);

        return res.status(201).json({
            status: 'success',
            message: 'Venta insertada correctamente',
            data: cleanedData
        });

    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({
                status: 'error',
                message: error.response.data.error
            });
        }
        
        return res.status(500).json({
            status: 'error',
            message: "Error during data ingestion",
            detail: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`\n**** API server running on http://localhost:${PORT} ****\n`);
});