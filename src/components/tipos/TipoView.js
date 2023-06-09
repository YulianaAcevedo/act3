import React, { useState, useEffect } from 'react'
import { getTiposEquipos, crearTipoEquipo, editTipoEquipo } from '../../services/tipoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const TipoView = () => {

    const [valoresForm, setValoresForm] = useState({});
    const [tipos, setTipos] = useState([]);
    const { nombre = '', estado = '' } = valoresForm;



    const listarTipos = async () => {
        try {

            const resp = await getTiposEquipos();
            setTipos(resp.data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        listarTipos();
    })

    const handleOnChange = (e) => {
        setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
    }




    const handleCrearTipoEquipo = async (e) => {
        e.preventDefault();
        console.log(valoresForm);
        try {
            const resp = await crearTipoEquipo(valoresForm);
            setValoresForm({ nombre: '', estado: '' });
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();

        }
    }


    return (
        <div className='container-fluid'>
            <form onSubmit={(e) => handleCrearTipoEquipo(e)}>
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
                        tipos.length > 0 && tipos.map((tipo, index) => {
                            return <tr>
                                <th scope='row'>{index + 1}</th>
                                <td>{tipo.nombre}</td>
                                <td>{tipo.estado}</td>
                                <td>{moment(tipo.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                                <td>{moment(tipo.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                                <td> <button className= "btn btn-sm btn-success"  > Actualizar</button></td>
                            </tr>
                        })
                    }
                </tbody>


            </table>

        </div>
    )

}