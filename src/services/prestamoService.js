import { axiosInstance } from '../helper/axios-config';

const getPrestamos = () => {
    return axiosInstance.get('prestamos', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearPrestamos = (data) => {
    return axiosInstance.post('prestamos', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editarPrestamos = (UpdatePrestamoPorId, data) => {
    return axiosInstance.put(`prestamos/${UpdatePrestamoPorId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getPrestamos, crearPrestamos, editarPrestamos
}