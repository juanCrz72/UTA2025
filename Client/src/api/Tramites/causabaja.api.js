import axios from 'axios'; //Act. 

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los trámites de alumnos
export const getCausasBaja = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/causabaja`);
    return response.data.data; // Retorna los datos de los trámites de alumnos
  } catch (error) {
    console.error("Error al obtener las causas de baja de alumnos:", error);
    throw new Error('Error al obtener las causas de baja de alumnos');
  }
};