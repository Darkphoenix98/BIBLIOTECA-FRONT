import { axiosInstance } from '../helper/axios-config';

const getLibros = () => {
    return axiosInstance.get('libros', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearLibros = (data) => {
    return axiosInstance.post('libros', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editarLibros = (updateLibrosPorId, data) => {
    return axiosInstance.put(`libros/${updateLibrosPorId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const getLibrosPorId = (librosId) => {
    return axiosInstance.get(`libros/${librosId}` ,{  
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getLibros, crearLibros, editarLibros, getLibrosPorId
}