import React, { useState, useEffect } from 'react'
import { Routes, useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../Config/firestore';
import { Box } from '@mui/material';
import sendRespuestaRegreso from '../NotificacionGoogle/sendRespuestaRegreso';

const EditC = ({ user }) => {

  const [Dias, setDias] = useState("");
  
  const [Usuario, setUsuarios] = useState("");
  const [empleado, setempleado] = useState("");
  const [asunto, setAsunto] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const [Vacaciones, setvacaciones] = useState([])
  const VacacionesCollection = collection(db, "Vacaciones");

  const [colaboladores, setcolaboladores] = useState([]);
  const ColaboladoresCollection = collection(db, "Colaboradores");


  const getcolaboladores = async () => {
    const data = await getDocs(ColaboladoresCollection)
    console.log(data.docs);
    setcolaboladores(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(colaboladores)
  }

  const getVacaciones = async () => {
    const data = await getDocs(VacacionesCollection)
    console.log(data.docs);
    setvacaciones(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(Vacaciones)
  }


  const update = async (e) => {
    e.preventDefault()
    const colabolador = doc(db, "colaboladores", id)
    const data = { Dias }
    await updateDoc(colabolador, data)

    
    let correo = e.target.correo.value;
    let asunto = "Solicitud";
    let nombre = e.target.nombre.value;
  

    sendRespuestaRegreso(correo, asunto, nombre);
    


    ///descargar pdf


  }


  const getUsuariosById = async (id) => {
    const colabolador = await getDoc(doc(db, 'colaboladores', id));

    if (colabolador.exists()) {
      console.log(colabolador.data());
      setDias(colabolador.data().Dias)
         setUsuarios(colabolador.data()['NOMBRE COMPLETO'])

      //haicodiado (dtalle resolver)
      setempleado(colabolador.data()['CORREO ELECTRONICO'])
      setAsunto("Silicitud")

    } else {
      console.log("el usuario no existe");
    }
  }

  useEffect(() => {
    getUsuariosById(id)
    getVacaciones()
    getcolaboladores()

  }, [])

  const Aprobar = () => {
    console.log("hola");

    Vacaciones
      .map((vacacion) => { 
        if (vacacion.DiasDisponibles === Dias) {
                setDias(
                  vacacion.DiasDisponibles - vacacion.DiasSolicitados
                )
                console.log(Dias);
                console.log(vacacion.DiasSolicitados);

                return Dias;
              }
          }
      )
  }


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,

    boxShadow: 24,
    p: 9,
  };

  return (
    <Box sx={style}>
      {/* contenido del moda --- y en el contenido tenemos todo para registrar el cheque del administrador  */}

      <form
        onSubmit={update}
      >

         <div className="row d-flex justify-content-evenly" >

<div className="col-5">
  <label className="col-sm-1 col-form-label"> Nombre: </label>
  <input value={Usuario}

    name="nombre"

    onChange={(e) => setUsuarios(e.target.value)}
    type='text'
    className='form-control '
    disabled
    
  />
</div>

<div className="col-6">
  <label className="col-sm-1 col-form-label"> Dirijido: </label>
  <input value={empleado}

    name="correo"

    onChange={(e) => setempleado(e.target.value)}
    type='text'
    className='form-control '
    disabled

  />
</div>

</div>


        <div  className='d-flex justify-content-around '>


        <button className='btn btn-success' onClick={Aprobar} >APROBAR   </button>
        <button className='btn btn-warning' >DENEGAR  </button>
        </div>
      </form>

    </Box>
  )
}

export default EditC
