import React, { useState, useEffect } from 'react';
import { getPrestamos, crearPrestamos, editarPrestamos } from '../../services/prestamoService';
import { getEjemplares } from '../../services/ejemplarService';
import { getUsuarios } from '../../services/usuarioService';
import Swal from 'sweetalert2';
import moment from 'moment';

export const PrestamoView = () => {
  const [valoresForm, setValoresForm] = useState({
    fecha_Prestamo: '',
    fecha_Devolucion: '',
    ejemplar: '',
    usuario: ''
  });
  const [prestamos, setPrestamos] = useState([]);
  const [ejemplares, setEjemplares] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    listarPrestamos();
    listarEjemplares();
    listarUsuarios();
  }, []);

  const listarPrestamos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      const resp = await getPrestamos();
      setPrestamos(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const listarEjemplares = async () => {
    try {
      const { data } = await getEjemplares();
      setEjemplares(data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarUsuarios = async () => {
    try {
      const { data } = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  };

  const handleCrearPrestamos = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();

      const prestamoData = {
        fecha_Prestamo: valoresForm.fecha_Prestamo,
        fecha_Devolucion: valoresForm.fecha_Devolucion,
        ejemplar: {
          _id: valoresForm.ejemplar
        },
        usuario: {
          _id: valoresForm.usuario
        }
      };

      if (editando) {
        await editarPrestamos(idEditando, prestamoData);
        setEditando(false);
        setIdEditando(null);
      } else {
        await crearPrestamos(prestamoData);
      }

      setValoresForm({
        fecha_Prestamo: '',
        fecha_Devolucion: '',
        ejemplar: '',
        usuario: ''
      });
      listarPrestamos();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const seleccionarPrestamo = (prestamo) => {
    setValoresForm({
      fecha_Prestamo: moment(prestamo.fecha_Prestamo).format('YYYY-MM-DD'),
      fecha_Devolucion: moment(prestamo.fecha_Devolucion).format('YYYY-MM-DD'),
      ejemplar: prestamo.ejemplar._id,
      usuario: prestamo.usuario._id
    });
    setEditando(true);
    setIdEditando(prestamo._id);
  };

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearPrestamos(e)}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Fecha Prestamo</label>
              <input required name='fecha_Prestamo' value={valoresForm.fecha_Prestamo} type="date" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Fecha Devolucion</label>
              <input required name='fecha_Devolucion' value={valoresForm.fecha_Devolucion} type="date" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Ejemplar</label>
              <select className="form-select"
                required
                name='ejemplar'
                value={valoresForm.ejemplar}
                onChange={(e) => handleOnChange(e)}>
                <option value="">--SELECCIONE--</option>
                {
                  ejemplares.map(({ _id, ubicacion }) => (
                    <option key={_id} value={_id}>{ubicacion}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <select className="form-select"
                required
                name='usuario'
                value={valoresForm.usuario}
                onChange={(e) => handleOnChange(e)}>
                <option value="">--SELECCIONE--</option>
                {
                  usuarios.map(({ _id, nombres }) => (
                    <option key={_id} value={_id}>{nombres}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-4'>
            <button type="submit" className="btn btn-success">{editando ? 'Actualizar' : 'Guardar'}</button>
          </div>
        </div>
      </form>

      <br />

      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Fecha Prestamo</th>
            <th scope="col">Fecha Devolucion</th>
            <th scope="col">Ejemplar</th>
            <th scope="col">Usuario</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map((prestamo, index) => (
            <tr key={prestamo._id}>
              <th scope='row'>{index + 1}</th>
              <td>{moment(prestamo.fecha_Prestamo).format('DD-MM-YYYY')}</td>
              <td>{moment(prestamo.fecha_Devolucion).format('DD-MM-YYYY')}</td>
              <td>{prestamo.ejemplar.ubicacion}</td>
              <td>{prestamo.usuario.nombres}</td>
              <td>{moment(prestamo.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(prestamo.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>
                <button className="btn btn-primary" onClick={() => seleccionarPrestamo(prestamo)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
