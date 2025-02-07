import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los grupos
export const getGrupos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/grupo`);
    console.log("🔍 Respuesta completa de la API:", response);

    // Verifica qué datos estás recibiendo antes de retornarlos
    if (!response.data || typeof response.data !== "object") {
      console.error("⚠️ La API no devolvió datos válidos:", response.data);
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener los grupos:", error);
    return [];
  }
};


// Crear un nuevo grupo
export const createGrupo = async (idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, fecha) => {
  try {
    await axios.post(`${BASE_URL}/grupo/create`, { 
      idPeriodo,idProgramaAcademico,idTutor,nombre,cuatrimestre,observacion,estatus,fecha
    });
  } catch (error) {
    console.error("Error al registrar el grupo:", error);
    throw new Error('Error al registrar el grupo');
  }
};

// Actualizar un grupo existente
export const updateGrupo = async (idGrupo, idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, fecha) => {
  try {
    await axios.put(`${BASE_URL}/grupo/update/${idGrupo}`, { 
      idPeriodo,idProgramaAcademico,idTutor,nombre,cuatrimestre,observacion,estatus,fecha
    });
  } catch (error) {
    console.error("Error al actualizar el grupo:", error);
    throw new Error('Error al actualizar el grupo');
  }
};

// Eliminar un grupo
export const deleteGrupo = async (idGrupo) => {
  try {
    await axios.delete(`${BASE_URL}/grupo/delete/${idGrupo}`);
  } catch (error) {
    console.error("Error al eliminar el grupo:", error);
    throw new Error('Error al eliminar el grupo');
  }
};




