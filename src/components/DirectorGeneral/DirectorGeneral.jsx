import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Config/firestore'

import { Link, Route, Routes } from 'react-router-dom'
import Calendario from '../Calendario/Calendario';
import EditC from '../EditC/EditC'

import Pdf from '../Pdf/Pdf';

function DirectorGeneral({ user }) {
    const [Colaboradores, setcolaboladores] = useState([])
    const ColaboladoresCollection = collection(db, "colaboladores");

    const [Vacaciones, setvacaciones] = useState([])
    const VacacionesCollection = collection(db, "Vacaciones");


    const getVacaciones = async () => {
        const data = await getDocs(VacacionesCollection)
        console.log(data.docs);
        setvacaciones(
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
        console.log(Colaboradores)

    }

    // use efect  
    useEffect(() => {
        getcolaboladores()
        getVacaciones()

    }, [])


    function Home() {
        return <>
            <div className=''>
                <Link className='btn btn-primary ' to="/Calendario"> Calendario</Link>       
                <Pdf></Pdf>         
            </div>
            <br /> <br />
            <div className='' >

                <table className="container">
                    <thead>
                        <tr Style="font-family: 'Heebo', sans-serif; Font-size: 14px;"  >

                        <th className='text-center' scope="col"></th> 
                            <th  scope="col">USUARIO</th>
                            <th className='text-center' scope="col">EQUIPO</th>
                            <th className='text-center' scope="col">DIAS DISPOBLES</th>
                            <th className='text-center' scope="col">DIAS SOLICITADOS</th>
                            <th className='text-center' scope="col">TIPO</th>
                            <th className='text-center' scope="col">FECHA INICIO</th>
                            <th className='text-center' scope="col">FECHA FINAL</th>
                            <th className='text-center' scope="col">ACREDITACION POR GERENTE </th>
                            
                        </tr>
                    </thead>

                    {
                        Colaboradores
                            .map((colabolador) => {

                                return (
                                    <tbody key={colabolador.id} >

                                        <tr ><Link className='btn btn-warning ' to={`/Edit/${colabolador.id}`}/>

                                            <td >
                                                <div className="h-25">

                                                    <img src={colabolador.foto ??
                                                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className="rounded-circle" style={{ width: 40 }} alt="Avatar" />


                                                    <div style={{ marginLeft: 50, marginTop: -40 }}>
                                                        <a Style="font-family: 'Anek Latin', sans-serif; Font-size: 14px; ">
                                                            {colabolador['NOMBRE COMPLETO']}
                                                        </a>

                                                        <br />
                                                        <p className='fst-italic lh-1' Style="Font-size: 12px;">
                                                            {colabolador['CORREO ELECTRONICO']}
                                                        </p>

                                                    </div>
                                                </div>
                                            </td>
                                            <td
                                                Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" className='text-center'>
                                                {colabolador['EQUIPO DE TRABAJO']}
                                            </td>
                                            <td
                                                Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" className='text-center'>
                                                {colabolador.Dias}
                                            </td>
                                            
                                    
                                                                




                                            {
                                                Vacaciones
                                                    .map((vacacion) => {
                                                        if (colabolador['NOMBRE COMPLETO'] === vacacion['NOMBRE COMPLETO']) {
                                                            return (
                                                                <td
                                                                    Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" className='text-center'>
                                                                    {vacacion.DiasSolicitados}
                                                                </td>

                                                            )
                                                        }
                                                    }
                                                    )


                                            }

                                            {
                                                Vacaciones
                                                    .map((vacacion) => {
                                                        if (colabolador['NOMBRE COMPLETO'] === vacacion['NOMBRE COMPLETO']) {
                                                            return (
                                                                <td
                                                                    Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" className='text-center'>
                                                                    {vacacion.title}
                                                                </td>

                                                            )
                                                        }
                                                    }
                                                    )


                                            }

                                            {
                                                Vacaciones
                                                    .map((vacacion) => {
                                                        if (colabolador['NOMBRE COMPLETO'] === vacacion['NOMBRE COMPLETO']) {
                                                            return (
                                                                <td
                                                                    Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" className='text-center' >
                                                                    {vacacion.start}
                                                                </td>

                                                            )
                                                        }
                                                    }
                                                    )


                                            }

                                            {
                                                Vacaciones
                                                    .map((vacacion) => {
                                                        if (colabolador['NOMBRE COMPLETO'] === vacacion['NOMBRE COMPLETO']) {
                                                            return (
                                                                <td
                                                                    Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" className='text-center'>
                                                                    {vacacion.end}
                                                                </td>

                                                            )
                                                        }
                                                    }
                                                    )


                                            }

                                            {
                                                Vacaciones
                                                    .map((vacacion) => {
                                                        if (colabolador['NOMBRE COMPLETO'] === vacacion['NOMBRE COMPLETO']) {
                                                            return (
                                                                <td
                                                                    Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" className='text-center' >
                                                                    {vacacion.Acreditacion}
                                                                </td>

                                                            )
                                                        }
                                                    }
                                                    )
                                            }
                                            
                                                        
                                        </tr>
                                    </tbody>

                                )
                            }

                        )
                    }
                </table>
                <br /><br />
            </div>

        </>
    }

    return (
        <div user={user.Dias}>

            {/* boton y elmodal */}
            {/* <Button onClick={handleOpen} variant="contained" color="success" endIcon={<SendIcon />}>Checar</Button> */}
            <br /><br />


            <Routes>
                <Route path='/' element={<Home />} ></Route>
                <Route path='/Calendario' element={<Calendario />}></Route>
                <Route path='/Edit/:id' element={<EditC />} />

            </Routes>
        </div>
    )
}

export default DirectorGeneral
