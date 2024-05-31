import React, { useState, useEffect } from 'react'
import { getAutores, crearAutores, editarAutores } from '../../services/autorService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const AutorView = () => {
  const [valoresForm, setValoresForm] = useState([]);
  const [autores, setAutores] = useState([]);
  const [editando, setEditando] = useState(false);
  const [autorId, setAutorId] = useState(null); 
  const { nombres = '', PaisOrigen = '' } = valoresForm; 

  const listarAutores = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'   
      });
      const resp = await getAutores();
      setAutores(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarAutores();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value })
  }

  const handleCrearAutores = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      if (editando) {
        await editarAutores(autorId, valoresForm); // Llamar a editarAutores si se está editando
        setEditando(false); // Resetear el estado de edición
        setAutorId(null); // Limpiar el ID del autor en edición
      } else {
        await crearAutores(valoresForm); // Llamar a crearAutores si no se está editando
      }
      listarAutores(); // Actualizar la lista de autores
      setValoresForm({ nombres: '', PaisOrigen: '' }); // Limpiar el formulario
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleEditarAutor = (autor) => {
    setValoresForm(autor); // Rellenar el formulario con los datos del autor
    setEditando(true); // Cambiar el estado a edición
    setAutorId(autor._id); // Establecer el ID del autor en edición
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearAutores(e)}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label1">Nombres</label>
              <input required name='nombres' value={nombres} type="text" className="form-control"
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
            <th scope="col">Nombres</th>
            <th scope="col">Pais Origen</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope="col">Acciones</th> {/* Nueva columna para acciones */}
          </tr>
        </thead>
        <tbody>
          {
            autores.length > 0 && autores.map((autor, index) => {
              return (
                <tr key={autor._id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{autor.nombres}</td>
                  <td>{autor.PaisOrigen}</td>
                  <td>{moment(autor.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                  <td>{moment(autor.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEditarAutor(autor)}>Editar</button>
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
