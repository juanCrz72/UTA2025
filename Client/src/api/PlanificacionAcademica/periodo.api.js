import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todas los periodos
export const getPeriodos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/periodo`);
    return response.data.data; // Retorna los datos de los periodos
  } catch (error) {
    console.error("Error al obtener los periodos:", error.response?.data || error.message);
    throw new Error('Error al obtener los periodos');
  }
};

// Crear un nuevo periodo
export const createPeriodo = async (periodo, fechaInicio, fechaFin, estado, fechaRegistro) => {
  console.log("llegando a api", { periodo, fechaInicio, fechaFin, estado, fechaRegistro });
  try {
    await axios.post(`${BASE_URL}/periodo/create`, { periodo, fechaInicio, fechaFin, estado, fechaRegistro });
  } catch (error) {
    console.error("Error al registrar el periodo:", error.response?.data || error.message);
    throw new Error('Error al registrar el periodo');
  }
};

// Actualizar un periodo existente
export const updatePeriodo = async (idPeriodo, periodo, fechaInicio, fechaFin, estado) => {
  try {
    await axios.put(`${BASE_URL}/periodo/update/${idPeriodo}`, { periodo, fechaInicio, fechaFin, estado });
  } catch (error) {
    console.error("Error al actualizar el periodo:", error.response?.data || error.message);
    throw new Error('Error al actualizar el periodo');
  }
};

// Eliminar un periodo
export const deletePeriodo = async (idPeriodo) => {
  try {
    await axios.delete(`${BASE_URL}/periodo/delete/${idPeriodo}`);
  } catch (error) {
    console.error("Error al eliminar el periodo:", error.response?.data || error.message);
    throw new Error('Error al eliminar el periodo');
  }
};
