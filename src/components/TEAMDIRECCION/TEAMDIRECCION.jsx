import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Config/firestore'

import { Link, Route, Routes } from 'react-router-dom'
import Calendario from '../Calendario/Calendario';
import Edit from '../Edit';

function TEAMDIRECCION({ user }) {
    const [Vacaciones, setVacaciones] = useState([]);
    const [Colaborador, setcolaboladores ] = useState([])
    const VacacionesCollection = collection(db, "Vacaciones");
    const ColaboladoresCollection = collection(db, "colaboladores");



    //mostrar los VACACIONES
    const getvacaciones = async () => {
        const data = await getDocs(VacacionesCollection)
        console.log(data.docs);
        setVacaciones(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        console.log(Vacaciones)

    }

    const getcolaboladores = async () => {
        const data = await getDocs(ColaboladoresCollection)
        console.log(data.docs);
        setcolaboladores(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        console.log(Colaborador)

    }

    // use efect  
    useEffect(() => {
        getvacaciones()
        getcolaboladores()


    }, [])


    function Home() {
        return <>
            <div className=''>
            <Link className='btn btn-primary ' to="/Calendario"> Calendario</Link>
            </div>
            <br /> <br />
            <div className='' >

                <table className="container">

                    <thead>
                        <tr Style="font-family: 'Heebo', sans-serif; Font-size: 14px;" >
                            
                            <th scope="col">USUARIO</th>
                            <th scope="col">EQUIPO</th>
                            <th scope="col">TIPO</th>
                            <th scope="col">FECHA INICIO</th>
                            <th scope="col">FECHA FINAL</th>
                            <th scope="col">ACREDITACION</th>
                            <th scope="col">COMENTARIOS</th>
                            <th scope="col">ACCION</th>
                        </tr>
                    </thead>


                    {
                        Vacaciones
                            .map((vacacion) => {
                                if (vacacion['EQUIPO DE TRABAJO'] === "TEAM DIRECCION") {

                                    return (
                                        <tbody key={vacacion.id} >

                                            <tr >

                                                <td >
                                                    <div className="h-25">

                                                        <img src={vacacion.foto ??
                                                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className="rounded-circle" style={{ width: 40 }} alt="Avatar" />


                                                        <div style={{ marginLeft: 50, marginTop: -40 }}>
                                                            <a Style="font-family: 'Anek Latin', sans-serif; Font-size: 14px; " name="nombre" >
                                                                {vacacion['NOMBRE COMPLETO']}
                                                            </a>

                                                            <br />
                                                            <p className='fst-italic lh-1' Style="Font-size: 13px;">
                                                                {vacacion['CORREO ELECTRONICO']}
                                                            </p>

                                                        </div>
                                                    </div>
                                                </td>
                                                <td
                                                    Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                    {vacacion['EQUIPO DE TRABAJO']}
                                                </td>
                                                <td
                                                    Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" name="asunto">
                                                    {vacacion.Tipo}
                                                </td>
                                                <td
                                                    Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;"  name="fechai">
                                                    {vacacion.start}
                                                </td>
                                                <td
                                                    Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" name="fechaf">
                                                    {vacacion.end}
                                                </td>
                                                <td
                                                    Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                    {vacacion.Acreditacion}
                                                </td>
                                                <td
                                                    Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                    {vacacion.comentario}
                                                </td>
                                                <td>
                                                <Link className='btn btn-warning ' to={`/Edit/${vacacion.id}` }> acreditar</Link>
                                                </td>
                                              
                                            </tr>
                                        </tbody>

                                        
                                    )
                                }


                            }
                            )
                    }
                </table>


                <br /><br />

            </div>

        </>
    }
 
    return (
        <div user={user}>   

            <br /><br />


            <Routes>
                <Route path='/' element={<Home />} ></Route>
                <Route path='/Calendario' element={<Calendario/>}></Route>
                <Route path='/Edit/:id' element={<Edit/>}/>
          
            </Routes>
        </div>
    )
}

export default TEAMDIRECCION
