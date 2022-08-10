import React, { useState, useEffect } from 'react'
import { Link, Routes, useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../Config/firestore';
import { Box } from '@mui/material';
import sendRespuestaRegreso from '../NotificacionGoogle/sendRespuestaRegreso';
import jsPDF from 'jspdf';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);


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


  const update = async (e ) => {
   
    e.preventDefault()
    const colabolador = doc(db, "colaboladores", id)
    const data = { Dias }
    await updateDoc(colabolador, data)

    let correo = e.target.correo.value;
    let asunto = "Solicitud";
    let nombre = e.target.nombre.value;

    sendRespuestaRegreso(correo, asunto, nombre);    
    
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Actualizacion y Notificado hecho con exito !!!',
      showConfirmButton: false,
      timer: 2000
      })  

    navigate('/')

  }
 

  const getUsuariosById = async (id) => {
    const colabolador = await getDoc(doc(db, 'colaboladores', id));

    if (colabolador.exists()) {
      console.log(colabolador.data());
      setDias(colabolador.data().Dias)
      setUsuarios(colabolador.data()['NOMBRE COMPLETO'])

      setempleado(colabolador.data()['CORREO ELECTRONICO'])
      setAsunto("Solicitud")


        ///descargar pdf


        var date = new Date()
        var m2 = date.getMonth() + 1;
        var mesok = (m2 < 10) ? '0' + m2 : m2;
        mesok=new Array(12);
        mesok[0]="01";
        mesok[1]="02";
        mesok[2]="03";
        mesok[3]="04";
        mesok[4]="05";
        mesok[5]="06";
        mesok[6]="07";
        mesok[7]="08";
        mesok[8]="09";
        mesok[9]="10";
        mesok[10]="11";
        mesok[11]="12";

        var min = date.getMinutes();
        if (min < 10) {
          var minF = "0" + date.getMinutes()
        }
        else{
          var minF = date.getMinutes()
        }


        let d = new jsPDF('p', 'px', 'a4', 'false');

        d.setFont("helvetica", "bold");
        d.text("Solicitud de Vacaciones", 210, 40, null, null, "center");
    
        d.setFont("courier", "bolditalic");
        d.text("Vargas Fajardo Najera y Asociados SC", 210, 55, null, null, "center");
    
        
        d.setFont("times", "normal");
        d.setFontSize(12);
        d.text("Fecha:       " + date.getDate() + "/"  +mesok[date.getMonth()]+"/" +date.getFullYear()+ "   -   " +date.getHours() +':' +minF+ ':' +date.getSeconds() ,  30, 93);
        d.text("Nombre:", 30, 106);
        d.text(colabolador.data()['NOMBRE COMPLETO'], 70, 106);
        d.text("Puesto:", 30, 119);
        d.text(colabolador.data()['EQUIPO DE TRABAJO'], 70, 119);
    
        d.text("Por el medio de la presente solicito me sea autorizado ______________ dias(s) a cuenta ", 30, 150);
        d.text("de mis vacaciones correspondiente al periodo ___"+date.getFullYear()+"___ ", 30, 160);
    
        d.text("Para ser gozadas apartir del dia  _________________ ", 30, 190);
        d.text("Reintegrerme a mis funciones el dia  __________________ ", 30, 200);
    


        d.text(colabolador.data()['NOMBRE COMPLETO'], 30, 265);
        d.setLineWidth(0.5);
        d.line(120, 270, 30, 270);
        d.text("Empleado", 60, 280);
        d.text("Firma y nombre  ", 50, 290);
    
        
        d.text(colabolador.data()['NOMBRE DEL SUPERVISOR'], 150, 265);
        d.setLineWidth(0.5);
        d.line(150, 270, 270, 270); //el [1,2,3,4] el 2 y 4 son los espacios 
        d.text("Jefe Directo", 185, 280);
        d.text("Nombre y Firma Jefe directo", 150, 290);

        d.text("José Benito Vargas Fajardo", 300, 265);    
        d.setLineWidth(0.5);
        d.line(300, 270, 400, 270); //el [1,2,3,4] el 2 y 4 son los espacios, 1 y 3 de donde empieza hasta donde termina la linea 
        d.text("RH", 300, 280);
        d.text("Nombre y Firma", 300, 290);
    
        d.save('Solicitud de Vacaciones.pdf')

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
    Vacaciones
      .map((vacacion) => {
        if (vacacion.Usuario === vacacion['NOMBRE COMPLETO']) {
          setDias(
            vacacion.DiasDisponibles
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

        <br /><br />

        <div className='d-flex justify-content-around '>


          <button className='btn btn-success' onClick={Aprobar} >APROBAR   </button>

          <Link to="/" className='btn btn-warning'>
            <i class="fa-regular fa-rotate-left"></i>
            DENEGAR
          </Link>

        </div>
      </form>

    </Box>
  )
}

export default EditC
