/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getPersonas } from "../../../api/Nucleo/persona.api.js";
import Select from 'react-select';

export const AlumnoModales = ({
  email, setemail,
  fecha, setfecha, 
  nss, setnss, 
  idPersona, setidPersona,
  showModal, setShowModal, 
  showEditModal, setShowEditModal, 
  showDeleteModal, setShowDeleteModal, 
  handleAdd, handleUpdate, handleDelete, 
  selectedAlumno 
}) => {

  const [personaList, setPersonaList] = useState([]); 
  
  useEffect(() => {
    getPersonas().then((data) => setPersonaList(data)).catch((error) => console.error("Error al obtener las personas:", error));
  }, []);
  const [filteredOptions, setFilteredOptions] = useState([]); 

  useEffect(() => {
    getPersonas()
      .then((data) => {
        setPersonaList(data);
        setFilteredOptions(data.slice(-5)); // Mostrar solo los últimos 5 registros inicialmente
      })
      .catch((error) => console.error("Error al obtener las personas:", error));
  }, []);

    // Función para manejar la búsqueda
    const handleSearch = (inputValue) => {
      if (!inputValue) {
        setFilteredOptions(personaList.slice(-5)); // Si no hay búsqueda, mostrar solo los últimos 5
      } else {
        setFilteredOptions(personaList.filter(persona =>
          `${persona.nombre} ${persona.paterno} ${persona.materno}`.toLowerCase().includes(inputValue.toLowerCase())
        ));
      }
    };

   // Convertimos personaList en el formato requerido por react-select
   const options = filteredOptions.map(persona => ({
    value: persona.idPersona,
    label: `${persona.nombre} ${persona.paterno} ${persona.materno}`
  }));

  return (
    <>
      {/* Modal para registrar alumno */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Alumno</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Persona:</span>
                <Select 
                options={options} 
                value={options.find(option => option.value === idPersona)}
                onChange={(selectedOption) => setidPersona(selectedOption ? selectedOption.value : '')}
                onInputChange={handleSearch} // Filtra en tiempo real
                isClearable 
                placeholder="Selecciona una persona"/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Email:</span>
                <input type="email" className="form-control" value={email}
                  onChange={(event) => setemail(event.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Fecha de Registro:</span>
                <input type="date" className="form-control" value={fecha}
                  onChange={(event) => setfecha(event.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">NSS:</span>
                <input type="text" className="form-control" value={nss}
                  onChange={(event) => setnss(event.target.value)}/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar alumno */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar Alumno</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
            <div className="input-group mb-3">
                <span className="input-group-text">Persona:</span>
                <select className="form-select" value={idPersona} onChange={(event) => setidPersona(event.target.value)} disabled>
                  <option value="">Selecciona una persona</option>
                  {personaList.map((persona) => (
                    <option key={persona.idPersona} value={persona.idPersona}>
                      {`${persona.nombre} ${persona.paterno} ${persona.materno}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Email:</span>
                <input type="email" className="form-control" value={email}
                  onChange={(event) => setemail(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Fecha de Registro:</span>
                <input type="date"className="form-control" value={fecha}
                  onChange={(event) => setfecha(event.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">NSS:</span>
                <input type="text" className="form-control" value={nss}
                  onChange={(event) => setnss(event.target.value)}/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para eliminar alumno */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Alumno</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el alumno: <strong>{selectedAlumno?.email}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
