import '../../../assets/css/App.css';
import { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMapaCurricular, addMapaCurricular, editMapaCurricular, removeMapaCurricular } 
from '../../../assets/js/PlanificacionAcademica/mapacurricular.js';
import { MapaCurricularModales } from './MapacurricularModales.jsx';

const MapaCurricular = () => {
  const [mapaCurricular, setMapaCurricular] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMapa, setSelectedMapa] = useState(null);
  const [idProgramaAcademico, setIdProgramaAcademico] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [cuatrimestre, setCuatrimestre] = useState('');
  const [materia, setMateria] = useState('');
  const [clave, setClave] = useState('');
  const [horasSemana, setHorasSemana] = useState('');
  const [horasTeoricas, setHorasTeoricas] = useState('');
  const [horasPracticas, setHorasPracticas] = useState('');
  const [horasTotal, setHorasTotal] = useState('');
  const [creditos, setCreditos] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [espacio, setEspacio] = useState('');
  const [noUnidad, setNoUnidad] = useState('');

  const fetchMapaCurricular = useCallback(async () => {
    await getMapaCurricular(setMapaCurricular);
  }, []);

  useEffect(() => {
    fetchMapaCurricular();
  }, [fetchMapaCurricular]);

  const handleAdd = async () => {
    await addMapaCurricular(idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad, setShowModal, fetchMapaCurricular);
  };

  const handleUpdate = async () => {
    await editMapaCurricular(selectedMapa.idMapaCurricular, idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad, setShowEditModal, fetchMapaCurricular);
  };

  const handleDelete = async () => {
    await removeMapaCurricular(selectedMapa.idMapaCurricular, fetchMapaCurricular);
    setShowDeleteModal(false);
  };

  const handleEditClick = (mapa) => {
    setSelectedMapa(mapa);
    setIdProgramaAcademico(mapa.idProgramaAcademico);
    setCiclo(mapa.ciclo);
    setCuatrimestre(mapa.cuatrimestre);
    setMateria(mapa.materia);
    setClave(mapa.clave);
    setHorasSemana(mapa.horasSemana);
    setHorasTeoricas(mapa.horasTeoricas);
    setHorasPracticas(mapa.horasPracticas);
    setHorasTotal(mapa.horasTotal);
    setCreditos(mapa.creditos);
    setModalidad(mapa.modalidad);
    setEspacio(mapa.espacio);
    setNoUnidad(mapa.noUnidad);
    setShowEditModal(true);
  };

  const handleDeleteClick = (mapa) => {
    setSelectedMapa(mapa);
    setShowDeleteModal(true);
  };

  return (
    <div className="container">
      <h1>Mapa Curricular</h1>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>Agregar Mapa Curricular</button>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Programa Académico</th>
            <th>Ciclo</th>
            <th>Cuatrimestre</th>
            <th>Materia</th>
            <th>Clave</th>
            <th>Horas Semana</th>
            <th>Horas Teóricas</th>
            <th>Horas Prácticas</th>
            <th>Horas Totales</th>
            <th>Créditos</th>
            <th>Modalidad</th>
            <th>Espacio</th>
            <th>Número de Unidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mapaCurricular.map((mapa) => (
            <tr key={mapa.idMapaCurricular}>
              <td>{mapa.NombreProgramaAcademico}</td>
              <td>{mapa.ciclo}</td>
              <td>{mapa.cuatrimestre}</td>
              <td>{mapa.materia}</td>
              <td>{mapa.clave}</td>
              <td>{mapa.horasSemana}</td>
              <td>{mapa.horasTeoricas}</td>
              <td>{mapa.horasPracticas}</td>
              <td>{mapa.horasTotal}</td>
              <td>{mapa.creditos}</td>
              <td>{mapa.modalidad}</td>
              <td>{mapa.espacio}</td>
              <td>{mapa.noUnidad}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEditClick(mapa)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(mapa)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <MapaCurricularModales
        ciclo={ciclo} setCiclo={setCiclo}
        cuatrimestre={cuatrimestre} setCuatrimestre={setCuatrimestre}
        materia={materia} setMateria={setMateria}
        clave={clave} setClave={setClave}
        horasSemana={horasSemana} setHorasSemana={setHorasSemana}
        horasTeoricas={horasTeoricas} setHorasTeoricas={setHorasTeoricas}
        horasPracticas={horasPracticas} setHorasPracticas={setHorasPracticas}
        horasTotal={horasTotal} setHorasTotal={setHorasTotal}
        creditos={creditos} setCreditos={setCreditos}
        modalidad={modalidad} setModalidad={setModalidad}
        espacio={espacio} setEspacio={setEspacio}
        noUnidad={noUnidad} setNoUnidad={setNoUnidad}
        idProgramaAcademico={idProgramaAcademico} setIdProgramaAcademico={setIdProgramaAcademico}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd} handleUpdate={handleUpdate} handleDelete={handleDelete}
        selectedMapa={selectedMapa}
      />
    </div>
  );
};

export default MapaCurricular;