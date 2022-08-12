import React, { useEffect, useState } from 'react';

import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../../Config/firestore';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Calendario from '../../components/Calendario/Calendario';
import sendCustomEmail from '../../components/NotificacionGoogle/sendCustomEmail';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { addDays } from '@fullcalendar/react';
const MySwal = withReactContent(Swal);



function HomeUser({ user }) {
  const [search, setSearch] = useState("");

  const [colaboladores, setcolaboladores] = useState([]);
  const [Vacaciones, setVacaciones] = useState([]);

  const [, setCorreo] = useState("");
  const [Usuario, setUsuarios] = useState("");
  const [, setequipo] = useState("");
  const [comentario, setComentario] = useState("");
  const [DiasDisponibles, setDiasDisponibles] = useState("")
  const [DiasSolicitados, setDiasSolicitados] = useState("");
  const [, setSupervisor] = useState("")

  const [Acreditacion, setAcreditacion] = useState("En proceso");
  const [title, settitle] = useState("");
  const [start, setstart] = useState("");
  const [end, setend] = useState("");

  const VacacionesCollection = collection(db, "Vacaciones");
  const colaboladoresCollection = collection(db, "colaboladores");

  const Add = async (e) => {

    e.preventDefault();
    
    MySwal.fire({
      title: 'El periodo hay fin de semana ??',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'SI',
      denyButtonText: `NO`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        {/* <>
    //   var timeDiff = Math.abs(fecha1.getTime() - fecha2.getTime());
    //   var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); //Días entre las dos fechas
    //   var cuentaFinde = 1; //Número de Sábados y Domingos

    //   for (var i=1; i > diffDays; i--) 
    //   {
    //       //0 => Domingo - 6 => Sábado
    //       if (fecha1.getDay() == 0 || fecha2.getDay() == 6 ) {
    //           cuentaFinde--;
    //       }

    //       fecha1.setDate(fecha2.getDate() -1);
    //   }

    //  console.log(cuentaFinde); 



    //   if (addDays(new Date(), 1)){
    //       diasTrancurridos = diasTrancurridos -1;
    //   }
    //   if (addDays(new Date(), 5)){
    //     diasTrancurridos = diasTrancurridos -1;
    // }
  </> */}

        let fecha1 = new Date(start);
        let fecha2 = new Date(end);

        let milisegundosDias = 24 * 60 * 60 * 1000;

        let milisegundosTranscurridos = Math.abs(fecha1.getTime() - fecha2.getTime());
        let diasTrancurridos = Math.round(milisegundosTranscurridos / milisegundosDias)

        // console.log(fecha1);
        // console.log(fecha1.getTime());
        // console.log(fecha2);
        console.log(milisegundosDias);
        console.log(milisegundosTranscurridos);

        console.log("Dias Trancurrridos");
        console.log(diasTrancurridos);


        diasTrancurridos = diasTrancurridos - 2;
        console.log(diasTrancurridos);


        if (diasTrancurridos <= user.Dias) {
          
          MySwal.fire({
            title: 'Los Dias Solicitados son '+ diasTrancurridos,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            // denyButtonText: ``,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {


          addDoc(VacacionesCollection,
            {
              ['CORREO ELECTRONICO']: user['CORREO ELECTRONICO'],
              ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'],
              ['EQUIPO DE TRABAJO']: user['EQUIPO DE TRABAJO'],
              comentario: comentario,
              Acreditacion: Acreditacion,
              title: title + " - " + user['NOMBRE COMPLETO'],
              Tipo: title,
              start: start,
              end: end,
              DiasDisponibles: user.Dias,
              DiasSolicitados: diasTrancurridos,
            })


          console.log(e);

          let correo = e.target.correo.value;
          let asunto = e.target.asunto.value;
          let nombre = e.target.nombre.value;
          let fechai = e.target.fechai.value;
          let fechaf = e.target.fechaf.value;

          sendCustomEmail(correo, asunto, nombre, fechai, fechaf);

          MySwal.fire({
            position: 'center',
            icon: 'success',
            title: 'Actualizacion y Notificado hecho con exito !!!',
            showConfirmButton: false,
            timer: 2000
          })

        } 
        // else if (result.isDenied) {

        // }
      })
          
        } else {
          alert("Los dias sobre pasan los disponibles, Favor de intentar de nuevo!!")
        }


      } else if (result.isDenied) {
        let fecha1 = new Date(start);
        let fecha2 = new Date(end);

        let milisegundosDias = 24 * 60 * 60 * 1000;

        let milisegundosTranscurridos = Math.abs(fecha1.getTime() - fecha2.getTime());
        let diasTrancurridos = Math.round(milisegundosTranscurridos / milisegundosDias)

        // console.log(fecha1);
        // console.log(fecha1.getTime());
        // console.log(fecha2);
        console.log(milisegundosDias);
        console.log(milisegundosTranscurridos);

        console.log("Dias Trancurrridos");
        console.log(diasTrancurridos);

        if (diasTrancurridos <= user.Dias) {
MySwal.fire({
            title: 'Los Dias Solicitados son '+ diasTrancurridos,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            // denyButtonText: ``,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

          addDoc(VacacionesCollection,
            {
              ['CORREO ELECTRONICO']: user['CORREO ELECTRONICO'],
              ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'],
              ['EQUIPO DE TRABAJO']: user['EQUIPO DE TRABAJO'],
              comentario: comentario,
              Acreditacion: Acreditacion,
              title: title + " - " + user['NOMBRE COMPLETO'],
              Tipo: title,
              start: start,
              end: end,
              DiasDisponibles: user.Dias,
              DiasSolicitados: diasTrancurridos,
            })


          console.log(e);

          let correo = e.target.correo.value;
          let asunto = e.target.asunto.value;
          let nombre = e.target.nombre.value;
          let fechai = e.target.fechai.value;
          let fechaf = e.target.fechaf.value;

          sendCustomEmail(correo, asunto, nombre, fechai, fechaf);

          MySwal.fire({
            position: 'center',
            icon: 'success',
            title: 'Actualizacion y Notificado hecho con exito !!!',
            showConfirmButton: false,
            timer: 2000
          })
   } 
        // else if (result.isDenied) {

        // }
      })
          
        } else {
          alert("Los dias sobre pasan los disponibles, Favor de intentar de nuevo!!")
        }
      }
    })

  }

  const getvacaciones = async () => {
    const data = await getDocs(VacacionesCollection)
    setVacaciones(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(Vacaciones)

  }
  //mostrar los colaboradores
  const getcolaboladores = async () => {
    const data = await getDocs(colaboladoresCollection)
    // console.log(data.docs);
    setcolaboladores(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(colaboladores)

  }

  // use efect  
  useEffect(() => {
    getvacaciones()
    getcolaboladores()


  }, [])




  function Home() {
    return <>
      <br />
      <div className="alert alert-success" role="alert" >
        <h6>Tienes <b>{user.Dias}</b> disponible, Disfrutalos y Aprovechalos al maximo !!! </h6>
      </div>

      <div className='d-flex justify-content-end mr-auto p-2'>


        <Link to="/Acreditar" className='btn btn-primary' >
          <i className="fa-regular fa-rotate-left"></i>
          Acreditacion
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/Calendario" className='btn btn-success' >
          <i className="fa-regular fa-rotate-left"></i>
          Calendario
        </Link>

      </div>

      <form className="was-validated"
        onSubmit={Add}
      >

        <br />
        <div className="row d-flex justify-content-evenly" >
          <div className="col-5">
            <label className="col-sm-1 col-form-label"> Nombre: </label>
            <input value={user['NOMBRE COMPLETO']}
              selected={Usuario}
              name="nombre"

              onChange={() => setUsuarios(user['NOMBRE COMPLETO'])}
              type='text'
              className='form-control '
              disabled
            />
          </div>


          <div className="col-5">
            <label className="col-sm-1 col-form-label"> Email: </label>

            <input
              value={user['CORREO ELECTRONICO']}
              onChange={() => setCorreo(user['CORREO ELECTRONICO'])}
              type='text'
              className='form-control '
              disabled />
          </div>
        </div>

        <br />



        <div className="row d-flex justify-content-evenly" >
          <div className="col-5">
            <label className="col-sm-1 col-form-label">Superior: </label>
            <input value={user['CORREO ELCTRONICO DEL SUPERVISOR']}
              name="correo"
              onChange={() => setSupervisor(user['CORREO ELCTRONICO DEL SUPERVISOR'])}
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
              className="form-select form-select-lg mb-3 is-invalid" aria-label=".form-select-md example"
              required
            >

              <option></option>
              <option>Vacaciones</option>
              <option>Permisos</option>
              <option>Incapacidad</option>
            </select>

          </div>
        </div>



        <div className="row d-flex justify-content-evenly" >

          {/* <div className="col-3">
            <label className="col-sm-1 col-form-label">Dias: </label>
            <input
              value={DiasSolicitados}
              onChange={(e) => setDiasSolicitados(e.target.value)}
              className='form-control '
              type="Number"
              
            />
          </div> */}

          <div className="col-3">
            <label className="col-sm-1 col-form-label is-invalid">Inicial: </label>
            <input
              name="fechai"
              value={start}
              selected={start}
              onChange={(e) => setstart(e.target.value)}
              className='form-control '
              type="date"

              required
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
              required
            />


          </div>
        </div>

        <br />

        {/* <div className="col-3">
        <DatePicker 
         selected={startDate}
         onChange={onChange}
         startDate={startDate}
         endDate={endDate}
         excludeDates={[addDays(new Date(), 4), addDays(new Date(), 5)]}
         selectsRange
      
      inline
        />
</div> */}

        <br />


        <div className="row mb-1 justify-content-center form-floating" >
          <div className="col-sm-5">
            <textarea
              placeholder="Deseas colocar un comentario: (opcional)"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              type='text'
              className='form-control is-invalid'
            />
          </div>
        </div>




        <br /><br />


        {/* d-flex justify-content-evenly -----Style boton Centrado pero con margin cada uno quedando separaditos  */}
        {/* d-flex justify-content-between -----------------Style Boton en cada esquina  */}
        <div className='d-flex justify-content-around '>
          <div>
            <button

              Style="padding:11px;"
              type='submit'
              className='btn btn-success '
            >
              Enviar Solicitud
            </button>


          </div>
        </div>

      </form>

    </>
  }

  function Acreditar() {
    return (

      <div>

        {/* Filter buscador */}

        {/* <div className="row mb-12 justify-content-center" >
        <div className="col-sm-3">
          <input className="form-control form-control-lg" type="text" placeholder="Buscar..." aria-label=".form-control-lg example"
           onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div> */}

        <Link to="/" className='btn btn-primary' style={{ margin: 25 }}>

          Volver
        </Link>

        <table className="container">

          <thead>
            <tr Style="font-family: 'Heebo', sans-serif; Font-size: 14px;" >

              <th scope="col" >USUARIO</th>
              <th scope="col" >EQUIPO</th>
              <th scope="col" >TIPO</th>
              <th scope="col" >FECHA INICIO</th>
              <th scope="col" >FECHA FINAL</th>
              <th scope="col" >ACREDITACION</th>
            </tr>
          </thead>


          {
            Vacaciones
              .filter(vacacion => {
                if (search === "") {
                  return vacacion;
                } else if ((vacacion['NOMBRE COMPLETO'])
                  .toLowerCase().includes(search.toLowerCase())) {
                  return vacacion;
                }
              })

              .map((vacacion) => {

                return (
                  <tbody key={vacacion.id} >

                    <tr >

                      <td >
                        <div className="h-25 ">

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
                        Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" name="fechai">
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


                    </tr>
                  </tbody>


                )
              }



              )
          }
        </table>


        <br /><br />

      </div>

    )
  }




  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} ></Route>
          <Route path='/Calendario' element={<Calendario />} ></Route>
          <Route path='/Acreditar' element={<Acreditar />} ></Route>

        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default HomeUser;