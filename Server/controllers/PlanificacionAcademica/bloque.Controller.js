import { db } from "../../db/connection.js";

export const getBloquetodos = async(req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM bloque");
        if (rows.length > 0) {
            res.json({ message: "Bloques obtenidos correctamente", data: rows });
        } else {
            res.status(404).json({ message: "No se encontraron bloques" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const createBloque = async (req, res) => {
    try {
        const {nombre, duracion, horaInicio, horaFin} = req.body;
        const desde = null; // Valor por defecto para Desde
        const hasta = null; // Valor por defecto para Hasta

        // Verificar si el nombre ya existe
        const [exists] = await db.query("SELECT 1 FROM bloque WHERE nombre = ?", [nombre]);
        if (exists.length) return res.status(400).json({ message: "El nombre ya existe" });

        // Insertar nuevo registro en la tabla bloque
        const [rows] = await db.query(
            "INSERT INTO bloque (nombre, duracion, horaInicio, horaFin, desde, hasta) VALUES (?, ?, ?, ?, ?, ?)", 
            [nombre, duracion, horaInicio, horaFin, desde, hasta]
        );

        res.status(201).json(
            { message: `'${nombre}' creado correctamente`, 
            idBloque: rows.insertId,
            nombre: nombre,
            duracion: duracion,
            horaInicio: horaInicio,
            horaFin: horaFin,
            desde: desde,
            hasta: hasta
        });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
};

// Controlador para actualizar un bloque existente
export const updateBloque = async (req, res) => {
    try {
        const { idBloque } = req.params;
        const { nombre, duracion, horaInicio, horaFin, desde = null, hasta = null } = req.body;

        // Verificar si el bloque existe
        const [exists] = await db.query("SELECT 1 FROM bloque WHERE idBloque = ?", [idBloque]);
        if (!exists.length) return res.status(404).json({ message: "El bloque no existe" });

        // Actualizar el bloque
        const [rows] = await db.query(
            "UPDATE bloque SET nombre = ?, duracion = ?, horaInicio = ?, horaFin = ?, desde = ?, hasta = ? WHERE idBloque = ?",
            [nombre, duracion, horaInicio, horaFin, desde, hasta, idBloque]
        );

        res.status(200).json({ message: `'${nombre}' actualizado correctamente`, 
            idBloque: idBloque,
            duracion: duracion,
            horaInicio: horaInicio,
            horaFin: horaFin,
            desde: desde,
            hasta: hasta
         });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
};

export const deleteBloque = async(req, res) => {
    try {
        const {idBloque } = req.params;
        const [bloque] = await db.query("SELECT nombre FROM bloque WHERE idBloque = ?", [idBloque]);
        if (!bloque.length) return res.status(404).json(
            { message: "Bloque no encontrado" });
        const [rows] = await db.query("DELETE FROM bloque WHERE idBloque = ?", [idBloque]);
        rows.affectedRows
        ? res.status(200).json({ 
            message: `'${bloque[0].nombre}' eliminado correctamente`
         })
        : res.status(404).json({ message: "bloque no encontrado" });  
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};