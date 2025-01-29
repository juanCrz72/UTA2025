import { db } from "../../db/connection.js";

// Obtener todos los Administrativos con datos de la tabla persona
export const getAdministrativotodos = async (req, res) => {
  try {
    const query = `
      SELECT 
        a.*, 
        p.nombre, 
        p.apellido_paterno, 
        p.apellido_materno,
        d.Nombre AS NombreDepartamento, 
        pu.Nombre AS NombrePuesto
      FROM administrativo a
      JOIN departamento d ON a.id_departamento = d.id_departamento
      JOIN puesto pu ON a.id_puesto = pu.id_puesto
      JOIN persona p ON a.id_administrativo = p.id_persona
    `;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Administrativos obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron administrativos" });
    }
  } catch (error) {
    console.error("Error al obtener los administrativos:", error);
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// Crear un Administrativo
export const createAdministrativo = async (req, res) => {
  try {
    const { id_departamento, id_puesto, clave, horario, nss, rfc } = req.body;
    if (!id_departamento || !id_puesto || !clave || !horario || !nss || !rfc) {
      return res.status(400).json({ message: "Todos los campos son requeridos: id_departamento, id_puesto, clave, horario, nss, rfc" });
    }
    const [exists] = await db.query("SELECT 1 FROM administrativo WHERE rfc = ?", [rfc]);
    if (exists.length) {
      return res.status(400).json({ message: "El RFC del administrativo ya existe" });
    }
    const [result] = await db.query(
      "INSERT INTO administrativo (id_departamento, id_puesto, clave, horario, nss, rfc) VALUES (?, ?, ?, ?, ?, ?)",
      [id_departamento, id_puesto, clave, horario, nss, rfc]
    );
    res.status(201).json({
      message: `'${rfc}' creado`,
      id_administrativo: result.insertId,
      id_departamento, id_puesto, clave, horario, nss, rfc
    });
  } catch (error) {
    console.error("Error al crear administrativo:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// Actualizar un Administrativo
export const updateAdministrativo = async (req, res) => {
  try {
    const { id_administrativo } = req.params;
    const { id_departamento, id_puesto, clave, horario, nss, rfc } = req.body;
    // Verificar si el administrativo existe
    const [exists] = await db.query("SELECT 1 FROM administrativo WHERE id_administrativo = ?", [id_administrativo]);
    if (!exists.length) {
      return res.status(404).json({ message: "El administrativo no existe" });
    }
    // Realizar la actualización del administrativo
    const [result] = await db.query(
      "UPDATE administrativo SET id_departamento = ?, id_puesto = ?, clave = ?, horario = ?, nss = ?, rfc = ? WHERE id_administrativo = ?",
      [id_departamento, id_puesto, clave, horario, nss, rfc, id_administrativo]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el administrativo" });
    }
    res.status(200).json({
      message: `'${rfc}' actualizado correctamente`,
      id_administrativo, id_departamento, id_puesto, clave, horario, nss, rfc
    });
  } catch (error) {
    console.error("Error al actualizar administrativo:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// Eliminar un Administrativo
export const deleteAdministrativo = async (req, res) => {
  try {
    const { id_administrativo } = req.params;
    const [administrativo] = await db.query("SELECT clave FROM administrativo WHERE id_administrativo = ?", [id_administrativo]);
    if (!administrativo.length) return res.status(404).json({ message: "Administrativo no encontrado" });
    const [rows] = await db.query("DELETE FROM administrativo WHERE id_administrativo = ?", [id_administrativo]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${administrativo[0].clave}' eliminado correctamente` })
      : res.status(404).json({ message: "Administrativo no encontrado" });
  } catch (error) {
    console.error("Error al eliminar administrativo:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
