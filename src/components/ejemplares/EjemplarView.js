import React, { useState, useEffect } from 'react';
import { getEjemplares, crearEjemplares, editarEjemplar } from '../../services/ejemplarService';
import { getLibros } from '../../services/LibroSerice';
import Swal from 'sweetalert2';
import moment from 'moment';

export const EjemplarView = () => {
  const [valoresForm, setValoresForm] = useState({ ubicacion: '', libro: '' });
  const [ejemplares, setEjemplares] = useState([]);
  const [libros, setLibros] = useState([]);
  const [editando, setEditando] = useState(false);
  const [ejemplarEditar, setEjemplarEditar] = useState(null);

  useEffect(() => {
    listarEjemplares();
    listarLibros();
  }, []);

  const listarEjemplares = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      const resp = await getEjemplares();
      setEjemplares(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const listarLibros = async () => {
    try {
      const { data } = await getLibros();
      setLibros(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  };

  const handleCrearOEditarEjemplar = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();

      if (editando && ejemplarEditar) {
        // Editar ejemplar existente
        await editarEjemplar(ejemplarEditar._id, {
          ubicacion: valoresForm.ubicacion,
          libro: {
            _id: valoresForm.libro
          }
        });
        setEditando(false);
        setEjemplarEditar(null);
      } else {
        // Crear nuevo ejemplar
        await crearEjemplares({
          ubicacion: valoresForm.ubicacion,
          libro: {
            _id: valoresForm.libro
          }
        });
      }

      setValoresForm({ ubicacion: '', libro: '' });
      listarEjemplares(); // Actualizar la lista de ejemplares después de crear uno nuevo o editar
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleEditar = (ejemplar) => {
    setEditando(true);
    setEjemplarEditar(ejemplar);
    setValoresForm({
      ubicacion: ejemplar.ubicacion,
      libro: ejemplar.libro._id
    });
  };

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearOEditarEjemplar(e)}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label1">Ubicación</label>
              <input required name='ubicacion' value={valoresForm.ubicacion} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>

          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label1">Libro</label>
              <select className="form-select"
                required
                name='libro'
                value={valoresForm.libro}
                onChange={(e) => handleOnChange(e)}>
                <option value="">--SELECCIONE--</option>
                {
                  libros.map(({ _id, titulo }) => (
                    <option key={_id} value={_id}>{titulo}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-success">{editando ? 'Actualizar' : 'Guardar'}</button>
      </form>

      <br />

      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Ubicación</th>
            <th scope="col">Libro</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ejemplares.map((ejemplar, index) => (
            <tr key={ejemplar._id}>
              <th scope='row'>{index + 1}</th>
              <td>{ejemplar.ubicacion}</td>
              <td>{ejemplar.libro.titulo}</td>
              <td>{moment(ejemplar.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(ejemplar.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>
                <button className="btn btn-primary btn-sm mx-1" onClick={() => handleEditar(ejemplar)}>Editar</button>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
