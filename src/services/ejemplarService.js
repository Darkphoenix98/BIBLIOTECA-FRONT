import { axiosInstance } from '../helper/axios-config';

const getEjemplares = () => {
  return axiosInstance.get('ejemplares');
};

const crearEjemplares = (data) => {
  return axiosInstance.post('ejemplares', data);
};

const editarEjemplar = (UpdateEjemplarPorId, data) => {
  return axiosInstance.put(`ejemplares/${UpdateEjemplarPorId}`, data);
};

export {
  getEjemplares,
  crearEjemplares,
  editarEjemplar
};
