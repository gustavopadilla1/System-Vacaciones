import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../Config/firestore';
import { Box } from '@mui/material';
import sendCustomEmail from '../NotificacionGoogle/sendCustomEmail';

// import firebaseApp from '../../Config/Credenciales'
// import {getAuth,signOut} from 'firebase/auth';
// const auth = getAuth(firebaseApp);
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

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

  const [DiasDisponibles, setDiasDisponibles] = useState("");
  const [Director, setDirector] = useState("")
  const [Usuario, setUsuarios] = useState("")
  const [Tipo, setTipo] = useState("");
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
    const data = { Acreditacion: "Aprobar", color: "green", DiasDisponibles, Usuario: Usuario }
    await updateDoc(vacacion, data)

    let correo = "jvargas@varfa.com.mx";
    let asunto = Tipo;
    let nombre = Usuario;
    let fechai = start;
    let fechaf = end;

    sendCustomEmail(correo, asunto, nombre, fechai, fechaf);

    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Actualizacion y Notificado hecho con exito !!!',
      showConfirmButton: false,
      timer: 2000
      })  

    navigate('/')
    // signOut(auth);

  }

  const negar = async (e) => {
    e.preventDefault()
    const vacacion = doc(db, "Vacaciones", id)
    const data = { Acreditacion: "Negar", color: "white", Usuario: Usuario }
    await updateDoc(vacacion, data)

    let correo = "jvargas@varfa.com.mx";
    let asunto = Tipo;
    let nombre = Usuario;
    let fechai = start;
    let fechaf = end;

    sendCustomEmail(correo, asunto, nombre, fechai, fechaf);

    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Actualizacion y Notificado hecho con exito !!!',
      showConfirmButton: false,
      timer: 2000
      })  

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
      setDirector("jvargas@varfa.com.mx")
      setTipo(vacacion.data().Tipo)
      setstart(vacacion.data().start)
      setend(vacacion.data().end)

      setDiasDisponibles(vacacion.data().DiasDisponibles - vacacion.data().DiasSolicitados);

    } else {
      console.log("el usuario no existe");
    }
  }


  // const Enviar =  async() => {

  //   if(Acreditacion ==="Aprobar"){
  //     setColor("green")
  //   } else {
  //     setColor("white")
  //   }
  //   return color;
  // }

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
      // onSubmit={update}
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
              value={Tipo}
              onChange={(e) => setTipo(e.target.value)}
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
        {/* <label className="col-sm-1 col-form-label">Accion: </label>
        <select value={Acreditacion}
          onChange={(e) => setAcreditacion(e.target.value)}
            className="form-select form-select-lg mb-3 " aria-label=".form-select-md example" 
          
        >
          <option></option>
          <option>Aprobar</option>
          <option>Negar</option>

        </select> */}

        <br />
        <div className="row mb-1 justify-content-center" >
          <div className="col-sm-6">
            <textarea
              placeholder="Comentario: (opcional)"
              value={comentarioSuperior}
              onChange={(e) => setcomentarioSuperior(e.target.value)}
              type='text'
              className='form-control'
            />
          </div>
        </div>


        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <button className='btn btn-success ' onClick={update}>Aprobar   </button>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <button className='btn btn-warning ' onClick={negar}>Negar   </button>


      </form>

    </Box>
  )
}

export default Edit
