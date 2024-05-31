import React, { useState, useEffect } from 'react'
import { getEditoriales, crearEditoriales, editareditoriales } from '../../services/editorialService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const EditorialView = () => {
  const [valoresForm, setValoresForm] = useState([]);
  const [editoriales, setEditoriales] = useState([]);
  const [editando, setEditando] = useState(false); 
  const [editorialId, setEditorialId] = useState(null); 
  const { nombre = '', PaisOrigen = '' } = valoresForm; 

  const listarEditoriales = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'   
      });
      const resp = await getEditoriales();
      setEditoriales(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarEditoriales();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value })
  }

  const handleCrearEditoriales = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      if (editando) {
        await editareditoriales(editorialId, valoresForm); // Llamar a editarEditoriales si se está editando
        setEditando(false); // Resetear el estado de edición
        setEditorialId(null); // Limpiar el ID de la editorial en edición
      } else {
        await crearEditoriales(valoresForm); // Llamar a crearEditoriales si no se está editando
      }
      listarEditoriales(); // Actualizar la lista de editoriales
      setValoresForm({ nombre: '', PaisOrigen: '' }); // Limpiar el formulario
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleEditareditorial = (editorial) => {
    setValoresForm(editorial); // Rellenar el formulario con los datos de la editorial
    setEditando(true); // Cambiar el estado a edición
    setEditorialId(editorial._id); // Establecer el ID de la editorial en edición
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearEditoriales(e)}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label1">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>

          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label1">Pais Origen</label>
              <input required name='PaisOrigen' value={PaisOrigen} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
        </div>
        <button className="btn btn-success">{editando ? 'Actualizar' : 'Guardar'}</button>
      </form>
      <br></br>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Pais Origen</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope="col">Acciones</th> {/* Nueva columna para acciones */}
          </tr>
        </thead>
        <tbody>
          {
            editoriales.length > 0 && editoriales.map((editorial, index) => {
              return (
                <tr key={editorial._id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{editorial.nombre}</td>
                  <td>{editorial.PaisOrigen}</td>
                  <td>{moment(editorial.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                  <td>{moment(editorial.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEditareditorial(editorial)}>Editar</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>  
      </table>
    </div>
  )
}
