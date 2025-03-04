
import { useState, useEffect } from 'react';
import { getTramitesProcesos } from "../../../api/Parametrizacion/tramiteproceso.api.js";
import { getAlumnoTramites } from "../../../api/Tramites/alumnotramite.api.js";
import { getActividades } from "../../../api/Parametrizacion/actividad.api.js";
import React from 'react';
import { Modal, Button, Form, Row, Col, Alert  } from 'react-bootstrap';// Asegúrate de que esto esté presente en cada archivo donde uses useState o useEffect




// ------------------------------------------ PAGO INSCRIPCIÓN -------------------------------------------------------
export const tramiteValidaPagoInscripcion = ({
  idAlumnoTramite, setIdAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
}) => {
  const [alumnotramiteList, setAlumnotramiteList] = useState([]);
  useEffect(() => {
    getAlumnoTramites()
      .then((data) => setAlumnotramiteList(data))
      .catch((error) => console.error("Error al obtener los alumnos trámites:", error));
  }, []);
  const alumno = alumnotramiteList.find(alumno => alumno.idAlumnoTramite === idAlumnoTramite)?.alumno || "Desconocido";
  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Encabezado con color elegante */}
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">Validar Pago de Inscripción</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Nombre del alumno resaltado pero sin exagerar */}
        <Row className="mb-3">
          <Col>
            <Alert variant="light" className="border border-primary text-center fw-semibold fs-5">
              Alumno: <span className="text-primary">{alumno}</span>
            </Alert>
          </Col>
        </Row>

        <Form>
          {/* Observaciones con diseño limpio */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Escribe aquí cualquier observación (opcional)"
            />
          </Form.Group>

          {/* Estatus con un diseño limpio y elegante */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Estado del Trámite</Form.Label>
            <Form.Select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="En proceso">En proceso</option>
              <option value="Concluido">Concluido</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            handleUpdate();
            handleClose();
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ------------------------------------------- ACTA DE NACIMIENTO -------------------------------------------------------

export const tramiteEntregaAN = ({
  idAlumnoTramite, setIdAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
}) => {
  const [alumnotramiteList, setAlumnotramiteList] = useState([]);

  useEffect(() => {
    getAlumnoTramites()
      .then((data) => setAlumnotramiteList(data))
      .catch((error) => console.error("Error al obtener los alumnos trámites:", error));
  }, []);

  const alumno = alumnotramiteList.find(alumno => alumno.idAlumnoTramite === idAlumnoTramite)?.alumno || "Desconocido";

  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Encabezado con color elegante */}
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">Entrega de Acta de Nacimiento</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Nombre del alumno resaltado pero sin exagerar */}
        <Row className="mb-3">
          <Col>
            <Alert variant="light" className="border border-primary text-center fw-semibold fs-5">
              Alumno: <span className="text-primary">{alumno}</span>
            </Alert>
          </Col>
        </Row>

        <Form>
          {/* Observaciones con diseño limpio */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Escribe aquí cualquier observación (opcional)"
            />
          </Form.Group>

          {/* Estatus con un diseño limpio y elegante */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Estado del Trámite</Form.Label>
            <Form.Select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="En proceso">En proceso</option>
              <option value="Concluido">Concluido</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            handleUpdate();
            handleClose();
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ------------------------------------------ CERTIFICADO DE SECUNDARIA -------------------------------------------------------
export const tramiteEntregaCS = ({
  idAlumnoTramite, setIdAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
}) => {
  const [alumnotramiteList, setAlumnotramiteList] = useState([]);

  useEffect(() => {
    getAlumnoTramites()
      .then((data) => setAlumnotramiteList(data))
      .catch((error) => console.error("Error al obtener los alumnos trámites:", error));
  }, []);

  const alumno = alumnotramiteList.find(alumno => alumno.idAlumnoTramite === idAlumnoTramite)?.alumno || "Desconocido";

  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Encabezado con color elegante */}
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">Entrega de Certificado de Secundaria</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Nombre del alumno resaltado pero sin exagerar */}
        <Row className="mb-3">
          <Col>
            <Alert variant="light" className="border border-primary text-center fw-semibold fs-5">
              Alumno: <span className="text-primary">{alumno}</span>
            </Alert>
          </Col>
        </Row>

        <Form>
          {/* Observaciones con diseño limpio */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Escribe aquí cualquier observación (opcional)"
            />
          </Form.Group>

          {/* Estatus con un diseño limpio y elegante */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Estado del Trámite</Form.Label>
            <Form.Select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="En proceso">En proceso</option>
              <option value="Concluido">Concluido</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            handleUpdate();
            handleClose();
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ------------------------------------------ CERTIFICADO DE BACHILLERATO -------------------------------------------------------
export const tramiteEntregaCB = ({
  idAlumnoTramite, setIdAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
}) => {
  const [alumnotramiteList, setAlumnotramiteList] = useState([]);

  useEffect(() => {
    getAlumnoTramites()
      .then((data) => setAlumnotramiteList(data))
      .catch((error) => console.error("Error al obtener los alumnos trámites:", error));
  }, []);

  const alumno = alumnotramiteList.find(alumno => alumno.idAlumnoTramite === idAlumnoTramite)?.alumno || "Desconocido";

  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Encabezado con color elegante */}
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">Entrega de Certificado de Bachilleratp</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Nombre del alumno resaltado pero sin exagerar */}
        <Row className="mb-3">
          <Col>
            <Alert variant="light" className="border border-primary text-center fw-semibold fs-5">
              Alumno: <span className="text-primary">{alumno}</span>
            </Alert>
          </Col>
        </Row>

        <Form>
          {/* Observaciones con diseño limpio */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Escribe aquí cualquier observación (opcional)"
            />
          </Form.Group>

          {/* Estatus con un diseño limpio y elegante */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Estado del Trámite</Form.Label>
            <Form.Select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="En proceso">En proceso</option>
              <option value="Concluido">Concluido</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            handleUpdate();
            handleClose();
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ------------------------------------------ CURP -------------------------------------------------------
export const tramiteEntregaCURP = ({
  idAlumnoTramite, setIdAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
}) => {
  const [alumnotramiteList, setAlumnotramiteList] = useState([]);

  useEffect(() => {
    getAlumnoTramites()
      .then((data) => setAlumnotramiteList(data))
      .catch((error) => console.error("Error al obtener los alumnos trámites:", error));
  }, []);

  const alumno = alumnotramiteList.find(alumno => alumno.idAlumnoTramite === idAlumnoTramite)?.alumno || "Desconocido";

  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Encabezado con color elegante */}
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">Entrega de CURP</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Nombre del alumno resaltado pero sin exagerar */}
        <Row className="mb-3">
          <Col>
            <Alert variant="light" className="border border-primary text-center fw-semibold fs-5">
              Alumno: <span className="text-primary">{alumno}</span>
            </Alert>
          </Col>
        </Row>

        <Form>
          {/* Observaciones con diseño limpio */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Escribe aquí cualquier observación (opcional)"
            />
          </Form.Group>

          {/* Estatus con un diseño limpio y elegante */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Estado del Trámite</Form.Label>
            <Form.Select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="En proceso">En proceso</option>
              <option value="Concluido">Concluido</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            handleUpdate();
            handleClose();
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ------------------------------------------ INE -------------------------------------------------------
export const tramiteEntregaINE = ({
  idAlumnoTramite, setIdAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
}) => {
  const [alumnotramiteList, setAlumnotramiteList] = useState([]);

  useEffect(() => {
    getAlumnoTramites()
      .then((data) => setAlumnotramiteList(data))
      .catch((error) => console.error("Error al obtener los alumnos trámites:", error));
  }, []);

  const alumno = alumnotramiteList.find(alumno => alumno.idAlumnoTramite === idAlumnoTramite)?.alumno || "Desconocido";

  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Encabezado con color elegante */}
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">Entrega de INE</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Nombre del alumno resaltado pero sin exagerar */}
        <Row className="mb-3">
          <Col>
            <Alert variant="light" className="border border-primary text-center fw-semibold fs-5">
              Alumno: <span className="text-primary">{alumno}</span>
            </Alert>
          </Col>
        </Row>

        <Form>
          {/* Observaciones con diseño limpio */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Escribe aquí cualquier observación (opcional)"
            />
          </Form.Group>

          {/* Estatus con un diseño limpio y elegante */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Estado del Trámite</Form.Label>
            <Form.Select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="En proceso">En proceso</option>
              <option value="Concluido">Concluido</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            handleUpdate();
            handleClose();
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ------------------------------------------ FOTOS -------------------------------------------------------
export const tramiteEntregaFotos = ({
  idAlumnoTramite, setIdAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
}) => {
  const [alumnotramiteList, setAlumnotramiteList] = useState([]);

  useEffect(() => {
    getAlumnoTramites()
      .then((data) => setAlumnotramiteList(data))
      .catch((error) => console.error("Error al obtener los alumnos trámites:", error));
  }, []);

  const alumno = alumnotramiteList.find(alumno => alumno.idAlumnoTramite === idAlumnoTramite)?.alumno || "Desconocido";

  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Encabezado con color elegante */}
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">Entrega de Fotos</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Nombre del alumno resaltado pero sin exagerar */}
        <Row className="mb-3">
          <Col>
            <Alert variant="light" className="border border-primary text-center fw-semibold fs-5">
              Alumno: <span className="text-primary">{alumno}</span>
            </Alert>
          </Col>
        </Row>

        <Form>
          {/* Observaciones con diseño limpio */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Escribe aquí cualquier observación (opcional)"
            />
          </Form.Group>

          {/* Estatus con un diseño limpio y elegante */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Estado del Trámite</Form.Label>
            <Form.Select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="En proceso">En proceso</option>
              <option value="Concluido">Concluido</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            handleUpdate();
            handleClose();
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


// ------------------------------------------ COMPROBANTE DE DOMICILIO -------------------------------------------------------
export const tramiteEntregaCompDomicilio = ({
  idAlumnoTramite, setIdAlumnoTramite,
  estatus, setEstatus,
  observacion, setObservacion,
  handleUpdate, handleClose,
  show,
}) => {
  const [alumnotramiteList, setAlumnotramiteList] = useState([]);

  useEffect(() => {
    getAlumnoTramites()
      .then((data) => setAlumnotramiteList(data))
      .catch((error) => console.error("Error al obtener los alumnos trámites:", error));
  }, []);

  const alumno = alumnotramiteList.find(alumno => alumno.idAlumnoTramite === idAlumnoTramite)?.alumno || "Desconocido";

  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Encabezado con color elegante */}
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">Entrega de Comprobante de Domicilio</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Nombre del alumno resaltado pero sin exagerar */}
        <Row className="mb-3">
          <Col>
            <Alert variant="light" className="border border-primary text-center fw-semibold fs-5">
              Alumno: <span className="text-primary">{alumno}</span>
            </Alert>
          </Col>
        </Row>

        <Form>
          {/* Observaciones con diseño limpio */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Escribe aquí cualquier observación (opcional)"
            />
          </Form.Group>

          {/* Estatus con un diseño limpio y elegante */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Estado del Trámite</Form.Label>
            <Form.Select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="En proceso">En proceso</option>
              <option value="Concluido">Concluido</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            handleUpdate();
            handleClose();
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ------------------------------------------ REGISTRAR ALUMNO -------------------------------------------------------
export const tramiteRegistraAlumno = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Alumno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes registrar un nuevo alumno.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Registrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ------------------------------------------ ALUMNO PA -------------------------------------------------------
export const tramiteRegistraPA = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Programa Académico</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes registrar un nuevo Programa Académico.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Registrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ------------------------------------------ ALUMNO GRUPO (KARDEX) -------------------------------------------------------
export const tramiteRegistraGrupoMaterias = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Grupo de Materias</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes registrar un nuevo grupo de materias.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Registrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ------------------------------------------ CARGAR DATOS (KARDEX, EVALUACIÓN) -------------------------------------------------------
export const tramiteReinscribir = ({
    idAlumnoTramite, setIdAlumnoTramite,
    estatus, setEstatus,
    observacion, setObservacion,
    handleUpdate, handleClose,
    show,
  }) => {
    const [alumnotramiteList, setAlumnotramiteList] = useState([]);
  
    useEffect(() => {
      getAlumnoTramites()
        .then((data) => setAlumnotramiteList(data))
        .catch((error) => console.error("Error al obtener los alumnos trámites:", error));
    }, []);
  
    const alumno = alumnotramiteList.find(alumno => alumno.idAlumnoTramite === idAlumnoTramite)?.alumno || "Desconocido";

  return (
  <Modal show={show} onHide={handleClose}>
    {/* Encabezado con color elegante */}
    <Modal.Header closeButton className="bg-primary text-white">
      <Modal.Title className="fw-bold">Reinscribir Alumno</Modal.Title>
    </Modal.Header>
    
    <Modal.Body>
        {/* Nombre del alumno resaltado pero sin exagerar */}
        <Row className="mb-3">
          <Col>
            <Alert variant="light" className="border border-primary text-center fw-semibold fs-5">
              Alumno: <span className="text-primary">{alumno}</span>
            </Alert>
          </Col>
        </Row>

        <Form>
          {/* Observaciones con diseño limpio */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Escribe aquí cualquier observación (opcional)"
            />
          </Form.Group>

          {/* Estatus con un diseño limpio y elegante */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Estado del Reinscribir el Alumno</Form.Label>
            <Form.Select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="En proceso">En proceso</option>
              <option value="Concluido">Concluido</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            handleUpdate();
            handleClose();
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};