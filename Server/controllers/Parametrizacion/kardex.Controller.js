import { db } from "../../db/connection.js";

export const getKardex = async (req, res) => {
  try {
    const query = `SELECT k.*, 
      u.usuario,   
      ap.matricula, 
      pe.periodo, 
      pa.nombreOficial, 
      g.nombre AS grupo, 
      mp.materia AS mapa, 
      mp.clave, 
      mp.cuatrimestre, 
      p.nombre, 
      p.paterno AS paterno, 
      p.materno AS materno,
      (SELECT mu.idMateriaUnidad 
       FROM materiaunidad AS mu 
       WHERE mu.idMapaCurricular = mp.idMapaCurricular 
       LIMIT 1) AS idMateriaUnidad,
      (SELECT mu.unidad 
       FROM materiaunidad AS mu 
       WHERE mu.idMapaCurricular = mp.idMapaCurricular 
       LIMIT 1) AS unidad,
      (SELECT 
        CASE 
          WHEN COUNT(e.idEvaluacion) = SUM(CASE WHEN e.calificacion IS NOT NULL THEN 1 ELSE 0 END) 
          THEN ROUND(AVG(e.calificacion),1) 
          ELSE 0 
        END 
       FROM evaluacion AS e 
       WHERE e.idKadex = k.idKardex) AS calificacionFinal
    FROM kardex AS k
    INNER JOIN alumnopa AS ap ON ap.idAlumnoPA = k.idAlumnoPA
    INNER JOIN alumno AS a ON a.idAlumno = ap.idAlumno
    INNER JOIN persona AS p ON p.idPersona = a.idAlumno
    LEFT JOIN usuario AS u ON u.idPersona = p.idPersona
    INNER JOIN mapacurricular AS mp ON mp.idMapaCurricular = k.idMapaCurricular
    INNER JOIN grupo AS g ON g.idGrupo = k.idGrupo
    INNER JOIN periodo AS pe ON pe.idPeriodo = k.idPeriodo
    INNER JOIN programaacademico AS pa ON pa.idProgramaAcademico = ap.idProgramaAcademico
    WHERE ap.estatus NOT IN ('Baja Temporal', 'Baja Definitiva')
    ORDER BY mp.cuatrimestre ASC;`;

    const [rows] = await db.query(query);
    
    if (rows.length > 0) {
      for (const row of rows) {
        // Si la calificación final no existe, se pone en 0
        const final = row.calificacionFinal !== null ? row.calificacionFinal : 0;

        const updateQuery = `
          UPDATE kardex 
          SET calificacionFinal = ? 
          WHERE idKardex = ?;
        `;
        await db.query(updateQuery, [final, row.idKardex]);
      }

      res.json({ message: "Kardex obtenido y validado correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron datos" });
    }
  } catch (error) {
    console.error("Error al obtener y validar los kardex:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};


/* export const createKardex = async (req, res) => {
  const { idAlumnoPA, idGrupo, tipo, estatus } = req.body; // 👈 Recibimos solo estos campos
  let connection;

  try {
    // 1. Obtener una conexión a la base de datos
    connection = await db.getConnection(); // 👈 Usas db.getConnection()
    await connection.beginTransaction(); // 👈 Iniciar transacción

    // 2. Obtener el idPeriodo desde la tabla grupo
    const [grupoRows] = await connection.query(
      "SELECT idPeriodo FROM grupo WHERE idGrupo = ?",
      [idGrupo]
    );

    if (grupoRows.length === 0) {
      throw new Error("Grupo no encontrado");
    }

    const idPeriodo = grupoRows[0].idPeriodo; // 👈 idPeriodo obtenido

    // 3. Insertar en la tabla alumnoperiodo
    await connection.query(
      "INSERT INTO alumnoperiodo (idAlumnoPA, idPeriodo, Observacion) VALUES (?, ?, ?)",
      [idAlumnoPA, idPeriodo, "Dato ingresado automáticamente"] // 👈 Observación opcional
    );

    // 4. Obtener todos los idMapaCurricular asociados al idGrupo
    const [grupoMateriaRows] = await connection.query(
      "SELECT idMapaCurricular FROM grupomateria WHERE idGrupo = ?",
      [idGrupo]
    );

    if (grupoMateriaRows.length === 0) {
      throw new Error("No se encontraron materias para el grupo seleccionado");
    }

    // 5. Insertar en kardex por cada idMapaCurricular y obtener el idKardex
    for (const materia of grupoMateriaRows) {
      const { idMapaCurricular } = materia;

      // Insertar en kardex
      const [kardexResult] = await connection.query(
        "INSERT INTO kardex (idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, null, tipo, estatus] // 👈 calificacionFinal es null por defecto
      );

      const idKardex = kardexResult.insertId; // 👈 idKardex generado

      // 6. Obtener las unidades de la materia (materiaunidad)
      const [materiaUnidadRows] = await connection.query(
        "SELECT idMateriaUnidad, nombre FROM materiaunidad WHERE idMapaCurricular = ?",
        [idMapaCurricular]
      );

      if (materiaUnidadRows.length === 0) {
        console.warn(`No se encontraron unidades para la materia con idMapaCurricular: ${idMapaCurricular}`);
        continue; // 👈 Continuar con la siguiente materia si no hay unidades
      }

      // 7. Insertar en evaluacion por cada unidad de la materia
      for (const unidad of materiaUnidadRows) {
        const { idMateriaUnidad, nombre } = unidad;

        await connection.query(
          "INSERT INTO evaluacion (idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [idKardex, idMapaCurricular, idMateriaUnidad, null, null, nombre, "Abierto"] // 👈 calificacion y faltas son null por defecto
        );
      }
    }

    // 8. Confirmar la transacción
    await connection.commit();
    res.status(201).json({ message: "Kardex, alumnoperiodo y evaluaciones creados correctamente" });
  } catch (error) {
    // 9. Revertir la transacción en caso de error
    if (connection) {
      await connection.rollback();
    }
    console.error("Error al crear kardex, alumnoperiodo y evaluaciones:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  } finally {
    // 10. Liberar la conexión
    if (connection) {
      connection.release();
    }
  }
};
  */

/* export const createKardex = async (req, res) => {
  const { idAlumnoPA, idGrupo, tipo, estatus } = req.body;
  let connection;

  try {
    // 1. Obtener una conexión a la base de datos
    connection = await db.getConnection();
    await connection.beginTransaction();

    // 2. Validación previa: Verificar si el alumno tiene kardex previos
    const [kardexPrevios] = await connection.query(
      `SELECT k.idKardex, k.calificacionFinal 
       FROM kardex k
       JOIN alumnoperiodo ap ON k.idAlumnoPA = ap.idAlumnoPA
       WHERE k.idAlumnoPA = ?`,
      [idAlumnoPA]
    );

    if (kardexPrevios.length > 0) {
      // Verificar si hay materias con calificación menor a 7 o sin calificar
      const [materiasNoAprobadas] = await connection.query(
        `SELECT COUNT(*) as count 
         FROM kardex 
         WHERE idAlumnoPA = ? 
         AND (calificacionFinal IS NULL OR calificacionFinal < 7)`,
        [idAlumnoPA]
      );

      if (materiasNoAprobadas[0].count > 0) {
        throw new Error("El alumno tiene materias sin aprobar (calificación menor a 7 o sin calificar). No se puede crear nuevo kardex.");
      }
    }

    // 3. Obtener el idPeriodo desde la tabla grupo
    const [grupoRows] = await connection.query(
      "SELECT idPeriodo FROM grupo WHERE idGrupo = ?",
      [idGrupo]
    );

    if (grupoRows.length === 0) {
      throw new Error("Grupo no encontrado");
    }

    const idPeriodo = grupoRows[0].idPeriodo;

    // 4. Insertar en la tabla alumnoperiodo
    await connection.query(
      "INSERT INTO alumnoperiodo (idAlumnoPA, idPeriodo, Observacion) VALUES (?, ?, ?)",
      [idAlumnoPA, idPeriodo, "Dato ingresado automáticamente"]
    );

    // 5. Obtener todos los idMapaCurricular asociados al idGrupo
    const [grupoMateriaRows] = await connection.query(
      "SELECT idMapaCurricular FROM grupomateria WHERE idGrupo = ?",
      [idGrupo]
    );

    if (grupoMateriaRows.length === 0) {
      throw new Error("No se encontraron materias para el grupo seleccionado");
    }

    // 6. Insertar en kardex por cada idMapaCurricular y obtener el idKardex
    for (const materia of grupoMateriaRows) {
      const { idMapaCurricular } = materia;

      // Insertar en kardex
      const [kardexResult] = await connection.query(
        "INSERT INTO kardex (idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, null, tipo, estatus]
      );

      const idKardex = kardexResult.insertId;

      // 7. Obtener las unidades de la materia (materiaunidad)
      const [materiaUnidadRows] = await connection.query(
        "SELECT idMateriaUnidad, nombre FROM materiaunidad WHERE idMapaCurricular = ?",
        [idMapaCurricular]
      );

      if (materiaUnidadRows.length === 0) {
        console.warn(`No se encontraron unidades para la materia con idMapaCurricular: ${idMapaCurricular}`);
        continue;
      }

      // 8. Insertar en evaluacion por cada unidad de la materia
      for (const unidad of materiaUnidadRows) {
        const { idMateriaUnidad, nombre } = unidad;

        await connection.query(
          "INSERT INTO evaluacion (idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [idKardex, idMapaCurricular, idMateriaUnidad, null, null, nombre, "Abierto"]
        );
      }
    }

    // 9. Confirmar la transacción
    await connection.commit();
    res.status(201).json({ message: "Kardex, alumnoperiodo y evaluaciones creados correctamente" });
  } catch (error) {
    // 10. Revertir la transacción en caso de error
    if (connection) {
      await connection.rollback();
    }
    console.error("Error al crear kardex, alumnoperiodo y evaluaciones:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  } finally {
    // 11. Liberar la conexión
    if (connection) {
      connection.release();
    }
  }
}; */

export const createKardex = async (req, res) => {
  const { idAlumnoPA, idGrupo, tipo, estatus } = req.body;
  let connection;

  try {
    // 1. Obtener una conexión a la base de datos
    connection = await db.getConnection();
    await connection.beginTransaction();

    // 2. Validación previa: Verificar si el alumno tiene kardex previos
    const [kardexPrevios] = await connection.query(
      `SELECT k.idKardex, k.calificacionFinal, k.idMapaCurricular 
       FROM kardex k
       JOIN alumnoperiodo ap ON k.idAlumnoPA = ap.idAlumnoPA
       WHERE k.idAlumnoPA = ?`,
      [idAlumnoPA]
    );

    if (kardexPrevios.length > 0) {
      // Primero, agrupar por idMapaCurricular y tomar la calificación más alta
      const materiasAgrupadas = kardexPrevios.reduce((acc, curr) => {
        if (!acc[curr.idMapaCurricular] || 
            (curr.calificacionFinal !== null && 
             (acc[curr.idMapaCurricular].calificacionFinal === null || 
              curr.calificacionFinal > acc[curr.idMapaCurricular].calificacionFinal))) {
          acc[curr.idMapaCurricular] = curr;
        }
        return acc;
      }, {});

      // Convertir el objeto a array
      const materiasUnicas = Object.values(materiasAgrupadas);

      // Verificar si hay materias con calificación menor a 7 o sin calificar
      const materiasNoAprobadas = materiasUnicas.filter(
        materia => materia.calificacionFinal === null || materia.calificacionFinal < 7
      );

      if (materiasNoAprobadas.length > 0) {
        throw new Error("El alumno tiene materias sin aprobar (calificación menor a 7 o sin calificar). No se puede crear nuevo kardex.");
      }
    }

    // 3. Obtener el idPeriodo desde la tabla grupo
    const [grupoRows] = await connection.query(
      "SELECT idPeriodo FROM grupo WHERE idGrupo = ?",
      [idGrupo]
    );

    if (grupoRows.length === 0) {
      throw new Error("Grupo no encontrado");
    }

    const idPeriodo = grupoRows[0].idPeriodo;

    // 4. Insertar en la tabla alumnoperiodo
    await connection.query(
      "INSERT INTO alumnoperiodo (idAlumnoPA, idPeriodo, Observacion) VALUES (?, ?, ?)",
      [idAlumnoPA, idPeriodo, "Dato ingresado automáticamente"]
    );

    // 5. Obtener todos los idMapaCurricular asociados al idGrupo
    const [grupoMateriaRows] = await connection.query(
      "SELECT idMapaCurricular FROM grupomateria WHERE idGrupo = ?",
      [idGrupo]
    );

    if (grupoMateriaRows.length === 0) {
      throw new Error("No se encontraron materias para el grupo seleccionado");
    }

    // 6. Insertar en kardex por cada idMapaCurricular y obtener el idKardex
    for (const materia of grupoMateriaRows) {
      const { idMapaCurricular } = materia;

      // Insertar en kardex
      const [kardexResult] = await connection.query(
        "INSERT INTO kardex (idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, null, tipo, estatus]
      );

      const idKardex = kardexResult.insertId;

      // 7. Obtener las unidades de la materia (materiaunidad)
      const [materiaUnidadRows] = await connection.query(
        "SELECT idMateriaUnidad, nombre FROM materiaunidad WHERE idMapaCurricular = ?",
        [idMapaCurricular]
      );

      if (materiaUnidadRows.length === 0) {
        console.warn(`No se encontraron unidades para la materia con idMapaCurricular: ${idMapaCurricular}`);
        continue;
      }

      // 8. Insertar en evaluacion por cada unidad de la materia
      for (const unidad of materiaUnidadRows) {
        const { idMateriaUnidad, nombre } = unidad;

        await connection.query(
          "INSERT INTO evaluacion (idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [idKardex, idMapaCurricular, idMateriaUnidad, null, null, nombre, "Abierto"]
        );
      }
    }

    // 9. Confirmar la transacción
    await connection.commit();
    res.status(201).json({ message: "Kardex, alumnoperiodo y evaluaciones creados correctamente" });
  } catch (error) {
    // 10. Revertir la transacción en caso de error
    if (connection) {
      await connection.rollback();
    }
    console.error("Error al crear kardex, alumnoperiodo y evaluaciones:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  } finally {
    // 11. Liberar la conexión
    if (connection) {
      connection.release();
    }
  }
}; 

/* export const createKardexMasivo = async (req, res) => {
  const { alumnos, idGrupo, tipo, estatus } = req.body;
  let connection;

  // Validación básica
  if (!alumnos || !Array.isArray(alumnos) || alumnos.length === 0) {
    return res.status(400).json({ message: "Debe proporcionar un array de alumnos" });
  }

  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    // 1. Obtener información del grupo y periodo
    const [grupoRows] = await connection.query(
      "SELECT idPeriodo FROM grupo WHERE idGrupo = ?",
      [idGrupo]
    );

    if (grupoRows.length === 0) {
      throw new Error("Grupo no encontrado");
    }
    const idPeriodo = grupoRows[0].idPeriodo;

    // 2. Obtener materias del grupo (una sola consulta para todos los alumnos)
    const [materiasRows] = await connection.query(
      `SELECT gm.idMapaCurricular, mu.idMateriaUnidad, mu.nombre 
       FROM grupomateria gm
       JOIN materiaunidad mu ON gm.idMapaCurricular = mu.idMapaCurricular
       WHERE gm.idGrupo = ?`,
      [idGrupo]
    );

    if (materiasRows.length === 0) {
      throw new Error("No se encontraron materias para el grupo seleccionado");
    }

    // Organizar materias por mapa curricular para fácil acceso
    const materiasPorCurricular = materiasRows.reduce((acc, materia) => {
      if (!acc[materia.idMapaCurricular]) {
        acc[materia.idMapaCurricular] = [];
      }
      acc[materia.idMapaCurricular].push({
        idMateriaUnidad: materia.idMateriaUnidad,
        nombre: materia.nombre
      });
      return acc;
    }, {});

    // 3. Procesar cada alumno
    for (const idAlumnoPA of alumnos) {
      // Insertar en alumnoperiodo
      await connection.query(
        "INSERT INTO alumnoperiodo (idAlumnoPA, idPeriodo, Observacion) VALUES (?, ?, ?)",
        [idAlumnoPA, idPeriodo, "Inscripción masiva"]
      );

      // Insertar kardex y evaluaciones para cada materia
      for (const [idMapaCurricular, unidades] of Object.entries(materiasPorCurricular)) {
        // Insertar kardex
        const [kardexResult] = await connection.query(
          `INSERT INTO kardex 
           (idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, null, tipo, estatus]
        );

        const idKardex = kardexResult.insertId;

        // Insertar evaluaciones para cada unidad
        const evaluacionesValues = unidades.map(unidad => [
          idKardex,
          idMapaCurricular,
          unidad.idMateriaUnidad,
          null, // calificacion
          null, // faltas
          unidad.nombre,
          "Abierto"
        ]);

        await connection.query(
          `INSERT INTO evaluacion 
           (idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus) 
           VALUES ?`,
          [evaluacionesValues]
        );
      }
    }

    await connection.commit();
    res.status(201).json({ 
      success: true,
      message: `Kardex creado para ${alumnos.length} alumnos`,
      totalAlumnos: alumnos.length,
      totalMaterias: Object.keys(materiasPorCurricular).length
    });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Error en createKardexMasivo:", {
      error: error.message,
      idGrupo,
      alumnos
    });
    
    res.status(500).json({ 
      success: false,
      message: "Error al procesar la inscripción masiva",
      error: process.env.NODE_ENV === 'development' ? error.message : "Detalles en consola"
    });
  } finally {
    if (connection) connection.release();
  }
}; */


export const updateKardex = async (req, res) => {
  try {
    const { idKardex } = req.params;
    const { idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus } = req.body;

    // Verificar si el kardex existe
    const [exists] = await db.query("SELECT estatus FROM kardex WHERE idKardex = ?", [idKardex]);
    if (!exists.length) {
      return res.status(404).json({ message: "El kardex no existe" });
    }

    // Obtener el estatus actual si no se envió en la petición
    const currentEstatus = exists[0].estatus;
    const newEstatus = estatus !== undefined ? estatus : currentEstatus;

    // Actualizar el registro sin modificar el estatus si no se envió
    const [result] = await db.query(
      `UPDATE kardex 
       SET idAlumnoPA = ?, idMapaCurricular = ?, idGrupo = ?, idPeriodo = ?, 
           calificacionFinal = ?, tipo = ?, estatus = ?
       WHERE idKardex = ?`,
      [idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, newEstatus, idKardex]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el kardex" });
    }

    res.status(200).json({
      message: "Kardex actualizado correctamente",
      idKardex, idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus: newEstatus
    });

  } catch (error) {
    console.error("Error al actualizar el kardex:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};


export const deleteKardex = async (req, res) => {
  try {
    const { idKardex } = req.params;
    const [kardex] = await db.query("SELECT idAlumnoPA FROM kardex WHERE idKardex = ?", [idKardex]);
    if (!kardex.length) return res.status(404).json({ message: "Kardex no encontrado" });
    const [rows] = await db.query("DELETE FROM kardex WHERE idKardex = ?", [idKardex]);
    rows.affectedRows
      ? res.status(200).json({ message: `Kardex con idKardex ${idKardex} eliminado correctamente` })
      : res.status(404).json({ message: "Kardex no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal" });
  }
};


export const updateTransaccionKardex = async (req, res) => {
  let connection;
  try {
    // Obtener una conexión explícita del pool
    connection = await db.getConnection();

    // Iniciar transacción
    await connection.beginTransaction();

    const { idKardex } = req.params;
    const { idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus } = req.body;

    // Verificar si el kardex existe
    const [exists] = await connection.query("SELECT 1 FROM kardex WHERE idKardex = ?", [idKardex]);
    if (!exists.length) {
      await connection.rollback(); // Revertir transacción
      connection.release(); // Liberar la conexión
      return res.status(404).json({ message: "El kardex no existe" });
    }

    // Actualizar el kardex
    const [result] = await connection.query(
      "UPDATE kardex SET idAlumnoPA = ?, idMapaCurricular = ?, idGrupo = ?, idPeriodo = ?, calificacionFinal = ?, tipo = ?, estatus = ? WHERE idKardex = ?",
      [idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus, idKardex]
    );

    if (result.affectedRows === 0) {
      await connection.rollback(); // Revertir transacción
      connection.release(); // Liberar la conexión
      return res.status(400).json({ message: "No se pudo actualizar el kardex" });
    }

    // Validar el tipo de dato en el estatus y actualizar en cascada
    if (typeof estatus === 'string') {
      // Actualizar todos los kardex con el mismo idAlumnoPA e idGrupo
      await connection.query(
        "UPDATE kardex SET estatus = ? WHERE idAlumnoPA = ? AND idGrupo = ?",
        [estatus, idAlumnoPA, idGrupo]
      );

      // Actualizar el estatus en la tabla alumnopa
      await connection.query(
        "UPDATE alumnopa SET estatus = ? WHERE idAlumnoPA = ?",
        [estatus, idAlumnoPA]
      );
    } else {
      await connection.rollback(); // Revertir transacción
      connection.release(); // Liberar la conexión
      return res.status(400).json({ message: "El estatus debe ser una cadena de texto" });
    }

    // Confirmar transacción
    await connection.commit();
    connection.release(); // Liberar la conexión

    res.status(200).json({
      message: "Kardex actualizado correctamente",
      idKardex, idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus
    });
  } catch (error) {
    // Revertir transacción en caso de error
    if (connection) {
      await connection.rollback();
      connection.release(); // Liberar la conexión
    }
    console.error("Error al actualizar el kardex:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};




// ---------------------------------- EXTRAORDINARIO ---------------------------------- //
// Obtener materias de un grupo (para el modal)
export const getMateriasByGrupo = async (req, res) => {
  const { idGrupo } = req.params;
  try {
    const [materias] = await db.query(`
      SELECT gm.idMapaCurricular, mp.materia AS nombreMateria, mp.clave, gm.tipo
      FROM grupomateria gm
      INNER JOIN mapacurricular mp ON gm.idMapaCurricular = mp.idMapaCurricular
      WHERE gm.idGrupo = ?
    `, [idGrupo]);

    res.json({ 
      success: true,
      data: materias 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error al obtener materias" 
    });
  }
};

// Crear kardex extraordinario
export const createKardexExtraordinario = async (req, res) => {
  const { idAlumnoPA, idGrupo, materiasSeleccionadas } = req.body;
  let connection;

  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    // Validar grupo y obtener periodo
    const [grupo] = await connection.query(
      "SELECT idPeriodo FROM grupo WHERE idGrupo = ?", 
      [idGrupo]
    );
    if (!grupo.length) throw new Error("Grupo no válido");

    // Obtener los tipos de materia para cada idMapaCurricular
    const [materiasInfo] = await connection.query(
      `SELECT idMapaCurricular, tipo FROM grupomateria 
       WHERE idGrupo = ? AND idMapaCurricular IN (?)`,
      [idGrupo, materiasSeleccionadas]
    );

    // Crear un mapa de idMapaCurricular a tipo
    const materiaTipoMap = {};
    materiasInfo.forEach(materia => {
      materiaTipoMap[materia.idMapaCurricular] = materia.tipo;
    });

    // Verificar que todas las materias seleccionadas tienen tipo
    const valoresInsert = materiasSeleccionadas.map(id => {
      if (!materiaTipoMap[id]) {
        throw new Error(`No se encontró el tipo para la materia con id ${id}`);
      }
      return [
        idAlumnoPA, 
        id, 
        idGrupo, 
        grupo[0].idPeriodo, 
        materiaTipoMap[id], 
        "Activo"
      ];
    });

    // Insertar kardex
    await connection.query(
      `INSERT INTO kardex 
       (idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, tipo, estatus) 
       VALUES ?`,
      [valoresInsert]
    );

    await connection.commit();
    res.json({ 
      success: true,
      message: `${materiasSeleccionadas.length} materia(s) registradas` 
    });
  } catch (error) {
    if (connection) await connection.rollback();
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  } finally {
    if (connection) connection.release();
  }
};