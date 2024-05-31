import { axiosInstance } from '../helper/axios-config';

const getEditoriales = () => {
    return axiosInstance.get('editoriales', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearEditoriales= (data) => {
    return axiosInstance.post('editoriales', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editareditoriales = (UpdateEditorialPorId , data) => {
    return axiosInstance.put(`editoriales/${UpdateEditorialPorId }`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
   getEditoriales, crearEditoriales, editareditoriales
}