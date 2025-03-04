import { db } from "../../db/connection.js";

// Obtener todos los Administrativos con datos de la tabla persona
export const getAdministrativotodos = async (req, res) => {
  try {
    const query = `SELECT 
        a.*, 
        p.idPersona,
        p.nombre, 
        p.paterno, 
        p.materno,
        d.nombre AS nombreDepartamento, 
        pu.nombre AS nombrePuesto
      FROM administrativo a
      JOIN departamento d ON a.idDepartamento = d.idDepartamento
      JOIN puesto pu ON a.idPuesto = pu.idPuesto
      JOIN persona p ON a.idAdministrativo = p.idPersona
    `;
    const [rows] = await db.query(query);

    res.status(200).json({
      message: rows.length > 0 ? "Administrativos obtenidos correctamente" : "No se encontraron administrativos",
      data: rows
    });
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// Crear un Administrativo
export const createAdministrativo = async (req, res) => {
  try {
    const {idPersona, idDepartamento, idPuesto, clave, horario, nss, rfc, userSession } = req.body;
    if(!idPersona || !idDepartamento || !idPuesto || !clave || !horario || !nss || !rfc) {
      return res.status(400).json({ message: "Todos los campos son requeridos: idPersona, idDepartamento, idPuesto, clave, horario, nss, rfc" });
    }
    const [exists] = await db.query("SELECT 1 FROM administrativo WHERE rfc = ?", [rfc]);
    if (exists.length) {
      return res.status(400).json({ message: "El RFC del administrativo ya existe" });
    }
    const [result] = await db.query(
      "INSERT INTO administrativo (idAdministrativo, idDepartamento, idPuesto, clave, horario, nss, rfc) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [idPersona, idDepartamento, idPuesto, clave, horario, nss, rfc]
    );
    res.status(200).json({
      message: `'${rfc}' creado`,
      idAdministrativo: result.insertId,
      idPersona, idDepartamento, idPuesto, clave, horario, nss, rfc, userSession: userSession
    });
  } catch (error) {
    console.error("Error al crear administrativo:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// Actualizar un Administrativo
export const updateAdministrativo = async (req, res) => {
  try {
    const { idAdministrativo } = req.params;
    const { idDepartamento, idPuesto, clave, horario, nss, rfc, userSession } = req.body;
    const [exists] = await db.query("SELECT 1 FROM administrativo WHERE idAdministrativo = ?", [idAdministrativo]);
    if (!exists.length) {
      return res.status(404).json({ message: "El administrativo no existe" });
    }
    const [result] = await db.query(
      "UPDATE administrativo SET idDepartamento = ?, idPuesto = ?, clave = ?, horario = ?, nss = ?, rfc = ? WHERE idAdministrativo = ?",
      [idDepartamento, idPuesto, clave, horario, nss, rfc, idAdministrativo]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el administrativo" });
    }
    res.status(200).json({
      message: `'${rfc}' actualizado correctamente`,
      idAdministrativo, idDepartamento, idPuesto, clave, horario, nss, rfc, userSession: userSession
    });
  } catch (error) {
    console.error("Error al actualizar administrativo:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// Eliminar un Administrativo
export const deleteAdministrativo = async (req, res) => {
  try {
    const { idAdministrativo } = req.params;
    const { userSession } = req.body
    const [rows] = await db.query(
      "DELETE FROM administrativo WHERE idAdministrativo = ?",[idAdministrativo]
    );
    if (rows.affectedRows) {
      return res.status(200).json({ message: `Administrativo eliminado correctamente`, userSession: userSession });
    } else {
      return res.status(404).json({ message: "Administrativo no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar administrativo:", error);
    return res.status(500).json({ message: "Error al eliminar el administrativo", error: error.message });
  }
};
