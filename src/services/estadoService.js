import {axiosInstance} from '../helpers/axios-config';

const getEstadosEquipos= () => {
    return axiosInstance.get('estadoEquipo', {

        headers: {
            'Content-type': 'application/json'
        }
    });
}

const crearEstadoEquipo = (data) => {
    return axiosInstance.post('estadoEquipo', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}


const editEstadoEquipo = (estadoEquipoId, data ) => {
    return axiosInstance.put(`estadoEquipo/${estadoEquipoId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getEstadosEquipos, crearEstadoEquipo, editEstadoEquipo
}