import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppGestion() {
  const [patente, setPatente] = useState('');
  const [codigo, setCodigo] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [registros, setRegistros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [registroActual, setRegistroActual] = useState(null);

  const handleAgregar = () => {
    const nuevoRegistro = {
      id: Date.now(),
      patente,
      codigo,
      hora: new Date().toLocaleTimeString(),
      vueltas: 0,
      observaciones,
    };
    setRegistros([...registros, nuevoRegistro]);
    setPatente('');
    setCodigo('');
    setObservaciones('');
  };

  const handleEliminar = (id) => {
    setRegistros(registros.filter((reg) => reg.id !== id));
  };

  const handleEditar = (registro) => {
    setRegistroActual(registro);
    setShowModal(true);
  };

  const handleGuardarEdicion = () => {
    setRegistros(
      registros.map((reg) =>
        reg.id === registroActual.id ? registroActual : reg
      )
    );
    setShowModal(false);
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">App Gestión</h2>

      {/* Formulario */}
      <Row className="mb-4">
        <Col md>
          <Form.Control
            placeholder="Patente"
            value={patente}
            onChange={(e) => setPatente(e.target.value)}
          />
        </Col>
        <Col md>
          <Form.Control
            placeholder="Código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </Col>
        <Col md>
          <Form.Control
            placeholder="Observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <Button variant="success" onClick={handleAgregar}>
            Ingresar
          </Button>
        </Col>
      </Row>

      {/* Tabla de Registros */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Patente</th>
            <th>Código</th>
            <th>Hora</th>
            <th>Vueltas</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((reg) => (
            <tr key={reg.id}>
              <td>{reg.patente}</td>
              <td>{reg.codigo}</td>
              <td>{reg.hora}</td>
              <td>{reg.vueltas}</td>
              <td>{reg.observaciones}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditar(reg)}
                >
                  ✏️
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEliminar(reg.id)}
                >
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Botón Imprimir */}
      <Button variant="secondary" onClick={handleImprimir}>
        Imprimir
      </Button>

      {/* Modal para editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {registroActual && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Patente</Form.Label>
                <Form.Control
                  value={registroActual.patente}
                  onChange={(e) =>
                    setRegistroActual({ ...registroActual, patente: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  value={registroActual.codigo}
                  onChange={(e) =>
                    setRegistroActual({ ...registroActual, codigo: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Observaciones</Form.Label>
                <Form.Control
                  value={registroActual.observaciones}
                  onChange={(e) =>
                    setRegistroActual({ ...registroActual, observaciones: e.target.value })
                  }
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarEdicion}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AppGestion;
