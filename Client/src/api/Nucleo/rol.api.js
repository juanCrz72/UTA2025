import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los roles
export const getRol = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/rol`);
    return response.data.data; // Retorna los datos de los roles
  } catch (error) {
    console.error("Error al obtener los roles:", error);
    throw new Error('Error al obtener los roles');
  }
};

// Agregar un rol a un usuario
export const agregarRolUsuario = async (idUsuario, idRol) => {
  try {
    await axios.post(`${BASE_URL}/rol/create`, { idUsuario, idRol });
  } catch (error) {
    console.error("Error al agregar el rol al usuario:", error);
    throw new Error('Error al agregar el rol al usuario');
  }
};

// Eliminar un rol de un usuario
export const eliminarRolUsuario = async (idUsuario, idRol) => {
  try {
    await axios.post(`${BASE_URL}/rol/delete`, { idUsuario, idRol });
  } catch (error) {
    console.error("Error al eliminar el rol del usuario:", error);
    throw new Error('Error al eliminar el rol del usuario');
  }
};
