import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getLibrosPorId , editarLibros } from '../../services/LibroSerice';
import { getAutores } from '../../services/autorService';
import { getEditoriales } from '../../services/editorialService';
import Swal from 'sweetalert2';

export const LibroUpdate = () => {  

    const { librosId = '' } = useParams();
    const [libros, setLibros] = useState();
    const [autores, setAutores] = useState([]);
    const [editoriales, setEditoriales] = useState([]);
    const [valoresForm, setValoresForm] = useState([]);
    const { serial = '', titulo = '', ISBN = '', descripcion = '', imagen = '',
        fecha_publicacion = '', autor, editorial } = valoresForm;

        const listarAutores = async () => {
            try {   
                const { data } = await getAutores();
                setAutores(data);
             
            } catch (error) {
                console.log(error);
            }
        }
    
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
        }
    
        useEffect(() => {
            listarEditoriales();
        }, []);
    


    const getLibros = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await getLibrosPorId(librosId);
            console.log(data);
            setLibros(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getLibros();
    }, [librosId]);

    useEffect(() => {
        if (libros) {
            // formato adecuado (AAAA-MM-DD)
            const fechaPubliacionFormatted = libros.fecha_publicacion ? new Date(libros.fecha_publicacion).toISOString().split('T')[0] : '';

            setValoresForm({
                serial: libros.serial,
                titulo: libros.titulo,
                ISBN: libros.ISBN,
                descripcion: libros.descripcion,
                imagen: libros.imagen,
                fecha_publicacion: fechaPubliacionFormatted,
                autor: libros.autor?._id,
                editorial: libros.editorial?._id,
               
            });
        }
    }, [libros]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const libros = {
            serial, titulo, ISBN, descripcion, imagen,
            fecha_publicacion,
            autor: {
                _id: autor
            },
            editorial: {
                _id: editorial
            },
          
        }
        console.log(libros);

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargado...'
            });
            Swal.showLoading();
            const { data } = await editarLibros(librosId, libros);
            Swal.close(); 
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            Swal.close();
            let mensaje;
            if (error && error.response & error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = "Ocurrió un error, por favor intente de nuevo ";
            }
            Swal.fire('Error', 'Ocurrió un error, por favor verifique los datos', 'error');
        }
    }

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className="card">
                <div className='card-header'>
                    <h5 className='card-title'> Detalle Completo</h5>
                </div>

                <div className="card-body">
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={libros?.imagen} style={{ maxWidth: '400px', height: '400px' }} />
                        </div>
                        <div className='col-md-8'>

                            <form onSubmit={(e) => handleOnSubmit(e)}>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Serial</label>
                                            <input type="text" name='serial'
                                                value={serial}
                                                onChange={e => handleOnChange(e)}
                                                required
                                                className='form-control'
                                            />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Titulo</label>
                                            <input type="text" name='titulo'
                                                required
                                                value={titulo}
                                                onChange={(e) => handleOnChange(e)}
                                                className='form-control' />

                                        </div>
                                    </div>

                                   

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">ISBN</label>
                                            <input type="text" name='ISBN'
                                                required
                                                value={ISBN}
                                                onChange={(e) => handleOnChange(e)}
                                                className='form-control' />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Fecha Publicación</label>
                                            <input type="date" name='fecha_publicacion'
                                                required
                                                value={fecha_publicacion}
                                                onChange={(e) => handleOnChange(e)}
                                                className='form-control' />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Autor</label>
                                            <select className="form-select"
                                                required
                                                name='autor'
                                                value={autor}
                                                onChange={(e) => handleOnChange(e)}>
                                                <option value="">--SELECCIONE--</option>
                                                {
                                                    autores.map(({ _id, nombres }) => {
                                                        return <option key={_id} value={_id}>{nombres}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Editorial</label>
                                            <select className="form-select"
                                                name='editorial'
                                                value={editorial}
                                                onChange={(e) => handleOnChange(e)}
                                                required>
                                                <option value="">--SELECCIONE--</option>
                                                {
                                                    editoriales.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id}>{nombre}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    
                                </div>
                                
                                <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Descprición</label>
                                            <textarea
                                                name='descripcion'
                                                required
                                                value={descripcion}
                                                onChange={(e) => handleOnChange(e)}
                                                className='form-control'   
                                            />
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
                </div>
            </div>
        </div>
    )
}