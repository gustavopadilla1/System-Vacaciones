import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Config/firestore'

import { Link, Route, Routes } from 'react-router-dom'
import Calendario from '../Calendario/Calendario';
import EditC from '../EditC/EditC'

import EditIcon from '@mui/icons-material/Edit';
import {  Button,  } from '@mui/material';
import Edit from '../Edit';

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
        <div className="d-flex justify-content-evenly" >
            <Link className='btn btn-primary ' to="/Calendario"> Calendario</Link>
            <Link className='btn btn-warning ' to="/Superior"> Responder como Gerente   </Link>
            </div>
            <br /> <br />

            <table className="container">
                <thead>
                    <tr Style="font-family: 'Heebo', sans-serif; Font-size: 14px;"  >
                        <th className='text-center' scope="col"></th>
                        <th scope="col">USUARIO</th>
                        <th className='text-center' scope="col">EQUIPO</th>
                        <th className='text-center' scope="col">DIAS DISPOBLES</th>
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
                                    <tr >
                                        <Link
                                            to={`/EditC/${colabolador.id}`} >
                                            <Button
                                                endIcon={<EditIcon />}
                                                variant="contained"
                                                color="warning"
                                            >
                                            </Button>
                                        </Link>


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


<td>

                                        {
                                            Vacaciones
                                                .map((vacacion) => {
                                                    if (colabolador['NOMBRE COMPLETO'] === vacacion['NOMBRE COMPLETO']) {
                                                        return (
                                                            <div  className='text-center'
                                                                
                                                                    Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                                    {vacacion.Tipo}

                                                            </div>
                                                        )
                                                    }
                                                }
                                                )
                                        }
</td>
<td>
                                        {
                                            Vacaciones
                                                .map((vacacion) => {
                                                    if (colabolador['NOMBRE COMPLETO'] === vacacion['NOMBRE COMPLETO']) {
                                                        return (
                                                            <div className='text-center'
                                                                Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                                    {vacacion.start}
                                                               
                                                               
                                                               
                                                            </div>
                                                        )
                                                    }
                                                }
                                                )
                                        }
</td>
<td>
{
                                            Vacaciones
                                                .map((vacacion) => {
                                                    if (colabolador['NOMBRE COMPLETO'] === vacacion['NOMBRE COMPLETO']) {
                                                        return (

                                                            <div className=' text-center'
                                                                Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                                {vacacion.end}

                                                            </div>

                                                        )
                                                    }
                                                }
                                                )
                                        }
</td>
<td>
                                        {
                                            Vacaciones
                                                .map((vacacion) => {
                                                    if (colabolador['NOMBRE COMPLETO'] === vacacion['NOMBRE COMPLETO']) {
                                                        return (

                                                            <div className='text-primary text-center'
                                                                Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                                <b>{vacacion.Acreditacion}</b>

                                                            </div>

                                                        )
                                                    }
                                                }
                                                )
                                        }
</td>
                                    </tr>
                                </tbody>

                            )
                        }

                        )
                }
            </table>

        </>
    }

    function Superior() {
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
    
        return <>
      
        <div className='' >
        <Link to="/" className='btn btn-primary'>
        <i class="fa-regular fa-rotate-left"></i>
        Volver
      </Link>
      <br /><br />
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
                            if (vacacion['EQUIPO DE TRABAJO'] === "TEAM ADMIN") {

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
                                            <Link className='btn btn-warning ' to={`/Edit/${vacacion.id}` }> Responder</Link>
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
        <div user={user.Dias}>

            {/* boton y elmodal */}
            {/* <Button onClick={handleOpen} variant="contained" color="success" endIcon={<SendIcon />}>Checar</Button> */}
            <br /><br />


            <Routes>
                <Route path='/' element={<Home />} ></Route>
                <Route path='/Superior' element={<Superior/>}></Route>
                <Route path='/Calendario' element={<Calendario />}></Route>
                <Route path='/Edit/:id' element={<Edit/>}/>
                <Route path='/EditC/:id' element={<EditC />} />

            </Routes>
        </div>
    )
}

export default DirectorGeneral
