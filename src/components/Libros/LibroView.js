import React, { useState, useEffect } from 'react';
import { getLibros } from '../../services/LibroSerice';
import { LibroCard} from './LibroCard';
import { LibroNew } from './LibroNew'


export const LibroView = () => {  

  const [ libros, setLibros ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);

  const listarLibros = async () => {

    try {

      const { data } = await getLibros();
      setLibros(data);

    } catch (error) {
      console.log(error); 
    }

  }

  useEffect(() => {
    listarLibros();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <div className='container'>
       <div className="mt-4 mb-4">
        <h2>¡Espeacio abierto para el aprendizaja!</h2>
        <img src="https://kinsta.com/es/wp-content/uploads/sites/8/2021/03/bibliotecas-javascript.png" alt="Bienvenida" className="img-fluid" />
      </div>
      <h3>Lista de Libros disponibles</h3>


      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        
        {
          libros.map((libros) => {
            return <LibroCard key = { libros._id } libros= {libros } />
          })
        }
      </div>
      {
      openModal ? <LibroNew
      handleOpenModal={ handleOpenModal }
      listarLibros={ listarLibros } /> :
      <button type="button" className="btn btn-danger fab" onClick={ handleOpenModal }>
        <i className="fa-solid fa-plus"></i>
      </button>
      }
    </div>
  )
}

