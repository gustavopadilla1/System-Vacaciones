import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../Config/firestore';
import { Box } from '@mui/material';
import sendCustomEmail from '../NotificacionGoogle/sendCustomEmail';

// import firebaseApp from '../../Config/Credenciales'
// import {getAuth,signOut} from 'firebase/auth';
// const auth = getAuth(firebaseApp);

const Edit = ({ user }) => {

  const [Acreditacion, setAcreditacion] = useState("");
  const [comentarioSuperior, setcomentarioSuperior] = useState("");
  const [color, setColor] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const [Vacaciones, setVacaciones] = useState([]);
  const [Colaborador, setcolaboladores] = useState([])
  const VacacionesCollection = collection(db, "Vacaciones");
  const ColaboladoresCollection = collection(db, "colaboladores");


  const [Director, setDirector] = useState("")
  const [Usuario, setUsuarios] = useState("")
  const [title, settitle] = useState("");
  const [start, setstart] = useState("");
  const [end, setend] = useState("");




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
    getcolaboladores()

  }, [])



  const update = async (e) => {
    e.preventDefault()
    const vacacion = doc(db, "Vacaciones", id)
    const data = { Acreditacion, color, Usuario: Usuario }
    await updateDoc(vacacion, data)

    let correo = e.target.correo.value;
    let asunto = e.target.asunto.value;
    let nombre = e.target.nombre.value;
    let fechai = e.target.fechai.value;
    let fechaf = e.target.fechaf.value;

    sendCustomEmail(correo, asunto, nombre, fechai, fechaf);
    
      navigate('/')
      // signOut(auth);

  }


  const getUsuariosById = async (id) => {
    const vacacion = await getDoc(doc(db, 'Vacaciones', id));

    if (vacacion.exists()) {
      console.log(vacacion.data());
      setAcreditacion(vacacion.data().Acreditacion)
      setUsuarios(vacacion.data()['NOMBRE COMPLETO'])

      //haicodiado (dtalle resolver)
      setDirector("josegustavopadillatorres@gmail.com")
      settitle(vacacion.data().title)
      setstart(vacacion.data().start)
      setend(vacacion.data().end)




    } else {
      console.log("el usuario no existe");
    }
  }


  const ok = () => {
    if (Acreditacion === "Aprobar") {
      setColor("green")


    } else {
      setColor("red")
    }
    return color;
  }

  useEffect(() => {
    getUsuariosById(id)
  }, [])

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
    <Box sx={style} user={user} >
<Link to="/" className='btn btn-primary' >
        <i class="fa-regular fa-rotate-left"></i>
        Volver
      </Link>
      <br /><br />
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
            <input value={Director}

              name="correo"

              onChange={(e) => setDirector(e.target.value)}
              type='text'
              className='form-control '
              disabled

            />
          </div>

          <div className="col-5">
            <label className="col-sm-1 col-form-label">Tipo: </label>
            <select
              name="asunto"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="form-select form-select-lg mb-3 " aria-label=".form-select-md example"
              disabled
            >

              <option></option>
              <option>Vacaciones</option>
              <option>Permisos</option>
              <option>Incapacidad</option>
            </select>



          </div>



          <div className="col-3">
            <label className="col-sm-1 col-form-label is-invalid">Inicial: </label>
            <input
              name="fechai"
              value={start}
              selected={start}
              onChange={(e) => setstart(e.target.value)}
              className='form-control '
              type="date"
              disabled
            />
          </div>


          <div className="col-3">
            <label className="col-sm-1 col-form-label"> Final: </label>
            <input
              name="fechaf"
              value={end}
              selected={end}
              onChange={(e) => setend(e.target.value)}
              className='form-control '
              type="date"
              disabled
            />
          </div>


        </div>
        <label className="col-sm-1 col-form-label">Accion: </label>
        <select value={Acreditacion}
          onChange={(e) => setAcreditacion(e.target.value)}
            className="form-select form-select-lg mb-3 is-invalid" aria-label=".form-select-md example" 
          required
        >
          <option></option>
          <option>Aprobar</option>
          <option>Denegar </option>
        </select>
 


        <div className="row mb-1 justify-content-center" >
          <div className="col-sm-11">
            <textarea
              placeholder="Deseas colocar un comentario: (opcional)"
              value={comentarioSuperior}
              onChange={(e) => setcomentarioSuperior(e.target.value)}
              type='text'
              className='form-control'
            />
          </div>
        </div>



        <br />

        <button className='btn btn-success justify-content-center' onClick={ok}>Enviar  </button>
      </form>

    </Box>
  )
}

export default Edit
