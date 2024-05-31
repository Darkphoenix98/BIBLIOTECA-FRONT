import { axiosInstance } from '../helper/axios-config';

const getUsuarios = () => {
    return axiosInstance.get('usuarios', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearUsuarios = (data) => {
    return axiosInstance.post('usuarios', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editarUsuarios = (UpdateUsuarioPorId, data) => {
    return axiosInstance.put(`usuarios/${UpdateUsuarioPorId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getUsuarios, crearUsuarios, editarUsuarios
}