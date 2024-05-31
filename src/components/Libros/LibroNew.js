import React, { useState, useEffect } from 'react';
import { getAutores } from '../../services/autorService';
import { getEditoriales } from '../../services/editorialService';
import { crearLibros } from '../../services/LibroSerice';
import Swal from 'sweetalert2';

export const LibroNew = ({ handleOpenModal, listarLibros }) => {
  const [autores, setAutores] = useState([]);
  const [editoriales, setEditoriales] = useState([]);
  const [valoresForm, setValoresForm] = useState({
    serial: '',
    titulo: '',
    ISBN: '',
    descripcion: '',
    imagen: '',
    fecha_publicacion: '',
    autor: '',
    editorial: '',
  });

  const listarAutores = async () => {
    try {
      const { data } = await getAutores();
      setAutores(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarAutores();
  }, []);

  const listarEditoriales = async () => {
    try {
      const { data } = await getEditoriales();
      setEditoriales(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarEditoriales();
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const libros = {
      serial: valoresForm.serial,
      titulo: valoresForm.titulo,
      ISBN: valoresForm.ISBN,
      descripcion: valoresForm.descripcion,
      imagen: valoresForm.imagen,
      fecha_publicacion: valoresForm.fecha_publicacion,
      autor: {
        _id: valoresForm.autor,
      },
      editorial: {
        _id: valoresForm.editorial,
      },
    };

    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      await crearLibros(libros);
      handleOpenModal();
      listarLibros();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
      Swal.fire('Error', 'Ocurrió un error, por favor intente de nuevo', 'error');
    }
  };

  return (
    <div className='sidebar'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3>Nuevo Libro</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <hr />
          </div>
        </div>

        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Serial</label>
                <input
                  type="text"
                  name='serial'
                  value={valoresForm.serial}
                  onChange={(e) => handleOnChange(e)}
                  required
                  className='form-control'
                />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                  type="text"
                  name='titulo'
                  required
                  value={valoresForm.titulo}
                  onChange={(e) => handleOnChange(e)}
                  className='form-control'
                />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">ISBN</label>
                <input
                  type="text"
                  name='ISBN'
                  required
                  value={valoresForm.ISBN}
                  onChange={(e) => handleOnChange(e)}
                  className='form-control'
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Imagen</label>
                <input
                  type="url"
                  name='imagen'
                  value={valoresForm.imagen}
                  required
                  onChange={(e) => handleOnChange(e)}
                  className='form-control'
                />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Fecha Publicación</label>
                <input
                  type="date"
                  name='fecha_publicacion'
                  required
                  value={valoresForm.fecha_publicacion}
                  onChange={(e) => handleOnChange(e)}
                  className='form-control'
                />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Autor</label>
                <select
                  className="form-select"
                  required
                  name='autor'
                  value={valoresForm.autor}
                  onChange={(e) => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {autores.map(({ _id, nombres }) => (
                    <option key={_id} value={_id}>{nombres}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Editorial</label>
                <select
                  className="form-select"
                  name='editorial'
                  value={valoresForm.editorial}
                  onChange={(e) => handleOnChange(e)}
                  required>
                  <option value="">--SELECCIONE--</option>
                  {editoriales.map(({ _id, nombre }) => (
                    <option key={_id} value={_id}>{nombre}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  name='descripcion'
                  required
                  value={valoresForm.descripcion}
                  onChange={(e) => handleOnChange(e)}
                  className='form-control'
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <button className="btn btn-success">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
