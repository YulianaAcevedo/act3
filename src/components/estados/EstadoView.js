import React, { useState, useEffect } from 'react'
import { getEstadosEquipos, crearEstadoEquipo, editEstadoEquipo } from '../../services/estadoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const EstadoView = () => {

    const [valoresForm, setValoresForm] = useState({});
    const [estados, setEstados] = useState([]);
    const { nombre = '', estado = '' } = valoresForm;



    const listarEstados = async () => {
        try {

            const resp = await getEstadosEquipos();
            setEstados(resp.data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        listarEstados();
    })

    const handleOnChange = (e) => {
        setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
    }




    const handleCrearEstadoEquipo = async (e) => {
        e.preventDefault();
        console.log(valoresForm);
        try {
            const resp = await crearEstadoEquipo(valoresForm);
            setValoresForm({ nombre: '', estado: '' });
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();

        }
    }


    const editarEstado = async (e) => {
        e.preventDefault()
        setEstados(true)
        try{
          
          const resp = await editEstadoEquipo(estado._id, estado);
          console.log(resp)
          
          listarEstados()
        }catch(error){
          setEstados(false)
          console.log(error);
          
        }
    
      }

    return (
        <div className='container-fluid'>
            <form onSubmit={(e) => handleCrearEstadoEquipo(e)}>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input required name='nombre' type="text" className="form-control"
                                onChange={(e) => handleOnChange(e)} />
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="mb-3">
                            <label className="form-label">Estado</label>
                            <select required name='estado' className="form-select"
                                onChange={(e) => handleOnChange(e)} >
                                <option selected>---Seleccione---</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary">Guardar</button>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="row">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Fecha Creación</th>
                        <th scope="col">Fecha Actualización</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        estados.length > 0 && estados.map((estado, index) => {
                            return <tr>
                                <th scope='row'>{index + 1}</th>
                                <td>{estado.nombre}</td>
                                <td>{estado.estado}</td>
                                <td>{moment(estado.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                                <td>{moment(estado.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                                <td> <button className= "btn btn-sm btn-success" id={estado._id} onSubmit={(e) => editarEstado(e)} onChange={(e) => handleOnChange(e)} > Actualizar</button></td>
                            </tr>
                        })
                    }
                </tbody>


            </table>

        </div>
    )

}