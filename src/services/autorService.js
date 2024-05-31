import { axiosInstance } from '../helper/axios-config';

const getAutores = () => {
    return axiosInstance.get('autores', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearAutores= (data) => {
    return axiosInstance.post('autores', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editarAutores = (UpdateAutorPorId , data) => {
    return axiosInstance.put(`autores/${UpdateAutorPorId }`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getAutores, crearAutores, editarAutores
}