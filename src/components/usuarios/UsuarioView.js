import React, { useState, useEffect } from 'react'
import { getUsuarios, crearUsuarios, editarUsuarios } from '../../services/usuarioService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const UsuarioView = () => {
  const [valoresForm, setValoresForm] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(false); 
  const [usuarioId, setUsuarioId] = useState(null); 
  const { nombres = '', email = '', direccion = '', ocupacion = '' } = valoresForm; 

  const listarUsuarios = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'   
      });  
      const resp = await getUsuarios();
      setUsuarios(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarUsuarios();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value })
  }

  const handleCrearUsuarios = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      if (editando) {
        await editarUsuarios(usuarioId, valoresForm); // Llamar a editarUsuarios si se está editando
        setEditando(false); // Resetear el estado de edición
        setUsuarioId(null); // Limpiar el ID del usuario en edición
      } else {
        await crearUsuarios(valoresForm); // Llamar a crearUsuarios si no se está editando
      }
      listarUsuarios(); // Actualizar la lista de usuarios
      setValoresForm({ nombres: '', email: '', direccion: '', ocupacion: '' }); // Limpiar el formulario
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleEditarUsuario = (usuario) => {
    setValoresForm(usuario); // Rellenar el formulario con los datos del usuario
    setEditando(true); // Cambiar el estado a edición
    setUsuarioId(usuario._id); // Establecer el ID del usuario en edición
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearUsuarios(e)}>
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
              <label className="form-label1">Ocupacion</label>
              <select required name='ocupacion' value={ocupacion} className="form-select"
                onChange={(e) => handleOnChange(e)} >
                <option value="" disabled>--SELECCIONE--</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Profesor">Profesor</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
          </div>

          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label1">Direccion</label>
              <input required name='direccion' value={direccion} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>

          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label1">Email</label>
              <input required name='email' value={email} type="email" className="form-control"
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
            <th scope="col">Ocupacion</th>
            <th scope="col">Direccion</th>
            <th scope="col">Email</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope="col">Acciones</th> 
          </tr>
        </thead>
        <tbody>
          {
              usuarios.length > 0 && usuarios.map((usuario, index) => {
              return (
                <tr key={usuario._id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{usuario.nombres}</td>
                  <td>{usuario.ocupacion}</td>
                  <td>{usuario.direccion}</td>
                  <td>{usuario.email}</td>
                  <td>{moment(usuario.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                  <td>{moment(usuario.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEditarUsuario(usuario)}>Editar</button>
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
